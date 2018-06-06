import React, { Component } from 'react';
import arrowUp from './arrow-up.png';
import arrowDown from './arrow-down.png';
import Word from '../other/Word';

/*
*
* */

class DeepPageDataBox extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me._flag = false;
    this.state = {
      value: {
        '芒果汁':{
          '产量':10,
          '产值':11,
        },
        '芒果干':{
          '产量':12,
          '产值':13,
        },
        '芒果酱':{
          '产量':14,
          '产值':15,
        },
        '芒果醋':{
          '产量':16,
          '产值':17,
        },
        '芒果酒':{
          '产量':18,
          '产值':19,
        }
      },
      value_percentage: {
        '芒果汁':{
          '产量':50,
          '产值':51,
        },
        '芒果干':{
          '产量':52,
          '产值':53,
        },
        '芒果酱':{
          '产量':54,
          '产值':55,
        },
        '芒果醋':{
          '产量':56,
          '产值':57,
        },
        '芒果酒':{
          '产量':58,
          '产值':59,
        },
      }
    }
  }

  getData(d) {
    this._flag = false;

    this.setState({
      value: d.value,
      value_percentage: d.value_percentage
      // data: d
    })
  }

  render() {
    let me = this;
    let titleName = ['芒果汁', '芒果干', '芒果酱', '芒果醋', '芒果酒'];
    let arrName = ['产量', '产值'];

    return (
      <div>
        {
          titleName.map((name, i) => {
            return (
              <div style={{ marginRight: '20px', float: 'left', marginLeft: i === 0 ? '7px' : '' }} key={'_zll' + i} className={'visual-pull-down'}>
                <p style={{
                  width: '150px',
                  height: '35px',
                  lineHeight: '35px',
                  textAlign: 'center',
                  fontSize: '20px',
                  color: '#fff',
                  borderLeft: '1px solid #04c0ff',
                  borderRight: '1px solid #04c0ff',
                  borderBottom: '1px solid #04c0ff',
                  background: 'linear-gradient(to bottom,rgba(0,234,255,0.6),rgba(0,144,255,0.6))',
                  marginBottom: '5px'
                }}>{name}</p>
                {
                  arrName.map((v, i) => {
                    return (
                      <div style={{ width: '150px', height: '80px', border: '1px solid #04c0ff', marginBottom: '5px' }} key={'_zll' + i}>
                        <div style={{
                          width: '30px',
                          height: '65px',
                          float: 'left',
                          paddingTop: '15px',
                          borderRight: '1px solid #04c0ff',
                          textAlign: 'center',
                          fontSize: '20px',
                          color: '#fff',
                          background: 'linear-gradient(to bottom,rgba(0,234,255,0.6),rgba(0,144,255,0.6))'
                        }}>{v}</div>
                        <div style={{
                          width: '111px',
                          paddingLeft: '8px',
                          height: '80px',
                          float: 'right',
                          background: 'linear-gradient(to bottom,rgba(0,234,255,0.3),rgba(0,144,255,0.3))'
                        }}>
                          <p style={{ width: '100%', height: '37px', lineHeight: '40px', marginBottom: 0 }}>
                            <Word fontSize={'35px'} color1={'#fff'} color2={'#00eaff'} num={this.state.value[name]? this.state.value[name][v] : 0} />
                            <Word fontSize={'16px'} color1={'#fff'} color2={'#00eaff'} num={'万吨'} />
                          </p>
                          <p style={{ width: '130%', height: '43px', lineHeight: '44px', marginBottom: 0 }}>
                            <span style={{ fontSize: '14px', color: '#fff', float: 'left' }}>同比: </span>&nbsp;
                            <span style={{
                              display: 'inline-block',
                              float: 'left',
                              width: '12px',
                              height: '27px',
                              paddingTop: '14px',
                              background: `url(${arrowUp}) no-repeat center center`,
                              backgroundSize: 'contain'
                            }}> </span>
                            <span style={{ fontSize: '28px', color: '#fff', float: 'left' }}>{this.state.value_percentage[name] ? this.state.value_percentage[name][v] + '%' : 0 + '%'}</span>
                          </p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }

      </div>
    )
  }
}

export default DeepPageDataBox;
