 /*Dat*/
  export interface Dat {
    id: number;
    dispName: string;
    count: number;
    
    }
        
 /*ServicesCateCount*/
  export interface ServicesCateCount {
    dat: Dat[];
    err: string;
    
    }