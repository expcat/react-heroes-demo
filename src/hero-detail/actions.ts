import { HERO_MODIFY, HERO_MODIFY_TYPE } from './const';

export interface IHERO_MODIFYaction {
  type: HERO_MODIFY_TYPE;
  payload: {
    newName: string;
  };
}

// 定义 modifyAction 类型
export type ModifyAction = IHERO_MODIFYaction;

// 修改Hero的方法
export const modify = (newName: string): IHERO_MODIFYaction => ({
  type: HERO_MODIFY,
  payload: { newName }
});
