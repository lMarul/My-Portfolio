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
import { UltimateBackground } from "./components/UltimateBackground";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden">
      <CustomCursor />
      <UltimateBackground />
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
