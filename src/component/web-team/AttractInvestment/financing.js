import React from 'react';

/**om
 * 产销监测--招商引资
 */
export default class Financing extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
     this.state={
          // 股东信息title
          administrativeHeaderData: ['序号','日期','级别','金额','投资方'],
          administrativeData: [
            {a:'1',b:'2',c:'3',d:'4',e:'5'},
            {a:'1',b:'2',c:'3',d:'4',e:'5'}
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

