// src/lib/logs.ts

import axios from "axios";
import axiosInstance from "./axiosInstance";
import { cookies } from 'next/headers';

export async function getUserMovieLog(movieId: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt');

    if (!token) {
      return null;
    }

    const res = await axiosInstance.get(`/ratings/${movieId}`, {
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