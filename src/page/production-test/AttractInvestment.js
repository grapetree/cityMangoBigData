import React from 'react';
// 头部文字
import HeaderText from '../../component/web-team/SupplyAanlysis/headerText'
// 相关企业
import MangoList from "../../component/web-team/AttractInvestment/mangoList";
// 下拉框
import Select from '../../component/web-team/select/Select';
import { Pagination } from 'antd';
//引入接口文件
import * as api from '../api/api-mgList';
import './attract.scss';
/**
 * 产销监测--招商引资
 */

class AttractInvestment extends React.Component {
  constructor() {
    super();
    const me = this;
    //console.log(me);
    this.state = {
      list: [],
      enterpriseTypeCodeArr:['全部'],
      keyArr:['0'],
      total:500,
      pageIndex:1,
      params:{
        jsonData:{
          entityRelated:{
            enterpriseTypeCode:"",//企业类型编码--产业链环节下拉
            industrytypeCode:"",//产业类型编码--产业下拉
            regionCode:""       //地区编码--地区下拉
          },
          page:{
            pageIndex:1,
            pageSize:9
          }
        }    
      }  
    }
  };
  //列表接口
  initList(){
        api.getMgList.send(this.state.params).then((res) => {            
             this.setState({
                list:res.data,
                total:res.totalCount
            },()=>{console.log(this.state.total)})
        })
  }
  //企业类型编码--产业链环节下拉
  enterpriseTypeCode(){
        api.enterpriseType.send({jsonData:''}).then((res) => {
          let kArr=[''], nArr=['全部'];           
            res.data.map((v,i)=>{
                kArr.push(v.code)
                nArr.push(v.text)
            })
             this.setState({
               enterpriseTypeCodeArr:nArr,
               keyArr:kArr
            })
        })
  }
   onChange=(pageNumber) => {
    console.log(pageNumber,'2222')
    let linshiParams=this.state.params
    console.log(linshiParams)
    linshiParams.jsonData.page.pageIndex=pageNumber
      this.setState({
        params:linshiParams,
        pageIndex:pageNumber
    },()=>{
      this.initList()
    })
   }
  _cypullDownMes(a){  console.log(a)};
  _pullDownMes(a){
    console.log(a)
    this.setState({
        params:{
        jsonData:{
          entityRelated:{
            enterpriseTypeCode:a.key,//企业类型编码--产业链环节下拉
            industrytypeCode:"",//产业类型编码--产业下拉
            regionCode:""       //地区编码--地区下拉
          },
          page:{
            pageIndex:1,
            pageSize:9
          }
        }    
      }  
    },()=>{
      this.initList()
    })

  };
  componentDidMount(){
       this.enterpriseTypeCode() 
       this.initList()
    }
  render() {
    const me = this;
    return (
      <div className={'attract-wrapper'}>
        <div className={'attract-header'}>
          <div className={'attract-title'}>
            <HeaderText content={'为您推荐10家相关企业'} top={'124px'} left={'167px'} fontSize={'0.22rem'}/>
          </div>
          <div className={'select-box'}>
          {/*    <div>
              <div className={'cd'}>产地：</div>
              <Select _pullDownMes={this._pullDownMes.bind(this)} nameArr={['全国', '华坪','云南','丽江']}  style={{
                position: 'absolute',
                top: '124px',
                width:'110px',
                right: '600px',
                 
              }}/>
            </div>*/}
            <div>
              <div className={'cy'}>产业：</div>
              <Select _pullDownMes={this._cypullDownMes.bind(this)} status='0' nameArr={['农业>芒果']}  style={{
                position: 'absolute',
                top: '124px',
                width:'120px',
                right: '350px',
     
              }}/>
            </div>
            <div>
              <div className={'cyl'}>产业链环节：</div>
              <Select _pullDownMes={this._pullDownMes.bind(this)} status='1' keyArr={this.state.keyArr} nameArr={this.state.enterpriseTypeCodeArr} style={{
                position: 'absolute',
                top: '124px',
                width:'110px',
                right: '40px',
      
              }}/>
            </div>
          </div>
        </div>
        <MangoList data={this.state.list}/>
        <Pagination showQuickJumper defaultPageSize={9} defaultCurrent={1} total={this.state.total} onChange={this.onChange} />
      </div>
    )
  }
}

export default AttractInvestment;
