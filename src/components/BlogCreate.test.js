import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogCreate from './BlogCreate'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/'
}

test('<BlogCreate /> calls submit once and handler blog content is correct', async () => {
  const user = userEvent.setup()
  const mockAddBlog = jest.fn()

  render(<BlogCreate addBlog={mockAddBlog} />)

  const input = screen.getByPlaceholderText('title')
  const input2 = screen.getByPlaceholderText('author')
  const input3 = screen.getByPlaceholderText('test.url')

  await user.type(input, blog.title)
  await user.type(input2, blog.author)
  await user.type(input3, blog.url)

  const sendButton = screen.getByText('create')
  await user.click(sendButton)

  expect(mockAddBlog.mock.calls).toHaveLength(1)
  expect(mockAddBlog.mock.calls[0][0]).toEqual(blog)
})