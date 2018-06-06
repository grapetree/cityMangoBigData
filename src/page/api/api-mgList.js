import builder from './api-common';

let BASEURL_01 = 'http://192.168.200.193:8081/'

/* 列表 */
export const getMgList = builder.build({
  baseUrl: BASEURL_01,
  url: 'mango/extend/swagger/da/daEnterpriseInfo/getListByJsonData',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/attractInvestment/mgList.json'
});


export const getInfo = builder.build({
  baseUrl: BASEURL_01,
  url: 'mango/extend/swagger/da/daEnterpriseInfo/getEnterpriseInfo',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/attractInvestment/mgInfoAll.json'
});
//企业类型编码--产业链环节下拉
export const enterpriseType = builder.build({
  baseUrl: BASEURL_01,
  url: 'mango/extend/swagger/gp/gpDictionary/getListByTypeId/941b13c7c816cde7254b1bcdb431752c',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/attractInvestment/enterpriseTypeCode.json'
});