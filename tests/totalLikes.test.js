const listHelper = require('../utils/list_helper')

describe('total likes', () => {

  test('testing if total likes is 36', () => {
    const result = listHelper.totalLikes(listHelper.blogList)
    expect(result).toBe(36)
  })

  test('app cant crash if list is empty. And nbr of likes is 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const listA = []
    listA.push(listHelper.blogList[0])
    const result = listHelper.totalLikes(listA)
    expect(result).toBe(7)
  })

})