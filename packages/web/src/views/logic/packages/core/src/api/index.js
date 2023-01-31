import axios from 'axios';
import { Message } from 'element-ui';

const LOCAL_CONFIG_KEY = 'IMOVE:LOCAL_CONFIG_KEY';

export const ActionType = {
    create: 'create',
    update: 'update',
    remove: 'remove',
};

const request = (function() {
    const instance = axios.create();

    instance.interceptors.response.use((response) => {
        const { data } = response || {};
        const { success, msg } = data || {};

        if (success) {
            return data;
        } else {
            Message.error(msg || data.message);

            return Promise.reject(data);
        }
    });

    return (config) => {
        const { url, method = 'post', params, headers = {} } = config;
        return instance.request({
            url,
            method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                ...headers,
            },
            data: params,
            timeout: 3000,
        });
    };
})();

/**
 * get local config data (saved in localStorage)
 * @returns local config
 */
export const getLocalConfig = () => {
    const savedConfigString = localStorage.getItem(LOCAL_CONFIG_KEY) || '{}';
    let savedConfig = {};

    try {
        savedConfig = JSON.parse(savedConfigString);
    } catch (e) {
        console.error(e);
    }
    return {
        ip: savedConfig.ip || '127.0.0.1',
        port: savedConfig.port || '3500',
        npmRegistry: savedConfig.npmRegistry || 'https://registry.npm.taobao.org',
    };
};

/**
 * get local config data (saved in localStorage)
 */
export const updateLocalConfig = (config) => {
    const savedConfig = getLocalConfig();
    savedConfig.ip = config.ip || savedConfig.ip;
    savedConfig.port = config.port || savedConfig.port;
    savedConfig.npmRegistry = (
        config.npmRegistry || savedConfig.npmRegistry
    ).replace(/\/$/, '');
    localStorage.setItem(LOCAL_CONFIG_KEY, JSON.stringify(savedConfig));
};

export const localConnect = () => {
    const localConfig = getLocalConfig();
    return fetch(`http://${localConfig.ip}:${localConfig.port}/api/connect`, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    });
};

export const localSave = (data) => {
    const localConfig = getLocalConfig();
    fetch(`http://${localConfig.ip}:${localConfig.port}/api/save`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
    });
};

export const queryGraph = (projectId) => {
    return request({
        // url: '/api/queryGraph',
        url: 'https://www.fastmock.site/mock/8a7172f40b491b285526fb46bbcd69af/logic-flow/api/queryGraph',
        params: {
            projectId,
        },
    });
};

export const modifyGraph = (projectId, actions) => {
    return request({
        // url: '/api/modifyGraph',
        url: 'https://www.fastmock.site/mock/8a7172f40b491b285526fb46bbcd69af/logic-flow/api/modifyGraph',
        params: {
            projectId,
            actions,
        },
    });
};