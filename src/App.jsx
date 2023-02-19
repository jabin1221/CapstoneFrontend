import logo from './logo.svg';
import ItemView from './pages/item/ItemView.jsx';
import { BrowserRouter, Routes, Route }  from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemView />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;