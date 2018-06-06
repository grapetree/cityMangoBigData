/*媒体类型覆盖*/
let MediaData =  {
    legendData: ['正面', '中立','负面'],
    xAxisData: ['1月', '2月 ', '3月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
    seriesData: [
        [32, 23, 41, 32, 20, 40, 27, 35, 12, 24, 22, 13],
        [22, 26, 25, 28, 20, 26, 22, 24, 23, 26, 21, 22],
        [27, 35, 12, 24, 23, 26, 22, 24, 27, 35, 12, 24]
    ]
}

let MediaTypeData=[
        { value: "45%", name: '有机' },
        { value: "15%", name: '绿色' },
        { value: "40%", name: '无公害' }
]

let FeelSpreadData = [
    { value: 45, name: '有机' },
    { value: 15, name: '绿色' },
    { value: 40, name: '无公害' }
]

let NegativeMediaData =[
    { value: 45, name: '有机' },
    { value: 15, name: '绿色' },
    { value: 40, name: '无公害' }
]
let MediaListData = {
    xAxisData: ["百度", "新浪", "人民网", "中国网", "南充网", "微信公众号", "东方财富网"],
    seriesData: [
        ['4200', '3900', '3500', '3000', '2900', '2500', '2800']
    ]

}

export { MediaData, MediaTypeData, FeelSpreadData, NegativeMediaData, MediaListData}