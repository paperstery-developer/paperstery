import { Clock, Mail, Phone } from "lucide-react";

export const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: [
      { label: "General Inquiries", value: "info@paperstery.com" },
      { label: "Submissions", value: "submissions@paperstery.com" },
      { label: "Support", value: "support@paperstery.com" },
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: [
      { label: "US Office", value: "+1-771-213-3414" },
      { label: "Nigerian Office", value: "+234-916-748-4945" },
    ],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: [
      { label: "Monday - Friday", value: "9:00 AM - 6:00 PM (EST)" },
      { label: "Saturday", value: "10:00 AM - 2:00 PM (EST)" },
      { label: "Sunday", value: "Closed" },
    ],
  },
];

export const offices = [
  {
    location: "United States",
    address: "6312 S. Fiddlers Green Circle, Suite 300E",
    city: "Greenwood Village, Colorado 80111",
    country: "United States of America",
  },
  {
    location: "Nigeria",
    address: "Plot 9, Gbagada Industrial Scheme",
    city: "Gbagada Expressway, Lagos",
    country: "Lagos State, Nigeria",
  },
];
