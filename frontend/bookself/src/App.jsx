import{BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Navbar from './components/Navbar'
import Addbook from './pages/Addbook'
import BookDetail from './pages/BookDetail';
import Searchresult from './pages/Searchresult';


function App() {

  const isAuthenticated = !!localStorage.getItem("token");
 

  return (
    <Router>
      <Navbar />
       <Routes>
        <Route path='/' element={isAuthenticated? <Home/>:<Navigate to = "/login" />} />
        <Route path="/add-book" element={<Addbook/>} />
        <Route path="/books/:bookId" element={<BookDetail/>} />
        <Route path="/search" element={<Searchresult/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
       </Routes>
    </Router>
  )
}

export default App
