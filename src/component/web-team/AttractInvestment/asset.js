import React from 'react';

/**om
 * 产销监测--招商引资
 */
export default class Asset extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
    this.state = {
       assetsInfo: []
    };
  }
     componentWillReceiveProps(nextProps) {
        this.setState({assetsInfo: nextProps.data});
    }
  render() {
    const me = this;
    return (
      <table className={'info-box'}>

      {
      this.state.assetsInfo.map((t,i) =>
     <tbody key={i}>
        <tr>
          <td>资产总额</td>
          <td>{t.totalAssets}</td>
          <td>所有者权益合计</td>
          <td>{t.totalOwnersEquity}</td>
        </tr>
        <tr>
          <td>营业总收入</td>
          <td></td>
          <td>利润总额</td>
          <td>{t.totalProfit}</td>
        </tr>
        <tr>
          <td>营业总收入中主营业务收入</td>
          <td>{t.operatingIncome}</td>
          <td>净利润</td>
          <td>{t.netProfit}</td>
        </tr>
        <tr>
          <td>纳税总额</td>
          <td></td>
          <td>负债总额</td>
          <td>{t.totalLiabilities}</td>
        </tr>
        </tbody>
        )
        }
       
      </table>

    )
  }
}

