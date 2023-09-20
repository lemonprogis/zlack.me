import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
    <Navigation />
    <Routes>
       <Route exact path="/" element={<Home/>} />
       <Route exact path="/create-room" element={<CreateRoom />} />
       <Route path="/room/:roomID" element={<Room />} />
       <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
