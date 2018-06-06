import builder from './api-common';

/* 鲜果销量TOP10 */
const BASEURL_01 = 'http://192.168.200.193:8081/';
export const FreshTop10 = builder.build({
  baseUrl: BASEURL_01,
  url: 'mango/extend/swagger/mf/mfProductSale/getTopData',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/deepProcessing.json'
});

// 供求预测
export const PredictionLine = builder.build({
  baseUrl: BASEURL_01,
  url: 'mango/extend/swagger/mf/mfProductSale/forecast',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/deepProcessing.json'
});

//供求现状
export const ActualityLineBar = builder.build({
  baseUrl: BASEURL_01,
  url: 'mango/extend/swagger/mf/mfProductSale/getProSaleStatus',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/deepProcessing.json'
});

//鲜芒果不同品种产销率监测
export const MonitorLine = builder.build({
  baseUrl: BASEURL_01,
  url: 'mango/extend/swagger/mf/mfProductSale/getFreshProSaleRate',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/deepProcessing.json'
});

//芒果加工品产销率监测
export const ProcessLine = builder.build({
  baseUrl: BASEURL_01,
  url: 'mango/extend/swagger/mf/mfProductSale/getProcessProSaleRate',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/deepProcessing.json'
});

//鲜芒果不同品种下拉框
export const selectMonitorData = builder.build({
  baseUrl: BASEURL_01,
  url: 'mango/extend/swagger/gp/gpDictionary/getListByTypeId/48690fc04089cb696dfad2c1780153a7',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/deepProcessing.json'
});

//芒果加工品下拉框
export const selectProcessData = builder.build({
  baseUrl: BASEURL_01,
  url: 'mango/extend/swagger/gp/gpDictionary/getListByTypeId/817d9f61ddf66623ffd2cf55e0f107ea',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/deepProcessing.json'
});