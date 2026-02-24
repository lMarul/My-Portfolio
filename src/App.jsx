import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { HackathonArchive } from "./components/hackathon";
import { AllProjects } from "./pages/AllProjects";
import { AllExperiences } from "./pages/AllExperiences";
import { AllCertifications } from "./pages/AllCertifications";

import { Navbar } from "./components/Navbar";
import { CustomCursor } from "./components/CustomCursor";
import ParticleBackground from "./components/ParticleBackground";

import { ParticleExplosion } from "./components/BeyondComponents";
import { BeyondLoadingScreen } from "./components/BeyondLoadingScreen";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden animate-in fade-in duration-1000">
      <ParticleExplosion />
      <CustomCursor />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticleBackground
          particleColors={["#dc2626", "#ef4444", "#f87171"]}
          particleCount={300}
          particleSpread={15}
          speed={0.15}
          particleBaseSize={120}
          moveParticlesOnHover={true}
          particleHoverFactor={2}
          alphaParticles={true}
          disableRotation={false}
          pixelRatio={window.devicePixelRatio || 1}
        />
      </div>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/hackathons" element={<HackathonArchive />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/experience" element={<AllExperiences />} />
          <Route path="/certifications" element={<AllCertifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
