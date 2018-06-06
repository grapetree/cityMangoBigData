import builder from './api-common';

/* 平均价格 */
export const price = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daMarketPrice/getWholeSalePriceRank',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/price-survey/wholesale-price/price.json'
});
/* 各环节差价 */
export const allStageSub = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/shwm/HealthCivilization/peoplesRate',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/price-survey/wholesale-price/allStageSub.json'
});
/* 产销差价 */
export const saleSub = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/shwm/HealthCivilization/peoplesRate',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/price-survey/wholesale-price/saleSub.json'
});
/* 城市涨跌幅度top10 */
export const cityUpDownTop10 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/shwm/HealthCivilization/peoplesRate',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/price-survey/wholesale-price/cityUpDownTop10.json'
});
/* 城市涨跌幅度top10 */
export const manggoTypeMonitor = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/shwm/HealthCivilization/peoplesRate',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/price-survey/wholesale-price/manggoTypeMonitor.json'
});
/* 价格走势 */
export const priceTrend = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daMarketPrice/getWholeSalePriceTend',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/price-survey/wholesale-price/priceTrend.json'
});

/* 中国地图 */
export const map1 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daMarketPrice/getWholeSalePriceMap',
  simulation: false,
  simulator: '/static/api-simulation/price-survey/wholesale-price/map1.json'
});
