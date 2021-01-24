/*Banners*/
export interface Banners {
  imageUrl: string
  targetId: number
  adid: object
  targetType: number
  titleColor: string
  typeTitle: string
  url: string
  exclusive: boolean
  monitorImpress: object
  monitorClick: object
  monitorType: object
  monitorImpressList: object
  monitorClickList: object
  monitorBlackList: object
  extMonitor: object
  extMonitorInfo: object
  adSource: object
  adLocation: object
  adDispatchJson: object
  encodeId: string
  program: object
  event: object
  video: object
  song: object
  scm: string
}

/*Banner*/
export interface Banner {
  banners: Banners[]
  code: number
}
