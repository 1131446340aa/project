 /*Dat*/
  export interface Dat {
    total: number;
    increase: number;
    week: number;
    day: number;
    
    }
        
 /*ServiceApiAll*/
  export interface ServiceApiAll {
    dat: Dat;
    err: string;
    
    }