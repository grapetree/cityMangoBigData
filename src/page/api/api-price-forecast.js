import builder from './api-common';

/* 未来一周 */
export const wholeSaleJson = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/mf/mfForprice/getPriceWeek',
  simulation: false,
  simulator: '/static/api-simulation/market-sale/map1.json'
});
/*全国芒果波动性预测*/

export const wholeCountryPredict = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/mf/mfForreturn/getPriceReturn',
  simulation: false,
  simulator: '/static/api-simulation/market-sale/map1.json'
});
