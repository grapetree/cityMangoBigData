import builder from './api-common';

/* 天气角度 */
const BASEURL_01 = 'http://192.168.200.193:8081/';
export const WeatherLine = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/mf/mfWeather/forecast',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/deepProcessing.json'
});
/*舆情角度*/
export const UnmarketablePublic = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/da/daSentimentArticle/analyze',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/deepProcessing.json'
});
/*国际角度*/
export const countryLine = builder.build({
    baseUrl: BASEURL_01,
    url: '/mango/extend/swagger/mf/mfProductSale/getInternationalDate',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/deepProcessing.json'
});
/*价格角度*/
export const priceLine = builder.build({
    baseUrl: BASEURL_01,
    url: '/mango/extend/swagger/mf/mfProductSale/getPriceDate',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/deepProcessing.json'
});
/*供求角度*/
export const unmarketBarline = builder.build({
     baseUrl: BASEURL_01,
     url: '/mango/extend/swagger/mf/mfProductSale/getSupplyDemandDate',
     method: 'GET',
     simulation: false,
     simulator: './static/api-simulation/home-page/deepProcessing.json'
 });
