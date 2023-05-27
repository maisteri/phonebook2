import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import LoggedIn from './components/LoggedIn'
import BlogCreate from './components/BlogCreate'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationMessageType, setNotificationMessageType] = useState('')
  const [visible, setVisible] = useState(false)

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const notify = (message, type) => {
    setNotificationMessage(message)
    setNotificationMessageType(type)
    setTimeout(() => {
      setNotificationMessage('')
      setNotificationMessageType('')
    }, 3000)
  }

  const addLike = async (blog) => {
    await blogService.update(blog.id, {
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    })
    setBlogs(
      blogs.map((entry) => {
        if (entry.id === blog.id) {
          entry.likes += 1
        }
        return entry
      })
    )
  }

  const removeBlog = async (id) => {
    try {
      const sure = window.confirm('Are you sure?')
      if (sure) {
        const blog = await blogService.remove(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
        notify(`deleted a blog ${blog.title} by ${blog.author}!`, 'success')
      }
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  const addBlog = async ({ title, author, url }) => {
    try {
      const blog = await blogService.create({
        author,
        title,
        url,
      })
      setBlogs(blogs.concat(blog))
      notify(`a new blog ${title} by ${author} added!`, 'success')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
    setVisible(false)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      notify(`Nice to see you again ${user.name}!`, 'success')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
    setPassword('')
    setUsername('')
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  useEffect(() => {
    const initializeBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {user === null ? (
        <div>
          <Notification
            message={notificationMessage}
            type={notificationMessageType}
          />
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification
            message={notificationMessage}
            type={notificationMessageType}
          />
          <LoggedIn name={user.name} handleLogout={handleLogout} />
          <Togglable
            buttonLabel="new blog"
            visible={visible}
            setVisible={setVisible}
          >
            <BlogCreate addBlog={addBlog} />
          </Togglable>
          {sortedBlogs.map((blog) => {
            console.log(
              'blog user: ' + blog.user + 'system user: ' + user.username
            )
            return (
              <Blog
                creatorLoggedIn={blog.user.username === user.username}
                key={blog.id}
                blog={blog}
                addLike={addLike}
                removeBlog={removeBlog}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App

