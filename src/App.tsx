import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import StoryPage from './pages/StoryPage';
import MainPage from './pages/MainPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
