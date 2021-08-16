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

  const [headerStyles, setHeaderStyle] = React.useState<React.CSSProperties>()
  const [mainContentStyles, setMainContentStyles] = React.useState<React.CSSProperties>()

  const [headerHeight, setHeaderHeight] = React.useState<number>(0)

  const [translateAmt, setTranslateAmt] = React.useState<number>()
  const [scaleAmt, setScaleAmt] = React.useState<number>()

  const contentRef = React.useRef(null)

  const headerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (headerRef) {
      const header = headerRef.current

      if (header) {
        console.log('header', header?.clientHeight)
        setHeaderHeight(header.clientHeight)
      }
      setHeaderStyle({
        WebkitTransformOrigin: 'center bottom',
        backgroundSize: 'cover',
      })
      setMainContentStyles({
        position: 'absolute',
      })
    }
  }, [headerRef])

  useEffect(() => {
    const header = headerRef.current
    if (header) {
      console.log('changed', header.clientHeight)
      setHeaderHeight(header?.clientHeight)
    }
  }, [headerStyles])

  const handleOnIonScroll = (ev: any) => {
    if (ev.detail.scrollTop >= 0) {
      setTranslateAmt(ev.detail.scrollTop / 2)
      setScaleAmt(1)
    } else {
      setTranslateAmt(0)
      setScaleAmt(-ev.detail.scrollTop / (headerHeight + 1))
    }
    setHeaderStyle({
      WebkitTransform: 'translate3d(0,' + translateAmt + 'px,0) scale(' + scaleAmt + ',' + scaleAmt + ')',
    })
  }

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
          <IonContent ref={contentRef} scrollEvents onIonScroll={handleOnIonScroll}>
            <div className='header-image' ref={headerRef} style={headerStyles}>
              <img src={post.image} style={{ objectFit: 'contain', objectPosition: 'center', width: '100%' }} />
            </div>
            <div className='main-content' style={mainContentStyles}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
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
