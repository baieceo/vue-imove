import Link from './link';
import Custom from './custom';

export const types = [{
        name: Link.name,
        title: '跳转',
        value: '',
        default: 'http://www.baidu.com',
    },
    {
        name: Custom.name,
        title: '自定义代码',
        value: '',
        default: 'function () {}',
    },
];

export default {
    [Link.name]: Link,
    [Custom.name]: Custom,
};