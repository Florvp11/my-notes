import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainScreen from "./screens/MainScreen";
import ArchivedScreen from "./screens/ArchivedScreen";
import Header from "./components/Header/Header.jsx";
import NoteScreen from "./screens/NoteScreen";
import CategoriesScreen from "./screens/CategoriesScreen.jsx";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/note/:id" element={<NoteScreen />} />
        <Route path="/archived" element={<ArchivedScreen />} />
        <Route path="/categories" element={<CategoriesScreen />} />
      </Routes>
    </>
  );
}
