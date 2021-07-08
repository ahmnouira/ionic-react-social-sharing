import { IonRouterOutlet } from '@ionic/react'
import { Route, RouteComponentProps } from 'react-router-dom'
import { PostDetailsPage } from '../PostDetailsPage'
import { PostListPage } from '../PostListPage'
import './HomePage.css'

export function HomePage({ match }: RouteComponentProps) {
  return (
    <IonRouterOutlet>
      <Route exact path={match.url} component={PostListPage} />
      <Route path={`${match.url}/posts/:id`} component={PostDetailsPage} />
    </IonRouterOutlet>
  )
}
