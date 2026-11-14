import { describe, it, expect } from "vitest";
import { formatRecipeSteps } from "@/lib/recipe";

describe("Recipe Instructions Formatter (formatRecipeSteps)", () => {
  it("should parse multiline 'step X' followed by instruction into clean steps without separate 'step X' cards", () => {
    const raw = `step 1\r\nMix all the ingredients for the dressing together in a bowl with 1 tbsp water until the sugar has dissolved.\r\n\r\nstep 2\r\nCook the noodles following pack instructions, then plunge into a bowl of cold water to cool completely.\r\n\r\nstep 3\r\nHeat the oil in a frying pan over a high heat. Season the steak, then cook to your liking.`;

    const steps = formatRecipeSteps(raw);
    expect(steps).toHaveLength(3);
    expect(steps[0]).toBe(
      "Mix all the ingredients for the dressing together in a bowl with 1 tbsp water until the sugar has dissolved."
    );
    expect(steps[1]).toBe(
      "Cook the noodles following pack instructions, then plunge into a bowl of cold water to cool completely."
    );
    expect(steps[2]).toBe(
      "Heat the oil in a frying pan over a high heat. Season the steak, then cook to your liking."
    );
  });

  it("should parse inline 'step 1 ... step 2 ...' correctly", () => {
    const inline =
      "step 1 To make the dipping sauce, mix all ingredients. step 2 Heat about 7cm of oil. step 3 Serve with lime.";

    const steps = formatRecipeSteps(inline);
    expect(steps).toHaveLength(3);
    expect(steps[0]).toBe("To make the dipping sauce, mix all ingredients.");
    expect(steps[1]).toBe("Heat about 7cm of oil.");
    expect(steps[2]).toBe("Serve with lime.");
  });

  it("should parse numbered instructions like '1. Mix... 2. Bake...'", () => {
    const numbered = `1. Preheat the oven to 200°C.\n2. In a large bowl, whisk the eggs and milk.\n3. Pour into baking dish and bake for 25 minutes.`;

    const steps = formatRecipeSteps(numbered);
    expect(steps).toHaveLength(3);
    expect(steps[0]).toBe("Preheat the oven to 200°C.");
    expect(steps[1]).toBe("In a large bowl, whisk the eggs and milk.");
    expect(steps[2]).toBe("Pour into baking dish and bake for 25 minutes.");
  });

  it("should handle empty or undefined input gracefully", () => {
    expect(formatRecipeSteps("")).toEqual([]);
    expect(formatRecipeSteps(undefined)).toEqual([]);
  });

  it("should preserve standard paragraphs without step markers", () => {
    const paragraphs = `Melt butter in a skillet.\n\nAdd garlic and sauté until fragrant.\n\nToss with fresh pasta and serve.`;
    const steps = formatRecipeSteps(paragraphs);
    expect(steps).toHaveLength(3);
    expect(steps[0]).toBe("Melt butter in a skillet.");
    expect(steps[1]).toBe("Add garlic and sauté until fragrant.");
    expect(steps[2]).toBe("Toss with fresh pasta and serve.");
  });
});
