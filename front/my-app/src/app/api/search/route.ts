import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (q.length < 3) {
    return NextResponse.json({ results: [] });
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(q)}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ results: [] }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json({ results: Array.isArray(data.results) ? data.results : [] });
  } catch {
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
