import { useState, useContext } from "react"
import AppContext from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const { setIsLoading, isLoggedIn } = useContext(AppContext)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const formData = { username, email, password }

  const API_URL = `/api/users/`

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (!username || !email || !password) {
        toast.dark("Bütün alanları doldurmak zorunludur!")
        setIsLoading(false)
      }
      if (isLoggedIn) {
        toast.dark("Zaten giriş yapılmış!")
        navigate("/")
        setIsLoading(false)
      }
      if (username.length > 20) {
        toast.dark("Kullanıcı adı çok uzun")
      } else {
        const response = await axios.post(API_URL, formData)
        if (response.data) {
          toast.dark("Başarıyla kayıt olundu, giriş yapabilirsin")
          setIsLoading(false)
          navigate("/login")
        }
      }
    } catch (error) {
      console.log(error)
      toast.dark("Kayıt olurken problem yaşandı")
      setIsLoading(false)
    }
  }

  return (
    <div className="main">
      <div className="form-control">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Sadece sana özel eşsiz kullanıcı adın (Min. 2, Max. 20 karakter
            uzunluğunda)
          </label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı Adı.."
          />
          <label htmlFor="email">Sana ait e-posta adresi</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Posta Adresi.."
          />
          <label htmlFor="password">Güçlü bir şifre</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre.."
          />
          <button>Kayıt Ol</button>
        </form>
      </div>
    </div>
  )
}
export default Register
