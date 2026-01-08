// App.tsx
import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Logo } from "./components/Logo";
import { Window } from "./components/Window";
import {
  PROJECTS,
  INITIAL_WINDOW_WIDTH,
  INITIAL_WINDOW_HEIGHT,
} from "./constants";
import type { WindowState, Project, Division } from "./types";

const FRIDAY_2026_INTRO_ID = "friday-2026-intro";
const FRIDAY_2026_ID = "friday-2026";
const PLAN_WINDOW_ID = "friday-plan";
type FridayListItem = {
  id: string;
  label: string;
  isFriday: boolean;
};

const Friday2026IntroContent: React.FC<{ onContinue: () => void }> = ({
  onContinue,
}) => {
  const title = "FRIDAY 2026";
  const subtitle = "A&R   Marketing   Tech";
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedTitle(title.slice(0, index + 1));
      index += 1;
      if (index === title.length) {
        clearInterval(interval);
        setShowSubtitle(true);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showSubtitle) return;
    let index = 0;
    const interval = setInterval(() => {
      setTypedSubtitle(subtitle.slice(0, index + 1));
      index += 1;
      if (index === subtitle.length) {
        clearInterval(interval);
        setTimeout(() => setShowContinue(true), 400);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [showSubtitle]);

  useEffect(() => {
    const blink = setInterval(() => {
      setShowCaret((prev) => !prev);
    }, 400);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="h-full bg-white flex flex-col items-center justify-center font-mono text-center gap-10">
      <div className="space-y-4">
        <div
          className="text-5xl uppercase tracking-tight"
          style={{
            fontFamily: "'Bourbon St Bold', 'Arial Black', sans-serif",
            fontWeight: "bold",
          }}
        >
          {typedTitle}
          <span className="inline-block w-1">
            {showCaret && typedSubtitle.length === 0 ? "|" : "\u00A0"}
          </span>
        </div>
        <div className="text-sm uppercase tracking-[0.6em] text-gray-500 transition-opacity duration-300">
          {typedSubtitle}
        </div>
      </div>
      <button
        type="button"
        onClick={onContinue}
        aria-label="Open Friday 2026 Lists"
        className={`inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-600 cursor-pointer transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-[#FDFDFD] hover:scale-110 hover:shadow-[0_0_8px_rgba(239,68,68,0.7)] ${
          showContinue ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span className="sr-only">Continue</span>
      </button>
    </div>
  );
};

const Friday2026Content: React.FC<{ onOpenPlan: () => void }> = ({
  onOpenPlan,
}) => {
  const [highlightMode, setHighlightMode] = useState(false);
  const [anrItems] = useState<FridayListItem[]>([
    { id: "anr-tt-views", label: "TikTok views", isFriday: false },
    { id: "anr-tt-followers", label: "TikTok follower growth", isFriday: false },
    { id: "anr-tt-sound", label: "TikTok sound usage", isFriday: false },
    { id: "anr-tt-engagement", label: "TikTok engagement rate", isFriday: true },
    { id: "anr-ig-views", label: "Instagram views", isFriday: false },
    { id: "anr-ig-followers", label: "Instagram follower growth", isFriday: false },
    { id: "anr-ig-sound", label: "Instagram sound usage", isFriday: false },
    { id: "anr-ig-engagement", label: "Instagram engagement rate", isFriday: false },
    { id: "total-fg", label: "Cross-platform follower growth", isFriday: true },
    { id: "anr-yt-views", label: "YouTube Shorts views", isFriday: false },
    { id: "anr-yt-followers", label: "YouTube Shorts follower growth", isFriday: false },
    { id: "anr-yt-sound", label: "YouTube Shorts sound usage", isFriday: false },
    { id: "anr-yt-engagement", label: "YouTube Shorts engagement rate", isFriday: false },
    { id: "anr-spotify-listeners", label: "Spotify monthly listeners", isFriday: false },
    { id: "anr-spotify-streams", label: "Spotify streams", isFriday: false },
    { id: "anr-spotify-growth", label: "Spotify monthly listeners growth rate", isFriday: false },
    { id: "anr-sc-streams", label: "SoundCloud streams", isFriday: false },
    { id: "anr-sc-followers", label: "SoundCloud followers", isFriday: false },
    { id: "anr-sc-followers-growth", label: "SoundCloud follower growth", isFriday: false },
    { id: "anr-sc-likes", label: "SoundCloud likes", isFriday: false },
    { id: "anr-sc-comments", label: "SoundCloud comments", isFriday: false },
    { id: "anr-occ-entries", label: "OCC entries", isFriday: false },
    { id: "anr-occ-growth", label: "OCC growth", isFriday: false },
    { id: "anr-occ-downloads", label: "OCC downloads", isFriday: false },
    { id: "anr-occ-views", label: "OCC views", isFriday: false },
    { id: "anr-occ-units", label: "OCC units", isFriday: false },
  ]);
  const [marketingItems] = useState<FridayListItem[]>([
    { id: "mkt-tableau", label: "Tableau", isFriday: false },
    { id: "mkt-looker", label: "Looker Studio", isFriday: false },
    { id: "mkt-gds", label: "Google Data Studio", isFriday: false },
    { id: "mkt-powerbi", label: "Power BI", isFriday: false },
    { id: "mkt-dashboards", label: "SpotOnTrack", isFriday: false },
    { id: "mkt-cobrand", label: "Co:brand", isFriday: true },
    { id: "mkt-chartmetric", label: "Chartmetric", isFriday: false },
    { id: "mkt-soundcharts", label: "Soundcharts", isFriday: false },
    { id: "mkt-apa", label: "Apple Music for Artists", isFriday: false },
    { id: "mkt-spa", label: "Spotify for Artists", isFriday: false },
    { id: "mkt-release-tools", label: "Sodatone", isFriday: false },
    { id: "mkt-asset-delivery", label: "TrendPop", isFriday: false },
    { id: "mkt-opus", label: "Opus", isFriday: false },
  ]);

  const toggleFridayHighlight = () => {
    setHighlightMode((prev) => !prev);
  };

  const renderList = (items: FridayListItem[]) => (
    <ul className="mt-4 text-sm space-y-2 list-none pl-0">
      {items.map((item) => {
        const colorClass = highlightMode
          ? item.isFriday
            ? "text-green-600"
            : "text-gray-400"
          : "text-gray-700";
        return (
          <li
            key={item.id}
            className={`transition-colors duration-200 ${colorClass}`}
            data-is-friday={item.isFriday}
          >
            {item.label}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="h-full bg-white p-6 font-mono flex flex-col gap-6">
      <div className="flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={toggleFridayHighlight}
          className={`border border-black px-3 py-1 text-xs uppercase tracking-[0.2em] transition-colors ${
            highlightMode
              ? "bg-black text-white"
              : "bg-transparent text-black hover:bg-black hover:text-white"
          }`}
        >
          {highlightMode ? "Show Full Set" : "Friday"}
        </button>
        <button
          type="button"
          onClick={onOpenPlan}
          className="border border-black px-3 py-1 text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
        >
          Plan
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <div className="flex flex-col">
          <h2 className="text-lg uppercase font-bold tracking-[0.3em]">
            A&amp;R
          </h2>
          {renderList(anrItems)}
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg uppercase font-bold tracking-[0.3em]">
            Marketing
          </h2>
          {renderList(marketingItems)}
        </div>
      </div>
    </div>
  );
};

const PlanContent: React.FC = () => {
  return (
    <div className="h-full bg-white p-8 font-mono flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
              Phase 1
            </p>
            <h3 className="text-2xl uppercase font-bold tracking-[0.3em]">
              A&amp;R
            </h3>
            <div className="mt-4 text-sm text-gray-800 space-y-2">
              <p>TikTok tracker</p>
              <p>UMG platform</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl uppercase font-bold tracking-[0.3em]">
              Marketing
            </h3>
            <div className="mt-4 text-sm text-gray-800 space-y-2">
              <div>
                <p className="uppercase text-xs text-gray-500 tracking-[0.4em]">
                  Narrative
                </p>
                <p>Chaotic good</p>
                <p>Typing</p>
                <p>Create the culture etc..</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
              Phase 2
            </p>
            <h3 className="text-2xl uppercase font-bold tracking-[0.3em]">
              A&amp;R
            </h3>
            <div className="mt-4 text-sm text-gray-800 space-y-2">
              <p>Artist whitelist</p>
              <p>SoundCloud first listeners</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl uppercase font-bold tracking-[0.3em]">
              Marketing
            </h3>
            <div className="mt-4 text-sm text-gray-800 space-y-2">
              <p>Cobrand</p>
              <p>Audiosalad</p>
            </div>
          </div>
        </div>
        <div className="space-y-4 opacity-50">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
              Phase 3
            </p>
            <h3 className="text-2xl uppercase font-bold tracking-[0.3em]">
              A&amp;R
            </h3>
            <div className="mt-4 text-sm text-gray-700 space-y-2">
              <p>Publishing intelligence</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl uppercase font-bold tracking-[0.3em]">
              Marketing
            </h3>
            <div className="mt-4 text-sm text-gray-700 space-y-2">
              <p>Scraping</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type SliceButtonProps = {
  project: Project;
  index: number;
  total: number;
  draftMode: 1 | 2 | 3;
  onClick: () => void;
  expandedProjectId: string | null;
  onExpandChange: (projectId: string | null) => void;
};

const SliceButton: React.FC<SliceButtonProps> = ({
  project,
  index,
  total,
  draftMode,
  onClick,
  expandedProjectId,
  onExpandChange,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoInstanceKey, setVideoInstanceKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sliceImageSrc = project.sliceImageUrl ?? project.thumbnailUrl;
  const shouldShowMedia = draftMode !== 3;
  const hasHoverVideo = Boolean(project.hoverVideoUrl) && shouldShowMedia;
  const isExpanded = expandedProjectId === project.id;
  const isAnyExpanded = expandedProjectId !== null;
  const flexGrow = isAnyExpanded ? (isExpanded ? 1.8 : 0.75) : 1;

  const setRandomStartTime = useCallback((video: HTMLVideoElement) => {
    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;
    const maxStart = Math.max(0, duration - 8);
    const randomTime = Math.random() * maxStart;
    video.currentTime = randomTime;
  }, []);

  const handleMouseEnter = () => {
    if (!hasHoverVideo) {
      setShowVideo(false);
      return;
    }
    onExpandChange(project.id);
    setVideoInstanceKey((prev) => prev + 1);
    setShowVideo(true);
  };

  const handleMouseLeave = () => {
    setShowVideo(false);
    if (expandedProjectId === project.id) {
      onExpandChange(null);
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setRandomStartTime(videoRef.current);
    const playPromise = videoRef.current.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {
        setShowVideo(false);
        if (expandedProjectId === project.id) {
          onExpandChange(null);
        }
      });
    }
  };

  const handleVideoError = () => {
    setShowVideo(false);
    if (expandedProjectId === project.id) {
      onExpandChange(null);
    }
  };

  useEffect(() => {
    if (!shouldShowMedia) {
      setShowVideo(false);
      if (expandedProjectId === project.id) {
        onExpandChange(null);
      }
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [shouldShowMedia, expandedProjectId, onExpandChange, project.id]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative h-full transition-colors ${
        draftMode === 3 ? "" : "hover:bg-black"
      }`}
      style={{
        borderRight:
          draftMode === 3 && index !== total - 1
            ? "1px solid rgba(0,0,0,0.2)"
            : undefined,
        flex: `${flexGrow} 1 16rem`,
        transition: "flex 0.3s ease",
        minWidth: "120px",
        maxWidth: draftMode === 3 ? undefined : "480px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {shouldShowMedia && (
        <div className="absolute inset-0 overflow-hidden">
          {showVideo && project.hoverVideoUrl ? (
            <video
              key={`${project.id}-${videoInstanceKey}`}
              ref={videoRef}
              src={project.hoverVideoUrl}
              muted
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              style={{
                objectPosition: "center",
                filter: "contrast(1.05) saturate(0.95)",
              }}
              onLoadedMetadata={handleLoadedMetadata}
              onError={handleVideoError}
            />
          ) : (
            <img
              src={sliceImageSrc}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              style={{
                objectPosition: "center",
                filter: "contrast(1.05) saturate(0.95)",
              }}
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
        </div>
      )}
      {draftMode === 1 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white font-mono font-bold text-sm md:text-xl uppercase tracking-[0.2em] -rotate-90 whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {project.client}
          </span>
        </div>
      )}
      {draftMode === 3 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-black font-mono font-bold text-sm md:text-xl uppercase tracking-[0.2em] -rotate-90 whitespace-nowrap">
            {project.client}
          </span>
        </div>
      )}
    </button>
  );
};


function App() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [topZIndex, setTopZIndex] = useState(10);
  const [draftMode, setDraftMode] = useState<1 | 2 | 3>(2);
  const [activeDivision, setActiveDivision] = useState<Division | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(
    null
  );
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const divisionTabs: Division[] = ["records", "publishing", "management"];

  const closeWindowsByProjectId = useCallback((projectId: string) => {
    setWindows((prev) => prev.filter((w) => w.projectId !== projectId));
  }, []);

  const openWindow = useCallback(
    (projectId: string) => {
      setTopZIndex((prev) => prev + 1);

      setWindows((prev) => {
        const existing = prev.find((w) => w.projectId === projectId);
        if (existing) {
          setActiveWindowId(existing.id);
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
        setActiveWindowId(newWindow.id);
        return [...prev, newWindow];
      });
    },
    [topZIndex]
  );

  const openFriday2026Window = useCallback(() => {
    const projectId = FRIDAY_2026_ID;
    setTopZIndex((prev) => prev + 1);

    setWindows((prev) => {
      const existing = prev.find((w) => w.projectId === projectId);
      if (existing) {
        setActiveWindowId(existing.id);
        return prev.map((w) =>
          w.id === existing.id
            ? { ...w, zIndex: topZIndex + 1, isMinimized: false }
            : w
        );
      }

      const viewportWidth =
        typeof window !== "undefined" ? window.innerWidth : INITIAL_WINDOW_WIDTH;
      const viewportHeight =
        typeof window !== "undefined"
          ? window.innerHeight
          : INITIAL_WINDOW_HEIGHT;

      const width = Math.min(viewportWidth * 0.78, viewportWidth - 40);
      const height = Math.min(viewportHeight * 0.6, viewportHeight - 80);
      const x = (viewportWidth - width) / 2 + 20;
      const y = (viewportHeight - height) / 2 + 10;

      const newWindow: WindowState = {
        id: `${FRIDAY_2026_ID}-window`,
        projectId,
        x,
        y,
        width,
        height,
        zIndex: topZIndex + 1,
        isMinimized: false,
      };
      setActiveWindowId(newWindow.id);
      return [...prev, newWindow];
    });
  }, [topZIndex]);

  const openPlanWindow = useCallback(() => {
    const projectId = PLAN_WINDOW_ID;
    setTopZIndex((prev) => prev + 1);

    setWindows((prev) => {
      const existing = prev.find((w) => w.projectId === projectId);
      if (existing) {
        setActiveWindowId(existing.id);
        return prev.map((w) =>
          w.id === existing.id
            ? { ...w, zIndex: topZIndex + 1, isMinimized: false }
            : w
        );
      }

      const viewportWidth =
        typeof window !== "undefined" ? window.innerWidth : INITIAL_WINDOW_WIDTH;
      const viewportHeight =
        typeof window !== "undefined"
          ? window.innerHeight
          : INITIAL_WINDOW_HEIGHT;

      const width = Math.min(viewportWidth * 0.8, viewportWidth - 40);
      const height = Math.min(viewportHeight * 0.6, viewportHeight - 80);
      const x = (viewportWidth - width) / 2 + 10;
      const y = (viewportHeight - height) / 2 + 20;

      const newWindow: WindowState = {
        id: `${PLAN_WINDOW_ID}-window`,
        projectId,
        x,
        y,
        width,
        height,
        zIndex: topZIndex + 1,
        isMinimized: false,
      };
      setActiveWindowId(newWindow.id);
      return [...prev, newWindow];
    });
  }, [topZIndex]);

  const openFriday2026IntroWindow = useCallback(() => {
    const projectId = FRIDAY_2026_INTRO_ID;
    setTopZIndex((prev) => prev + 1);

    setWindows((prev) => {
      const existing = prev.find((w) => w.projectId === projectId);
      if (existing) {
        setActiveWindowId(existing.id);
        return prev.map((w) =>
          w.id === existing.id
            ? { ...w, zIndex: topZIndex + 1, isMinimized: false }
            : w
        );
      }

      const viewportWidth =
        typeof window !== "undefined" ? window.innerWidth : INITIAL_WINDOW_WIDTH;
      const viewportHeight =
        typeof window !== "undefined"
          ? window.innerHeight
          : INITIAL_WINDOW_HEIGHT;

      const width = Math.min(viewportWidth * 0.75, viewportWidth - 40);
      const height = Math.min(viewportHeight * 0.5, viewportHeight - 80);
      const x = (viewportWidth - width) / 2;
      const y = (viewportHeight - height) / 2 - 30;

      const newWindow: WindowState = {
        id: `${FRIDAY_2026_INTRO_ID}-window`,
        projectId,
        x,
        y,
        width,
        height,
        zIndex: topZIndex + 1,
        isMinimized: false,
      };
      setActiveWindowId(newWindow.id);
      return [...prev, newWindow];
    });
  }, [topZIndex]);

  const handleIntroContinue = useCallback(() => {
    openFriday2026Window();
    closeWindowsByProjectId(FRIDAY_2026_INTRO_ID);
  }, [openFriday2026Window, closeWindowsByProjectId]);

  const cycleDraftMode = useCallback(() => {
    setDraftMode((prev) => {
      if (prev === 3) return 1;
      return (prev + 1) as 1 | 2 | 3;
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindowId((prev) => (prev === id ? null : prev));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setTopZIndex((prev) => {
      const newZ = prev + 1;
      setWindows((curr) =>
        curr.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w))
      );
      return newZ;
    });
    setActiveWindowId(id);
  }, []);

  const updateWindow = useCallback(
    (id: string, newState: Partial<WindowState>) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, ...newState } : w))
      );
      if (newState.isMinimized) {
        setActiveWindowId((prev) => (prev === id ? null : prev));
      }
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

  const friday2026Project = useMemo<Project>(
    () => ({
      id: FRIDAY_2026_ID,
      client: "FRIDAY",
      title: "Friday 2026",
      thumbnailUrl: "",
      division: "management",
      customContent: <Friday2026Content onOpenPlan={openPlanWindow} />,
    }),
    [openPlanWindow]
  );

  const introProject = useMemo<Project>(
    () => ({
      id: FRIDAY_2026_INTRO_ID,
      client: "FRIDAY",
      title: "",
      thumbnailUrl: "",
      division: "management",
      customContent: <Friday2026IntroContent onContinue={handleIntroContinue} />,
    }),
    [handleIntroContinue]
  );

  const planProject = useMemo<Project>(
    () => ({
      id: PLAN_WINDOW_ID,
      client: "FRIDAY",
      title: "Plan",
      thumbnailUrl: "",
      division: "management",
      customContent: <PlanContent />,
    }),
    []
  );

  const visibleProjects = PROJECTS;

  const getProjectById = useCallback(
    (projectId: string) => {
      if (projectId === FRIDAY_2026_INTRO_ID) {
        return introProject;
      }
      if (projectId === FRIDAY_2026_ID) {
        return friday2026Project;
      }
      if (projectId === PLAN_WINDOW_ID) {
        return planProject;
      }
      return PROJECTS.find((p) => p.id === projectId);
    },
    [introProject, friday2026Project, planProject]
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans relative overflow-hidden flex flex-col">
      {/* HEADER */}
      <header className="flex-none pt-12 pb-6 flex flex-col items-center justify-center z-10 relative">
        <Logo />
        <div className="mt-6 flex gap-8 text-xs font-mono uppercase tracking-[0.5em] text-gray-500">
          {divisionTabs.map((division) => (
            <span key={division} className="pb-1 select-none">
              {division}
            </span>
          ))}
        </div>
      </header>

      {/* MAIN STRIP */}
      <main className="flex-1 flex items-center justify-center w-full px-4 relative">
        <div className="w-full max-w-[1400px] h-[55vh] flex items-center justify-center">
          <div className="flex h-full overflow-hidden justify-center">
            {visibleProjects.map((project, index) => (
              <SliceButton
                key={project.id}
                project={project}
                index={index}
                total={visibleProjects.length}
                draftMode={draftMode}
                onClick={() => toggleDock(project.id)}
                expandedProjectId={expandedProjectId}
                onExpandChange={setExpandedProjectId}
              />
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex-none pb-8 pt-6 flex justify-center text-xs font-mono uppercase tracking-widest">
        <nav className="flex items-center gap-6">
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
          const proj = getProjectById(win.projectId);
          if (!proj) return null;
          return (
            <div key={win.id} className="pointer-events-auto">
              <Window
                windowState={win}
                project={proj}
                isActive={win.zIndex === topZIndex}
                shouldPlay={!win.isMinimized && win.id === activeWindowId}
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
            const proj = getProjectById(w.projectId);
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
