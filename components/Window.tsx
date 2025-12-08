import React, { useRef, useState, useEffect } from 'react';
import { X, Minus, Move, ExternalLink } from 'lucide-react';
import { Project, WindowState } from '../types';

interface WindowProps {
  windowState: WindowState;
  project: Project;
  isActive: boolean;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onUpdate: (id: string, newState: Partial<WindowState>) => void;
}

export const Window: React.FC<WindowProps> = ({
  windowState,
  project,
  isActive,
  onClose,
  onFocus,
  onUpdate,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Handle Drag Start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only drag if clicking the header
    const target = e.target as HTMLElement;
    if (target.closest('.window-controls')) return; // Don't drag if clicking buttons

    onFocus(windowState.id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - windowState.x,
      y: e.clientY - windowState.y,
    });
    e.preventDefault();
  };

  // Global Drag Events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      onUpdate(windowState.id, {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onUpdate, windowState.id]);

  // Handle Resize using native CSS resize but updating state after
  const handleMouseUpAfterResize = () => {
    if (windowRef.current) {
      onUpdate(windowState.id, {
        width: windowRef.current.offsetWidth,
        height: windowRef.current.offsetHeight,
      });
    }
  };

  if (windowState.isMinimized) {
    return null; // Handle minimized state in a taskbar if we had one, or just hide for now
  }

  return (
    <div
      ref={windowRef}
      className={`fixed flex flex-col bg-white border border-black shadow-none overflow-hidden
        ${isActive ? 'z-50' : ''}`}
      style={{
        left: windowState.x,
        top: windowState.y,
        width: windowState.width,
        height: windowState.height,
        zIndex: windowState.zIndex,
        resize: 'both',
        minWidth: '300px',
        minHeight: '200px',
      }}
      onMouseDown={() => onFocus(windowState.id)}
      onMouseUp={handleMouseUpAfterResize}
    >
      {/* Title Bar */}
      <div
        className={`h-8 border-b border-black flex items-center justify-between px-2 cursor-grab active:cursor-grabbing select-none
          ${isActive ? 'bg-black text-white' : 'bg-white text-black'}`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-mono text-xs uppercase tracking-wider truncate max-w-[200px]">
            {project.client} / {project.title}
          </span>
        </div>
        <div className="flex items-center gap-2 window-controls">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // In a real OS, this would minimize to a dock. 
              // For this demo, we'll just close it or implement simple hide logic if needed.
              // Let's treat it as close for simplicity or add minimize logic later.
              onUpdate(windowState.id, { isMinimized: !windowState.isMinimized }); 
            }}
            className="hover:opacity-50"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(windowState.id);
            }}
            className="hover:opacity-50"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-0 scrollbar-hide">
        {/* Media Area */}
        <div className="w-full bg-gray-100 relative group aspect-video border-b border-black">
          <img 
            src={project.thumbnailUrl} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale contrast-125"
          />
           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
             {/* Play button simulation */}
             <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
               <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
             </div>
           </div>
        </div>

        {/* Info Area */}
        <div className="p-4 font-mono space-y-6">
          
          <div>
            <h2 className="text-2xl font-bold uppercase leading-none tracking-tight">{project.title}</h2>
            <p className="text-xs uppercase text-gray-500 mt-1">{project.type} — {project.client}</p>
          </div>

          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {project.description}
          </div>

          {/* Credits */}
          <div className="space-y-1 pt-4 border-t border-gray-200">
             {project.credits.map((credit, i) => (
               <div key={i} className="text-xs text-gray-500 uppercase">{credit}</div>
             ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.links.map((link, i) => (
              <a 
                key={i} 
                href={link.url}
                className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-xs uppercase hover:bg-gray-800 transition-colors"
              >
                {link.label} <ExternalLink size={10} />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Resizer hint (visual only, actual resize is CSS) */}
      <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize flex items-end justify-end p-0.5 pointer-events-none">
        <div className="w-1.5 h-1.5 border-r border-b border-black"></div>
      </div>
    </div>
  );
};
