/** 创建试卷-试题序列 */
export type quesSequenceType = {
  /** 题目类型 */
  name: string
  /** 题目占分 */
  score: number
  /** 题目序号 */
  lists: number[]
  /** 题目选中状态 */
  actives: boolean[]
  /** 题目答案 */
  answer: string[]
  // quesScore: number[]
}

export type quesScoreMarkType = {
  /** 题目类型 */
  name: string
  /** 题目占分 */
  score: number
  /** 题目序号 */
  lists: number[]
  /** 题目选中状态 */
  actives: boolean[]
  /** 题目答案 */
  answer: string[]
  quesScore: number[]
}

export type showQuesUserRecord = {
  /** 题目类型 */
  name: string
  /** 题目占分 */
  score: number
  /** 题目序号 */
  lists: number[]
  /** 题目选中状态 */
  actives: boolean[]
  /** 题目答案 */
  answer: string[]
  userAnswer: string[]
  quesAnswer: string[]
  userGetScore: number[]
  totalScore: number[]
  // quesScore: number[]
}
