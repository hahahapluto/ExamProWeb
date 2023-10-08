import { ElForm } from "element-plus";

// types/components.d.ts
declare module "vue" {
  export interface GlobalComponents {
    ElForm: typeof ElForm;
  }
}

// 组件实例类型
export type ElFormInstance = InstanceType<typeof ElForm>;
