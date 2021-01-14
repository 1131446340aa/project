 /*List*/
  export class List {
    id: number;
    createdAt: string;
    updatedAt: string;
    creator: string;
    updator: string;
    code: string;
    displayName: string;
    desn: string;
    status: number;
    categoryId: number;
    adminId: number;
    tenantId: number;
    pictureName: string;
    picturePath: string;
    pictureSize: number;
    sequences: number;
    grade: number;
    showIndex: boolean;
    hot: boolean;
    detail: string;
    contact: string;
    applyUrl: string;
    docUrl: string;
    pv: number;
    consoleUrl: string;
    serviceId: number;
    tags: object;
    tagInfo: object;
    adminName: string;
    tenantName: string;
    evaluationNum: number;
    questionNum: number;
    articleNum: number;
    categoryName: string;
    
    }
        
 /*Dat*/
  export class Dat {
    list: List[];
    total: number;
    
    }
        
 /*Services*/
  export class Services {
    dat: Dat;
    err: string;
    
    }