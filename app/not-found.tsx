import { ChevronLeft } from 'lucide-react';
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background border-b border-primary/20 px-6 text-center font-nobel_uno">
      {/* Visual Icon */}
      <div className="relative pt-18">
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
        <h1 className="font-marble font-bold text-primary text-9xl!">404</h1>
      </div>

      {/* Content */}
      <h2 className="text-4xl md:text-5xl font-marble font-medium text-primary mb-4">
        The Chapter is Missing
      </h2>

      <p className="text-secondary max-w-md text-lg mb-10 leading-relaxed">
        It seems the page you are looking for hasn&apos;t been written yet, or
        perhaps it has undergone a metamorphosis to a new location.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link
          href="/"
          className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full hover:opacity-90 transition-all font-medium"
        >
          <ChevronLeft size={18} />
          Back to the Beginning
        </Link>

        <Link
          href="/services"
          className="text-primary hover:underline underline-offset-4 font-medium px-8 py-3"
        >
          Explore Services
        </Link>
      </div>

      {/* Decorative background element */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-lienear-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}