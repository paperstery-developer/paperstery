import { About } from "@/components/homepage/About";
import { Blog } from "@/components/homepage/Blog";
import { Hero } from "@/components/homepage/Hero";
import { Services } from "@/components/homepage/Services";

export default function Home() {
  return (
    <div className="font-nobel_uno">
      <Hero />
      <About />
      <Services />
      <Blog />
    </div>
  );
}
 