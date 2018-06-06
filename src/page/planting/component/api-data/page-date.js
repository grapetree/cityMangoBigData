
import builder from "./api-common-syc";
/* 物联网数据 */
/* 预警次数 */
export const getEarlyWarningAndMangoProportion = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/da/daIotMonitorData/getEarlyWarningAndMangoProportion',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getGrowStructureInfo.json'
});
/* 预警类别 */
export const getEarlyWarningStyleList = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/gp/gpDictionary/getListByTypeId/d8ef4cb8d95419d6f4d673336b6b83b6',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getGrowStructureInfo.json'
});
/* 预警走势 */
export const getEarlyWarningDetails = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/da/daIotMonitorData/getEarlyWarningDetails',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getGrowStructureInfo.json'
});
/* 预警时间 */
export const getEarlyWarningTimeList = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/gp/gpDictionary/getTimesView',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getGrowStructureInfo.json'
});
/* 不同主产区对比 */
/* 获取年份 */
export const ProductionData = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/da/daGrowYield/getYearInfo',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getYearInfo.json'
});
/* 获取种植户 */
export const getPeasantCount = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/da/daGrowYield/getPeasantCount',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getPeasantCount.json'
});
/* 获取种植结构饼图 */
export const getGrowStructureInfo = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/da/daGrowYield/getGrowStructureInfo',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getGrowStructureInfo.json'
});
/* 获取单位面积产量 */
export const getGrowAreaSum = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/da/daGrowYield/getGrowAreaSum',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getGrowStructureInfo.json'
});
/* 获取基地坐标 */
export const getBaseList = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/da/daBaseInfo/getBaseList',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getGrowStructureInfo.json'
});
/* 获取设备坐标 */
export const getDeviceListByBaseCode = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/da/daBaseInfo/getDeviceListByBaseCode',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getGrowStructureInfo.json'
});
/* 根据设备获取基地信息 */
export const getBaseInfoByDeviceId = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/da/daBaseInfo/getBaseInfoByDeviceId',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getGrowStructureInfo.json'
});
/* 根据设备获取实时监测数据 */
export const getActualTimeDataByDeviceId = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/da/daIotMonitorData/getActualTimeDataByDeviceId',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getGrowStructureInfo.json'
});
/* 根据设备id获取过去24小时的监测数据 */
export const getTimesDataByDeviceId = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/da/daIotMonitorData/getTimesDataByDeviceId',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getGrowStructureInfo.json'
});
/* 根据设备id获取历史监测数据 */
export const getTimeQuantumDataByDeviceId = builder.build({
    baseUrl: builder.BASEURL_01,
    url: '/mango/extend/swagger/da/daIotMonitorData/getTimeQuantumDataByDeviceId',
    method: 'GET',
    simulation: false,
    simulator: './static/api-simulation/home-page/syc/getGrowStructureInfo.json'
});