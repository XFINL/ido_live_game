import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameIndex from './pages/GameIndex';
import StartPage from './pages/StartPage';
import StoryPage from './pages/StoryPage';
import MainPage from './pages/MainPage';
import MapPage from './pages/MapPage';
import HomePage from './pages/HomePage';
import BedroomPage from './pages/BedroomPage';
import BagPage from './pages/BagPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameIndex />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/bedroom" element={<BedroomPage />} />
        <Route path="/bag" element={<BagPage />} />
      </Routes>
    </Router>
  );
}
