"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/DataTable";
import { toast } from "sonner";
import { format } from "date-fns";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string | null;
  status: string;
  createdAt: string;
}

export default function AdminBlogsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-blogs", page, debouncedSearch],
    queryFn: async () => {
      const res = await fetch(`/api/blog?page=${page}&limit=10&search=${debouncedSearch}`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    },
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog post");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Blog post deleted");
      refetch();
    },
    onError: () => {
      toast.error("Error deleting blog post");
    }
  });

  const handleDeleteRequest = (id: string) => {
    setPostToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      deletePost(postToDelete);
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };
  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 1;

  const columns = [
    {
      header: "Title",
      accessor: (item: BlogPost) => (
        <div className="max-w-xs">
          <p className="font-medium truncate">{item.title}</p>
          <p className="text-xs text-gray-400">{item.author}</p>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: (item: BlogPost) => item.category || "Uncategorized",
    },
    {
      header: "Status",
      accessor: (item: BlogPost) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'published' ? 'bg-green-100 text-green-700' : item.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {item.status}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: (item: BlogPost) => format(new Date(item.createdAt), "MMM d, yyyy"),
    },
    {
      header: "Actions",
      accessor: (item: BlogPost) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/blogs/${item.id}/edit`}>
              <Edit2 className="w-4 h-4 text-blue-600" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDeleteRequest(item.id)}>
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/blogs/${item.id}`} target="_blank">
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </Link>
          </Button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl! font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-500">Manage your blog content and publications</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-white">
          <Link href="/admin/blogs/create">
            <Plus className="w-4 h-4" /> New Post
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={posts}
        loading={isLoading}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyMessage="No blog posts found"
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-[400px] p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl! font-bold text-gray-900">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="flex-1 rounded-full"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md shadow-red-200"
            >
              Delete Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
