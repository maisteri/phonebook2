import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, creatorLoggedIn }) => {

  const [showAll, setShowAll] = useState(false)

  const handleDelete = event => {
    event.preventDefault()
    removeBlog(blog.id)
  }

  const handleLike = event => {
    event.preventDefault()
    addLike(blog)
  }
  return (
    showAll
      ?
      <div className="blogStyle">
        {blog.title}, {blog.author}
        <button id='hideButton' onClick={() => setShowAll(false)}>hide</button><br />
        {blog.url}<br />
        likes {blog.likes} <button id='likeButton' onClick={handleLike}>like</button><br />
        {blog.user.name}<br />
        <button
          style={{ display: creatorLoggedIn ? 'inline' : 'none' }}
          className='btn-delete'
          onClick={handleDelete}>
          remove
        </button>
      </div>
      :
      <div className="blogStyle">
        <button
          id='blogInfoButton'
          className='btn blog'
          onClick={() => setShowAll(true)}>{blog.title}, {blog.author}
        </button>
      </div>
  )}

export default Blog