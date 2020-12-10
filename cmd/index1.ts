 /*GETApiPortalCategoriesdat*/
  export interface GETApiPortalCategoriesdat {
    name: string;
    title: string;
    description: string;
    
  }
        
 /*GETApiPortalCategories*/
  export interface GETApiPortalCategories {
    err: string;
    dat: GETApiPortalCategoriesdat[];
    
  }

        
 /*GETApiPortalServicesdatservices*/
  export interface GETApiPortalServicesdatservices {
    title: string;
    name: string;
    description: string;
    service_labels: string[];
    service_score: number;
    owner: string;
    
  }
        
 /*GETApiPortalServicesdat*/
  export interface GETApiPortalServicesdat {
    category_name: string;
    category_title: string;
    category_description: string;
    services: GETApiPortalServicesdatservices[];
    
  }
        
 /*GETApiPortalServices*/
  export interface GETApiPortalServices {
    err: string;
    dat: GETApiPortalServicesdat[];
    
  }

        
 /*GETApiPortalServicesnamedat*/
  export interface GETApiPortalServicesnamedat {
    title: string;
    name: string;
    description: string;
    service_labels: string[];
    service_score: number;
    owner: string;
    contact_number: string;
    company: string;
    category_title: string;
    entry: string;
    service_shares: number;
    service_content: string;
    
  }
        
 /*GETApiPortalServicesname*/
  export interface GETApiPortalServicesname {
    err: string;
    dat: GETApiPortalServicesnamedat;
    
  }
 /*GETApiPortalRatesdat*/
  export interface GETApiPortalRatesdat {
    score: number;
    from_user: string;
    content: string;
    created_time: string;
    id: number;
    replys: number;
    
  }
        
 /*GETApiPortalRates*/
  export interface GETApiPortalRates {
    err: string;
    dat: GETApiPortalRatesdat[];
    
  }
 /*GETApiPortalArticles*/
  export interface GETApiPortalArticles {
    
  }
 /*POSTApiPortalRatesReplydat*/
  export interface POSTApiPortalRatesReplydat {
    
  }
        
 /*POSTApiPortalRatesReply*/
  export interface POSTApiPortalRatesReply {
    err: string;
    dat: POSTApiPortalRatesReplydat;
    
  }
 /*POSTApiPortalRatesdat*/
  export interface POSTApiPortalRatesdat {
    
  }
        
 /*POSTApiPortalRates*/
  export interface POSTApiPortalRates {
    err: string;
    dat: POSTApiPortalRatesdat;
    
  }
 /*GETApiPortalServiceQuestions*/
  export interface GETApiPortalServiceQuestions {
    
  }
