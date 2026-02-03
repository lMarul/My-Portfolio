import { cn } from "@/lib/utils";
import { Menu, X, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { ThemeToggle } from "./ThemeToggle";
import anime from "animejs";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Hackathons", href: "#hackathons" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef(null);

  useEffect(() => {
    // Initial entrance animation
    anime({
      targets: ".nav-item",
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(100, { start: 300 }),
      easing: "easeOutExpo",
    });

    anime({
      targets: ".nav-logo",
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutExpo",
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Track active section
      const sections = navItems.map(item => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    // Animate the clicked item
    anime({
      targets: e.currentTarget,
      scale: [1, 0.9, 1],
      duration: 300,
      easing: "easeOutElastic(1, .5)",
    });
  };

  const handleNavHover = (e, enter) => {
    if (enter) {
      anime({
        targets: e.currentTarget.querySelector(".nav-underline"),
        scaleX: [0, 1],
        duration: 300,
        easing: "easeOutExpo",
      });
    } else {
      anime({
        targets: e.currentTarget.querySelector(".nav-underline"),
        scaleX: [1, 0],
        duration: 200,
        easing: "easeInExpo",
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed w-full z-50 transition-all duration-500",
        isScrolled
          ? "py-3 bg-background/70 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border/50"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a
          className="nav-logo text-xl font-bold flex items-center gap-2 opacity-0 group"
          href="#hero"
        >
          <div className="relative">
            <Sparkles className="w-6 h-6 text-primary absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: "scale(0.6)" }} />
            <span className="text-foreground">Marwin's</span>
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400 font-black">
            Portfolio
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, key) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={key}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={(e) => handleNavHover(e, true)}
                onMouseLeave={(e) => handleNavHover(e, false)}
                className={cn(
                  "nav-item relative px-4 py-2 rounded-full font-medium transition-all duration-300 opacity-0",
                  isActive
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {item.name}
                {/* Animated underline */}
                <span
                  className={cn(
                    "nav-underline absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-3/4 rounded-full",
                    "bg-gradient-to-r from-red-500 to-red-600",
                    "origin-center",
                    isActive ? "scale-x-100" : "scale-x-0"
                  )}
                />
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
                )}
              </a>
            );
          })}

          {/* Theme Toggle with animation */}
          <div className="nav-item opacity-0 ml-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-2">
          <button
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
              // Animate hamburger
              anime({
                targets: ".menu-icon",
                rotate: isMenuOpen ? 0 : 180,
                scale: [1, 0.8, 1],
                duration: 300,
              });
            }}
            className="p-2 text-foreground z-50 relative"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            <div className="menu-icon">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center",
            "transition-all duration-500 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-6 text-xl">
            {navItems.map((item, key) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={key}
                  href={item.href}
                  className={cn(
                    "relative px-6 py-3 rounded-xl transition-all duration-300",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                  )}
                  onClick={() => {
                    setIsMenuOpen(false);
                    anime({
                      targets: ".mobile-menu",
                      translateX: [0, 100],
                      opacity: [1, 0],
                      duration: 300,
                    });
                  }}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
