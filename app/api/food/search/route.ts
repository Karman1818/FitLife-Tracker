import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ products: [] });
  }

  try {
    const targetUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
      query
    )}&search_simple=1&action=process&json=1&page_size=10`;

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "FitLifeTracker/1.0 (contact: student@fitlife.app)",
        Accept: "application/json",
      },
      next: { revalidate: 3600 }, // Cache search queries for 1 hour
    });

    if (!response.ok) {
      throw new Error(`OpenFoodFacts responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.products)) {
      return NextResponse.json({ products: [] });
    }

    const products = data.products
      .filter((p: { product_name?: string }) => Boolean(p.product_name && p.product_name.trim().length > 0))
      .slice(0, 8)
      .map((p: {
        product_name?: string;
        code?: string;
        id?: string;
        brands?: string;
        nutriments?: Record<string, number | string>;
      }) => {
        const kcal100g =
          p.nutriments?.["energy-kcal_100g"] ??
          p.nutriments?.["energy-kcal"] ??
          (p.nutriments?.energy
            ? Math.round(Number(p.nutriments.energy) / 4.184)
            : 0);

        return {
          label: p.product_name?.trim() || "Unknown product",
          code: p.code || p.id || "",
          brand: p.brands?.trim() || undefined,
          calories100g: Math.round(Number(kcal100g) || 0),
          protein100g: Number(Number(p.nutriments?.proteins_100g || 0).toFixed(1)),
          carbs100g: Number(Number(p.nutriments?.carbohydrates_100g || 0).toFixed(1)),
          fat100g: Number(Number(p.nutriments?.fat_100g || 0).toFixed(1)),
        };
      });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error querying OpenFoodFacts via route handler:", error);
    return NextResponse.json(
      { error: "Failed to fetch from OpenFoodFacts", products: [] },
      { status: 500 }
    );
  }
}
