import "./styles/global.scss";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";
import { GenreProvider } from "./contexts/GenreContext";
import { MovieProvider } from "./contexts/MovieContext";

export function App() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <GenreProvider>
        <MovieProvider>
          <SideBar />
          <Content />
        </MovieProvider>
      </GenreProvider>
    </div>
  );
}
