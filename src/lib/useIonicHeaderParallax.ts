import * as React from 'react'

export type UseIonHeaderParallaxInput = {
  image: string
  expandedColor: string
  titleColor: string
  maximumHeight?: number
}

export type UseIonHeaderParallaxResult = {
  ref: React.MutableRefObject<HTMLElement | null>
  onScroll: (ev: any) => void
  colorOverlayStyle: React.CSSProperties
  imageOverlayStyle: React.CSSProperties
  overlayTitleStyle: React.CSSProperties
  toolbarTitleStyle: React.CSSProperties
  headerStyle: React.CSSProperties
}

export interface EventScroll {
  detail: {
    scrollTop: number
  }
}

export function useIonHeaderParallax({
  titleColor,
  image,
  expandedColor,
  maximumHeight = 300,
}: UseIonHeaderParallaxInput): UseIonHeaderParallaxResult {
  let header: HTMLElement
  let toolbarBackground: HTMLElement | null
  let barButtons: HTMLElement | null
  let scrollContent: HTMLElement | null
  let scrollTop: number
  let lastScrollTop: any
  let ticking: any
  let originalToolbarBgColor: string
  let overlayTitle: HTMLElement | null
  let ionTitle: HTMLElement | null
  let overlayButtons: HTMLElement[]
  let scrollContentPaddingTop: string | number

  const [headerStyle, setHeaderStyle] = React.useState<React.CSSProperties>({})
  const [mainContentStyle, setMainContentStyle] = React.useState<React.CSSProperties>()
  const [colorOverlayStyle, setColorOverlayStyle] = React.useState<React.CSSProperties>({})
  const [imageOverlayStyle, setImageOverlayStyle] = React.useState<React.CSSProperties>({})
  const [overlayTitleStyle, setOverlayTitleStyle] = React.useState<React.CSSProperties>({})
  const [toolbarTitleStyle, setToolbarTitleStyle] = React.useState<React.CSSProperties>({})

  const [toolbar, setToolbar] = React.useState<HTMLElement>()

  const [headerHeight, setHeaderHeight] = React.useState<number>(0)
  const [headerMinHeight, setHeaderMinHeight] = React.useState<number>(0)

  const [translateAmt, setTranslateAmt] = React.useState<number>()
  const [scaleAmt, setScaleAmt] = React.useState<number>()

  const contentRef = React.useRef(null)

  const headerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setTimeout(() => {
      try {
        initElements()
        initStyles()
        initEvents()
      } catch (e) {
        throw e
      }
    }, 100)
  }, [image])

  const initElements = () => {
    if (!(headerRef && headerRef.current)) throw new ReferenceError('Ref is required to be set to <ion-header />')

    const parentElement = headerRef.current.parentElement

    if (!parentElement) throw new Error('No parentElemnt')

    header = headerRef.current

    // check this
    const tool = header.querySelector('ion-toolbar')

    if (!tool) {
      throw new Error('Parallax requires a <ion-toolbar> or navbar element on the page to work.')
    }

    setToolbar(tool)

    if (!tool.shadowRoot) {
      throw new Error('Parallax requires a shadowRoot <ion-toolbar>')
    }

    ionTitle = tool.querySelector('ion-title')

    toolbarBackground = tool.shadowRoot.querySelector('.toolbar-background')

    console.log('toolbarBackground', toolbarBackground)

    barButtons = header.querySelector('ion-buttons')

    const ionContent = parentElement.querySelector('ion-content')

    if (!ionContent) throw new Error('Parallax directive requires an <ion-content> element on the page to work.')

    if (!ionContent.shadowRoot) throw new Error('Parallax requires a shadowRoot <ion-content>')

    scrollContent = ionContent.shadowRoot.querySelector('.inner-scroll')

    if (!scrollContent) {
      throw new Error('Parallax directive requires an <ion-content> element on the page to work.')
    }

    setHeaderHeight(scrollContent.clientHeight)

    console!.log('headerHeight', headerHeight)

    // Create image overlay

    /*
    imageOverlay = document.createElement('div')
    console.log('imageOverlay', imageOverlay)
    imageOverlay.classList.add('image-overlay')

    colorOverlay = document.createElement('div')

    colorOverlay.classList.add('color-overlay')

    colorOverlay.appendChild(imageOverlay)
    header.appendChild(colorOverlay)
    */

    // Copy title and buttons
    overlayTitle = ionTitle && (ionTitle.cloneNode(true) as HTMLElement)

    if (!overlayTitle) throw new Error('')
    overlayTitle.classList.add('parallax-title')

    setTimeout(() => {
      const toolbarTitle = overlayTitle?.shadowRoot?.querySelector('.toolbar-title') as HTMLElement
      if (toolbarTitle) toolbarTitle.style.pointerEvents = 'unset'
    })

    /*
    if (overlayTitle) {
      imageOverlay.appendChild(overlayTitle)
    }
    if (barButtons) {
      imageOverlay.appendChild(barButtons)
    }*/
  }

  const initStyles = () => {
    ticking = false

    if (!scrollContent || !toolbar) {
      return
    }

    // fetch styles

    setHeaderMinHeight(toolbar.offsetHeight)

    scrollContentPaddingTop = window.getComputedStyle(scrollContent, null).paddingTop.replace('px', '')
    scrollContentPaddingTop = parseFloat(scrollContentPaddingTop)

    if (!toolbarBackground) return

    originalToolbarBgColor = window.getComputedStyle(toolbarBackground, null).backgroundColor

    if (!originalToolbarBgColor) {
      throw new Error('Error: toolbarBackround is null.')
    }

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
      height: '100%',
      width: '100%',
      pointerEvents: 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    })
  }

  const initEvents = () => {}

  const onScroll = (e: EventScroll) => {
    if (!toolbar) return

    scrollTop = e.detail.scrollTop
    if (scrollTop >= 0) {
      setTranslateAmt(scrollTop / 2)
      setScaleAmt(1)
    } else {
      setTranslateAmt(0)
      setScaleAmt(-scrollTop / headerHeight + 1)
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
      opacity: `${progress}`,
    })

    setColorOverlayStyle({
      ...colorOverlayStyle,
      height: `${targetHeight}px`,
      opacity: targetHeight > headerMinHeight ? '1' : '0',
    })

    /*  this.renderer.setStyle(this.toolbarBackground, 'background-color',
         targetHeight > this.headerMinHeight ? 'transparent' : this.originalToolbarBgColor);
*/
  }

  return {
    ref: headerRef,
    onScroll,
    colorOverlayStyle,
    imageOverlayStyle,
    overlayTitleStyle,
    headerStyle,
    toolbarTitleStyle,
  }
}
