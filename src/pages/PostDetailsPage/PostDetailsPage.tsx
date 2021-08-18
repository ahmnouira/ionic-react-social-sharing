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

  /** styles */
  const [headerStyles, setHeaderStyle] = React.useState<React.CSSProperties>()
  const [mainContentStyles, setMainContentStyles] = React.useState<React.CSSProperties>()
  const [colorOverlayStyle, setColorOverlayStyle] = React.useState<React.CSSProperties>({})
  const [imageOverlayStyle, setImageOverlayStyle] = React.useState<React.CSSProperties>({})
  const [overlayTitleStyle, setOverlayTitleStyle] = React.useState<React.CSSProperties>({})
  const [toolbarTitleStyle, setToolbarTitleStyle] = React.useState<React.CSSProperties>({})

  const [headerHeight, setHeaderHeight] = React.useState<number>(0)

  const [translateAmt, setTranslateAmt] = React.useState<number>()
  const [scaleAmt, setScaleAmt] = React.useState<number>()

  const contentRef = React.useRef(null)
  const headerRef = React.useRef<any>()

  // inits
  React.useEffect(() => {
    const header: HTMLIonHeaderElement = document.getElementsByTagName('ion-header')[0]

    const parentElement = header.parentElement

    if (!parentElement) throw new Error('No parentElemnt')

    const toolbar = header.querySelector('ion-toolbar')

    if (!toolbar) throw new Error('Parallax requires a <ion-toolbar> or navbar element on the page to work.')

    const ionTitle = toolbar.querySelector('ion-title')

    if (!toolbar.shadowRoot) throw new Error('Parallax requires a <ion-toolbar> with shadow root.')

    const toolbarBackground = toolbar.shadowRoot.querySelector('.toolbar-background')

    const barButtons = header.querySelector('ion-buttons')

    const ionContent = parentElement.querySelector('ion-content')

    if (!ionContent) throw new Error('Parallax directive requires an <ion-content> element on the page to work.')

    if (!ionContent.shadowRoot) throw new Error('Parallax requires a shadowRoot <ion-content>')

    const scrollContent = ionContent.shadowRoot.querySelector('.inner-scroll')

    if (!scrollContent) {
      throw new Error('Parallax directive requires an <ion-content> element on the page to work.')
    }

    console.log('main', scrollContent)

    /**  Copy title and buttons **/
    const overlayTitle = ionTitle && (ionTitle.cloneNode(true) as HTMLElement)

    if (overlayTitle) {
      ////// this.renderer.addClass(this.overlayTitle, 'parallax-title');
      setTimeout(() => {
        const toolbarTitle = overlayTitle.shadowRoot?.querySelector('.toolbar-title')

        console.log('toolbar', toolbarTitle)

        setToolbarTitleStyle({
          pointerEvents: 'unset',
        })
      })
    }
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (header) {
      setHeaderHeight(header?.clientHeight)
    }
  }, [headerStyles])

  // handle scroll
  const handleOnIonScroll = (ev: any) => {
    if (ev.detail.scrollTop >= 0) {
      setTranslateAmt(ev.detail.scrollTop / 2)
      setScaleAmt(1)
    } else {
      setTranslateAmt(0)
      setScaleAmt(-ev.detail.scrollTop / (headerHeight + 1))
    }

    /*
        // Parallax total progress
        this.headerMinHeight = this.toolbar.offsetHeight;
        let progress = (this.maximumHeight - this.scrollTop - this.headerMinHeight) / (this.maximumHeight - this.headerMinHeight);
        progress = Math.max(progress, 0);
    
        // ion-header: set height
        let targetHeight = this.maximumHeight - this.scrollTop;
        targetHeight = Math.max(targetHeight, this.headerMinHeight);
*/
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
      <IonPage>
        <IonHeader ref={headerRef}>
          <div className='color-overlay' style={colorOverlayStyle}>
            <div
              className='image-overlay'
              style={{
                ...imageOverlayStyle,
              }}>
              <IonToolbar>
                <IonButtons slot='start'>
                  <IonBackButton />
                </IonButtons>
                <IonTitle>Post Details</IonTitle>
              </IonToolbar>
            </div>
          </div>
        </IonHeader>
        <IonContent ref={contentRef} scrollEvents onIonScroll={handleOnIonScroll}>
          <div style={{}}>
            <h2>{post?.title}</h2>
            <p>{post?.content}</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
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
    </React.Fragment>
  )
}
