"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Bold, Italic, Link as LinkIcon, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Underline as UnderlineIcon, Image as ImageIcon, Heading2, Heading3 } from "lucide-react";
import Link from "next/link";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import ImageExtension from '@tiptap/extension-image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUploader } from "react-drag-drop-files";
import { cn } from "@/lib/utils";

const fileTypes = ["JPG", "PNG", "GIF", "WEBP"];

export default function CreateBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    email: "",
    category: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      ImageExtension,
    ],
    content: '<p>Start writing your post here...</p>',
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[350px] p-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_p]:mb-4 [&_a]:text-primary [&_a]:underline [&_a]:cursor-pointer',
      },
    },
    immediatelyRender: false,
  });

  const addImage = () => {
    const url = window.prompt('URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const { mutate, isPending: loading } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/blog", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to publish blog");
      return resData;
    },
    onSuccess: () => {
      toast.success("Blog published successfully!");
      router.push("/admin/blogs");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to publish blog");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a featured image");
      return;
    }
    
    if (!editor || editor.isEmpty) {
      toast.error("Please write some content");
      return;
    }

    const data = new FormData();
    data.append("image", file);
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("email", formData.email);
    data.append("category", formData.category);
    data.append("content", editor.getHTML());
    
    mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" asChild>
          <Link href="/admin/blogs"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs</Link>
        </Button>
        <h1 className="!text-3xl font-bold">Write a New Blog Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <Input 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              placeholder="Post title" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author Name *</label>
            <Input 
              value={formData.author} 
              onChange={e => setFormData({...formData, author: e.target.value})} 
              placeholder="Author name" 
              required 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author Email *</label>
            <Input 
              type="email"
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              placeholder="Author email" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})}
              className={cn(
                "file:text-foreground placeholder:text-secondary selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full min-w-0 rounded-full border bg-transparent px-4 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              )}
              required
            >
              <option value="">Select Category</option>
              <option value="Creative Writing">Creative Writing</option>
              <option value="Publishing">Publishing</option>
              <option value="Authorship">Authorship</option>
              <option value="Marketing">Marketing</option>
              <option value="Business">Business</option>
              <option value="Organization">Organization</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image *</label>
          <div className="w-full">
            <FileUploader 
              handleChange={(file: File | File[]) => setFile(Array.isArray(file) ? file[0] : file)} 
              name="image" 
              types={fileTypes}
              classes="drop-zone-custom"
            >
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-gray-50/50">
                {file ? (
                  <div className="text-center">
                    <p className="text-sm font-medium text-primary">File selected: {file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-10 h-10 text-gray-300 mb-4" />
                    <p className="text-sm text-gray-600">Drag and drop or <span className="text-primary font-medium">browse</span></p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                  </>
                )}
              </div>
            </FileUploader>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-1 flex-wrap">
            <ToolbarButton 
              active={editor?.isActive('bold')} 
              onClick={() => editor?.chain().focus().toggleBold().run()}
              icon={<Bold className="w-4 h-4" />}
              label="Bold"
            />
            <ToolbarButton 
              active={editor?.isActive('italic')} 
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              icon={<Italic className="w-4 h-4" />}
              label="Italic"
            />
            <ToolbarButton 
              active={editor?.isActive('underline')} 
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              icon={<UnderlineIcon className="w-4 h-4" />}
              label="Underline"
            />
            <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
            <ToolbarButton 
              active={editor?.isActive('heading', { level: 2 })} 
              onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
              icon={<Heading2 className="w-4 h-4" />}
              label="H2"
            />
            <ToolbarButton 
              active={editor?.isActive('heading', { level: 3 })} 
              onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
              icon={<Heading3 className="w-4 h-4" />}
              label="H3"
            />
            <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
            <ToolbarButton 
              active={editor?.isActive({ textAlign: 'left' })} 
              onClick={() => editor?.chain().focus().setTextAlign('left').run()}
              icon={<AlignLeft className="w-4 h-4" />}
              label="Align Left"
            />
            <ToolbarButton 
              active={editor?.isActive({ textAlign: 'center' })} 
              onClick={() => editor?.chain().focus().setTextAlign('center').run()}
              icon={<AlignCenter className="w-4 h-4" />}
              label="Align Center"
            />
            <ToolbarButton 
              active={editor?.isActive({ textAlign: 'right' })} 
              onClick={() => editor?.chain().focus().setTextAlign('right').run()}
              icon={<AlignRight className="w-4 h-4" />}
              label="Align Right"
            />
            <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
            <ToolbarButton 
              active={editor?.isActive('bulletList')} 
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              icon={<List className="w-4 h-4" />}
              label="Bullet List"
            />
            <ToolbarButton 
              active={editor?.isActive('orderedList')} 
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              icon={<ListOrdered className="w-4 h-4" />}
              label="Ordered List"
            />
            <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
            <ToolbarButton 
              active={editor?.isActive('link')} 
              onClick={setLink}
              icon={<LinkIcon className="w-4 h-4" />}
              label="Link"
            />
            <ToolbarButton 
              active={false} 
              onClick={addImage}
              icon={<ImageIcon className="w-4 h-4" />}
              label="Add Image"
            />
          </div>
          <EditorContent editor={editor} className="bg-white min-h-[350px]" />
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={loading} size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            {loading ? "Publishing..." : "Publish Blog Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function ToolbarButton({ active, onClick, icon, label }: { active?: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <Button 
      type="button" 
      variant={active ? 'default' : 'ghost'} 
      size="sm" 
      onClick={onClick}
      className={cn("h-8 w-8 p-0", active && "bg-primary text-white hover:bg-primary/90")}
      title={label}
    >
      {icon}
    </Button>
  );
}
