import axiosInstance from "./axiosInstance";
import { cookies } from 'next/headers';

export async function getWatchlistStatus(movieId: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt');
    if (!token) return { isOnWatchlist: false };

    const res = await axiosInstance.get(`/watchlist/${movieId}/status`, {
      headers: { Cookie: `jwt=${token.value}` }
    });
    return res.data; 
  } catch (error) {
    console.error('Failed to get watchlist status:', error);
    return { isOnWatchlist: false };
  }
}

export async function getWatchlist() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('jwt');
        if (!token) return [];

        const res = await axiosInstance.get(`/watchlist`, {
            headers: { Cookie: `jwt=${token.value}` }
        });
        return res.data; 
    } catch (error) {
        console.error('Failed to get watchlist:', error);
        return [];
    }
}