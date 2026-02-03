import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import {
  Instagram,
  Linkedin,
  Mail,
  Facebook,
  ArrowUp,
  Sparkles,
  Send,
  Github,
  MessageCircle,
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { RevealOnScroll, MorphingShape, Anime3DCard } from "./AnimeComponents";
import { useToast } from "@/hooks/use-toast";

/**
 * EpicContactSection - Over-the-top 3D animated contact section
 */
export const EpicContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  // Fetch social links from Convex
  const socialLinksData = useQuery(api.siteContent.getSocialLinks);

  // Icon mapping
  const iconMap = {
    linkedin: Linkedin,
    github: Github,
    facebook: Facebook,
    instagram: Instagram,
    email: Mail,
  };

  // Default/Fallback social links
  const defaultSocialLinks = [
    { platform: "linkedin", url: "https://www.linkedin.com/in/marwin-john-gonzales-a38509322/", label: "LinkedIn", color: "#0077b5", order: 1, isActive: true },
    { platform: "github", url: "https://github.com", label: "GitHub", color: "#333", order: 2, isActive: true },
    { platform: "facebook", url: "https://www.facebook.com/marwin.john.gonzales.2024/", label: "Facebook", color: "#1877f2", order: 3, isActive: true },
    { platform: "instagram", url: "https://www.instagram.com/maruwinu/", label: "Instagram", color: "#e4405f", order: 4, isActive: true },
    { platform: "email", url: "mailto:marwinjohngonzales@gmail.com", label: "Email", color: "#ea4335", order: 5, isActive: true },
  ];

  // Map database social links to component format with icons
  const socialLinks = (socialLinksData || defaultSocialLinks).map(link => ({
    ...link,
    icon: iconMap[link.platform] || Mail,
    href: link.url,
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate floating orbs
            anime({
              targets: ".contact-orb",
              translateY: () => anime.random(-30, 30),
              translateX: () => anime.random(-30, 30),
              scale: () => [0.8, 1.2],
              opacity: () => [0.3, 0.7],
              duration: () => anime.random(3000, 5000),
              direction: "alternate",
              loop: true,
              easing: "easeInOutSine",
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Animate button
    anime({
      targets: ".submit-btn",
      scale: [1, 0.95, 1],
      duration: 300,
    });

    setTimeout(() => {
      toast({
        title: "Message sent! 🚀",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setIsSubmitting(false);
      formRef.current?.reset();
    }, 1500);
  };

  const handleIconHover = (e, enter) => {
    const target = e.currentTarget;
    anime({
      targets: target,
      scale: enter ? 1.1 : 1, // Reduced scale for subtler effect
      translateY: enter ? -5 : 0, // Reduced movement
      duration: 300,
      easing: "easeOutQuad", // Smoother, less bouncy easing
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-24 px-4 relative overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      {/* Floating orbs */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="contact-orb absolute w-32 h-32 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(220, 38, 38, ${0.1 + Math.random() * 0.1}) 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(40px)",
          }}
        />
      ))}

      <MorphingShape size={500} className="top-0 left-0 opacity-20" />
      <MorphingShape size={400} color="rgba(249, 115, 22, 0.2)" className="bottom-0 right-0" />

      <div className="container mx-auto max-w-5xl relative z-10 flex-1 flex flex-col justify-center">
        {/* Section Title */}
        <RevealOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium">
              Let's Talk
            </span>
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-cinzel">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </RevealOnScroll>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Contact Form */}
          <RevealOnScroll direction="left" delay={200}>
            <Anime3DCard
              className="rounded-3xl bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl border border-border/50 p-8"
              intensity={5}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 
                             focus:border-primary/50 focus:ring-2 focus:ring-primary/20 
                             transition-all duration-300 outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 
                             focus:border-primary/50 focus:ring-2 focus:ring-primary/20 
                             transition-all duration-300 outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 
                             focus:border-primary/50 focus:ring-2 focus:ring-primary/20 
                             transition-all duration-300 outline-none resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn group w-full py-4 rounded-xl font-semibold text-white
                           bg-gradient-to-r from-red-600 to-red-500 
                           shadow-lg shadow-red-500/25 hover:shadow-red-500/40
                           hover:scale-[1.02] active:scale-[0.98]
                           transition-all duration-300 disabled:opacity-70
                           flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </Anime3DCard>
          </RevealOnScroll>

          {/* Right - Social Links & Info */}
          <RevealOnScroll direction="right" delay={400}>
            <div className="space-y-8">
              {/* Social Links */}
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon group relative"
                      onMouseEnter={(e) => handleIconHover(e, true)}
                      onMouseLeave={(e) => handleIconHover(e, false)}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl bg-card/80 border border-border/50 
                                   flex items-center justify-center
                                   group-hover:border-primary/50 transition-all duration-300
                                   shadow-lg"
                        style={{
                          boxShadow: `0 10px 40px -10px ${social.color}40`,
                        }}
                      >
                        <social.icon
                          className="w-6 h-6 transition-colors duration-300"
                          style={{ color: social.color }}
                        />
                      </div>

                      {/* Tooltip */}
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium
                                     opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                     whitespace-nowrap text-muted-foreground">
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div
                className="p-8 rounded-3xl bg-gradient-to-br from-card/90 to-card/50 
                           backdrop-blur-xl border border-border/50"
              >
                <h3 className="text-xl font-bold mb-4">Quick Response</h3>
                <p className="text-muted-foreground mb-6">
                  I typically respond within 24 hours. For urgent matters,
                  feel free to reach out via social media.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>marwinjohngonzales@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Back to top */}
        <div className="w-full flex justify-center items-center py-16 mt-8">
          <a
            href="#hero"
            className="group flex flex-col items-center gap-2"
            onClick={(e) => {
              anime({
                targets: e.currentTarget,
                translateY: [0, -10, 0],
                duration: 500,
                easing: "easeOutElastic(1, .5)",
              });
            }}
          >
            <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-red-500/20 
                          border border-primary/30 group-hover:border-primary/60
                          group-hover:shadow-lg group-hover:shadow-primary/20
                          transition-all duration-300">
              <ArrowUp className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
              Back to top
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
