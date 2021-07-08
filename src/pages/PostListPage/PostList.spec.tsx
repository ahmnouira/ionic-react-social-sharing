import { render } from '@testing-library/react'
import { PostListPage } from './PostListPage'

test('renders without crashing', () => {
  const { baseElement } = render(<PostListPage />)
  expect(baseElement).toBeDefined()
})
