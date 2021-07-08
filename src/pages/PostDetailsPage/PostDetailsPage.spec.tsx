import { render } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router'
import { PostDetailsPage } from './PostDetailsPage'

test('renders without crashing', () => {
  const { baseElement } = render(
    <MemoryRouter initialEntries={['home/posts/2']}>
      <Route path='/home/posts/:id'>
        <PostDetailsPage />
      </Route>
    </MemoryRouter>
  )
  expect(baseElement).toBeDefined()
})
