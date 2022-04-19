import { useContext, useState } from "react"
import AppContext from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

const CreateComment = () => {
  const [comment, setComment] = useState("")
  const { setIsLoading, setCurrentPost } = useContext(AppContext)

  const API_URL = `/api/posts/`
  const token = JSON.parse(localStorage.getItem("user"))?.token

  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    let data = {
      text: comment,
    }

    if (comment.length < 150) {
      try {
        let config = {
          method: "post",
          url: `${API_URL}comment/${params.id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: data,
        }

        const response = await axios(config)

        if (response.data) {
          setCurrentPost(response.data)
          setIsLoading(false)
          setComment("")
        }
      } catch (error) {
        toast.dark("Yorum yaparken bir problem oluştu")
        setIsLoading(false)
      }
    } else {
      toast.dark("Yorum çok fazla karakter içeriyor")
      setIsLoading(false)
    }
  }

  return (
    <div className="create-comment">
      <div className="textarea-control">
        <form onSubmit={handleSubmit}>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="comment"
            placeholder="Bu konu hakkında ne düşünüyorsun? En az 1, en fazla 150 karakter."
          />
          <button type="submit">Yorum Yap</button>
        </form>
      </div>
    </div>
  )
}
export default CreateComment
