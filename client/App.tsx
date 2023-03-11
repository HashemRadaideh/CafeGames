import "./App.scss";
import Navbar from "./components/Navbar";
import * as Page from "./pages";
import { Route, Routes } from "react-router-dom";

export default function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Page.Home />} />
          <Route path="/about" element={<Page.About />} />
          <Route path="/games" element={<Page.Games />} />
        </Routes>
      </div>
    </>
  );
}
