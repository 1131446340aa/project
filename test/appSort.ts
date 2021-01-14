
        
 /*List*/
  export interface List {
    id: number;
    ident: string;
    name: string;
    icon: string;
    serviceUser: number;
    appType: number;
    deployType: number;
    techType: number;
    intro: string;
    content: string;
    rawContent: string;
    bookUrl: string;
    docUrl: string;
    tenantId: number;
    projectId: number;
    index: number;
    hot: number;
    grade: number;
    contact: string;
    pv: number;
    labels: string;
    status: number;
    creator: string;
    updater: string;
    createdAt: number;
    updatedAt: number;
    owner: string[];
    tenantName: string;
    
    }
        
 /*Dat*/
  export interface Dat {
    list: List[];
    total: number;
    
    }
        
 /*AppSort*/
  export interface AppSort {
    dat: Dat;
    err: string;
    
    }