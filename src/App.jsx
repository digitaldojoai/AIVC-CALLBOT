import { Route, Routes } from "react-router-dom";
import useJOSAnimation from "./hooks/useJOSAnimation";
import Home_02 from "./pages/home/Home_02";
import Home_03 from "./pages/home/Home_03";
import Home_04 from "./pages/home/Home_04";

function App() {
  // Init JOS Animation
  useJOSAnimation();

  return (
    <>
      <Routes>
        <Route path="home-2" element={<Home_02 />} />
        <Route path="home-3" element={<Home_03 />} />
        <Route path="/" element={<Home_04 />} />
      </Routes>
    </>
  );
}

export default App;
