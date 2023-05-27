const listHelper = require('../utils/list_helper')

describe('most likes blog', () => {

  const author = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }

  test('author with most likes found correctly', () => {
    const mostLikesBlog = listHelper.mostLikes(listHelper.blogList)
    expect(mostLikesBlog).toEqual(author)
  })

  test('undefined returned if bloglist is empty', () => {
    const mostLikesBlog = listHelper.mostLikes([])
    expect(mostLikesBlog).toEqual(undefined)
  })

})