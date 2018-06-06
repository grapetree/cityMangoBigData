import React from 'react';

/**om
 * 产销监测--招商引资
 */
export default class Administrative extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
     this.state={
          // 股东信息title
          administrativeHeaderData: ['序号','项目名称','地域','决定日期','截止日期','许可机关','许可内容'],
          administrativeData: [
            {a:'1',b:'2',c:'3',d:'4',e:'5',f:'6',g:'7'},
            {a:'1',b:'2',c:'3',d:'4',e:'5',f:'6',g:'7'}
          ],
      }
  }
    componentWillReceiveProps(nextProps) {
        this.setState({administrativeData: nextProps.data});
    }
  render() {
    const me = this;
    return (
      <table className={'shareholder-box'}>
        <tbody>
        <tr>
        {
          this.state.administrativeHeaderData.map((item, index) =>
            <th key={index}>{item}</th>
          )
        }
        </tr>        
        {          
          this.state.administrativeData.length>0?
          this.state.administrativeData.map((item,index) =>
            <tr key={index}>
              <td>{item.id}</td>
              <td></td>
              <td></td>
              <td>{item.startDate}</td>
              <td>{item.endDate}</td>
              <td>{item.organ}</td>
              <td>{item.content}</td>
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

