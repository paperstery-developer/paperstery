import { prisma } from "@/lib/prisma";
import { BookOpen, FileText, Mail, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  const [blogsCount, manuscriptsCount, contactsCount, subsCount] = await Promise.all([
    prisma.blogPost.count(),
    prisma.manuscript.count(),
    prisma.contactForm.count(),
    prisma.subscription.count(),
  ]);

  const recentManuscripts = await prisma.manuscript.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const recentContacts = await prisma.contactForm.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const stats = [
    { title: "Total Blog Posts", value: blogsCount, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Manuscript Submissions", value: manuscriptsCount, icon: FileText, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Contact Inquiries", value: contactsCount, icon: Mail, color: "text-green-600", bg: "bg-green-100" },
    { title: "Newsletter Subs", value: subsCount, icon: Users, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl! font-bold text-gray-900">Dashboard Overview</h1>
        <Button asChild className="bg-primary hover:bg-primary/90 text-white">
          <Link href="/admin/blogs/create">Write New Blog</Link>
        </Button>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Manuscripts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl! font-semibold text-gray-900">Recent Manuscripts</h2>
            <Link href="/admin/manuscripts" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="p-0">
            {recentManuscripts.length === 0 ? (
              <p className="p-6 text-gray-500 text-sm">No recent manuscripts</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentManuscripts.map((manuscript: any) => (
                  <div key={manuscript.id} className="p-4 hover:bg-gray-50">
                    <p className="font-medium text-gray-900">{manuscript.title}</p>
                    <p className="text-sm text-gray-500">{manuscript.author} • {manuscript.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Contacts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl! font-semibold text-gray-900">Recent Contact Inquiries</h2>
            <Link href="/admin/contacts" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="p-0">
            {recentContacts.length === 0 ? (
              <p className="p-6 text-gray-500 text-sm">No recent inquiries</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentContacts.map((contact: any) => (
                  <div key={contact.id} className="p-4 hover:bg-gray-50">
                    <p className="font-medium text-gray-900">{contact.subject}</p>
                    <p className="text-sm text-gray-500">{contact.name} • {contact.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
