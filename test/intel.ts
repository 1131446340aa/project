 /*Sample*/
  export interface Sample {
    数据表: number;
    样本总数: number;
    文本: number;
    视频: number;
    图像: number;
    音频: number;
    
    }
        
 /*Model*/
  export interface Model {
    目标检测: number;
    OCR识别: number;
    自然语言处理: number;
    人脸识别: number;
    知识图谱: number;
    模型总数: number;
    语音识别: number;
    
    }
        
 /*Task*/
  export interface Task {
    算法总数: number;
    自动化建模任务数: number;
    训练任务总数: number;
    可视化建模任务数: number;
    notebook任务数: number;
    作业建模任务数: number;
    
    }
        
 /*Data*/
  export interface Data {
    task: Task;
    model: Model;
    sample: Sample;
    
    }
        
 /*Intel*/
  export interface Intel {
    status: string;
    data: Data;
    
    }