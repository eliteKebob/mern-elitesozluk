import { useState, useContext } from "react"
import AppContext from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const { setIsLoading, setCurrentUser, setIsLoggedIn, isLoggedIn } =
    useContext(AppContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const formData = { email, password }

  const API_URL = `/api/users/login`

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (!email || !password) {
        toast.dark("Bütün alanları doldurmak zorunludur!")
        setIsLoading(false)
      }
      if (isLoggedIn) {
        toast.dark("Zaten giriş yapılmış!")
        navigate("/")
        setIsLoading(false)
      } else {
        const response = await axios.post(API_URL, formData)
        if (response.data) {
          setCurrentUser(response.data)
          setIsLoading(false)
          setIsLoggedIn(true)
          toast.dark("Başarıyla giriş yapıldı!")
          navigate("/")
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
          <label htmlFor="email">Sana ait e-posta adresi</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Posta Adresi.."
          />
          <label htmlFor="password">Şifren</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre.."
          />
          <label htmlFor="">Bilgilerimi Kaydet</label>
          <input type="checkbox" className="login-checkbox" />
          <button>Giriş Yap</button>
        </form>
      </div>
    </div>
  )
}
export default Login
