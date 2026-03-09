export interface Manuscript {
  id: string;
  title: string;
  author: string;
  email: string;
  phone?: string | null;
  description?: string | null;
  fileName: string;
  fileUrl?: string | null;
  fileType: string;
  fileSize: number;
  status: string;
  cloudinaryId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug?: string | null;
  author: string;
  email: string;
  content: string;
  category?: string | null;
  imageName: string;
  imageUrl?: string | null;
  imageSize: number;
  status: string;
  cloudinaryId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin {
  id: string;
  email: string;
  password?: string;
  role: string;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
