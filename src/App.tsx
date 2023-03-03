import './App.scss';
import Chessboard from './games/Chess';
import Navbar from './components/Navbar'
import * as Page from './pages'
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Page.Home />} />
          <Route path="/about" element={<Page.About />} />
          <Route path="/games" element={<Page.Games />} />
          <Route path="/missing" element={<Page.Missing />} />
          <Route path="/chess" element={<Chessboard />} />
        </Routes>
      </div>
    </>
  );
}

