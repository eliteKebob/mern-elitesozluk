import { useContext } from "react"
import AppContext from "../context/AppContext"
import { IoPersonCircle, IoTrashBin } from "react-icons/io5"
import axios from "axios"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

const SingleComment = ({ comment }) => {
  const { currentUser, setIsLoading, setCurrentPost } = useContext(AppContext)

  const API_URL = `/api/posts/`
  const token = JSON.parse(localStorage.getItem("user"))?.token

  const params = useParams()

  const deleteComment = async () => {
    setIsLoading(true)
    try {
      let config = {
        method: "delete",
        url: `${API_URL}comment/${params.id}/${comment._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios(config)
      if (response.data) {
        setCurrentPost(response.data)
        setIsLoading(false)
        toast.dark("Yorum başarıyla silindi")
      }
    } catch (error) {
      toast.dark("Yorum silinirken problem oluştu")
      setIsLoading(false)
    }
  }

  return (
    <div className="single-comment">
      <h5>{comment.text}</h5>
      <div className="username">
        {currentUser?._id === comment.user ? (
          <IoTrashBin onClick={() => deleteComment()} />
        ) : (
          ""
        )}
        <IoPersonCircle />
        <span>{comment.username}</span>
      </div>
    </div>
  )
}
export default SingleComment
