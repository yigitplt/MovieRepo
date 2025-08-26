const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchMovies(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`TMDB fetch failed: ${res.status}`);
  }

  return res.json();
}

export async function getTrendingMovies() {
  return fetchMovies("/trending/movie/week");
}

export async function getTopRatedMovies() {
  return fetchMovies("/movie/top_rated");
}

export async function getUpcomingMovies() {
  return fetchMovies("/movie/upcoming");
}

export async function getMovieDetails(id: number) {
  return fetchMovies(`/movie/${id}`);
}

export async function getMovieCredits(id: number) {
  return fetchMovies(`/movie/${id}/credits`);
}

export async function searchMovies(query: string) {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    return res.json();  
}
