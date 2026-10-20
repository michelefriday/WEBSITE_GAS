import type { Project } from "./types";

export const INITIAL_WINDOW_WIDTH = 600;
export const INITIAL_WINDOW_HEIGHT = 500;

export const PROJECTS: Project[] = [
  {
    id: "fred_pacoca7riel",
    title: "USB — PACO CA7RIEL",
    client: "Fred Again..",
    division: "management",
    windowTitle: "Fred Again..",
    thumbnailUrl: "/stills/fred_pacoca7riel.jpg",
    sliceImageUrl: "/stills/fred_pacoca7riel.jpg",
    hoverClips: ["/hover/fred_pacoca7riel.mp4"],
    hoverPreviewUrl: "/preview/fred_pacoca7riel.mp4",
    windowVideoUrl:
      "/hover/fred_pacoca7riel.mp4",
    hoverVideoUrl:
      "/hover/fred_pacoca7riel.mp4",
  },
  {
    id: "fred_latinmafia",
    title: "USB — Latin Mafia",
    client: "Fred Again..",
    division: "management",
    windowTitle: "Fred Again..",
    thumbnailUrl: "/stills/fred_latinmafia.jpg",
    sliceImageUrl: "/stills/fred_latinmafia.jpg",
    hoverClips: ["/hover/fred_latinmafia.mp4"],
    hoverPreviewUrl: "/preview/fred_latinmafia.mp4",
    windowVideoUrl:
      "/hover/fred_latinmafia.mp4",
    hoverVideoUrl:
      "/hover/fred_latinmafia.mp4",
  },
  {
    id: "skye_nostalgia",
    title: "NOSTALGIA",
    client: "Skye Newman",
    division: "management",
    windowTitle: "Skye Newman",
    thumbnailUrl: "/stills/skye_slice.jpg",
    sliceImageUrl: "/stills/skye_slice.jpg",
    hoverClips: ["/hover/skye.mp4"],
    hoverPreviewUrl: "/preview/skye.mp4",
    windowVideoUrl:
      "/hover/skye.mp4",
    hoverVideoUrl:
      "/hover/skye.mp4",
    description:
      "Debut EP exploring themes of memory and digital decay. Shot on 16mm film in Tokyo.",
    credits: ["Director: A. Wong", "Color: Company 3"],
    links: [{ label: "Watch Video", url: "#" }],
  },
  {
    id: "scarlett_velvet",
    title: "VELVET ROPE",
    client: "Scarlett Loran",
    division: "records",
    windowTitle: "Scarlett Loran",
    thumbnailUrl: "/stills/scarlett_slice.jpg",
    sliceImageUrl: "/stills/scarlett_slice.jpg",
    hoverClips: [],
    windowVideoUrl: "",
    embedUrl: "https://untitled.stream/embed/9F1whXKgQF4k",
    videoErrorMessage: "come back later",
    description:
      "The debut visual album from Scarlett Loran. A collection of ethereal soundscapes matched with stark, brutalist imagery.",
    credits: ["Director: K. Hale", "DOP: M. Varg"],
    links: [
      { label: "Watch", url: "#" },
      { label: "Listen", url: "#" },
    ],
  },
  {
    id: "katzpascale",
    title: "KatzPascale",
    client: "KatzPascale",
    division: "publishing",
    windowTitle: "KatzPascale",
    thumbnailUrl: "/stills/kpkpkp.jpg",
    sliceImageUrl: "/stills/kpkpkp.jpg",
    hoverClips: ["/hover/katzpascale.mp4"],
    hoverPreviewUrl: "/preview/katzpascale.mp4",
    windowVideoUrl: "/hover/katzpascale.mp4",
    hoverVideoUrl: "/hover/katzpascale.mp4",
  },
  {
    id: "wraith_esdee",
    title: "ESDEE (4RAWRS)",
    client: "Wraith9",
    division: "publishing",
    windowTitle: "Wraith9",
    thumbnailUrl: "/stills/wraith_drake.png",
    sliceImageUrl: "/stills/wraith_drake.png",
    hoverClips: ["/hover/wraith_drake.mp4"],
    hoverPreviewUrl: "/preview/wraith_drake.mp4",
    windowVideoUrl: "/hover/wraith_drake.mp4",
    hoverVideoUrl: "/hover/wraith_drake.mp4",
  },
  {
    id: "bby_focus",
    title: "Focus Tape",
    client: "bby",
    division: "management",
    windowTitle: "bby",
    thumbnailUrl: "/stills/bby.jpg",
    sliceImageUrl: "/stills/bby.jpg",
    hoverClips: ["/hover/bby.mp4"],
    hoverPreviewUrl: "/preview/bby.mp4",
    windowVideoUrl:
      "/hover/bby.mp4",
    hoverVideoUrl:
      "/hover/bby.mp4",
  },
  {
    id: "benjy_sessions",
    title: "Sessions",
    client: "Benjy",
    division: "management",
    windowTitle: "Benjy",
    thumbnailUrl: "/stills/benjy.jpg",
    sliceImageUrl: "/stills/benjy.jpg",
    hoverClips: ["/hover/benjy.mp4"],
    hoverPreviewUrl: "/preview/benjy.mp4",
    windowVideoUrl:
      "/hover/benjy.mp4",
    hoverVideoUrl:
      "/hover/benjy.mp4",
  },
  {
    id: "rain_storm",
    title: "STORM RIDER",
    client: "RainRadio",
    division: "records",
    windowTitle: "RainRadio",
    thumbnailUrl: "/stills/rain_slice.jpg",
    sliceImageUrl: "/stills/rain_slice.jpg",
    hoverClips: ["/hover/rainradio.mp4"],
    hoverPreviewUrl: "/preview/rainradio.mp4",
    windowVideoUrl:
      "/hover/rainradio.mp4",
    hoverVideoUrl:
      "/hover/rainradio.mp4",
    description:
      "Warehouse vocal edits and late-night transmissions. Rain Radio’s newest 12\" distributed via FRIDAY Records.",
    credits: ["Mix: Rain Radio", "Pressing: FRIDAY Records"],
    links: [{ label: "Watch Visual", url: "https://www.youtube.com/watch?v=z66Eh7_LFag" }],
  },
  {
    id: "contact",
    title: "Contact",
    client: "Contact",
    division: "",
    windowTitle: "Contact",
    hoverClips: [],
    windowVideoUrl: "",
    windowType: "contact",
  },
  {
    id: "ives_missing",
    title: "MISSING",
    client: "Ives",
    division: "records",
    windowTitle: "Ives",
    thumbnailUrl: "/stills/ives.jpg",
    sliceImageUrl: "/stills/ives.jpg",
    hoverClips: [],
    windowVideoUrl: "",
    videoErrorMessage: "coming soon",
  },
];
