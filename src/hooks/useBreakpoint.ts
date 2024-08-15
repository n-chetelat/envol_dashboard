import { useState, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);
const breakpoints = { xs: "0px", ...fullConfig.theme.screens };

type BreakpointKey = keyof typeof breakpoints;

const breakpointEntries = Object.entries(breakpoints) as [
  BreakpointKey,
  string,
][];
const sortedBreakpoints = breakpointEntries.sort(
  ([, a], [, b]) => parseInt(b) - parseInt(a),
);

export default function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<BreakpointKey>("xs");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueries = sortedBreakpoints.map(([key, width]) => ({
      key,
      query: window.matchMedia(`(min-width: ${width})`),
    }));

    const updateBreakpoint = () => {
      const currentEntry = mediaQueries.find((mq) => mq.query.matches);
      setCurrentBreakpoint(currentEntry ? currentEntry.key : "xs");
    };

    mediaQueries.forEach((mq) => {
      mq.query.addEventListener("change", updateBreakpoint);
    });
    updateBreakpoint();

    return () => {
      mediaQueries.forEach((mq) => {
        mq.query.removeEventListener("change", updateBreakpoint);
      });
    };
  }, []);

  return {
    currentBreakpoint,
    isXs: currentBreakpoint === "xs",
    isSm: currentBreakpoint === "sm",
    isMd: currentBreakpoint === "md",
    isLg: currentBreakpoint === "lg",
    isXl: currentBreakpoint === "xl",
    is2Xl: currentBreakpoint === "2xl",
    breakpoints,
    getBreakpointValue: (bp: BreakpointKey) => parseInt(breakpoints[bp]),
  };
}
