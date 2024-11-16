import { renderHook } from "@testing-library/react";
import useBreakpoint from "@/hooks/useBreakpoint";

// Mock content of window matchMedia object
const matchMediaObj = {
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
};

describe("useBreakpoint", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return "xs" when window is undefined', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      ...matchMediaObj,
      matches: false,
      media: query,
    }));
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.currentBreakpoint).toBe("xs");
  });

  it('should return "sm" when window width is 640px', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      ...matchMediaObj,
      matches: query === "(min-width: 640px)",
      media: query,
    }));

    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.currentBreakpoint).toBe("sm");
  });

  it('should return "md" when window width is 768px', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      ...matchMediaObj,
      matches: query === "(min-width: 768px)",
      media: query,
    }));

    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.currentBreakpoint).toBe("md");
  });

  it('should return "lg" when window width is 1024px', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      ...matchMediaObj,
      matches: query === "(min-width: 1024px)",
      media: query,
    }));

    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.currentBreakpoint).toBe("lg");
  });

  it('should return "xl" when window width is 1280px', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      ...matchMediaObj,
      matches: query === "(min-width: 1280px)",
      media: query,
    }));

    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.currentBreakpoint).toBe("xl");
  });

  it('should return "2xl" when window width is 1536px', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      ...matchMediaObj,
      matches: query === "(min-width: 1536px)",
      media: query,
    }));

    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.currentBreakpoint).toBe("2xl");
  });
});
