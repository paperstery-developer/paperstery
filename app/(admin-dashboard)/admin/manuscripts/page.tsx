"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { toast } from "sonner";
import { format } from "date-fns";

interface Manuscript {
  id: string;
  title: string;
  author: string;
  email: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
}

export default function AdminManuscriptsPage() {
  const [page, setPage] = useState(1);

  const { data: resData, isLoading } = useQuery({
    queryKey: ["admin-manuscripts", page],
    queryFn: async () => {
      const res = await fetch(`/api/manuscript?page=${page}&limit=10`);
      if (!res.ok) throw new Error("Failed to fetch manuscripts");
      return res.json();
    },
  });

  const manuscripts = resData?.manuscripts || [];
  const totalPages = resData?.totalPages || 1;

  const handleDownload = (url: string, fileName: string) => {
    if (!url) {
      toast.error("No file URL available");
      return;
    }
    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      header: "Manuscript",
      accessor: (item: Manuscript) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <FileText className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-xs text-gray-400 capitalize">{item.fileType} • {(item.fileSize / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
      ),
    },
    {
      header: "Author",
      accessor: (item: Manuscript) => (
        <div>
          <p className="text-sm font-medium">{item.author}</p>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      ),
    },
    {
      header: "Submitted On",
      accessor: (item: Manuscript) => format(new Date(item.createdAt), "MMM d, yyyy"),
    },
    {
      header: "Actions",
      accessor: (item: Manuscript) => (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleDownload(item.fileUrl, item.title)}
            className="h-8"
          >
            <Download className="w-3 h-3 mr-1" /> Download
          </Button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl! font-bold text-gray-900">Manuscripts</h1>
        <p className="text-gray-500">Review and manage manuscript submissions</p>
      </div>


      <DataTable
        columns={columns}
        data={manuscripts}
        loading={isLoading}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyMessage="No manuscripts submitted yet"
      />
    </div>
  );
}
