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

import './PostDetailsPage.css'

type ParamsType = {
  id: string
}

export function PostDetailsPage() {
  const params = useParams<ParamsType>()
  const [post, setPost] = useState<PostType | undefined>(undefined)

  // this.dfdf == state

  /** inputs **/
  const [maximumHeight, setMaximumHeight] = React.useState<number>(350) // @input
  const titleColor = '#AAA'
  const expandedColor = '#313131'
  const imageUrl = post?.image

  const [header, setHeader] = React.useState<HTMLElement>()

  const [toolbar, setToolbar] = React.useState<HTMLIonToolbarElement | null>()

  const [toolbarBackground, setToolbarBackground] = React.useState<Element | null>()

  const [ionTitle, setIonTitle] = React.useState<HTMLIonTitleElement | null>()
  const [barButtons, setBarButton] = React.useState<HTMLIonButtonsElement | null>()
  const [scrollContent, setScrollContent] = React.useState<Element | null>()

  const [imageOverlay, setImageOverlay] = React.useState<HTMLElement>()
  const [colorOverlay, setColorOverlay] = React.useState<HTMLElement>()

  const [overlayTitle, setOverlayTitle] = React.useState<HTMLElement>()

  /** styles */
  const [headerStyles, setHeaderStyle] = React.useState<React.CSSProperties>()
  const [mainContentStyles, setMainContentStyles] = React.useState<React.CSSProperties>()
  const [colorOverlayStyle, setColorOverlayStyle] = React.useState<React.CSSProperties>({})
  const [imageOverlayStyle, setImageOverlayStyle] = React.useState<React.CSSProperties>({})
  const [overlayTitleStyle, setOverlayTitleStyle] = React.useState<React.CSSProperties>({})
  const [toolbarTitleStyle, setToolbarTitleStyle] = React.useState<React.CSSProperties>({})
  const [toolbarBackgroundStyle, setToolbarBackgroundStyle] = React.useState<React.CSSProperties>({})

  const [headerHeight, setHeaderHeight] = React.useState<number>(0)
  const [headerMinHeight, setHeaderMinHeight] = React.useState<number>(0)

  const [translateAmt, setTranslateAmt] = React.useState<number>()
  const [scaleAmt, setScaleAmt] = React.useState<number>()

  const [ticking, setTicking] = React.useState<boolean>(false)

  const [scrollContentPaddingTop, setScrollContentPaddingTop] = React.useState<any>()

  const [originalToolbarBgColor, setOriginalToolbarBgColor] = React.useState<string>()

  const contentRef = React.useRef(null)
  const headerRef = React.useRef<any>()

  const [childern, setChildern] = React.useState<JSX.Element[]>()

  // inits
  React.useEffect(() => {
    const header: HTMLIonHeaderElement = document.getElementsByTagName('ion-header')[0]
    const parentElement = header.parentElement

    if (!parentElement) throw new Error('No parentElemnt')

    const toolbar = header.querySelector('ion-toolbar')
    setToolbar(toolbar)

    if (!toolbar) throw new Error('Parallax requires a <ion-toolbar> or navbar element on the page to work.')

    const ionTitle = toolbar.querySelector('ion-title')

    setIonTitle(ionTitle)

    if (!toolbar.shadowRoot) throw new Error('Parallax requires a <ion-toolbar> with shadow root.')

    const toolbarBackground = toolbar.shadowRoot.querySelector('.toolbar-background')
    setToolbarBackground(toolbarBackground)

    if (!toolbarBackground) throw new Error('No .toolbar-background')

    const barButtons = header.querySelector('ion-buttons')
    setBarButton(barButtons)

    const ionContent = parentElement.querySelector('ion-content')

    if (!ionContent) throw new Error('Parallax directive requires an <ion-content> element on the page to work.')

    if (!ionContent.shadowRoot) throw new Error('Parallax requires a shadowRoot <ion-content>')

    const scrollContent = ionContent.shadowRoot.querySelector('.inner-scroll')

    if (!scrollContent) {
      throw new Error('Parallax directive requires an <ion-content> element on the page to work.')
    }

    setScrollContent(scrollContent)

    /**  Copy title and buttons **/
    const overlayTitle = ionTitle && (ionTitle.cloneNode(true) as HTMLElement)
    let childs: JSX.Element[] = []

    if (overlayTitle) {
      // overlayTitle.classList.add('parallax-title')

      const toolbarTitle = overlayTitle.shadowRoot?.querySelector('.toolbar-title')
      setToolbarTitleStyle({
        pointerEvents: 'unset',
      })
    }

    if (barButtons) {
      // childs.push(barButtons)
    }

    setChildern(childs)

    // init for styles

    setHeaderHeight(scrollContent.clientHeight)
    setTicking(false)

    // fetch styles
    setMaximumHeight(parseFloat(maximumHeight.toString()))

    setHeaderMinHeight(toolbar.offsetHeight)

    let scrollContentPaddingTop: number = parseFloat(
      window.getComputedStyle(scrollContent, null).paddingTop.replace('px', '')
    )

    setScrollContentPaddingTop(scrollContentPaddingTop)

    const originalToolbarBgColor = window.getComputedStyle(toolbarBackground, null).backgroundColor

    if (!originalToolbarBgColor) {
      throw new Error('Error: toolbarBackround is null.')
    }

    setOriginalToolbarBgColor(originalToolbarBgColor)

    // header and title

    setHeaderStyle({
      position: 'relative',
    })

    // rerender here
    setOverlayTitleStyle({
      color: titleColor,
      position: 'absolute',
      width: '100%',
      height: '100%',
      textAlign: 'center',
    })

    // color overlay
    setColorOverlayStyle({
      backgroundColor: originalToolbarBgColor,
      height: `${maximumHeight}px`,
      position: 'absolute',
      top: `${-headerMinHeight * 0}px`,
      left: '0',
      width: '100%',
      zIndex: 10,
      pointerEvents: 'none',
    })

    // image overlay
    setImageOverlayStyle({
      backgroundColor: expandedColor,
      backgroundImage: `url(${imageUrl})`,
      height: '100%',
      width: '100%',
      pointerEvents: 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    })

    setToolbarBackgroundStyle({
      backgroundColor: originalToolbarBgColor,
    })

    /*

       // .bar-buttons
       if (this.barButtons) {
         this.renderer.setStyle(this.barButtons, 'pointer-events', 'all');
         Array.from(this.barButtons.children).forEach(btn => {
           this.renderer.setStyle(btn, 'color', this.titleColor);
         });
       }
   
       // .scroll-content
       if (this.scrollContent) {
         this.renderer.setAttribute(this.scrollContent, 'parallax', '');
         this.renderer.setStyle(this.scrollContent, 'padding-top',
           `${this.maximumHeight + this.scrollContentPaddingTop - this.headerMinHeight}px`);
       }
       */
  }, [imageUrl])

  useEffect(() => {
    const header = headerRef.current
    if (header) {
      setHeaderHeight(header?.clientHeight)
    }
  }, [headerStyles])

  // handle scroll
  const handleOnIonScroll = (ev: any) => {
    if (!scrollContent || !toolbar) {
      return
    }

    const scrollTop = ev.detail.scrollTop
    if (ev.detail.scrollTop >= 0) {
      setTranslateAmt(ev.detail.scrollTop / 2)
      setScaleAmt(1)
    } else {
      setTranslateAmt(0)
      setScaleAmt(-ev.detail.scrollTop / (headerHeight + 1))
    }

    // Parallax total progress
    setHeaderMinHeight(toolbar.offsetHeight)
    let progress = (maximumHeight - scrollTop - headerMinHeight) / (maximumHeight - headerMinHeight)
    progress = Math.max(progress, 0)

    // ion-header: set height
    let targetHeight = maximumHeight - scrollTop
    targetHeight = Math.max(targetHeight, headerMinHeight)

    // .toolbar-background: change color
    setImageOverlayStyle({
      ...imageOverlayStyle,
      height: `${targetHeight}px`,
      // opacity: `${progress}`,
    })

    setColorOverlayStyle({
      ...colorOverlayStyle,
      height: `${targetHeight}px`,
      //opacity: targetHeight > headerMinHeight ? '1' : '0',
    })

    setToolbarBackgroundStyle({
      backgroundColor: targetHeight > headerMinHeight ? 'transparent' : originalToolbarBgColor,
    })

    setTicking(false)
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

  const toolbarElement  = 
  (
  <IonToolbar style={{}}>
  <IonButtons slot='start'>
    <IonBackButton defaultHref='/' />
  </IonButtons>
  <IonTitle style={toolbarTitleStyle}>Post Details</IonTitle>
  <IonButtons slot='end'>
    <IonButton>Button</IonButton>
  </IonButtons>
</IonToolbar>
  )

  const lorem = (
    <p>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
    electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
    of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
    like Aldus PageMaker including versions of Lorem Ipsum.
  </p>
  )

  return (
    <React.Fragment>
      <IonPage>
        <IonHeader translucent>
          {toolbarElement}
          <div className='color-overlay' style={colorOverlayStyle}>
            <div className='image-overlay' style={imageOverlayStyle}>
              {toolbarElement}
            </div>
          </div>
        </IonHeader>
        <IonContent class='ion-padding' ref={contentRef} scrollEvents onIonScroll={handleOnIonScroll}>
          <div style={{ marginTop: 300 }}>
            <h2>{post?.title}</h2>
            <p>{post?.content}</p>
              {
                Array(20).fill(1).map((el, index) => (
                  <div key={index}>
                      {lorem}
                    </div>
                ))
              }
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
