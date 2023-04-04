import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', async () => {
  const blog = {
    title: 'Test blog',
    author: 'Testaaja',
    url: 'testi.com',
    userId: { name: 'Jaska Jokunen' },
    likes: 10
  }

  const { container } = render(
    <Blog key={blog.id} blog={blog} />
  )

  const togglable = container.querySelector('.togglableContent')
  expect(togglable).toHaveStyle('display : none')
  expect(container).toHaveTextContent('Test blog')

}
)