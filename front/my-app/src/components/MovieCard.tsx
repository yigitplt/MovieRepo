import theme from "@/theme";
import { Star } from "@mui/icons-material";
import { Card, CardMedia, CardContent, Typography, Link, Box } from "@mui/material";

type MovieCardProps = {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
};

export default function MovieCard({ id, title, posterPath, voteAverage }: MovieCardProps) {
  return (
    <Link href={`/movie/${id}`} style={{ textDecoration: "none" }}>
      <Card sx={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out, border-color 0.3s ease-in-out',
        border: '1px solid transparent',
        '&:hover': {
          transform: 'scale(1.05)',
          borderColor: theme.palette.secondary.main,
        },
      }}>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          sx={{
            aspectRatio: '2 / 3',
            objectFit: 'cover',
          }}
        />
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%)',
          color: 'white',
          p: '16px',
        }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
            <Star sx={{ color: theme.palette.secondary.main, fontSize: '1.2rem' }} /> 
            <Typography variant="body2" sx={{ fontSize: '1.0rem', fontWeight: 'bold' }}>
              {voteAverage.toFixed(1)}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Link>
  );
}