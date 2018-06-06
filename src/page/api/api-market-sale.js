import builder from './api-common';


/* 中国地图 */
export const map1 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daSaleFresh/getFreshFlow',
  simulation: false,
  simulator: '/static/api-simulation/market-sale/map1.json'
});

export const map2 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '//mango/extend/swagger/da/daSaleProcess/getProcessFlow',
  simulation: false,
  simulator: '/static/api-simulation/market-sale/map1.json'
});

/* 芒果产值-鲜芒果 */
export const manggoValue1 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daSaleFresh/getFreshOutput',
  simulation: false,
  simulator: '/static/api-simulation/market-sale/manggoValue.json'
});

/* 芒果产值-芒果加工品 */
export const manggoValue2 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daSaleProcess/getProcessOutput',
  simulation: false,
  simulator: '/static/api-simulation/market-sale/manggoValue.json'
});
/* 销售产值 */
export const saleResult = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daSaleFresh/getFreshData',
  simulation: true,
  simulator: '/static/api-simulation/market-sale/saleResult.json'
});

/* 消费预测-鲜果 */
export const consumForecast1 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/mf/mfFreshVolume/forecast',
  simulation: false,
  simulator: '/static/api-simulation/market-sale/consumForecast.json'
});

/* 消费预测-加工品 */
export const consumForecast2 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/mf/mfFreshVolume/forecast',
  simulation: false,
  simulator: '/static/api-simulation/market-sale/consumForecast.json'
});

/* 消费特点 */
export const combineHobby = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/mf/mfSaleEcommerceCraw/getCombinatorialPreference',
  simulation: false,
  simulator: '/static/api-simulation/market-sale/combineHobby.json'
});
//芒果品种消费量偏好
export const mangoSaleJson = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daSaleFresh/getFreshAmountPreference',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/market-sale/mangoSaleLike.json'
});

/* chinabar-鲜芒果 */
export const chinabar1 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daSaleFresh/getFreshRank',
  simulation: false,
  simulator: '/static/api-simulation/market-sale/consumForecast.json'
});

/* chinabar-加工芒果 */
export const chinabar2 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daSaleProcess/getProcessRank',
  simulation: false,
  simulator: '/static/api-simulation/market-sale/consumForecast.json'
});