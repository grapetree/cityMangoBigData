import React from 'react';
import * as api from '../api/api-deep-processing';
import Panel from '../../component/visual-team/panel/Panel';
import Yield from '../../component/visual-team/d3/Yield';
import XYield from '../../component/visual-team/d3/XYield';
//龙头企业产量及产值占比
import NanGeErPie from '../../component/visual-team/pie/NanGeErPie';
//加工品产值预测
import DeepLineBar from '../../component/visual-team/line-and-bar/DeepLineBar';
import SingleBarLine from '../../component/visual-team/line-and-bar/SingleBarLine';
//各品类产量产值
import DeepPageDataBox from '../../component/visual-team/data-box/DeepPageDataBox';
//
import DeepDetailData from '../../component/visual-team/data-box/DeepDetailData';
/**
 * 精深加工
 */
class DeepProcessing extends React.Component {
  constructor() {
    super();
    this.bigCompanyStyle = {
      width: '410px',
      height: '260px',
      position: 'absolute',
      right: 0,
      top: 0
    };
  }
  _tokens = [];
  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }
  render() {
    return (
      <div>
        <div style={{ width: '975px', height: '888px', marginTop: '125px', marginLeft: '175px', position: 'relative' }}>
          <div style={{ width: '975px', height: '682px' }}>
            <Yield />
            <XYield />
          </div>
          <div style={{ width: '975px', height: '206px' }}>
            <DeepPageDataBox ref={'deepPageDataBox'} />
          </div>
          <NanGeErPie ref={'bigCompanyRefs'} style={this.bigCompanyStyle} title={'龙头企业产量及产值占比'} />
          <DeepDetailData title='原料消耗（万吨/年）' ref={'deepDetailData1'} style={{ position: 'absolute', left: '188px', top: '10px' }} />
          <DeepDetailData title='加工企业（家）' ref={'deepDetailData2'} style={{ position: 'absolute', left: '668px', top: '320px' }} />
        </div>
        {/*加工品产值预测*/}
        <Panel height={300} width={660} left={'1220px'} top={'126px'}>
          <DeepLineBar style={{ width: '644px', height: '280px', position: 'absolute', left: '19px', top: '19px' }} title={'加工品产值预测'} ref={'machiningValue'} />
          <p style={{ width: '100px', height: '17px', lineHeight: '17px', position: 'absolute', right: 0, top: '85px' }}>
            <span style={{ display: 'inline-block', padding: '2px', width: '8px', height: '2px', border: '2px dashed #46ebff', marginRight: '5px', backgroundColor: 'rgba(4,192,255,0.5)' }}></span>
            <span style={{ color: '#fff' }}>虚线为预测值</span>
          </p>
        </Panel>

        {/*加工品产量预测*/}
        <Panel height={300} width={660} left={'1220px'} top={'435px'}>
          <DeepLineBar style={{ width: '644px', height: '280px', position: 'absolute', left: '19px', top: '19px' }} title={'加工品产量预测'} ref={'yieldValue'} />
          <p style={{ width: '100px', height: '17px', lineHeight: '17px', position: 'absolute', right: 0, top: '85px' }}>
            <span style={{ display: 'inline-block', padding: '2px', width: '8px', height: '2px', border: '2px dashed #46ebff', marginRight: '5px', backgroundColor: 'rgba(4,192,255,0.5)' }}></span>
            <span style={{ color: '#fff' }}>虚线为预测值</span>
          </p>
        </Panel>

        {/*原料消耗及预测*/}
        <Panel height={300} width={660} left={'1220px'} top={'745px'}>
          <SingleBarLine style={{ width: '644px', height: '280px', position: 'absolute', left: '19px', top: '19px' }} title={'原料消耗及预测'} ref={'materialConsume'} />
          <p style={{ width: '100px', height: '17px', lineHeight: '17px', position: 'absolute', right: '120px', top: '85px' }}>
            <span style={{ display: 'inline-block', padding: '2px', width: '8px', height: '2px', border: '2px dashed #46ebff', marginRight: '5px', backgroundColor: 'rgba(4,192,255,0.5)' }}> </span>
            <span style={{ color: '#fff' }}>虚线为预测值</span>
          </p>
        </Panel>

      </div>
    )
  }
  componentDidMount() {
    let me = this;
    me._tokens.push(api.getProcessVisualizationData.send({
      jsonData: JSON.stringify({
        "entityProcess": { "year": "2018" },
      })
    }).then((res) => {

      let _deepPageDataBoxData = {};
      _deepPageDataBoxData.value = {};
      _deepPageDataBoxData.value_percentage = {};
      let _deepDetailData1 = {};
      let _deepDetailData2 = {};
      for (let i = 0; i < res.data[0].productRise.length; i++) {
        _deepPageDataBoxData.value[res.data[0].productRise[i].process_strains_text] = {};
        _deepPageDataBoxData.value_percentage[res.data[0].productRise[i].process_strains_text] = {};

        _deepPageDataBoxData.value[res.data[0].productRise[i].process_strains_text]['产量'] = parseInt(res.data[0].productRise[i].product_total);
        _deepPageDataBoxData.value[res.data[0].productRise[i].process_strains_text]['产值'] = parseInt(res.data[0].productRise[i].output_value);

        _deepPageDataBoxData.value_percentage[res.data[0].productRise[i].process_strains_text]['产量'] = parseInt(res.data[0].productRise[i].chanl);
        _deepPageDataBoxData.value_percentage[res.data[0].productRise[i].process_strains_text]['产值'] = parseInt(res.data[0].productRise[i].chanzhi);
      }

      _deepDetailData1.value = parseInt(res.data[0].consumeRise[0].counts);
      _deepDetailData1.value_percentage = parseInt(res.data[0].consumeRise[0].consumeRise);


      _deepDetailData2.value = parseInt(res.data[0].enterpriserRise[0].counts);
      _deepDetailData2.value_percentage = parseInt(res.data[0].enterpriserRise[0].enterpriserRise);

      this.refs.deepPageDataBox.getData(_deepPageDataBoxData);
      this.refs.deepDetailData1.getData(_deepDetailData1);
      this.refs.deepDetailData2.getData(_deepDetailData2);
    }))

    me._tokens.push(api.materialConsume.send({ jsonData: JSON.stringify({}) }).then((res) => {
      console.log(res)

      let _xdata = res.data.XdateTime.push(res.data.xdateTimeForecast[0]);
      let _seriesBarData = res.data.actualAmountList.push(res.data.forecastAmountList[0])
      let _seriesLineData = res.data.scaleActualList.push(res.data.scaleForecastList[0])

      let obj = {
        titleShow: true,
        legendShow: true,
        legendData: ['加工品消耗鲜果量占鲜果产量比例', '鲜果消耗量'],
        titleText: `2017年投入加工的鲜果消耗量为${parseInt(res.data.forecastAmountList[0])}元，占鲜果产量${parseInt(res.data.forecastAmountList[0] * 100)}%`,
        xAxisData: res.data.XdateTime,
        seriesBarData: res.data.actualAmountList,
        seriesLineData: res.data.scaleActualList,
      };
      this.refs.materialConsume.setData(obj);
    }));

    //加工品产量预测
    me._tokens.push(api.machiningValue.send({}).then((res) => {
      console.log(res);
      let allNum = 0;
      let waterNum = 0;
      let allOutPut = {};
      allOutPut.names = '总产值';
      allOutPut.values = res.data.sumActualListY;
      let data = res.data.yproductNameList;
      data.splice(0, 0, allOutPut);
      let _legendData = [];
      for(let i=0;i<data.length;i++){
        _legendData.push(data[i].names);
        if(data[i].names=='芒果汁'){
          waterNum = data[i].values[data[i].values.length-1];
        }
        if(data[i].names=='总产值'){
          allNum = data[i].values[data[i].values.length-1];
        }
      }

      let obj = {
        titleShow: true,
        yAxisName: '万吨',
        titleText: `预计2018年华坪芒果加工品产量将达到${allNum}万吨，其中芒果汁产量达到${waterNum}万吨`,
        legendData: _legendData,
        xAxisData: ['2013', '2014', '2015', '2016', '2017', '2018'],
        color: ['rgba(0,144,253,1)', 'rgba(4,192,255,1)', 'rgba(0,234,255,1)', 'rgba(36,237,141,1)', 'rgba(254,255,135,1)', 'rgba(250,202,60,1)', 'rgba(255,18,107,1)'],
        colorTop: ['', 'rgba(0,144,253,1)', 'rgba(4,192,255,1)', 'rgba(0,234,255,1)', 'rgba(36,237,141,1)', 'rgba(254,255,135,1)', 'rgba(250,202,60,1)', 'rgba(255,18,107,1)'],
        colorBottom: ['', 'rgba(0,144,253,0)', 'rgba(4,192,255,0)', 'rgba(0,234,255,0)', 'rgba(36,237,141,0)', 'rgba(254,255,135,0)', 'rgba(250,202,60,0)', 'rgba(255,18,107,0)'],
        seriesData: data
      };
      this.refs.yieldValue.setData(obj);
    }));
    
    //加工品产值预测
    me._tokens.push(api.outputValueForecast.send({}).then((res) => {
      let allNum = 0;
      let waterNum = 0;

      let allOutPut = {};
      allOutPut.names = '总产值';
      allOutPut.values = res.data.sumActualListY;
      let data = res.data.yproductNameList;
      data.splice(0, 0, allOutPut);
      let _legendData = [];
      for(let i=0;i<data.length;i++){
        _legendData.push(data[i].names);
        if(data[i].names=='芒果汁'){
          waterNum = data[i].values[data[i].values.length-1];
        }
        if(data[i].names=='总产值'){
          allNum = data[i].values[data[i].values.length-1];
        }
      }


      let obj = {
        titleShow: true,
        yAxisName: '亿元',
        titleText: `预计2018年华坪芒果加工品产值将达到${allNum}亿元，其中芒果汁产值达到${waterNum}亿元`,
        legendData: _legendData,
        xAxisData: ['2013', '2014', '2015', '2016', '2017', '2018'],
        color: ['rgba(0,144,253,1)', 'rgba(4,192,255,1)', 'rgba(0,234,255,1)', 'rgba(36,237,141,1)', 'rgba(254,255,135,1)', 'rgba(250,202,60,1)', 'rgba(255,18,107,1)'],
        colorTop: ['', 'rgba(0,144,253,1)', 'rgba(4,192,255,1)', 'rgba(0,234,255,1)', 'rgba(36,237,141,1)', 'rgba(254,255,135,1)', 'rgba(250,202,60,1)', 'rgba(255,18,107,1)'],
        colorBottom: ['', 'rgba(0,144,253,0)', 'rgba(4,192,255,0)', 'rgba(0,234,255,0)', 'rgba(36,237,141,0)', 'rgba(254,255,135,0)', 'rgba(250,202,60,0)', 'rgba(255,18,107,0)'],
        seriesData: data
      };
      this.refs.machiningValue.setData(obj);
    }));

    // 龙头企业产量及产值占比
    me._tokens.push(api.getFaucetEnterpriseData.send({ jsonData: JSON.stringify({}) }).then((res) => {
      let sumHP = 0;
      let sumLT = 0;
      let datas = [];
      for (let i = 0; i < res.data[0].faucetEnterpriseDate.length; i++) {
        sumLT = sumLT + res.data[0].faucetEnterpriseDate[i].product_total;
        let data = {
          "names": res.data[0].faucetEnterpriseDate[i].name,
          "vals": res.data[0].faucetEnterpriseDate[i].product_total,
          "unit": "万吨"
        }
        datas.push(data);
      };
      for (let i = 0; i < res.data[0].hpEnterpriseDate.length; i++) {
        sumHP = sumHP + res.data[0].hpEnterpriseDate[i].product_total;
      };

      let num = parseInt(sumLT / sumHP * 100);

      let obj = {
        titleShow: true,
        titleText: `龙头企业加工品产量占据华坪${num}%以上`,
        legendShow: false,
        seriesRadius: [10, 65],
        seriesCenter: ['50%', '65%'],
        seriesData: datas,
        colorTop: ['#fed645', '#1093f5', '#29ccf4', '#2af594', '#58e2c2', '#d9ff87'],
        colorBottom: ['#eea21f', '#1779ff', '#29ccf4', '#12d578', '#58e2c2', '#feff87']
      };
      me.refs.bigCompanyRefs.setData(obj);
    }));

  }
  componentWillUnmount() {
    this._clearTokens();
  }
}

export default DeepProcessing;
