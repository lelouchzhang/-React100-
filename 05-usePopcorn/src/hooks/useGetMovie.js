import { useState, useEffect } from "react";

const KEY = "ffc2bd7a";

export function useGetMovie(selectedId) {
  // 在useEffect中请求api，获取单一电影信息
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(() => true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(() => data);
        setIsLoading(() => false);
      }
      getMovieDetails();
    },
    [selectedId]
  );
  return { movie, isLoading };
}
