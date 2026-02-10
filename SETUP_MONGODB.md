# MongoDB + Prisma Setup Guide

## 1. Install Dependencies

All dependencies have been installed:

- `@prisma/client` - Prisma ORM client
- `prisma` - Prisma CLI (dev dependency)
- `nodemailer` - Email service
- `cloudinary` - File storage service

## 2. Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project
4. Create a cluster (M0 free tier is perfect for starting)
5. Add your IP address to network access
6. Create a database user with username and password
7. Click "Connect" and copy the connection string
8. Replace `<username>`, `<password>`, and `<cluster>` with your actual values

## 3. Environment Variables

Create a `.env.local` file in the root directory with:

```env
# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/paperstery?retryWrites=true&w=majority

# Email (using Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@paperstery.com
ADMIN_EMAIL=admin@paperstery.com

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Getting Gmail App Password:

1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google Account Settings](https://myaccount.google.com/)
3. Navigate to Security > App passwords
4. Select "Mail" and "Windows Computer"
5. Copy the generated 16-character password

## 4. Generate Prisma Client

Run this command to generate the Prisma client:

```bash
pnpm prisma generate
```

## 5. Deploy Database Schema

Push the schema to MongoDB:

```bash
pnpm prisma db push
```

This will create the collections in your MongoDB database.

## 6. (Optional) Prisma Studio

To visualize and manage your database:

```bash
pnpm prisma studio
```

This opens a web interface at http://localhost:5555

## Database Collections

The schema creates 4 collections:

- **subscriptions** - Email newsletter subscriptions
- **contact_forms** - Contact form submissions
- **manuscripts** - Manuscript submissions with file metadata
- **blog_posts** - Blog post submissions with image metadata

## API Routes

- `POST /api/subscription` - Newsletter signup
- `POST /api/contact` - Contact form
- `POST /api/manuscript` - Manuscript submission with file upload
- `POST /api/blog` - Blog post submission with image upload

All routes validate input, store data in MongoDB, and send confirmation emails.

## File Upload Integration

When you integrate Cloudinary uploads, uncomment the relevant code in each route and the files will be:

1. Uploaded to Cloudinary
2. Stored with URL in MongoDB
3. Ready for retrieval or deletion
