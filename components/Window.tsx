import React, { useRef, useState, useEffect } from 'react';
import { X, Minus } from 'lucide-react';
import { Project, WindowState } from '../types';

interface WindowProps {
  windowState: WindowState;
  project: Project;
  isActive: boolean;
  shouldPlay: boolean;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onUpdate: (id: string, newState: Partial<WindowState>) => void;
}

export const Window: React.FC<WindowProps> = ({
  windowState,
  project,
  isActive,
  shouldPlay,
  onClose,
  onFocus,
  onUpdate,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const hasCustomContent = Boolean(project.customContent);
  const divisionLabel = project.division?.toUpperCase() ?? '';

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

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (shouldPlay) {
      const result = vid.play();
      if (result && typeof result.catch === 'function') {
        result.catch(() => {});
      }
    } else {
      vid.pause();
    }
  }, [shouldPlay]);

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
            {project.windowTitle ?? project.title ?? project.client}
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
        {hasCustomContent ? (
          <div className="h-full">{project.customContent}</div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="w-full bg-black relative aspect-video border-b border-black overflow-hidden">
              {project.hoverVideoUrl ? (
                <video
                  key={project.hoverVideoUrl}
                  ref={videoRef}
                  src={project.hoverVideoUrl}
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-mono text-xs uppercase tracking-[0.5em]">
                  {project.videoErrorMessage || 'Video coming soon'}
                </div>
              )}
            </div>
            <div className="p-4 font-mono text-xs uppercase tracking-[0.6em] text-gray-700">
              {divisionLabel}
            </div>
          </div>
        )}
      </div>
      
      {/* Resizer hint (visual only, actual resize is CSS) */}
      <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize flex items-end justify-end p-0.5 pointer-events-none">
        <div className="w-1.5 h-1.5 border-r border-b border-black"></div>
      </div>
    </div>
  );
};
