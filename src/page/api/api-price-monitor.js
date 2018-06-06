import builder from './api-common';

let BASEURL_01 = 'http://192.168.200.193:8081/'
/* 下拉时间 */
export const getTimeData = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/gp/gpDictionary/getTimesView',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/** 省份下拉 */
export const getAreaData = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/gp/gpRegion/getListByJsonData',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* K线图的接口  */
export const getPriceKline = builder.build({
  baseUrl: BASEURL_01,
  url: 'mango/extend/swagger/da/daMarketPrice/get8PriceKline',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});

/* 芒果品种涨跌幅度监测接口  */
export const getRiseFallBreeds = builder.build({
  baseUrl: BASEURL_01,
  url: 'mango/extend/swagger/da/daMarketPrice/getPriceStrainChg',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});

/* 芒果城市涨跌幅TOP10  */
export const getRiseFallData = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/da/daMarketPrice/getPriceCityChgTop10',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});

/* 产销价差  */
export const getMakeSalesData = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/da/daMarketPrice/getPriceGap',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* 各环节价差  */
export const getLinkDataData = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/da/daMarketPrice/getPriceEachLinkGap',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});











