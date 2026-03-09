"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, Mail, Calendar, Download } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface Subscription {
  id: string;
  email: string;
  createdAt: string;
}

export default function AdminSubscriptionsPage() {
  const [page, setPage] = useState(1);

  const { data: resData, isLoading } = useQuery({
    queryKey: ["admin-subscriptions", page],
    queryFn: async () => {
      const res = await fetch(`/api/subscription?page=${page}&limit=10`);
      if (!res.ok) throw new Error("Failed to fetch subscriptions");
      return res.json();
    },
  });

  const subscriptions = resData?.subscriptions || [];
  const totalPages = resData?.totalPages || 1;

  const handleExport = () => {
    if (subscriptions.length === 0) return;
    const csv = [
      ["Email", "Date Subscribed"],
      ...subscriptions.map((sub: Subscription) => [sub.email, format(new Date(sub.createdAt), "yyyy-MM-dd HH:mm:ss")])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "subscriptions_export.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      header: "Subscriber Email",
      accessor: (item: Subscription) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-50 rounded-full text-orange-600">
            <Mail className="w-4 h-4" />
          </div>
          <span className="font-medium">{item.email}</span>
        </div>
      ),
    },
    {
      header: "Date Subscribed",
      accessor: (item: Subscription) => (
        <div className="flex items-center text-gray-500">
          <Calendar className="w-3 h-3 mr-1.5" />
          {format(new Date(item.createdAt), "MMM d, yyyy")}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl! font-bold text-gray-900">Newsletter Subscriptions</h1>
          <p className="text-gray-500">Manage your newsletter subscriber list</p>
        </div>
        <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={subscriptions}
        loading={isLoading}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyMessage="No subscribers found"
      />
    </div>
  );
}
