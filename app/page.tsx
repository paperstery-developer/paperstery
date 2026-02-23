import { About } from "@/components/homepage/About";
import { Blog } from "@/components/homepage/Blog";
import { Hero } from "@/components/homepage/Hero";
import { Services } from "@/components/homepage/Services";
import { FAQ } from "@/components/shared/FAQ";

export default function Home() {
  return (
    <div className="font-nobel_uno">
      <Hero />
      <About />
      <Services />
      <Blog />
      <FAQ type="home" />
    </div>
  );
}
 