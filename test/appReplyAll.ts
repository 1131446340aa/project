/*Dat*/
export interface Dat {
  total: number;
  increase: number;
  week: number;
  day: number;

}

/*AppreplyAll*/
export interface AppReplyAll {
  dat: Dat;
  err: string;

}