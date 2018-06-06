import builder from './api-common';

/* 经深加工 */
export const deepProcessing = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daProcess/getProcessStructureInfo',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/deepProcessing.json'
});
/* 芒果销费结构 */
export const saleMango = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daSaleProcess/getMangoConsumptionStructure',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/home-page/saleMango.json'
});
/* 首页中间上面文本框 */
export const dataBox = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daGrowYield/getGrowSumInfo',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/dataBox.json'
});
/* 首页中间上面文本框 */
export const dataBox1 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daSaleFresh/getSaleFreshSumInfo',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/dataBox.json'
});
/* 平均单产预测 */
export const aveYieldForecast = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/mf/mfPerUnitYield/forecast',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/aveYieldForecast.json'
});
/* 各环节差价 */
export const allStateSub = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daMarketPrice/getWeekPriceDetails',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/allStateSub.json'
});
/* 芒果销量预测 */
export const mangoSaleCalc = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/mf/mfProductSale/forecast',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/mangoSaleCalc.json'
});

/* 预警走势 */
export const moveMentsLine = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/shwm/HealthCivilization/peoplesRate',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/home-page/moveMentsLine.json'
});
/* 物联网数据 */
export const InternetDataLine = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/shwm/HealthCivilization/peoplesRate',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/home-page/InternetDataLine.json'
});
/*舆情角度*/
export const UnmarketablePublic = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/shwm/HealthCivilization/peoplesRate',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});

/* 田头价 零售价 */
export const priceIndex = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/shwm/HealthCivilization/peoplesRate',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/home-page/priceIndex.json'
});

/* 芒果消费结构 */
export const mangoConsumInfo = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daSaleProcess/getMangoConsumptionStructure',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/mangoConsumInfo.json'
});
/* 绿色种植 */
export const plantSpace = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daGrowYield/getGrowAreaSum',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/plantSpace.json'
});
/* 芒果产值 */
export const manggoValue = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daIndustryProcess/getMangoIndustryStructure',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/manggoValue.json'
});
/* 种植结构 */
export const plantForm = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daGrowYield/getGrowStructureInfo',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/plantForm.json'
});
