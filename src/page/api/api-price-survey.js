import builder from './api-common';


/* 中国地图 */
export const map1 = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/tbdp/operator/touristFromByProvice',
  simulation: true,
  simulator: '/static/api-simulation/market-sale/map1.json'
});
