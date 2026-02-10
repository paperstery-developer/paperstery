import { CheckCircle2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Benefit {
  title: string;
  description: string;
  icon: any;
}

interface ServiceProps {
  data: {
    heading: string;
    subHeading: string;
    whoItIsFor: string[];
    approach: string;
    benefits: Benefit[];
    cta: string;
  };
}

export default function Service({ data }: ServiceProps) {
  return (
    <div className="min-h-screen bg-background selection:bg-light-primary">
      <section className="px-6 py-16 lg:py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl leading-tight mb-6 font-serif">
              {data.heading.split(" ").slice(0, -2).join(" ")} <br />
              <span className="italic text-primary">
                {data.heading.split(" ").slice(-2).join(" ")}
              </span>
            </h1>
            <p className="text-xl leading-relaxed mb-8 max-w-lg text-muted-foreground">
              {data.subHeading}
            </p>
            <Button className="group gap-2 px-8 py-6 rounded-full text-lg">
              {data.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              Who it is for:
            </h3>
            <ul className="space-y-4">
              {data.whoItIsFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl mb-6 font-serif text-white">Our Approach</h2>
          <p className="text-slate-200 max-w-2xl mx-auto text-lg leading-relaxed">
            {data.approach}
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 flex flex-col gap-16">
        <div className="grid md:grid-cols-3 gap-8">
          {data.benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group p-8 bg-white border border-priamry/20 rounded-2xl hover:border-primary/50 transition-all shadow-lg"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-light-primary transition-colors">
                  <Icon className="w-6 h-6 text-primary/80 group-hover:text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-3">{benefit.title}</h4>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center">
          <Button size="lg" className="rounded-full px-10 py-6">
            {data.cta}
          </Button>
        </div>
      </section>
    </div>
  );
}

export function OldService({ data }: { data: any }) {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <h2 className="text-3xl font-serif mb-4">{data.heading}</h2>
        <p className="text-xl text-slate-600 max-w-3xl">{data.subHeading}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h4 className="font-bold text-lg mb-2">Who it is for</h4>
            <p className="text-slate-600">{data.whoItIsFor}</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Our Approach</h4>
            <p className="text-slate-600">{data.approach}</p>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-xl">
          <h4 className="font-bold text-lg mb-4">Key Benefits</h4>
          <ul className="space-y-4">
            {data.benefits.map((benefit: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-amber-600 font-bold">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <button className="mt-8 w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition-colors">
            {data.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
