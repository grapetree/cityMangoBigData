import React, {Component} from 'react';
import ResizeManager from './component/visual-team/common/ResizeManager';
import './App.css';
import 'antd/dist/antd.css';
// nav
import Navigation from './component/visual-team/navigation/Nav';

import {Provider} from 'react-redux';
import store from './store/Store';

import {HashRouter, Route,withRouter} from 'react-router-dom';
//产业链全景图
import IndustryChain from './page/industry-chain/IndustryChain';
//种植生产--生产现状
import ProductionActuality from './page/planting/ProductionActuality';
//种植生产--物联网监控
import InternetThing from './page/planting/InternetThing';
//种植生产--农业灾害评估
import AgriculturalDisasters from './page/planting/AgriculturalDisasters';
//种植生产--不同主产区对比
import ProductionComparison from './page/planting/ProductionComparison';
//精深加工
import DeepProcessing from './page/deep-processing/DeepProcessing';
//市场消费
import MarketSale from './page/market-sale/MarketSale';
//进出口贸易
import ImportExport from './page/import-export/ImportExport';
//市场价格--价格监测
import PriceSurvey from './page/market-price/PriceSurvey';
//市场价格--波动规律
import WaveLaw from './page/market-price/WaveLaw';
//市场价格--价格预测
import PriceForecast from './page/market-price/PriceForecast';
//产销监测--供需分析
import SupplyAnalysis from './page/production-test/SupplyAnalysis';
//产销监测--滞销预警
import UnmarketableWarning from './page/production-test/UnmarketableWarning';
//产销监测--招商引资
import AttractInvestment from './page/production-test/AttractInvestment';
//质量安全--质量监管
import QualitySupervision from './page/safety-quality/QualitySupervision';
//质量安全--舆情监测
import TalkMonitoring from './page/safety-quality/TalkMonitoring';
import LoginPage from './page/login/login'

/**
 * 渲染逻辑
 */
class App extends Component {
  constructor(props) {
    super(props);
    const me = this;
  }

  render() {

    const width = 1920;
    const height = 1080;
    const mode = window.resizeManagerMode || ResizeManager.MODE_DEBUG;
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="app" style={{width, height}}>
            <ResizeManager fullWidth={width} fullHeight={height} mode={mode}/>
            <Navigation/>

            <Route exact path='/' component={IndustryChain}/>
            <Route path='/login' component={LoginPage} />
            <Route path='/productionActuality' component={ProductionActuality}/>
            <Route path='/internetThing' component={InternetThing}/>
            <Route path='/agriculturalDisasters' component={AgriculturalDisasters}/>
            <Route path='/productionComparison' component={ProductionComparison}/>
            <Route path='/deepProcessing' component={DeepProcessing}/>
            <Route path='/marketSale' component={MarketSale}/>
            <Route path='/importExport' component={ImportExport}/>
            <Route path='/priceSurvey' component={PriceSurvey}/>
            <Route path='/waveLaw' component={WaveLaw}/>
            <Route path='/priceForecast' component={PriceForecast}/>
            <Route path='/supplyAnalysis' component={SupplyAnalysis}/>
            <Route path='/unmarketableWarning' component={UnmarketableWarning}/>
            <Route path='/attractInvestment' component={AttractInvestment}/>
            <Route path='/qualitySupervision' component={QualitySupervision}/>
            <Route path='/talkMonitoring' component={TalkMonitoring}/>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export {App, store};
