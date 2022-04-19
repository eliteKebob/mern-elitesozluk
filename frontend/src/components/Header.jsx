import Logo from "../assets/brand.png"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import AppContext from "../context/AppContext"
import { toast } from "react-toastify"
import { IoPersonCircle } from "react-icons/io5"

const Header = () => {
  const [search, setSearch] = useState("")

  const { isLoggedIn, setIsLoggedIn, setCurrentUser, currentUser } =
    useContext(AppContext)

  const logout = () => {
    try {
      setIsLoggedIn(false)
      setCurrentUser("")
      localStorage.removeItem("user")
    } catch (error) {
      toast.dark("Çıkış yapılırken problem oluştu")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    toast.dark("Arama fonksiyonu şimdilik devre dışıdır!")
  }

  return (
    <div className="header">
      <div className="header-line"></div>
      <div className="navbar">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Başlık Ara..."
          />
          <button type="submit">Ara</button>
        </form>
        <div className="nav-member">
          {!isLoggedIn ? (
            <>
              <Link to="/login">Giriş Yap</Link>
              <Link to="/register">Kayıt Ol</Link>
            </>
          ) : (
            <>
              <div className="username">
                <IoPersonCircle />
                <span style={{ color: "black" }}>{currentUser?.username} </span>
              </div>
              <Link to="/create-post">Yeni Başlık</Link>
              <span className="logout-button" onClick={() => logout()}>
                Çıkış Yap
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default Header
