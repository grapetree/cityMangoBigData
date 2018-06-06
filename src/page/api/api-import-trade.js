import builder from './api-common';

/**
 * 进出口贸易
 * @author rcz
 */
let BASEURL_01 = 'http://192.168.200.193:8081/'
/* world地图进出口芒果 */
export const worldMap = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/da/daImportExport/getTradeRank?t='+new Date().getTime(),
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* 前十贸易国 */
export const tradeTop = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/da/daImportExport/getTradeRank',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* 进出口价格 */
export const importPrice = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/da/daImportExport/getTradePrice',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* 贸易规模 */
export const tradeSize = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/da/daImportExport/getTradeScale',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* 下拉时间 */
export const getTimeData = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/gp/gpDictionary/getTimesView',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});