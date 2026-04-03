"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Save, Bold, Italic, Link as LinkIcon, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Underline as UnderlineIcon, Image as ImageIcon, Heading2, Heading3 } from "lucide-react";
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

export default function EditBlog() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    email: "",
    category: "",
    status: "published",
  });
  const [file, setFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

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
    content: '',
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[350px] p-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_p]:mb-4',
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

  const { data: blog, isLoading } = useQuery({
    queryKey: ["admin-blog", id],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${id}`);
      if (!res.ok) throw new Error("Failed to load blog post");
      return res.json();
    },
  });

  useEffect(() => {
    if (blog && editor) {
      setFormData({
        title: blog.title,
        author: blog.author,
        email: blog.email,
        category: blog.category || "",
        status: blog.status,
      });
      setCurrentImageUrl(blog.imageUrl || "");
      editor.commands.setContent(blog.content);
    }
  }, [blog, editor]);

  const { mutate, isPending: saving } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        body: data,
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to update blog");
      return resData;
    },
    onSuccess: () => {
      toast.success("Blog updated successfully!");
      router.push("/admin/blogs");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update blog");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor || editor.isEmpty) {
      toast.error("Please write some content");
      return;
    }

    const data = new FormData();
    if (file) data.append("image", file);
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("email", formData.email);
    data.append("category", formData.category);
    data.append("status", formData.status);
    data.append("content", editor.getHTML());

    mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
        <p className="text-gray-500">Loading blog post...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/admin/blogs"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs</Link>
          </Button>
          <h1 className="!text-3xl font-bold">Edit Blog Post</h1>
        </div>
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

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select 
              value={formData.status} 
              onChange={e => setFormData({...formData, status: e.target.value})}
              className={cn(
                "file:text-foreground placeholder:text-secondary selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full min-w-0 rounded-full border bg-transparent px-4 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              )}
            >
              <option value="pending">Pending</option>
              <option value="published">Published</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
            <div className="flex items-center gap-4">
              {currentImageUrl && !file && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                  <img src={currentImageUrl} alt="Current" className="object-cover w-full h-full" />
                </div>
              )}
              <div className="flex-1">
                <FileUploader 
                  handleChange={(file: File | File[]) => setFile(Array.isArray(file) ? file[0] : file)} 
                  name="image" 
                  types={fileTypes}
                >
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-gray-50/50">
                    <p className="text-xs text-center text-gray-500">
                      {file ? <span className="text-primary font-medium">{file.name}</span> : "Select new image to replace"}
                    </p>
                  </div>
                </FileUploader>
              </div>
            </div>
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
          <Button type="submit" disabled={saving} className="bg-primary hover:bg-primary/90 text-white px-8">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {saving ? "Saving..." : "Save Changes"}
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
