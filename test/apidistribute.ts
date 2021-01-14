/*Dat*/
export interface Dat {
  tenantId: number;
  name: string;
  count: number;
  serviceNum: number;

}

/*Apidistribute*/
export interface Apidistribute {
  dat: Dat[];
  err: string;

}