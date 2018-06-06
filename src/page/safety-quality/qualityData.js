//  随机数
function randomNum() {  
    return (Math.random() * 100).toFixed(0);
}
// 水球图
let areaNum = randomNum();

// 仪表盘
let completion = randomNum();

// 折线图
function lineData() {
    let lineData = {
        xAxisData: ['2013', '2014', '2015', '2016', '2017', '2018'],
        seriesData: [
            [randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum()],
            [randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum()]
        ]
    }
    return lineData;
}
//  扫码反馈
function FeedBack() {
    let lineData = {
        xAxisData: ['2013', '2014', '2015', '2016', '2017', '2018'],
        seriesData: [
            [randomNum(), randomNum(), randomNum(), randomNum(), randomNum(), randomNum()]
        ]
    }
    return lineData;
}
// 三种种植情况饼图
function pieData() {
    let pieData = [
            { value: randomNum(), name: '有机生产基地' },
            { value: randomNum(), name: '绿色生产基地' },
            { value: randomNum(), name: '无公害生产基地' }
        ]
    return pieData;
}


export { lineData, pieData, areaNum, completion, FeedBack };