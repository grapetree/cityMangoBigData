import builder from './api-common';

/**
 * @augments 忍耐不是美德，把忍耐当成美德是这个伪善的世界维持它扭曲的秩序的方式，生气才是美德。
 * 波动规律
 * @author rcz
 */
const BASEURL_01 = 'http://192.168.200.193:8081/';
/* 波动规律地图 */
export const mapBar3D = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/mf/mfMarketPriceCraw/getPriceAvgMap',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* 全国芒果批发价格长期波动规律 */
export const waveRule = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/mf/mfHpFluct/getPriceTrend',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* 全国芒果批发价格季节性规律 */
export const seasonalRule = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/mf/mfHpSeason/getPriceSeason',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* 全国芒果批发价格短周期波动 */
export const cycleWave = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/mf/mfHpFluct/getPriceShortPeriod',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});