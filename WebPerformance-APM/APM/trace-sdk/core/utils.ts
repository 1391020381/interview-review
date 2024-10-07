

// 获取时间
export const getTimestamp = ():number => Date.now()

export function uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        /* tslint:disable */
        const r = (Math.random() * 16) | 0;
        /* tslint:disable */
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
    
        return v.toString(16);
      }); 
}