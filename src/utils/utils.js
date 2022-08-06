import { customAlphabet } from 'nanoid';

// 生成id
export const genid = () => {
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

    return nanoid(10);
};

// 加载脚本
export const importScript = (() => {
    const cache = {};

    return (url) => {
        if (cache[url]) return Promise.resolve(cache[url]);

        return new Promise((resolve, reject) => {
            const lastWindowKey = Object.keys(window).pop();

            const script = document.createElement('script');

            script.src = url;

            document.head.appendChild(script);

            script.addEventListener('load', () => {
                document.head.removeChild(script);

                const newLastWindowKey = Object.keys(window).pop();

                const module = lastWindowKey !== newLastWindowKey ? window[newLastWindowKey] : {};
                const component = module.default || module;

                cache[url] = component;

                resolve(component);
            });

            script.addEventListener('error', (error) => {
                reject(error);
            });
        })
    }
})();