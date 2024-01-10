## createImageComponent

 传入指定参数，创建 web 和 h5 通用的图片组件，默认启用懒加载，不需要懒加载图片可自定义 children 透传 src

```typescript
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
```

## LazyImage

懒加载图片组件

```typescript
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
```
