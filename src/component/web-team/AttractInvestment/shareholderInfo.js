import React from 'react';

/**om
 * 产销监测--招商引资
 */
export default class ShareholderInfo extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
     this.state={
          // 股东信息title
           shareholderHeaderData: ['序号','股东','持股比例','认缴出资额（万元）','认缴出资日期','股东类型'],
           shareholderInfo:[{a:'1',b:'2',c:'3',d:'4',e:'5',f:'6',g:'7'},
        {a:'1',b:'2',c:'3',d:'4',e:'5',f:'6',g:'7'}]
      }
  }
    componentWillReceiveProps(nextProps) {
        this.setState({shareholderInfo: nextProps.data});
    }

  render() {
    const me = this;

    return (
      <table className={'shareholder-box'}>
        <tbody>
        <tr>
        {
          this.state.shareholderHeaderData.map((item, index) =>
            <th key={index}>{item}</th>
          )
        }
        </tr>
       
        {
          this.state.shareholderInfo.length>0?
          this.state.shareholderInfo.map((item,index) =>
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.shareholderName}</td>
              <td>{item.shareRate}</td>
              <td>{item.subscribedAmountSum}</td>
              <td>{item.createdTime}</td>
              <td>{item.enterpriseNatureText}</td>
            </tr>
          )
          :
          <tr><td colSpan='99'>暂无信息</td></tr>
        }
        </tbody>
      </table>

    )
  }
}

