import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

const articles = [
  {
    id: 1,
    category: "Panel Upgrades",
    title: "How Much Does a Panel Upgrade Cost in San Diego? (2025 Guide)",
    excerpt: "Thinking about upgrading your electrical panel? Here's what San Diego homeowners actually pay in 2025, what affects the price, and when you need one.",
    image: "https://images.unsplash.com/photo-1621905235277-f25426da5104?auto=format&fit=crop&q=80&w=800", // Electrical panel image
    date: "March 12, 2025"
  },
  {
    id: 2,
    category: "EV Chargers",
    title: "EV Charger Installation at Home: What You Need to Know Before You Buy",
    excerpt: "Before you install a Level 2 EV charger at your San Diego home, here's what your electrician needs to check — and what it really costs.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800", // EV charging image
    date: "February 28, 2025"
  },
  {
    id: 3,
    category: "Safety",
    title: "7 Warning Signs Your Home Needs an Electrical Inspection",
    excerpt: "Flickering lights, tripping breakers, burning smells — these are signs San Diego homeowners should never ignore. Here's when to call an electrician.",
    image: "https://images.unsplash.com/photo-1558402529-d2638a7023e9?auto=format&fit=crop&q=80&w=800", // Electrician work/safety image
    date: "February 15, 2025"
  },
];

export function BlogSection() {
  const scrollToContact = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block glass px-4 py-2 rounded-full mb-6">
            <span className="text-sm text-primary font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Electrical Tips & Guides
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium mb-6 tracking-tight">
            Latest News <span className="gradient-text">& Insights</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Helpful resources for San Diego homeowners to keep your home safe and efficient.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="group glass rounded-3xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="img-frame ratio-16-9 rounded-none">
                <img 
                  src={article.image} 
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                  className="img-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-semibold backdrop-blur-md">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="text-xs text-muted-foreground mb-3">{article.date}</div>
                <h3 className="text-xl font-semibold mb-4 leading-snug group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
                <a 
                  href="#contact" 
                  onClick={scrollToContact}
                  className="inline-flex items-center text-sm font-semibold text-primary hover:gap-2 transition-all duration-300"
                >
                  Read More
                  <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="flex justify-center">
          <a href="#contact" onClick={scrollToContact}>
            <Button 
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 border-primary/20 hover:bg-primary/5 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
            >
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
