import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Post from "./pages/Post"
import Register from "./pages/Register"
import Login from "./pages/Login"
import CreatePost from "./pages/CreatePost"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </Router>
      <ToastContainer
        autoClose={3000}
        progressStyle={{ backgroundColor: "#e50914" }}
      />
    </>
  )
}

export default App
