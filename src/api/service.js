import axios from 'axios'

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
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。',
};

axios.defaults.baseURL = process.env.baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// multipart/form-data
axios.defaults.timeout = 2500;

// 添加请求拦截器
axios.interceptors.request.use(config => {
	// console.log('config', config);
	// 在请求先展示加载框
	// TODO...
	const token = localStorage.getItem('token')
	if (token) {
		config.headers['Authorization'] = token
	}
	return config;
}, error => {
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
	const responseCode = response.status;
	// 在请求结束后关闭加载框
	// TODO...
	if (responseCode === 200) {
		return Promise.resolve(response)
	} else {
		return Promise.reject(response)
	}
}, error => {
	const responseCode = error.response.status;
	handle(responseCode);
	return Promise.reject(error);
});

function handle (status) {
	throw new Error(codeMessage[status]);
}


export const get = url => {
	return axios.get(url)
	.then(res => {
		return res.data;
	})
}

export const post = (url, params, options={}) => {
	return axios.post({
		url,
		params,
		options
	}).then(res => {
		return res.data;
	})
}

export const upload = (url, params) => {
	return axios.post({
		url,
		params,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}).then(res => {
		return res.data;
	})
}
