const listHelper = require('../utils/list_helper')

describe('most blogs', () => {

  const author = {
    author: 'Robert C. Martin',
    blogs: 3
  }

  test('most blogs author found correctly', () => {
    const mostBlogsAuthor = listHelper.mostBlogs(listHelper.blogList)
    expect(mostBlogsAuthor).toEqual(author)
  })

  test('undefined returned if list is empty', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

})