import * as React from 'react'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonLabel,
  IonButton,
  IonButtons,
  IonBackButton,
  IonFooter,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { RouteComponentProps, useParams } from 'react-router'
import { Post } from '../../components/Post'
import { posts } from '../../mocks/posts'
import { Post as PostType } from '../../models/post'
import { shareOutline, bookmarkOutline, heartOutline } from 'ionicons/icons'
import { share } from '../../services/sharing.service'

import './PostDetailsPage.css'

type ParamsType = {
  id: string
}

export function PostDetailsPage() {
  const params = useParams<ParamsType>()
  const [post, setPost] = useState<PostType | undefined>(undefined)

  useEffect(() => {
    const post: PostType | undefined = posts.find((post) => post.id.toString() === params.id)
    setPost(post)
  }, [params.id])

  const handleShare = async () => {
    if (post) {
      await share(post.title, post.image, post.source)
    }
  }

  return (
    <React.Fragment>
      {!post ? (
        <IonLabel>Loading...</IonLabel>
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot='start'>
                <IonBackButton />
              </IonButtons>
              <IonTitle>Post Details</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <Post post={post} />
          </IonContent>

          <IonFooter>
            <IonToolbar>
              <IonButtons>
                <IonButton size='large'>
                  <IonIcon slot='icon-only' icon={heartOutline} />
                </IonButton>
                <IonButton size='large' onClick={handleShare}>
                  <IonIcon slot='icon-only' icon={shareOutline} />
                </IonButton>
                <IonButton size='large'>
                  <IonIcon slot='icon-only' icon={bookmarkOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonFooter>
        </IonPage>
      )}
    </React.Fragment>
  )
}
