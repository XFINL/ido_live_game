import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameIndex from './pages/GameIndex';
import StartPage from './pages/StartPage';
import StoryPage from './pages/StoryPage';
import MainPage from './pages/MainPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameIndex />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
