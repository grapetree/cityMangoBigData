import builder from './api-common';

let BASEURL_01 = 'http://192.168.200.193:8081/'
/* 主题  */
export const motifName = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/da/daSentimentTheme/getListByJsonData',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});

/* 情感分析  */
export const getFeelAnalysis = builder.build({
  baseUrl: BASEURL_01,
  url: 'mango/extend/swagger/da/daSentimentArticle/analyze',
  method: 'GET',
  simulation: false,
  simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});

/* 媒体类型覆盖  */
export const getMediaType = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/da/daSentimentArticle/fromMediaType',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/*负面舆情*/
export const negativePublic = builder.build({
    baseUrl: BASEURL_01,
    url: '/mango/extend/swagger/da/daSentimentArticle/news',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/*媒体来源排行*/
export const MediaList = builder.build({
    baseUrl: BASEURL_01,
    url: '/mango/extend/swagger/da/daSentimentArticle/fromMediaRank',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/*情感分布*/negativeMedia
export const feelSpread = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/da/daSentimentArticle/distribute',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/*负面信息媒体来源*/
export const negativeMedia = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/da/daSentimentArticle/newsFromMedia',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
















