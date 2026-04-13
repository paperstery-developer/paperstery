"use client";
import { Upload, Mail, Plane, Info, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function SubmitManuscript() {
  const fileTypes = ["PDF", "DOC", "DOCX"];
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    title: "",
    description: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (file: File | File[]) => {
    setFile(Array.isArray(file) ? file[0] : file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("/api/manuscript", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to submit manuscript");
      return resData;
    },
    onSuccess: () => {
      setShowModal(true);
      setFormData({
        firstName: "", email: "", phone: "", title: "", description: ""
      });
      setFile(null);
    },
    onError: (err: any) => {
      toast.error(err.message || "An error occurred during submission");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a manuscript file");
      return;
    }
    
    const data = new FormData();
    data.append("file", file);
    data.append("title", formData.title);
    data.append("author", formData.firstName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("description", formData.description);

    mutate(data);
  };

  return (
    <section className="py-24 bg-white" id="submit">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-light-primary border-primary/20 border mb-4">
            <span className="flex items-center gap-1 text-sm text-primary font-medium">
              <Plane size={14} />
              Submit Your Work
            </span>
          </div>
          <h2 className="mb-4">Submit a Manuscript</h2>
          <p className="max-w-3xl mx-auto text-lg">
            If you have a manuscript, proposal, or book idea you would like us
            to review, you can submit it using the form below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="md:bg-background rounded-2xl md:p-12 md:shadow-xl md:border border-light-primary">
            <p className="text-primary flex items-center gap-1.5 italic mb-4 text-sm">
              <Info size={16} />
              Fields marked with asterisks (*) are required.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full border-primary/20 focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full border-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    Manuscript Title *
                  </label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Title of your work"
                    className="w-full border-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full border-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Brief Description of Your Book or Idea *
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about your book, manuscript, or idea..."
                  className="w-full min-h-[150px] border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="manuscript"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Upload Manuscript *
                </label>
                <FileUploader
                  handleChange={handleFileChange}
                  name="file"
                  types={fileTypes}
                  multiple={false}
                  maxSize={5}
                  required
                  label="Click to upload manuscript or drop the file here"
                  uploadedLabel="Manuscript uploaded successfully!"
                  hoverTitle="Drop your manuscript here..."
                  fileOrFiles={file}
                  children={
                    <div className="block border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-primary mx-auto mb-3" />
                      {file ? (
                        <p className="text-sm! text-secondary mb-2">
                          {file.name} uploaded successfully!
                        </p>
                      ) : (
                        <>
                          <p className="text-sm! text-secondary mb-2">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs! text-secondary">
                            {fileTypes
                              .map((type) => type.toUpperCase())
                              .join(", ")}{" "}
                            (max 5MB)
                          </p>
                        </>
                      )}
                    </div>
                  }
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                size="lg"
                className="w-full bg-primary text-white hover:bg-primary/90 transition-all shadow-md text-base gap-2"
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {isPending ? "Submitting..." : "Submit Manuscript"}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-primary/10">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-px shrink-0" />
                <div>
                  <p className="text-sm text-secondary">
                    You can also submit your manuscript and a cover letter at{" "}
                    <a
                      href="mailto:submission@paperstery.com"
                      className="text-primary hover:underline font-medium"
                    >
                      submission@paperstery.com
                    </a>
                  </p>
                  <p className="text-sm text-secondary mt-3">
                    Our team reviews submissions and responds if the project is
                    a good fit for our publishing focus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-primary text-2xl">Submission Received!</DialogTitle>
            <DialogDescription className="text-center text-secondary pt-2">
              Thank you for submitting your manuscript. Our team will review your work and get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowModal(false)} className="bg-primary text-white hover:bg-primary/90">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
