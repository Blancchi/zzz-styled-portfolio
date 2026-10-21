import SmoothScroll from "./components/common/SmoothScroll";
import HorizontalScroll from "./components/common/HorizontalScroll";
import Hero from "./components/sections/Hero";
import IntroPanel from "./components/sections/IntroPanel";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Hobbies from "./components/sections/Hobbies";
import FavAnimeManhwa from "./components/sections/FavAnimeManhwa";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <SmoothScroll>
      <div className="hud-backdrop" />
      <div className="hud-noise" />

      <main className="relative z-10">
        <HorizontalScroll>
          <Hero />
          <IntroPanel />
        </HorizontalScroll>
        <About />
        <Projects />
        <Hobbies />
        <FavAnimeManhwa />
        <Contact />
      </main>

      <div className="hud-scanlines" />
    </SmoothScroll>
  );
}