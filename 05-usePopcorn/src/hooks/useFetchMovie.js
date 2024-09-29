import { useState, useEffect } from "react";

// omdb api fetching
const KEY = "ffc2bd7a";

export function useFetchMovie(movieQuery) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [movies, setMovies] = useState([]);
  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovieByQuery() {
        // console.log(movieQuery);
        if (movieQuery.length < 3) {
          setMovies([]);
          setErrorMsg("");
          return;
        }

        try {
          setIsLoading(true);
          setErrorMsg("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${movieQuery}`,
            { singal: controller.signal }
          );
          if (!res.ok) throw new Error("Something went wrong");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie Not Found");
          setMovies(data.Search || []);
        } catch (err) {
          // 不处理请求中止的错误
          if (err.name === "AbortError") {
            setErrorMsg(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      // handleClearSelect();
      fetchMovieByQuery();
      return function () {
        controller.abort();
      };
    },
    [movieQuery]
  );
  return { isLoading, errorMsg, movies };
}
