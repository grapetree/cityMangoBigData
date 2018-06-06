import React from 'react';
import { Modal, Collapse } from 'antd';
/**
 * 产销监测--招商引资
 */
export default class Xl extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
     this.state = {
          //关系图谱，右侧折叠菜单
          relationship:{},
          aaa:'111',
          xldata: [
              {
                firstName:'股东',
                children:[
                  {cnanme:'北京九次方大数据集团有限公司'},
                  {cnanme:'北京九次方大数据集团有限公司2'},
                  {cnanme:'北京九次方大数据集团有限公司4'},
                  {cnanme:'北京九次方大数据集团有限公司3'}
                ]
              }, 
              {
                firstName:'高管',
                children:[
                  {cnanme:'高管九次方大数据集团有限公司'},
                  {cnanme:'高管九次方大数据集团有限公司2'},
                  {cnanme:'高管九次方大数据集团有限公司4'},
                  {cnanme:'高管九次方大数据集团有限公司3'}
                ]
              }, 
              {
                firstName:'对外投资',
                children:[
                  {cnanme:'对外投资九次方大数据集团有限公司'},
                  {cnanme:'对外投资九次方大数据集团有限公司2'},
                  {cnanme:'对外投资九次方大数据集团有限公司4'},
                  {cnanme:'对外投资九次方大数据集团有限公司3'}
                ]
              }, 
              {
                firstName:'法院裁决',
                children:[
                  {cnanme:'法院裁决九次方大数据集团有限公司'},
                  {cnanme:'法院裁决九次方大数据集团有限公司2'},
                  {cnanme:'法院裁决九次方大数据集团有限公司4'},
                  {cnanme:'法院裁决九次方大数据集团有限公司3'}
                ]
              }, 
              {
                firstName:'法院公告',
                children:[
                  {cnanme:'法院公告九次方大数据集团有限公司'},
                  {cnanme:'法院公告九次方大数据集团有限公司2'},
                  {cnanme:'法院公告九次方大数据集团有限公司4'},
                  {cnanme:'法院公告九次方大数据集团有限公司3'}
                ]
              }, 
              {
                firstName:'历史股东',
                children:[
                  {cnanme:'历史股九次方大数据集团有限公司'},
                  {cnanme:'历史股东九次方大数据集团有限公司2'},
                  {cnanme:'历史股东九次方大数据集团有限公司4'},
                  {cnanme:'历史股东九次方大数据集团有限公司3'}
                ]
              }, 
              {
                firstName:'疑似关系',
                children:[
                  {cnanme:'疑似关系九次方大数据集团有限公司'},
                  {cnanme:'疑似关系九次方大数据集团有限公司2'},
                  {cnanme:'疑似关系九次方大数据集团有限公司4'},
                  {cnanme:'疑似关系九次方大数据集团有限公司3'}
                ]
              }
          ]
      };
  }
  componentWillReceiveProps(nextProps) {
        this.setState({relationship: nextProps.data});
    }
  render() {
    const me = this;
    const Panel = Collapse.Panel;
    let arr = Object.keys(this.state.relationship);
    const customPanelStyle = {
      background: '#2E5DBB',
      borderRadius: 4,
      marginBottom: 0,
      border: 0,
      overflow: 'hidden',
      color: '#fff'
    };
    return (
     <Collapse accordion bordered={false} >
      {
    
       arr.length>0 ? 
         arr.map((item, index) =>
             
              {    

                return (
                  <Panel header={item}  key={index}  num={this.state.relationship[item].length} style={customPanelStyle}>      
                  <ul className={'xl-list'} style={{position:'relative'}}>
                   {
                    this.state.relationship[item].length > 0 ? 
                        this.state.relationship[item].map((v, i) => {
                          return ( <li key={v.id}  className={'xl-item'}> <span className={'iconfont icon-qiye'}></span>{v.enterpriseName}</li>)
                        }) 
                    : <li  className={'xl-item'}>暂无信息</li>         
                  
                  } 
                 </ul></Panel>)
              })
          : ''
        }
      </Collapse>
    )
  }
}

