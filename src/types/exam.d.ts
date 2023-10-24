/** 考试信息 */
export type myExamType = {
  /** 考试ID */
  examID: number;
  /** 考试名称 */
  examName: string;
  /** 考试描述 */
  examDescription: string;
  /** 考试时长 */
  examDuration: number;
  /** 考试人数 */
  numberOfExaminees: number;
  /** 试卷ID */
  paperID: number;
  /** 结束时间 */
  endTime: string;
  /** 开始时间 */
  startTime: string;
  /** 初级审核 */
  juniorState: number;
  /** 终极审核 */
  ultimateState: number;
  /** 创建人ID */
  userID: number;
};
