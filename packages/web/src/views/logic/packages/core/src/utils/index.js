import { parse } from 'query-string';

export const safeParse = (json) => {
    try {
        return JSON.parse(json);
    } catch (error) {
        return {};
    }
};

export const safeGet = (obj, keyChain, defaultVal) => {
    if (typeof obj !== 'object' || obj === null) {
        return defaultVal;
    }

    let val = obj;
    const keys = keyChain.split('.');
    for (const key of keys) {
        if (val[key] === undefined) {
            return defaultVal;
        } else {
            val = val[key];
        }
    }

    return val;
};

const parseConfig = {
    skipNull: true,
    skipEmptyString: true,
    parseNumbers: false,
    parseBooleans: false,
};

export const parseQuery = () => {
    return parse(location.search, parseConfig);
};

export const executeScript = (code, type = 'module') => {
    const script = document.createElement('script');
    script.type = type;
    script.text = code;
    document.body.appendChild(script);
};