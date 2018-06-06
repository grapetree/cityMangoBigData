import builder from './api-common';

/* 鲜果销量TOP10 */
const BASEURL_01 = 'http://192.168.200.193:8081';
export const Login = builder.build({
  baseUrl: BASEURL_01,
  url: '/mango/extend/swagger/gp/gpUser/getLoginInfoByJsonData',
  method: 'POST',
  simulation: false,
  simulator: './static/api-simulation/home-page/deepProcessing.json'
});