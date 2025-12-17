// App.tsx
import React, { useState, useCallback, useMemo } from "react";
import { Logo } from "./components/Logo";
import { Window } from "./components/Window";
import {
  PROJECTS,
  INITIAL_WINDOW_WIDTH,
  INITIAL_WINDOW_HEIGHT,
} from "./constants";
import type { WindowState } from "./types";

type Section = "records" | "management" | "publishing";

const SECTION_MAP: Record<Section, string[]> = {
  records: ["Zulan", "Scarlett Loran"],
  management: ["Fred Again..", "Skye Newman"],
  publishing: ["Wraith9"],
};

function App() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [topZIndex, setTopZIndex] = useState(10);
  const [activeSection, setActiveSection] = useState<Section | null>(null);

  const openWindow = useCallback(
    (projectId: string) => {
      setTopZIndex((prev) => prev + 1);

      setWindows((prev) => {
        const existing = prev.find((w) => w.projectId === projectId);
        if (existing) {
          return prev.map((w) =>
            w.id === existing.id
              ? { ...w, zIndex: topZIndex + 1, isMinimized: false }
              : w
          );
        }

        const offset = prev.length * 20;
        const isMobile = window.innerWidth < 768;

        const newWindow: WindowState = {
          id: `win_${Date.now()}`,
          projectId,
          x: isMobile ? 10 : 100 + offset,
          y: isMobile ? 80 : 100 + offset,
          width: isMobile ? window.innerWidth - 20 : INITIAL_WINDOW_WIDTH,
          height: isMobile ? window.innerHeight - 200 : INITIAL_WINDOW_HEIGHT,
          zIndex: topZIndex + 1,
          isMinimized: false,
        };

        return [...prev, newWindow];
      });
    },
    [topZIndex]
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setTopZIndex((prev) => {
      const newZ = prev + 1;
      setWindows((curr) =>
        curr.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w))
      );
      return newZ;
    });
  }, []);

  const updateWindow = useCallback(
    (id: string, newState: Partial<WindowState>) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, ...newState } : w))
      );
    },
    []
  );

  const toggleDock = (projectId: string) => {
    const openWin = windows.find((w) => w.projectId === projectId);
    if (openWin) {
      if (openWin.isMinimized) {
        updateWindow(openWin.id, { isMinimized: false });
        focusWindow(openWin.id);
      } else {
        focusWindow(openWin.id);
      }
    } else {
      openWindow(projectId);
    }
  };

  const toggleSection = (section: Section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const visibleProjects = useMemo(() => {
    if (!activeSection) return PROJECTS;
    const allowed = SECTION_MAP[activeSection];
    return PROJECTS.filter((p) => allowed.includes(p.client));
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans relative overflow-hidden flex flex-col">
      {/* HEADER */}
      <header className="flex-none pt-12 pb-6 flex flex-col items-center justify-center z-10 relative">
        <Logo />
        <nav className="mt-4 flex gap-6 text-xs font-mono uppercase tracking-widest">
          {(["records", "publishing", "management"] as Section[]).map(
            (section) => (
              <button
                key={section}
                onClick={() => toggleSection(section)}
                className={`transition-all ${
                  activeSection === section
                    ? "text-black underline"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {section}
              </button>
            )
          )}
        </nav>
      </header>

      {/* MAIN STRIP */}
      <main className="flex-1 flex items-center justify-center w-full px-4 relative">
        <div className="w-full max-w-[1400px] h-[55vh] flex items-center justify-center">
          <div className="flex h-full overflow-hidden justify-center">
            {visibleProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => toggleDock(project.id)}
                className="group relative flex-none w-[20vw] md:w-32 h-full hover:bg-black transition-colors"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.sliceImageUrl || project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    style={{ objectPosition: "center", filter: "contrast(1.05) saturate(0.95)" }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white font-mono font-bold text-sm md:text-xl uppercase tracking-[0.2em] -rotate-90 whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                    {project.client}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex-none pb-8 pt-6 flex justify-center text-xs font-mono uppercase tracking-widest">
        <nav className="flex gap-6">
          <a
            href="#"
            className="text-gray-500 hover:text-black hover:line-through transition-all"
          >
            about
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-black hover:line-through transition-all"
          >
            contact
          </a>
        </nav>
      </footer>

      {/* WINDOWS LAYER */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {windows.map((win) => {
          const proj = PROJECTS.find((p) => p.id === win.projectId);
          if (!proj) return null;
          return (
            <div key={win.id} className="pointer-events-auto">
              <Window
                windowState={win}
                project={proj}
                isActive={win.zIndex === topZIndex}
                onClose={closeWindow}
                onFocus={focusWindow}
                onUpdate={updateWindow}
              />
            </div>
          );
        })}
      </div>

      {/* MINIMIZED DOCK */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2 pointer-events-auto">
        {windows
          .filter((w) => w.isMinimized)
          .map((w) => {
            const proj = PROJECTS.find((p) => p.id === w.projectId);
            return (
              <button
                key={w.id}
                onClick={() => updateWindow(w.id, { isMinimized: false })}
                className="h-8 px-3 bg-white border border-black shadow-sm font-mono text-xs uppercase flex items-center hover:bg-black hover:text-white transition-colors"
              >
                {(proj?.title || "Project").substring(0, 3)}...
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default App;
