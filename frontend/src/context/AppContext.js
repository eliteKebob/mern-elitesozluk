import React, { useState, useEffect } from "react"

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [recentPosts, setRecentPosts] = useState("")
  const [currentPost, setCurrentPost] = useState("")
  const [currentUser, setCurrentUser] = useState("")

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        recentPosts,
        setRecentPosts,
        currentPost,
        setCurrentPost,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export default AppContext
