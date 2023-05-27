const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {

  test('favorite blog found correctly', () => {
    const favBlog = listHelper.favoriteBlog(listHelper.blogList)
    expect(favBlog).toEqual(listHelper.blogList[2])
  })

  test('undefined returned if bloglist is empty', () => {
    const favBlog = listHelper.favoriteBlog([])
    expect(favBlog).toEqual(undefined)
  })

})