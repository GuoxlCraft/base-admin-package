export interface TransformTypes {
  scale: number
  deg: number
  offsetX: number
  offsetY: number
  enableTransition: boolean
}

export type ActionTypes = 'zoomOut' | 'zoomIn' | 'clocelise' | 'anticlocelise'

export interface PreviewTypes {
  index?: number

  show?: boolean

  list?: IObj

  zIndex?: number

  infinite?: boolean

  loading?: boolean

  onClose?: Nullable<Fn>

  onSelect?: Nullable<Fn>

  mode?: IObj

  transform?: TransformTypes
}
