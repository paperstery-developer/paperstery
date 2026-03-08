"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, User, Calendar, MessageSquare } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { toast } from "sonner";
import { format } from "date-fns";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const [page, setPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: resData, isLoading } = useQuery({
    queryKey: ["admin-contacts", page],
    queryFn: async () => {
      const res = await fetch(`/api/contact?page=${page}&limit=10`);
      if (!res.ok) throw new Error("Failed to fetch contact inquiries");
      return res.json();
    },
  });

  const contacts = resData?.contacts || resData || [];
  const totalPages = resData?.totalPages || 1;

  const columns = [
    {
      header: "Sender",
      accessor: (item: Contact) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-full text-blue-600">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Subject",
      accessor: (item: Contact) => (
        <div className="max-w-xs">
          <p className="font-medium truncate">{item.subject}</p>
          <p className="text-xs text-gray-400 truncate">{item.message}</p>
        </div>
      ),
    },
    {
      header: "Date",
      accessor: (item: Contact) => (
        <div className="flex items-center text-gray-500">
          <Calendar className="w-3 h-3 mr-1.5" />
          {format(new Date(item.createdAt), "MMM d, yyyy")}
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: (item: Contact) => (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => {
            setSelectedContact(item);
            setIsModalOpen(true);
          }}
          className="text-primary hover:bg-light-primary rounded-full transition-all"
        >
          View Message
        </Button>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl! font-bold text-gray-900">Contact Inquiries</h1>
        <p className="text-gray-500">Messages from your website contact form</p>
      </div>

      <DataTable
        columns={columns}
        data={contacts}
        loading={isLoading}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        emptyMessage="No contact inquiries found"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
          <div className="bg-primary p-8 text-white relative">
            <div className="absolute top-4 right-4 opacity-20">
              <MessageSquare className="w-24 h-24" />
            </div>
            <DialogHeader className="relative z-10 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-full">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/80 font-medium tracking-wider uppercase text-xs">New Inquiry</span>
              </div>
              <DialogTitle className="text-2xl font-bold text-white leading-tight">
                {selectedContact?.subject || "Message Details"}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-white/90 text-sm">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span className="font-semibold">{selectedContact?.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-white/70" />
                  <span>{selectedContact?.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-white/70" />
                  <span>{selectedContact?.createdAt ? format(new Date(selectedContact.createdAt), "MMMM d, yyyy") : ""}</span>
                </div>
              </div>
            </DialogHeader>
          </div>
          
          <div className="p-8 bg-white">
            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Message Content</h4>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 min-h-[150px]">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedContact?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="p-6 bg-gray-50/50 border-t border-gray-100 sm:justify-end gap-3 px-8">
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
              className="rounded-full px-6 border-gray-200"
            >
              Close
            </Button>
            <Button 
              asChild
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-md shadow-primary/20"
            >
              <a href={`mailto:${selectedContact?.email}?subject=Re: ${selectedContact?.subject}`}>
                Quick Reply
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

