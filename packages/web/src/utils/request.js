import axios from 'axios';
import ElementUI from 'element-ui';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '请求参数校验失败。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

/**
 * 配置request请求时的默认参数
 */
const request = axios.create({
    timeout: 10 * 1000, // 10s 超时
});

// 请求拦截器
request.interceptors.request.use((options) => {
    return options;
});

// 响应拦截器
request.interceptors.response.use(async(response) => {
    const { status } = response;

    if (status !== 200) {
        return Promise.reject(response);
    }

    const { code, data, message } = response.data;

    // 业务异常
    if (code !== 0) {
        ElementUI.Message.error(message);

        return Promise.reject(response.data);
    }

    return Promise.resolve(data);
}, error => {
    const { response, message } = error;
    const { status = 0 } = response;
    const statusMessage = codeMessage[status];

    if (statusMessage) {
        ElementUI.Message.error(statusMessage);
    } else {
        ElementUI.Message.error(message);
    }

    return Promise.reject(error);
});

export default request;