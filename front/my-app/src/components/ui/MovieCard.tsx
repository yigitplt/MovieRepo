import { Card, CardMedia, CardContent, Typography } from "@mui/material";

type MovieCardProps = {
  title: string;
  posterPath: string;
  voteAverage: number;
};

export default function MovieCard({ title, posterPath, voteAverage }: MovieCardProps) {
  return (
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
  );
}
