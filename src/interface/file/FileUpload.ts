export interface RcFile extends File {
  uid: string
  readonly lastModifiedDate: Date
}
export interface UploadFile<T = any> {
  uid: string
  size?: number
  name: string
  fileName?: string
  lastModified?: number
  lastModifiedDate?: Date
  url?: string
  percent?: number
  thumbUrl?: string
  originFileObj?: RcFile
  response?: T
  error?: any
  linkProps?: any
  type?: string
  xhr?: T
  preview?: string
}
