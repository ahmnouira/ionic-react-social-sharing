import { render } from '@testing-library/react'
import { Post } from './Post'
import { Post as PostType } from '../../models/post'
import { posts } from '../../mocks/posts'

test('renders without crashing', () => {
  const randomPost: PostType = posts[Math.floor(Math.random() * posts.length)]
  const { baseElement } = render(<Post post={randomPost} />)
  expect(baseElement).toBeDefined()
})
