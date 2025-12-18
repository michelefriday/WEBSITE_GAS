import type { Project } from "./types";

export const INITIAL_WINDOW_WIDTH = 600;
export const INITIAL_WINDOW_HEIGHT = 500;

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "USB",
    client: "Fred Again..",
    type: "artist",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=1200&auto=format&fit=crop",
    sliceImageUrl: "/stills/fred_slice.jpg",
    videoUrl: "https://www.youtube.com/embed/2yfyPeAEV3A?start=38",
    description:
      "Infinite loop. The ongoing USB project compiling sketches, edits, and collaborations from the road.",
    credits: ["Live Visuals: T. Gander", "Mix: F. Gibson"],
    links: [{ label: "Boiler Room", url: "#" }],
  },
  {
    id: "p2",
    title: "NOSTALGIA",
    client: "Skye Newman",
    type: "artist",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1615234346884-28b971a8f906?q=80&w=1200&auto=format&fit=crop",
    sliceImageUrl: "/stills/skye_slice.jpg",
    videoUrl: "https://www.youtube.com/embed/uLvhpDhqDr8",
    description:
      "Debut EP exploring themes of memory and digital decay. Shot on 16mm film in Tokyo.",
    credits: ["Director: A. Wong", "Color: Company 3"],
    links: [{ label: "Watch Video", url: "#" }],
  },
  {
    id: "p3",
    title: "VELVET ROPE",
    client: "Scarlett Loran",
    type: "artist",
    thumbnailUrl:
      "/stills/scarlett_slice.jpg",
    sliceImageUrl: "/stills/scarlett_slice.jpg",
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
    id: "p4",
    title: "PROTOCOL V",
    client: "Wraith9",
    type: "records",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1594235048794-efa44f92cbe2?q=80&w=1200&auto=format&fit=crop",
    sliceImageUrl: "/stills/wraith_slice.jpg",
    videoUrl: "https://www.youtube.com/embed/PI6-qKhzTt8",
    description:
      "Underground release for the enigmatic producer Wraith9. Heavy industrial techno pressed on 180g clear vinyl.",
    credits: ["Mastering: Berlin Dubplates"],
    links: [{ label: "Buy Vinyl", url: "#" }],
  },
  {
    id: "p5",
    title: "ECHOES",
    client: "Zulan",
    type: "management",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    sliceImageUrl: "/stills/zulan_slice.jpg",
    videoUrl: "https://www.youtube.com/embed/0cytQxa7VJA",
    description:
      "Global representation for the avant-pop icon Zulan. Upcoming world tour \"ECHOES\" starts Fall 2025.",
    credits: ["Creative Direction: FRIDAY"],
    links: [{ label: "Tour Dates", url: "#" }],
  },
  {
    id: "p6",
    title: "SCORE STUDIES",
    client: "Luca Santamaria",
    type: "publishing",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
    sliceImageUrl: "/stills/luca_slice.png",
    videoUrl: "https://www.youtube.com/embed/5fuEcFQ37xg",
    description:
      "Live orchestral explorations released through FRIDAY Publishing. Strings recorded to tape, then deconstructed into ambient edits.",
    credits: ["Composition: L. Santamaria", "Publishing: FRIDAY"],
    links: [{ label: "Watch Session", url: "https://www.youtube.com/watch?v=5fuEcFQ37xg" }],
  },
  {
    id: "p7",
    title: "GLASS CHOIR",
    client: "svn4vr",
    type: "publishing",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1499578124509-1611b77778c7?q=80&w=1200&auto=format&fit=crop",
    sliceImageUrl: "/stills/svn_slice.jpg",
    videoUrl: "https://www.youtube.com/embed/AMRH-oLcr4g",
    description:
      "Digital psalms from svn4vr — part club, part cathedral. FRIDAY handles editorial, stems, and limited art objects.",
    credits: ["Sound Design: svn4vr", "Publishing: FRIDAY"],
    links: [{ label: "Watch Film", url: "https://www.youtube.com/watch?v=AMRH-oLcr4g" }],
  },
  {
    id: "p8",
    title: "STORM RIDER",
    client: "Rain Radio",
    type: "records",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    sliceImageUrl: "/stills/rain_slice.jpg",
    videoUrl: "https://www.youtube.com/embed/z66Eh7_LFag",
    description:
      "Warehouse vocal edits and late-night transmissions. Rain Radio’s newest 12\" distributed via FRIDAY Records.",
    credits: ["Mix: Rain Radio", "Pressing: FRIDAY Records"],
    links: [{ label: "Watch Visual", url: "https://www.youtube.com/watch?v=z66Eh7_LFag" }],
  },
];
