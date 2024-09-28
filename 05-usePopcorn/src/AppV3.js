import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// useDebounce 自定义钩子
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// omdb api fetching
const KEY = "ffc2bd7a";
export default function AppV2() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  // 派生状态，用于设置输入防抖
  const debouncedQuery = useDebounce(query, 300);
  const [selectedId, setSelectedId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  // 点击展示对应movie
  function handleSelectMovie(id) {
    setSelectedId(() => id);
  }
  // 返回按钮，清除已选movie
  function handleClearSelect() {
    setSelectedId(null);
  }
  // 添加已选movie
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  // 从watched列表删除看过的电影
  function handleDeleteWatched(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovieByQuery() {
        if (debouncedQuery.length < 3) {
          setMovies([]);
          setErrorMsg("");
          return;
        }

        try {
          setIsLoading(true);
          setErrorMsg("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${debouncedQuery}`,
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

      handleClearSelect();
      fetchMovieByQuery();
      return function () {
        controller.abort();
      };
    },
    [debouncedQuery]
  );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !errorMsg && (
            <ul className="list list-movies">
              {movies?.map((movie) => (
                <Movie
                  key={movie.imdbID}
                  movie={movie}
                  onSelectedMovie={handleSelectMovie}
                />
              ))}
            </ul>
          )}
          {!isLoading && errorMsg && <ErrorMessage errorMsg={errorMsg} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onClearMovie={handleClearSelect}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <ul className="list">
                {watched.map((movie) => (
                  <WatchedMovie
                    key={movie.imdbID}
                    movie={movie}
                    onDeleteWatched={handleDeleteWatched}
                  />
                ))}
              </ul>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ errorMsg }) {
  return <p className="error">{errorMsg}</p>;
}
function Loader() {
  return <p className="loader">Loading...</p>;
}
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {/* 如果 isOpen 为 true，则显示 children */}
      {isOpen && children}
    </div>
  );
}

function Movie({ movie, onSelectedMovie }) {
  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
//! 点击左侧电影列表，在右侧展示电影详情
function MovieDetails({ watched, selectedId, onClearMovie, onAddWatched }) {
  // 在useEffect中请求api，获取单一电影信息
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const {
    imdbRating,
    Title: title,
    // Year: year,
    Plot: plot,
    Runtime: runtime,
    Poster: poster,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  const isWatched = watched.map((mobie) => mobie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

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
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      //? 在React中，useEffect钩子允许你返回一个清理函数，这个清理函数会在组件卸载或者在useEffect的依赖项发生变化导致组件重新渲染之前被调用。
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );
  // escape键 退出movieDetails
  useEffect(() => {
    const cb = (e) => {
      if (e.code === "Escape") onClearMovie();
    };
    document.addEventListener("keydown", cb);
    return function () {
      document.removeEventListener("keydown", cb);
    };
  }, [onClearMovie]);

  function handleOnAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year: Number(released.split(" ")[0]),
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating: rating,
    };
    onAddWatched(newMovie);
    onClearMovie();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClearMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          {/* <p>{avgRating}</p> */}

          <section>
            <div className="rating">
              {!isWatched ? (
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={(star) => setRating(() => star)}
                />
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐</span>
                </p>
              )}
              {rating > 0 && (
                <button className="btn-add" onClick={handleOnAdd}>
                  + Add to list
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
