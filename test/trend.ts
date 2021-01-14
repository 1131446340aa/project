 /*List*/
  export interface List {
    ts: number;
    count: number;
    
    }
        
 /*Dat*/
  export interface Dat {
    list: List[];
    product: number;
    
    }
        
 /*Trend*/
  export interface Trend {
    dat: Dat;
    err: string;
    
    }