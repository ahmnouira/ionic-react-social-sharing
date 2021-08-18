import * as React from 'react'
import { UseIonHeaderParallaxResult } from './useIonicHeaderParallax'

type IonHeaderParallaxProps = Pick<UseIonHeaderParallaxResult, 'colorOverlayStyle' | 'imageOverlayStyle'> & {
  image: string
}

export const IonHeaderParallax: React.FC<React.PropsWithChildren<IonHeaderParallaxProps>> = ({
  children,
  image,
  colorOverlayStyle,
  imageOverlayStyle,
}: React.PropsWithChildren<IonHeaderParallaxProps>) => {
  return (
    <div className='color-overlay' style={colorOverlayStyle}>
      <div
        className='image-overlay'
        style={{
          ...imageOverlayStyle,
          backgroundImage: `url(${image})`,
        }}>
        {children}
      </div>
    </div>
  )
}
