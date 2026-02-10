"use client";
import { Upload, Mail, Plane, Info } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function SubmitManuscript() {
  const fileTypes = ["PDF", "DOC", "DOCX", "TXT"];
  const [file, setFile] = useState<File | File[] | null>(null);
  const handleChange = (file: File | File[]) => {
    setFile(file);
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
          <div className="bg-background rounded-2xl p-8 md:p-12 shadow-xl border border-light-pbg-light-primary">
            <p className="text-primary flex items-center gap-1.5 italic mb-4 text-sm">
              <Info size={16} />
              Fields marked with asterisks (*) are required.
            </p>
            <form className="space-y-6">
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
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full border-primary/20 focus:border-primary"
                    required
                  />
                </div>
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
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full border-primary/20 focus:border-primary"
                  required
                />
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
                  Upload Manuscript (Optional)
                </label>
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  multiple={false}
                  maxSize={5}
                  label="Click to upload manuscript or drop the file here"
                  uploadedLabel="Manuscript uploaded successfully!"
                  hoverTitle="Drop your manuscript here..."
                  fileOrFiles={file}
                  children={
                    <div className="block border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-primary mx-auto mb-3" />
                      {file ? (
                        <p className="text-sm! text-secondary mb-2">
                          {Array.isArray(file)
                            ? file.map((f) => f.name).join(", ")
                            : file.name}{" "}
                          uploaded successfully!
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
                size="lg"
                className="w-full bg-primary text-white hover:bg-primary/90 transition-all shadow-md text-base"
              >
                Submit Manuscript
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
    </section>
  );
}
