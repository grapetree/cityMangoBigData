import builder from './api-common';

/* 龙头企业产量及产值占比 */
export const bigCompany = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/shwm/HealthCivilization/peoplesRate',
  method: 'GET',
  simulation: true,
  simulator: './static/api-simulation/deep-processing/bigCompany.json'
});
// /* 加工品产值预测 */
// export const machiningValue = builder.build({
//   baseUrl: builder.BASEURL_01,
//   url: '/shwm/HealthCivilization/peoplesRate',
//   method: 'GET',
//   simulation: true,
//   simulator: './static/api-simulation/deep-processing/machiningValue.json'
// });
/* 原料消耗及预测 */
export const materialConsume = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/mf/mfProcessMaterialConsume/forecast',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/deep-processing/materialConsume.json'
});
/* 可视化展示加工动画 */
export const getProcessVisualizationData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daProcess/getProcessVisualizationData',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/deep-processing/materialConsume.json'
});
/* 龙头企业产量及产值占比 */
export const getFaucetEnterpriseData = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/da/daProcess/getFaucetEnterpriseData',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/deep-processing/materialConsume.json'
});

/* 加工品产量预测 */
export const machiningValue = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/mf/mfProcessYield/forecast',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/deep-processing/machiningValue.json'
});
/* 加工品产值预测 */
export const outputValueForecast = builder.build({
  baseUrl: builder.BASEURL_01,
  url: '/mango/extend/swagger/mf/mfProcessYield/outputValueForecast',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/deep-processing/machiningValue.json'
});


