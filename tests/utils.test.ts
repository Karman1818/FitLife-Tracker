import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("Utils (cn)", () => {
  it("should merge basic class names", () => {
    expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white");
  });

  it("should handle conditional and falsy classes", () => {
    const isHidden = false;
    const isActive = true;
    expect(cn("p-4", isHidden && "hidden", isActive && "text-green-500")).toBe(
      "p-4 text-green-500"
    );
  });

  it("should resolve tailwind class conflicts using tailwind-merge", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
});
