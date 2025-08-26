import { Card, CardMedia, CardContent, Typography, Link } from "@mui/material";

type MovieCardProps = {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
};

export default function MovieCard({ id, title, posterPath, voteAverage }: MovieCardProps) {
  return (
    <Link href={`/movie/${id}`} style={{ textDecoration: "none" }}>
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        sx={{ objectFit: "cover", aspectRatio: "2 / 3" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ⭐ {voteAverage.toFixed(1)}
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
}
