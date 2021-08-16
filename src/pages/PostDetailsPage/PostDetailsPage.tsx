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
import { useParams } from 'react-router'
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

  const contentRef = React.useRef(null)

  /*

  ngOnInit(){
    let content = this.element.nativeElement.getElementsByClassName('scroll-content')[0];
    this.header = content.getElementsByClassName('header-image')[0];
    let mainContent = content.getElementsByClassName('main-content')[0];
    this.headerHeight = this.header.clientHeight;
    this.renderer.setElementStyle(this.header, 'webkitTransformOrigin', 'center bottom');
    this.renderer.setElementStyle(this.header, 'background-size', 'cover');
    this.renderer.setElementStyle(mainContent, 'position', 'absolute');

  }
  */

  React.useEffect(() => {
    if (contentRef) {
    }
  }, [])

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
          <IonContent ref={contentRef}>
            <div className='header-image'>
              <img src={post.image} style={{objectFit: "contain", objectPosition: 'center', width: '100%' }} />
            </div>
            <div className='main-content'>
              <h2>{post.title}</h2>
              <p>
                {post.content}
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
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
