import { useContext, useEffect } from "react"
import AppContext from "../context/AppContext"
import { Link, useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import { IoThumbsUpSharp, IoPersonCircle, IoTrashBin } from "react-icons/io5"
import SingleComment from "../components/SingleComment"
import CreateComment from "../components/CreateComment"

const Post = () => {
  const { currentPost, setCurrentPost, setIsLoading, isLoggedIn, currentUser } =
    useContext(AppContext)

  const API_URL = `/api/posts/`
  const token = JSON.parse(localStorage.getItem("user"))?.token

  const params = useParams()
  const navigate = useNavigate()

  const fetchCurrentPost = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(API_URL + params.id)
      if (response.data) {
        setIsLoading(false)
        setCurrentPost(response.data)
      }
    } catch (error) {
      toast.dark("Başlık görüntülenirken problem oluştu")
      setIsLoading(false)
    }
  }

  const likePost = async () => {
    setIsLoading(true)

    try {
      let config = {
        method: "put",
        url: `${API_URL}like/${params.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios(config)
      if (response.data) {
        setCurrentPost(response.data)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      toast.dark("Beğenme işlemi sırasında problem oluştu")
    }
  }

  const deletePost = async () => {
    setIsLoading(true)
    try {
      let config = {
        method: "delete",
        url: `${API_URL}${params.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios(config)
      if (response.data) {
        navigate("/")
        setIsLoading(false)
        toast.dark("Başlık başarıyla silindi")
      }
    } catch (error) {
      toast.dark("Yorum silinirken problem oluştu")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCurrentPost()
    // eslint-disable-next-line
  }, [params.id])

  return (
    <div className="main">
      <div className="post-container">
        {currentPost !== "" ? (
          <div className="post-author">
            <Link to={`/posts/${currentPost?._id}`}>
              <h2>{currentPost?.title}</h2>
            </Link>
            <h5>{currentPost?.text}</h5>
          </div>
        ) : (
          ""
        )}
        <div className="control-bar">
          <div className="likes">
            {isLoggedIn ? (
              <button onClick={() => likePost()}>
                <IoThumbsUpSharp />
              </button>
            ) : (
              ""
            )}
            <span>{currentPost?.likes?.length} kişi bunu beğendi.</span>
          </div>
          <div className="username">
            {currentUser?._id === currentPost?.user ? (
              <IoTrashBin onClick={() => deletePost()} />
            ) : (
              ""
            )}
            <IoPersonCircle />
            <span>{currentPost?.username}</span>
            <span className="date">{currentPost?.updatedAt}</span>
          </div>
        </div>
        {isLoggedIn ? (
          <CreateComment />
        ) : (
          <h4>
            Yorum yazabilmek için <Link to="/login">giriş yap.</Link>{" "}
          </h4>
        )}
        <div className="post-comments">
          {currentPost?.comments?.length > 0
            ? currentPost?.comments.map((comment, idx) => (
                <SingleComment comment={comment} key={idx} />
              ))
            : ""}
        </div>
      </div>
    </div>
  )
}
export default Post
