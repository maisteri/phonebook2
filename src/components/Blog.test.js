import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: '63c84a050935837c4c9036fc'
}

describe('tests for <Blog />', () => {

  test('renders content', () => {
    render(<Blog blog={blog} />)
    screen.getByText(`${blog.title}, ${blog.author}`)
  })


  test('clicking _the_ button makes url and likes visible', async () => {
    render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const button = screen.getByText(`${blog.title}, ${blog.author}`)
    await user.click(button)
    screen.getByText(blog.url, { exact: false })
    screen.getByText(`likes ${blog.likes}`, { exact: false })
  })


  test('clicking the like button calls likeHandler twice', async () => {
    const mockLikesHandler = jest.fn()
    render(<Blog blog={blog} addLike={mockLikesHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText(`${blog.title}, ${blog.author}`)
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockLikesHandler.mock.calls).toHaveLength(2)
  })

})