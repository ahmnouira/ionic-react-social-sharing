import { Link, RouteComponentProps } from 'react-router-dom'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/react'
import { posts } from '../../mocks/posts'
import { Post } from '../../components/Post'
import './PostListPage.css'

export function PostListPage({}) {
  const renderPosts = posts.map((post) => {
    return (
      <IonItem  key={post.id} routerLink={`/home/posts/${post.id}`}>
        <Post post={post} />
      </IonItem>
    )
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SocialSharing</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>{renderPosts}</IonList>
      </IonContent>
    </IonPage>
  )
}
