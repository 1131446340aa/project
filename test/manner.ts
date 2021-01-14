 /*Result*/
  export interface Result {
    sendCnt: number;
    receiveCnt: number;
    date: number;
    
    }
        
 /*Data*/
  export interface Data {
    productCnt: number;
    deviceCnt: number;
    appCnt: number;
    result: Result[];
    
    }
        
 /*Manner*/
  export interface Manner {
    status: number;
    msg: string;
    data: Data;
    
    }