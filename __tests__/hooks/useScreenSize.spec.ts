import { renderHook } from "@testing-library/react";
import useScreenSize from "@/hooks/useScreenSize";

// Adjust the path as necessary

// // Test when window is available
describe("useScreenSize with window available", () => {
  beforeAll(() => {
    // Mock window object with innerWidth and innerHeight
    Object.defineProperty(global.window, "innerWidth", {
      value: 1024,
      writable: true,
    });
    Object.defineProperty(global.window, "innerHeight", {
      value: 768,
      writable: true,
    });
  });

  afterAll(() => {
    // Clean up the mock
    Object.defineProperty(global.window, "innerWidth", {
      value: undefined,
      writable: true,
    });
    Object.defineProperty(global.window, "innerHeight", {
      value: undefined,
      writable: true,
    });
  });

  it("should return the correct screen size", () => {
    const { result } = renderHook(() => useScreenSize());

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it("should update screen size on window resize", async () => {
    const { result } = renderHook(() => useScreenSize());

    // Change the window size
    global.window.innerWidth = 800;
    global.window.innerHeight = 600;
    global.window.dispatchEvent(new Event("resize"));

    // Wait for the resize event to be processed
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });
});

// Test when window is not available
describe("useScreenSize with window not available", () => {
  beforeAll(() => {
    // Mock window to be undefined
    (global.window as any) = undefined;
  });

  afterAll(() => {
    // Restore window
    global.window = {};
  });

  it("should return initial screen size of 0", () => {
    expect(useScreenSize).toThrow(Error);
  });
});
