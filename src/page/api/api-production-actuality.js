import builder from './api-common';


// /* 芒果单产预测 */
// export const manggoForeat = builder.build({
//   baseUrl: builder.BASEURL_01,
//   url: '/tbdp/operator/touristFromByProvice',
//   simulation: true,
//   simulator: '/static/api-simulation/planting/production-actuality/manggoForeat.json'
// });

/* 生产情况走势 */
export const productConditionTrend = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daGrowYield/getGrowAreaSum',
  simulation: false,
  simulator: '/static/api-simulation/planting/production-actuality/productConditionTrend.json'
});

/* 芒果种植结构 */
export const manggoPlantStructure = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daGrowYield/getGrowStructureInfo',
  simulation: false,
  simulator: '/static/api-simulation/planting/production-actuality/manggoPlantStructure.json'
});

/* 芒果产业基地 */
export const manggoProductPlace = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/tbdp/operator/touristFromByProvice',
  simulation: true,
  simulator: '/static/api-simulation/planting/production-actuality/manggoProductPlace.json'
});

//地图
export const plantJson = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/shwm/HealthCivilization/peoplesRate',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/production-actuality/productionActuality.json'
});

/* 平均单产预测 */
export const manggoForeat = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/mf/mfPerUnitYield/forecast',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/aveYieldForecast.json'
});
