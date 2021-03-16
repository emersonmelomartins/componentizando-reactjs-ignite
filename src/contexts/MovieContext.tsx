import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MovieContextData {
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
  selectedGenreId: number;
}

interface MovieProviderProps {
  children: ReactNode;
}

import { api } from "../services/api";
import { GenreContext } from "./GenreContext";

export const MovieContext = createContext({} as MovieContextData);

export function MovieProvider({ children, ...rest }: MovieProviderProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const { selectedGenreId } = useContext(GenreContext);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        selectedGenre,
        selectedGenreId,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
