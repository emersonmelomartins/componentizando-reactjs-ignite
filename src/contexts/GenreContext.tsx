import { createContext, ReactNode, useEffect, useState } from "react";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface GenreContextData {
  selectedGenreId: number;
  genres: GenreResponseProps[];
  handleClickButton: (id: number) => void;
}

interface GenreProviderProps {
  children: ReactNode;
}

import { api } from "../services/api";

export const GenreContext = createContext({} as GenreContextData);

export function GenreProvider({ children, ...rest }: GenreProviderProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <GenreContext.Provider
      value={{
        genres,
        selectedGenreId,
        handleClickButton,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
}
