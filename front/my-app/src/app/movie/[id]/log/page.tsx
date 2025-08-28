import { Box } from "@mui/material";
import { getMovieDetails } from "../../../../lib/movies";
import MovieLog from "@/src/components/MovieLog";

type MovieLogPageProps = {
    params: { id: number };
};

export default async function MovieLogPage({ params }: MovieLogPageProps) {
    const movie = await getMovieDetails(params.id);

    return (
        <Box sx={{ p: 4, display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" }, alignItems: "center" }}>
            {/* Poster Section */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Box
                    component="img"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    sx={{ borderRadius: 2, width: 280, boxShadow: 4 }}
                />
            </Box>

            {/* Logging Form Section */}
            <Box sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
                <MovieLog movieId={movie.id} />
            </Box>
        </Box>
    );
}