import React, { useState, ReactNode, useMemo } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { fastUrlUtils } from '@nbit/utils'

const { getFastUrl, getUrlWithTimestamp, injectThemeImgUrl } = fastUrlUtils

/** 主题 */
enum ThemeEnum {
  light = 'light',
  dark = 'dark',
}

export enum ImageType {
  svg = '.svg',
  png = '.png',
}

type ImgDimension = {
  width?: number
  height?: number
}

export type IImageProps = {
  /** 图片地址 * */
  src: string
  width?: number
  height?: number
  imageType?: ImageType
  /** 图片底部名称 * */
  imageName?: string
  /** 是否是主题色图片 * */
  hasTheme?: boolean
  className?: string
  /** 是否圆角 * */
  round?: boolean
  /** 圆角大小 * */
  radius?: number
  alt?: string
  /** 加载图标和失败图标的大小 * */
  iconSize?: number | string
  loadFailIcon?: ReactNode
  /** 图片加载失败时触发 * */
  onError?: () => void
  /** 图片加载完毕时触发 * */
  afterLoad?: () => void
  /**  在占位符被图像元素替换之前调用的函数。* */
  beforeLoad?: () => void
  renderOriginalSize?: boolean
  /** 是否需要占位图片 * */
  whetherPlaceholdImg?: boolean
   /** 默认需要懒加载功能，要一层包装，不需要的话也可以传入函数作为 children 拿到 url 渲染自定义图片  */
  children?: (props: Omit<IImageProps, 'children'>) => React.ReactNode
}


export type ICreateImageComponentParams = {
  /** 渐变色地址 */
  oss_svg_image_domain_address: string
  /** 获取主题的 hook */
  useTheme: () => ThemeEnum
  /** 自定义各部分类名 */
  classNameConfig?: {
    /** 懒加载图片容器类 */
    lazyImageWrapper?: string
    /** 懒加载图片容器有圆角类 */
    lazyImageWrapperRound?: string
    /** 懒加载图片标签类 */
    lazyImageLabel?: string
  }
}
function getImageUrl({
  src,
  imageType,
  hasTheme,
  themeName,
}: {
  src: string
  imageType?: ImageType
  themeName: string
  hasTheme?: boolean
}) {
  if (typeof src !== 'string') {
    console.error('Image: 传入的 src 非字符串请检查', src)
    return src
  }
  const _src = getFastUrl(src)
  if (hasTheme) {
    if (imageType) {
      return injectThemeImgUrl(`${_src}${imageType}`, themeName)
    }
    return injectThemeImgUrl(`${_src}`, themeName)
  }
  if (imageType) {
    return `${_src}${imageType}`
  }
  return `${_src}`
}
/**
 * 传入指定参数，创建 web 和 h5 通用的图片组件，默认启用懒加载，不需要懒加载图片可自定义 children 透传 src
 * `如 <Image src={src2} hasTheme>{({ src }) => <img  src={src} />}</Image>`
 */
function createImageComponent({
  oss_svg_image_domain_address,
  useTheme,
  classNameConfig = {},
}: ICreateImageComponentParams) {
  const LazyImage = (props: IImageProps) => {
    const {
      src,
      round = false,
      className,
      hasTheme,
      imageName,
      imageType,
      children,
      loadFailIcon,
      renderOriginalSize = false,
      whetherPlaceholdImg = false,
      ...other
    } = props
    const theme = useTheme()
    const themeName = theme === ThemeEnum.dark ? '_black' : '_white'
    /** 渐变色 svg * */
    const svgAddress = oss_svg_image_domain_address

    const [dimensions, setDimensions] = useState<ImgDimension>({})

    const loadFailIconSrc = `${svgAddress}load_fail_icon${themeName}${ImageType.svg}`
    /** 加载失败或加载时的图像 src * */
    const placeholderNode = whetherPlaceholdImg ? loadFailIcon || (
      <img
        src={getUrlWithTimestamp(loadFailIconSrc)}
        alt={other.alt}
        width={renderOriginalSize ? dimensions.width : other.width}
        height={renderOriginalSize ? dimensions.height : other.height}
      />
    ) : undefined

    /**
     * retrieve img original size
     */
    const onImgLoad = ({ target }: { target: HTMLImageElement }) => {
      setDimensions({
        width: target.naturalWidth,
        height: target.naturalHeight,
      })
      return true
    }

    const href = getImageUrl({
      src,
      imageType,
      themeName,
      hasTheme,
    })
    if (children) {
      return children({
        ...props,
        src: href,
      })
    }
    if (!href) {
      // fix：api 加载的时候图片内容，如果图片的地址为空，则直接返回占位。
      return (
        <span
          style={{
            width: other.width || 0,
            height: other.height || 0,
          }}
        />
      )
    }

    const placeholder = placeholderNode ? { placeholder: placeholderNode } : {}
    return (
      <div
        style={{ width: other.width, height: other.height }}
        className={`${className || ''} ${classNameConfig.lazyImageWrapper || ''} ${
          round ? classNameConfig.lazyImageWrapperRound : ''
        }`}
      >
        <LazyLoadImage
          {...other}
          src={getUrlWithTimestamp(href)}
          {...placeholder}
          onLoad={renderOriginalSize ? onImgLoad : () => {}}
        />
        {imageName && <label className={classNameConfig.lazyImageWrapper}>{imageName || ''}</label>}
      </div>
    )
  }

  return LazyImage
}

export default createImageComponent
