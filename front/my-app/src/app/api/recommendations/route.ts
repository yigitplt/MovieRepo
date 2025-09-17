import { NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const genreId = searchParams.get('with_genres');
  const maxRuntime = searchParams.get('with_runtime.lte');
  const releaseDateGte = searchParams.get('primary_release_date.gte');
  const releaseDateLte = searchParams.get('primary_release_date.lte');

  const tmdbParams = new URLSearchParams({
    sort_by: 'popularity.desc',
    'vote_count.gte': '100',
  });

  if (genreId) tmdbParams.append('with_genres', genreId);
  if (maxRuntime) tmdbParams.append('with_runtime.lte', maxRuntime);
  if (releaseDateGte) tmdbParams.append('primary_release_date.gte', releaseDateGte);
  if (releaseDateLte) tmdbParams.append('primary_release_date.lte', releaseDateLte);

  const endpoint = `/discover/movie?${tmdbParams.toString()}&api_key=${API_KEY}`;
  const url = `${BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: `TMDB fetch failed: ${res.status}` }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}