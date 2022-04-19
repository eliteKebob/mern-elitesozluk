import { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import AppContext from "../context/AppContext"
import { toast } from "react-toastify"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const { setIsLoading, setCurrentPost } = useContext(AppContext)

  const formData = { title, text }

  const API_URL = `/api/posts/`
  const token = JSON.parse(localStorage.getItem("user"))?.token

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (title.length < 50 && text.length < 150) {
      try {
        let config = {
          method: "post",
          url: `${API_URL}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: formData,
        }
        const response = await axios(config)
        if (response.data) {
          setCurrentPost(response.data)
          setIsLoading(false)
          toast.dark("Başlık başarıyla oluşturuldu")
          navigate(`/posts/${response.data._id}`)
        }
      } catch (error) {
        console.log(error)
        toast.dark("Başlık oluştururken problem oluştu")
        setIsLoading(false)
      }
    } else {
      toast.dark("Başlık veya açıklama çok uzun!")
      setIsLoading(false)
    }
  }

  return (
    <div className="main">
      <div className="create-post-control">
        <h2>Başlık Oluştur</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Başlığına bir isim ver.."
          />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ height: "25vh" }}
            placeholder="Başlığına bir açıklama yaz.."
          />
          <button type="submit">Başlık Oluştur</button>
        </form>
      </div>
    </div>
  )
}
export default CreatePost
