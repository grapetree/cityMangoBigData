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
/** 灾害类型预警信息  */
export const getAdisasterTableData = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/gp/gpDictionary/getTimesView',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/** 影响因素  */
export const getFactorBarData = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/gp/gpDictionary/getTimesView',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/** 灾害类型预警走势  */
export const getWarningLineData = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/gp/gpDictionary/getTimesView',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/** 百度地图数据信息  */
export const getAdisasterBaiduMap = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/gp/gpDictionary/getTimesView',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});