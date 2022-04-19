import { useContext, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import AppContext from "../context/AppContext"
import { IoRefreshCircle } from "react-icons/io5"
import { Link } from "react-router-dom"

const Sidebar = () => {
  const { recentPosts, setRecentPosts, setIsLoading } = useContext(AppContext)

  const API_URL = `/api/posts/`

  const fetchRecentPosts = async () => {
    setIsLoading(true)

    try {
      const response = await axios.get(API_URL)

      if (response.data) {
        setRecentPosts(response.data)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      toast.dark("Gündeme ulaşırken problem oluştu")
    }
  }

  useEffect(() => {
    if (recentPosts === "") {
      fetchRecentPosts()
    }
    // eslint-disable-next-line
  }, [recentPosts])

  return (
    <div className="sidebar-container">
      <h3>Gündem</h3>
      <button onClick={() => fetchRecentPosts()}>
        <IoRefreshCircle />
      </button>
      <div className="recent-posts">
        {recentPosts !== ""
          ? recentPosts?.map((post, idx) => (
              <div className="recent-post" key={idx}>
                <Link to={`/posts/${post._id}`}>
                  <h5>{post.title}</h5>
                  <h5>{post.comments.length + 1}</h5>
                </Link>
              </div>
            ))
          : ""}
      </div>
    </div>
  )
}
export default Sidebar
