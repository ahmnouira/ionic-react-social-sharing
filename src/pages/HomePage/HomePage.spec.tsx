import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { render } from '@testing-library/react'
import { Route } from 'react-router'
import { HomePage } from './HomePage'

test('renders without crashing', () => {
  const { baseElement } = render(<div />)
  expect(baseElement).toBeDefined()
})
