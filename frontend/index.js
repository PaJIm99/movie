import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  const fetchMovies = () => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/trending`)
      .then(response => setMovies(response.data))
      .catch(error => console.error("Error fetching movies:", error));
  };

  useEffect(() => {
    fetchMovies();
    const interval = setInterval(fetchMovies, 86400000); // Fetch new data every 24 hours
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Trending Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map(movie => (
          <Card key={movie.id} className="bg-gray-800 rounded-lg shadow-lg">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p className="text-gray-400">Rating: {movie.rating}</p>
              <Button 
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white"
                onClick={() => router.push(`/movie/${movie.id}`)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
