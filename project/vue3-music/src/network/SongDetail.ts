/*FreeTrialPrivilege*/
export interface FreeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
}

/*Privileges*/
export interface Privileges {
  id: number
  fee: number
  payed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  toast: boolean
  flag: number
  preSell: boolean
  playMaxbr: number
  downloadMaxbr: number
  freeTrialPrivilege: FreeTrialPrivilege
  chargeInfoList: object
}

/*SongDetail*/
export interface SongDetail {
  songs: any[]
  privileges: Privileges[]
  code: number
}
