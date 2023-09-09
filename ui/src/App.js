import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CreateRoom from './pages/CreateRoom';
import Room from './pages/Room';

function App() {
  return (
    <>
    <Navigation />
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/create-room" exact element={<CreateRoom />} />
       <Route path="/room/:roomID" element={<Room />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
