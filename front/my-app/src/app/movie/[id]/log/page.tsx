import MovieLog from "@/src/components/MovieLog";
import { Movie } from "@mui/icons-material";

export default function MovieLogPage({params}: {params: {id: number}}) {
    const movieId = Number(params.id);
  return (
    <MovieLog movieId={movieId} />
  )

}