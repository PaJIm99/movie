import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${id}`)
        .then(response => setMovie(response.data))
        .catch(error => console.error("Error fetching movie details:", error));
    }
  }, [id]);

  const submitRating = (rating) => {
    setUserRating(rating);
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/${id}/rate`, { rating })
      .then(response => setMovie(response.data))
      .catch(error => console.error("Error submitting rating:", error));
  };

  if (!movie) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <button className="mb-4 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded" onClick={() => router.back()}>Back</button>
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
      <p className="text-gray-400">Rating: {movie.rating}</p>
      <p className="text-gray-300">{movie.description}</p>
      <img src={movie.poster} alt={movie.title} className="mt-4 rounded-lg w-64" />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Rate this Movie:</h2>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(star => (
            <FaStar
              key={star}
              className={`cursor-pointer ${userRating >= star ? "text-yellow-500" : "text-gray-600"}`}
              onClick={() => submitRating(star)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
