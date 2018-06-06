/*舆情角度*/
function PublicAngleData() {
    let PublicAngleData = {
        xAxisData: ['07-25 17:00','07-25 19:00 ','07-25 21:00','07-25 23:00','07-26 01:00','07-26 03:00'],
        seriesData: [
            [94, 96,95, 94, 93,95],
            [96, 94, 95, 96, 95, 93 ],
            [96, 94, 93, 92, 94, 97 ],
        ],
        legendName:['正面传播','中立传播','负面传播'],


    }

    return PublicAngleData;
}
/*国际角度*/
function countryData(){
let countryData={
    xAxisData: ['1月','2月','3月','4月','5月','6月','7月'],
    seriesData:[
        [4, 12,15, 10, 5, 6,15],
        [6, 11, 12, 9, 7, 9,14]
    ],
    legendName:['',''],

}
return countryData;
}
/*气象角度*/
function weatherData(){
let weatherData={
    xAxisData: [],
    seriesData:[],

}
return weatherData;
}
/*供求角度*/
function unmarketBarData(){
    let unmarketBarData={
        xAxisData: ['2017-6-21','2017-7-01', '2017-7-06', '2017-7-11', '2017-7-16', '2017-7-21', '2017-7-26', '2017-7-31'],
        seriesData:[
            [120,130,95,124,120,130,95,124],
            [150,180,170,140,150,180,170,140],
            [150,180,170,140,150,180,170,140],

        ],

    }
    return unmarketBarData;
}
/*价格角度*/
function priceData(){
    let priceData={
        xAxisData:['1月','2月 ','3月','1月','2月','3月','4月','5月','6月','7月','8月','9月'],
        seriesData:[
            [22, 26, 25, 28, 20, 26, 22, 24, 23, 26, 21,22],
            [32, 23, 41, 32, 20, 40, 27, 35, 12, 24, 22,13],
        ],
    }
    return priceData;
}



export {PublicAngleData,countryData,weatherData,priceData,unmarketBarData}