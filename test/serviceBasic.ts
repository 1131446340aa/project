/*Dat*/
export interface Dat {
  rds_running: number;
  rds_total: number;
  redis_running: number;
  redis_total: number;
  mongo_running: number;
  mongo_total: number;
  mq_topic: number;
  ceph_bucket: number;
  micro_services: number;

}

/*ServiceBasic*/
export interface ServiceBasic {
  dat: Dat;
  err: string;
}