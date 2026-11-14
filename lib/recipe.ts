/**
 * Parses and formats recipe preparation instructions from various formats
 * (e.g. TheMealDB API, multiline steps, inline "step 1 ... step 2 ...", or numbered lists)
 * into a clean array of readable step strings without redundant "step X" labels.
 */
export function formatRecipeSteps(instructions?: string): string[] {
  if (!instructions || typeof instructions !== "string") return [];

  // Normalize line breaks
  let text = instructions.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
  if (!text) return [];

  // Normalize standalone "step 1", "step 2" headers that are followed by a newline:
  // e.g. "step 1\nMix ingredients..." -> "STEP_SPLIT_TOKEN Mix ingredients..."
  text = text.replace(/(?:^|\n)\s*step\s*\d+[:.]?\s*\n+/gi, "\n\nSTEP_SPLIT_TOKEN ");

  // Normalize inline "step 1 ... step 2 ...":
  // e.g. "...mix well. step 2 Heat the oil..." -> "...mix well. STEP_SPLIT_TOKEN Heat the oil..."
  text = text.replace(/(?:^|\s+)step\s*\d+[:.]?\s+/gi, " STEP_SPLIT_TOKEN ");

  // If STEP_SPLIT_TOKEN was introduced, split on it
  if (text.includes("STEP_SPLIT_TOKEN")) {
    const parts = text
      .split("STEP_SPLIT_TOKEN")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !/^step\s*\d+$/i.test(s));

    if (parts.length > 0) {
      return parts;
    }
  }

  // Handle numbered lists: e.g. "1. Mix...\n2. Cook..." or "1) Mix...\n2) Cook..."
  if (/(?:^|\n)\s*\d+[\.\)]\s+/.test(text)) {
    const parts = text
      .split(/(?:^|\n)\s*(?=\d+[\.\)]\s+)/)
      .map((s) => s.replace(/^\d+[\.\)]\s*/, "").trim())
      .filter((s) => s.length > 0);

    if (parts.length > 0) {
      return parts;
    }
  }

  // Split by double or single newlines
  const rawParagraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const cleanSteps: string[] = [];
  for (let i = 0; i < rawParagraphs.length; i++) {
    const current = rawParagraphs[i];

    // If the paragraph is only "Step X" or "Step X:", merge with the next paragraph
    if (/^step\s*\d+[:.]?$/i.test(current)) {
      if (i + 1 < rawParagraphs.length) {
        cleanSteps.push(rawParagraphs[i + 1].trim());
        i++; // skip next
      }
    } else {
      const stripped = current.replace(/^(?:step\s*\d+[:.]?|\d+[\.\)])\s*/i, "").trim();
      if (stripped.length > 0) {
        cleanSteps.push(stripped);
      }
    }
  }

  return cleanSteps.length > 0 ? cleanSteps : [text];
}
