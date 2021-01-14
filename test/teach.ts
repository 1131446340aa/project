 /*Admins*/
  export interface Admins {
    id: number;
    uuid: string;
    username: string;
    dispname: string;
    phone: string;
    email: string;
    im: string;
    portrait: string;
    intro: string;
    organization: string;
    typ: number;
    status: number;
    is_root: number;
    leader_id: number;
    leader_name: string;
    create_at: string;
    
    }
        
 /*Dat*/
  export interface Dat {
    id: number;
    pid: number;
    ident: string;
    name: string;
    note: string;
    path: string;
    leaf: number;
    cate: string;
    icon_color: string;
    icon_char: string;
    proxy: number;
    creator: string;
    last_updated: string;
    admins: Admins[];
    
    }
        
 /*Teach2id*/
  export interface Teach2id {
    dat: Dat[];
    err: string;
    
    }