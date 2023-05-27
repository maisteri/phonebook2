const blogList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '63c84a050935837c4c9036fc',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '63c84a050935837c4c9036fc',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '63c84a050935837c4c9036fc',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '63c84a050935837c4c9036fc',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '63c84a050935837c4c9036fc',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '63c84a050935837c4c9036fc',
    __v: 0
  }
]

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzYzg0YTA1MDkzNTgzN2M0YzkwMzZmYyIsImlhdCI6MTY3NDA3MDU5Mn0.ywj6OiXhlYFMAHqB0_sMef0BITvqgaF_WSgxtW_G8Mo'

const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum = sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined
  return blogs.reduce((favoriteBlog, blog) => {
    return blog.likes > favoriteBlog.likes ? blog : favoriteBlog
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  const authorDict = blogs.reduce((authors, blog) => {
    if (blog.author in authors) {
      authors[blog.author] += 1
      return authors
    } else {
      authors[blog.author] = 1
      return authors
    }
  }, {})

  const mostBlogsAuthor = {
    author: '',
    blogs: 0
  }

  for (const author in authorDict) {
    if (mostBlogsAuthor.blogs < authorDict[author]) {
      mostBlogsAuthor.author = author
      mostBlogsAuthor.blogs = authorDict[author]
    }
  }
  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  const authorDict = blogs.reduce((authors, blog) => {
    if (blog.author in authors) {
      authors[blog.author] += blog.likes
      return authors
    } else {
      authors[blog.author] = blog.likes
      return authors
    }
  }, {})

  const mostLikesAuthor = {
    author: '',
    likes: 0
  }

  for (const author in authorDict) {
    if (mostLikesAuthor.likes < authorDict[author]) {
      mostLikesAuthor.author = author
      mostLikesAuthor.likes = authorDict[author]
    }
  }
  return mostLikesAuthor
}

module.exports = {
  token,
  dummy,
  totalLikes,
  favoriteBlog,
  blogList,
  mostBlogs,
  mostLikes
}