import * as React from 'react'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
  IonButtons,
  IonBackButton,
  IonFooter,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { posts } from '../../mocks/posts'
import { Post as PostType } from '../../models/post'
import { shareOutline, bookmarkOutline, heartOutline } from 'ionicons/icons'
import { share } from '../../services/sharing.service'
import { useIonHeaderParallax } from 'ionic-react-header-parallax'
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

 const {ref} = useIonHeaderParallax({
    image: post?.image || '',
    titleColor: 'red',
  })

  const lorem = (
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
      type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
    </p>
  )

  return (
    <React.Fragment>
      <IonPage>
        <IonHeader translucent mode='ios' ref={ref}>
          <IonToolbar mode='ios'>
            <IonButtons slot='start'>
              <IonBackButton defaultHref='/' />
            </IonButtons>
            <IonTitle>Post Details</IonTitle>
            <IonButtons slot='end'>
              <IonButton>Button</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent class='ion-padding'>
          <h2>{post?.title}</h2>
          <p>{post?.content}</p>
          {Array(20)
            .fill(1)
            .map((el, index) => (
              <div key={index}>{lorem}</div>
            ))}
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
    </React.Fragment>
  )
}
