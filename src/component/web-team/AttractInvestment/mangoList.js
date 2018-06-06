import React from 'react';
import { Modal, Collapse} from 'antd';
// 切换键
import BtnTab from '../../../component/web-team/btnTab/BtnTab';
// 关系图
import Gx from '../../../component/web-team/AttractInvestment/gx';
// 折叠面板
import Xl from '../../../component/web-team/AttractInvestment/xl';
// 工商信息
import AaumInfo from '../../../component/web-team/AttractInvestment/aaumInfo';
// 股东信息
import ShareholderInfo from '../../../component/web-team/AttractInvestment/shareholderInfo';
// 行政许可
import Administrative from '../../../component/web-team/AttractInvestment/administrative';
//融资信息
import Financing from '../../../component/web-team/AttractInvestment/financing';
//招聘信息
import Job from '../../../component/web-team/AttractInvestment/job';
//公司资产信息
import Asset from '../../../component/web-team/AttractInvestment/asset';
// 小标题
import MangoListTitle from './mangoListTitle';
import * as api from '../../../page/api/api-mgList'; 
/**om
 * 产销监测--招商引资
 */
export default class MangoList extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
    //console.log(props.data);
    this.state = {
      // 行政许可
      currentIndex:0,
      id:'',
      comInfo:{
        address:'',
        corporationName:'',
        enterpriseName:'',
        linkmanMobile:'',
        email:'492346685@qq.com'
      },//基本信息
      enterpriseBasicInfo:{},//工商信息
      shareholderInfo:[],//股东信息
      administrationInfo:[],//行政许可
      assetsInfo:[],//企业资产状况信息
      relationship:{},//折叠面板
    }
  }
  state = {
    loading: false,
    visible: false,
  };
  showModal = () => {
    this.setState({
      visible: true,
    }); 
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  _change = (a) => {    
     this.setState({
            currentIndex: a.sid
        });
  };
  afterClose = () => {    
     this.setState({
            currentIndex: 0
        });
  };

 
  initList(){ 
    let id=this.state.id; 
    let jsonData = {jsonData:{entityRelated:{id:id}}};
     api.getInfo.send(jsonData).then((res) => {
            let NewComInfo={
                address:res.data.address,
                corporationName:res.data.corporationName,
                enterpriseName:res.data.enterpriseName,
                linkmanMobile:res.data.linkmanMobile,
                email:''
            }
             this.setState({
              comInfo:NewComInfo,
              enterpriseBasicInfo:res.data.enterpriseBasicInfo,
              shareholderInfo:res.data.shareholderInfo,
              administrationInfo:res.data.administrationInfo,
              assetsInfo:res.data.assetsInfo,
              relationship:res.data.relationship
             },()=>{
                //console.log(this.state.relationship,'yyyy')
             })
            
        })
    
    }
 
  model(a){
    //a.id
    this.showModal();
    this.setState({
          id:a.item.id
    }, () => {
      this.initList()
    })
 
  // this.initList()
  }
  componentDidMount(){
    //console.log(2)
       // this.initList()
    }


  render() {
    const me = this;
    let isBox1Show=this.state.currentIndex==1 ? 'block' : 'none';
    let isbox2Show=this.state.currentIndex==0 ? 'block' : 'none';
    let isbox3Show=this.state.currentIndex==2 ? 'block' : 'none';
    const { visible, loading } = this.state;
    return (
      <div className={'mango-wrapper'}>
        <ul className={'mango-list'}>
          {
            this.props.data.map((item, index) =>
              <li className={'mango-item'} key={index} onClick={this.model.bind(this,{item})}>
                <div className={'mango-img'}>
                  <img src={item.imgUrl} alt=""/>
                </div>  
                <div className={'company-detail'}>
                  <ul>
                    <li className={'company-header'}>
                      <span className={'text'}>{item.enterpriseName}</span>
                      <span className={'btn-go'}>续存</span>
                    </li>
                    <li>
                      <label>法定代表人：</label>
                      <span className={'content'}>{item.corporationName}</span>
                    </li>
                    <li>
                      <label>成立日期：</label>
                      <span className={'content'}>{item.foundDate}</span>
                    </li>
                    <li>
                      <label>注册资本：</label>
                      <span className={'content'}>{item.registeredCapital}</span>
                    </li>
                    <li>
                      <label>电话：</label>
                      <span className={'content'}>{item.linkmanMobile}</span>
                    </li>
                    <li>
                      <label>邮箱：</label>
                      <span className={'content'}>{item.email}</span>
                    </li>
                    <li>
                      <label>地址：</label>
                      <span className={'content'}>{item.address}</span>
                    </li>
                    <li>
                      <span className={'look-detail'}>查看详情>></span>
                    </li>
                  </ul>
                </div>
              </li>
            )
          }
        </ul>
         
        <Modal
          visible={visible}
          title={null}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          afterClose={this.afterClose}
          footer={null}
          destroyOnClose={true}
          width={'1337px'}
          wrapClassName="cttclass"
          bodyStyle={{background:'url(/static/image/mango-bg1.jpg) 100% 100% no-repeat'}}
        >
          <div className={'model-box'}>
            <div className={'header-box'}>
              <div className={'header'}>
                <span className={'text'}>{this.state.comInfo.enterpriseName}</span>
                <span className={'btn-go'}>续存</span>
              </div>
              <ul className={'detail-list'}>
                <li className={'detail-item'}>
                  <label>法定代表人：</label>
                  <span className={'content'}>{this.state.comInfo.corporationName}</span>
                </li>
                <li className={'detail-item'}>
                  <label>邮箱：</label>
                  <span className={'content'}>{this.state.comInfo.email}</span>
                </li>
                <li className={'detail-item'}>
                  <label>联系电话：</label>
                  <span className={'content'}>{this.state.comInfo.linkmanMobile}</span>
                </li>
                <li className={'detail-item'}>
                  <label>地址：</label>
                  <span className={'content'}>{this.state.comInfo.address}</span>
                </li>
              </ul>
            </div>
            <div className={'content-box'}>
              <div className={'tab'}>
                <BtnTab _change={this._change.bind(this)} sid='0' nameArr={['基本信息', '经营信息','关系图谱']}/>
              </div>
              <div className={'tabOne'} style={{"display":isbox3Show}}>
                <div className={'gx'}>
                  <Gx data = {this.state}/>
                </div>
                <div className={'xl'}>
                  <Xl data={this.state.relationship}/>
                </div>
              </div>
              <div className={'tabTwo'}  style={{"display":isbox2Show}}>
                <div className={'aaum-info'}>
                  <MangoListTitle content={'工商信息'}/>
                  <AaumInfo data={this.state.enterpriseBasicInfo} />
                </div>
                <div className={'shareholder-info'}>
                  <MangoListTitle content={'股东信息'}/>
                  <ShareholderInfo data={this.state.shareholderInfo}/>
                </div>
                <div className={'company-intro'}>
                  <MangoListTitle content={'公司简介'}/>
                  <div className={'intro-text'}>暂无信息</div>
                </div>
              </div>
              <div className={'tabThree'}  style={{"display":isBox1Show}}>
                <div className={'administrative-permit'}>
                  <MangoListTitle content={'行政许可'}/>
                  <Administrative data={this.state.administrationInfo}/>
                </div>
                <div className={'financing-info'}>
                  <MangoListTitle content={'融资信息'}/>
                  <Financing  data=''/>
                </div>
                <div className={'job-info'}>
                  <MangoListTitle content={'招聘信息'}/>
                  <Job data=''/>
                </div>
                <div className={'asset-info'}>
                  <MangoListTitle content={'企业资产状况信息'}/>
                  <Asset data={this.state.assetsInfo}/>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>

    )
  }
}

