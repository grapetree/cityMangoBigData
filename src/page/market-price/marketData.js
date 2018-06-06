function N(){
    return (Math.random() * 100).toFixed(0);
}


//  全国芒果批发价格长期波动规律
let SeasonData = {
    legendData: ['长期趋势', '价格'],
    xAxisData: ['1月', '2月 ', '3月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
    seriesData: [
        [32, 23, 41, 32, 20, 40, 27, 35, 12, 24, 22, 13],
        [22, 26, 25, 28, 20, 26, 22, 24, 23, 26, 21, 22]
    ]
}
//  全国芒果批发价格短周期波动
let CircleData = {
    xAxisData: ['1月', '2月 ', '3月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
    seriesData: [22, -26, 25, -28, 20, -26, 22, 24, 23, 26, 21, -22]
}

//  全国芒果批发价格季节性规律
let VariationData = {
    xAxisData: ['1月', '2月 ', '3月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
    seriesData: [22, -26, 25, -28, 20, -26, 22, 24, 23, 26, 21, -22]
}

//  全国芒果批发价格短周期波动
//数据顺序:[周初价,周末价,最低价,最高价]
let KlineData1 =  {
    legendData: ['平均价', 'K线图'],
    xAxisData: ['2017-01', '2017-02', '2017-03', '2017-04', '2017-05', '2017-06', '2017-07', '2017-08', '2017-09', '2017-10', '2017-11'],
    averageData:[23,23,21,22,21,22,23,23],
    seriesData: [
        ['2017-01', 22,23,20,25],
        ['2017-01', 22,23,20,25],
        ['2017-02', 23,21,19,23],
        ['2017-02', 23,21,19,23],
        ['2017-03', 21,27,21,29],
        ['2017-04', 25,22,18,25],
        ['2017-03', 21,27,21,29],
        ['2017-04', 25,22,18,25],
    ]
}

let KlineData2 =  {
    legendData: ['平均价', 'K线图'],
    xAxisData: [],
    averageData:[],
    seriesData: []
}

let KlineData3 =  {
    legendData: ['平均价', 'K线图'],
    xAxisData: [],
    averageData:[],
    seriesData: []
}

let KlineData4 =  {
    xAxisData: [],
    averageData:[],
    seriesData: []
}

let KlineData5 =  {
    legendData: ['平均价', 'K线图'],
    xAxisData: [],
    averageData:[],
    seriesData: []
}

let KlineData6 =  {
    legendData: ['平均价', 'K线图'],
    xAxisData: [],
    averageData:[],
    seriesData: []
}

let KlineData7 =  {
    legendData: ['平均价', 'K线图'],
    xAxisData: [],
    averageData:[],
    seriesData: []
}

let KlineData8 =  {
    legendData: ['平均价', 'K线图'],
    xAxisData: [],
    averageData:[],
    seriesData: []
}

//  各环节价格差

    let LinkData =  {
    legendData: [],
    xAxisData: [],
    seriesData: []
}


//  产销价差

    let MakeSalesData =  {
    legendData: [],
    xAxisData: [],
    seriesData: []
}


//  城市涨跌幅
    let RiseFallData =  {
    legendData: ['长期趋势', '价格'],
    xAxisData:  [],
    seriesData: []
}


//  品种涨跌幅监测

    let RiseFallBreedsBarData =  {
    legendData: [],
    xAxisData: [],
    seriesData: []
}


export {
        SeasonData,
        CircleData,
        VariationData,
        KlineData1,
        KlineData2,
        KlineData3,
        KlineData4,
        KlineData5,
        KlineData6,
        KlineData7,
        KlineData8,
        LinkData,
        MakeSalesData,
        RiseFallData,
        RiseFallBreedsBarData,
    };