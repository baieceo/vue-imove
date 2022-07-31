import { customAlphabet } from 'nanoid';

// 生成id
export const genid = () => {
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

    return nanoid(10);
};