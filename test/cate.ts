 /*Dat*/
  export interface Dat {
    id: number;
    ident: string;
    displayName: string;
    cate: number;
    kind: number;
    desn: string;
    icon: string;
    weight: number;
    parentId: number;
    creator: string;
    updater: string;
    updatedAt: number;
    createdAt: number;
    child: object;
    name: string;
    
    }
        
 /*Cate*/
  export interface Cate {
    dat: Dat[];
    err: string;
    
    }