import React, { useState, useCallback } from 'react';
import { Logo } from './components/Logo';
import { Clock } from './components/Clock';
import { Window } from './components/Window';
import { PROJECTS, INITIAL_WINDOW_WIDTH, INITIAL_WINDOW_HEIGHT } from './constants';
import { WindowState } from './types';

function App() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [topZIndex, setTopZIndex] = useState(10);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]); // Track IDs of minimized windows

  const openWindow = useCallback((projectId: string) => {
    setTopZIndex((prev) => prev + 1);
    
    setWindows((prev) => {
      // Check if window already exists
      const existing = prev.find(w => w.projectId === projectId);
      if (existing) {
        // Just bring to front and un-minimize
        const newWindows = prev.map(w => 
          w.id === existing.id 
            ? { ...w, zIndex: topZIndex + 1, isMinimized: false } 
            : w
        );
        return newWindows;
      }

      // Create new window with random offset for "organic" feel
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
  }, [topZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setTopZIndex((prev) => {
      const newZ = prev + 1;
      setWindows((currWindows) => 
        currWindows.map((w) => w.id === id ? { ...w, zIndex: newZ } : w)
      );
      return newZ;
    });
  }, []);

  const updateWindow = useCallback((id: string, newState: Partial<WindowState>) => {
    setWindows((prev) => 
      prev.map((w) => w.id === id ? { ...w, ...newState } : w)
    );
  }, []);

  const toggleDock = (projectId: string) => {
     // If a window is open for this project, find it
     const openWin = windows.find(w => w.projectId === projectId);
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

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans relative overflow-hidden flex flex-col">
      
      {/* HEADER */}
      <header className="flex-none pt-12 pb-8 flex flex-col items-center justify-center z-10 relative pointer-events-none">
        <div className="pointer-events-auto">
          <Logo />
        </div>
        <Clock />
      </header>

      {/* MAIN STRIP LAYOUT (Supreme Style) */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 md:px-0 relative z-0">
        
        {/* The Strip */}
        <div className="w-full max-w-[1400px] h-[50vh] md:h-[60vh] flex items-center justify-center">
          <div className="flex h-full overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide justify-start md:justify-center bg-transparent">
            {PROJECTS.map((project) => (
              <button
                key={project.id}
                onClick={() => toggleDock(project.id)}
                className="group relative flex-none w-[20vw] md:w-32 h-full snap-center focus:outline-none transition-all duration-300 border-r border-black last:border-r-0 hover:bg-black"
              >
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  
                  {/* Overlay Artist Name */}
                   <span className="text-black group-hover:text-white font-mono font-bold text-sm md:text-xl uppercase tracking-[0.2em] -rotate-90 whitespace-nowrap transition-colors">
                     {project.client}
                   </span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="flex-none pb-8 flex flex-col items-center justify-end z-10 text-xs font-mono uppercase tracking-widest gap-8 pointer-events-none">
        {/* Links */}
        <nav className="flex gap-6 pointer-events-auto">
           {['records', 'publishing', 'management', 'artists', 'about'].map(link => (
             <a key={link} href="#" className="hover:line-through transition-all text-gray-500 hover:text-black">
               {link}
             </a>
           ))}
        </nav>
      </footer>

      {/* WINDOWS LAYER */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {windows.map((win) => {
          const proj = PROJECTS.find(p => p.id === win.projectId);
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
      
      {/* Minimized Windows Dock (Optional visual indicator for minimized items) */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2 pointer-events-auto">
         {windows.filter(w => w.isMinimized).map(w => {
           const proj = PROJECTS.find(p => p.id === w.projectId);
           return (
             <button 
               key={w.id}
               onClick={() => updateWindow(w.id, { isMinimized: false })}
               className="h-8 px-3 bg-white border border-black shadow-sm font-mono text-xs uppercase flex items-center hover:bg-black hover:text-white transition-colors"
             >
               {proj?.title.substring(0, 3)}...
             </button>
           )
         })}
      </div>

    </div>
  );
}

export default App;