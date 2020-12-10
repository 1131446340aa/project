import Api from './utils/Api';

type ApiNoop<T extends object> = (
  urlOptions: object,
  body?: object,
  options?: object
) => Promise<T>

import {GETApiPortalCategories ,GETApiPortalServices ,GETApiPortalServicesname ,GETApiPortalRates ,GETApiPortalArticles ,POSTApiPortalRatesReply ,POSTApiPortalRates ,GETApiPortalServiceQuestions ,} from './index1'
export default  new Api([{"name":"GETApiPortalCategories","url":"/api/portal/categories","method":"get"},{"name":"GETApiPortalServices","url":"/api/portal/services","method":"get"},{"name":"GETApiPortalServicesname","url":"/api/portal/services/:name","method":"get"},{"name":"GETApiPortalRates","url":"/api/portal/rates","method":"get"},{"name":"GETApiPortalArticles","url":"/api/portal/articles","method":"get"},{"name":"POSTApiPortalRatesReply","url":"/api/portal/rates/reply","method":"post"},{"name":"POSTApiPortalRates","url":"/api/portal/rates","method":"post"},{"name":"GETApiPortalServiceQuestions","url":"/api/portal/service/questions","method":"get"}]).mapApi as {"GETApiPortalCategories":ApiNoop<GETApiPortalCategories>,"GETApiPortalServices":ApiNoop<GETApiPortalServices>,"GETApiPortalServicesname":ApiNoop<GETApiPortalServicesname>,"GETApiPortalRates":ApiNoop<GETApiPortalRates>,"GETApiPortalArticles":ApiNoop<GETApiPortalArticles>,"POSTApiPortalRatesReply":ApiNoop<POSTApiPortalRatesReply>,"POSTApiPortalRates":ApiNoop<POSTApiPortalRates>,"GETApiPortalServiceQuestions":ApiNoop<GETApiPortalServiceQuestions>}