/*Dat*/
export interface Dat {
  total: number;
  increase: number;
  week: number;
  day: number;

}

/*ServiceReadALl*/
export interface ServiceReadALl {
  dat: Dat;
  err: string;

}

