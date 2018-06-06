import React from 'react';
import './plant.css';
import plant1 from './plant1.png';
import plant2 from './plant2.png';
import plant3 from './plant3.png';
import plant4 from './plant4.png';
import plant5 from './plant5.png';
import plant6 from './plant6.png';
import down from './arrow-down.png';
import up from './arrow-up.png';
import Word from '../other/Word';
const data = [
  {
    img: plant1,
    area: '种植面积',
    unit: '万亩'
  },
  {
    img: plant2,
    area: '挂果面积',
    unit: '万亩'
  },
  {
    img: plant3,
    area: '有机认证面积',
    unit: '万亩'
  },
  {
    img: plant4,
    area: '绿色认证面积',
    unit: '万亩'
  },
  {
    img: plant5,
    area: '总产量',
    unit: '万吨'
  },
  {
    img: plant6,
    area: '种植合作社',
    unit: ' 户'
  }
];
class MangoPlantState extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className={'plant-state'}>
        {
          data.map((v,i)=>{
            return(
              <ul className={'list'} key={'zll'+i} style={{
                borderBottom: i === 5? '' : '1px solid #001541'
              }}>
                <li className={'img'} style={{
                  background: `url(${ v.img }) no-repeat right top`,
                  backgroundSize: '54px 54px'
                }}>
                </li>
                <li className={'value'}>
                  <p>{v.area}</p>
                  <p>
                    <span style={{fontSize:'34px'}}>20</span>
                    <span>{v.unit}</span>
                  </p>
                </li>
                <li className={'percent'}>
                  <p>同比</p>
                  <p>
                    <Word fontSize={'30px'} num={'+'}/>
                    <span className={'distance'}></span>
                    <Word fontSize={'35px'} num={10}/>
                    <span className={'distance'}></span>
                    <Word fontSize={'20px'} num={'%'}/>
                    <img src={up} className={'arrow'}/>
                  </p>
                </li>
              </ul>
            )
          })
        }
      </div>
    )
  }
}
export default MangoPlantState;