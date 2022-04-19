import { IoLogoGithub } from "react-icons/io5"
import { FaSpotify } from "react-icons/fa"

const Home = () => {
  return (
    <div className="main">
      <div className="landing">
        <h3>elitsözlük</h3>
        <h4>Versiyon: 1.0.0</h4>
        <a href="https://github.com/eliteKebob">
          <IoLogoGithub /> my github profile
        </a>
        <a href="https://open.spotify.com/track/0KBRMpZVUTxrU8blRUBfm3?si=463b1e28b4254e01">
          <FaSpotify /> a nice song
        </a>
      </div>
    </div>
  )
}
export default Home
