import { cn } from "@/lib/utils";
import { Menu, X, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { ThemeToggle } from "./ThemeToggle";
import anime from "animejs";

const navItems = [
  { name: "Projects", href: "/#projects" },
  { name: "Hackathons", href: "/#hackathons" },
  { name: "Certifications", href: "/#certifications" },
  { name: "Skills", href: "/#skills" },
  { name: "Process", href: "/#process" },
  { name: "Experience", href: "/#experience" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef(null);

  // Removed entrance animation as per user request

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
    // Subtle click feedback instead of bouncy scale
    anime({
      targets: e.currentTarget,
      opacity: [1, 0.7, 1],
      duration: 300,
      easing: "easeInOutQuad",
    });
  };

  const handleNavHover = (e, enter) => {
    // Only animate underline if NOT active
    const underline = e.currentTarget.querySelector(".nav-underline");
    if (!e.currentTarget.classList.contains("active-nav-item")) {
      if (enter) {
        anime({
          targets: underline,
          scaleX: [0, 1],
          duration: 300,
          easing: "easeOutExpo",
        });
      } else {
        anime({
          targets: underline,
          scaleX: [1, 0],
          duration: 200,
          easing: "easeInExpo",
        });
      }
    }
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        // Glossy glass morphism effect - always visible when scrolling
        isScrolled
          ? "py-2 bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-lg shadow-black/20"
          : "py-3 bg-background/70 border-b border-border/50 backdrop-blur-md md:backdrop-blur-xl shadow-lg shadow-black/10"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a
          className="nav-logo text-lg sm:text-xl font-bold flex items-center gap-2 group"
          href="#hero"
        >
          <div className="relative flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-500 absolute -top-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: "scale(0.6)" }} />
            <span className="text-foreground">Marwin John</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400 font-black">
              Gonzales
            </span>
          </div>
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
                  "nav-item relative px-4 py-2 rounded-full font-medium transition-all duration-300",
                  isActive ? "text-red-500 active-nav-item" : "text-foreground/70 hover:text-foreground"
                )}
              >
                {item.name}
                {/* Underline logic: Visible if active, or handled by hover animation */}
                <span
                  className={cn(
                    "nav-underline absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-3/4 rounded-full",
                    "bg-red-500",
                    "origin-center transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </a>
            );
          })}

          {/* Theme Toggle with animation */}
          <div className="nav-item ml-4">
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground shadow-lg shadow-black/30 backdrop-blur-md active:scale-95 transition-all duration-200"
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
