import builder from './api-common';

/**
 * 质量监管
 * @author rcz
 */
const BASEURL_01 = 'http://192.168.200.193:8081/';
const DI_INPUT_TYPE = "4dc6fc902d4fd40ba72cfe62710e5237"
/* 华坪县地图 */
export const cityMap = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/mf/mfQuality/getMapByJsonData',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* 三品种植情况 */
export const plantSituation = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/mf/mfQuality/getIdentificationInfo',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});

/* 质量检测 */
export const qualityDetection = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/mf/mfQuality/getQualitInspection',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});

/* 质量安全综合指数 */
export const safetyIndex = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/mf/mfQuality/getListByJsonData',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* 扫码反馈 */
export const feedback = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/mf/mfQuality/getScavenging',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* 投入品种类监管 */
export const initRegulatory = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/mf/mfQuality/getInpuType',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* 投入品种类监管类型下拉 */
export const regulatoryType = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/gp/gpDictionary/getListByTypeId/' + DI_INPUT_TYPE,
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});
/* 投入主体监管 */
export const inputMainBody = builder.build({
    baseUrl: BASEURL_01,
    url: 'mango/extend/swagger/mf/mfQuality/getInputSubject',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/UnmarketablePublic.json'
});