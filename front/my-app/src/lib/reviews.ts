import axiosInstance from "./axiosInstance";
import { cookies } from 'next/headers';

export async function getUserMovieReview(movieId: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt');

    if (!token) {
      return null;
    }

    const res = await axiosInstance.get(`/ratings/${movieId}/user`, {
      headers: {
        Cookie: `jwt=${token.value}`
      }
    });
    return res.data;
  } catch (error: any) {
    console.error(`Error fetching movie log for ID ${movieId}:`, error.message);
    
    if (error.response && (error.response.status === 401 || error.response.status === 403 || error.response.status === 404)) {
      return null;
    }
    
    throw error;
  }
}

export async function getAllUserMovieReviews(movieId: number) {
  try{
    const cookie = await cookies();
    const token = cookie.get('jwt');

    if(!token){
      return [];
    }

    const res = await axiosInstance.get(`/ratings/${movieId}/all`, {
      headers: { Cookie: `jwt=${token.value}` }
    });
    return res.data;
  } catch (error) {
      console.error(`Error fetching reviews for movie ${movieId}:`, error);
      return []; 
    }
}

export async function getAllReviewsOfUser() {
  try{
    const cookie = await cookies();
    const token = cookie.get('jwt');

    if(!token){
      return [];
    }

    const res = await axiosInstance.get(`/ratings`, {
      headers: { Cookie: `jwt=${token.value}` }
    });

    return res.data;
  }catch (error) {
    console.error("Error fetching user's reviews:", error);
    return [];
  }
}