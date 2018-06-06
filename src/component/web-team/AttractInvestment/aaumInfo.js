import React from 'react';

/**om
 * 产销监测--招商引资
 */
export default class AaumInfo extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
    this.state = {
       enterpriseBasicInfo: ''
    };
  }
     componentWillReceiveProps(nextProps) {
        this.setState({enterpriseBasicInfo: nextProps.data});
    }
  render() {
    const me = this;
    return (
      <table className={'info-box'}>
      <tbody>
        <tr>
          <td>公司名称</td>
          <td>{this.state.enterpriseBasicInfo.enterpriseName}</td>
          <td>统一社会信用码</td>
          <td>{this.state.enterpriseBasicInfo.societyCreditId}</td>
        </tr>
        <tr>
          <td>所属行业</td>
          <td>{this.state.enterpriseBasicInfo.industryTypeText}</td>
          <td>组织机构代码</td>
          <td>{this.state.enterpriseBasicInfo.enterpriseTypeText}</td>
        </tr>
        <tr>
          <td>法定代表人</td>
          <td>{this.state.enterpriseBasicInfo.corporationName}</td>
          <td>营业状态</td>
          <td>{this.state.enterpriseBasicInfo.registerTypeText}</td>
        </tr>
        <tr>
          <td>注册资金</td>
          <td>{this.state.enterpriseBasicInfo.registeredCapital}</td>
          <td>成立日期</td>
          <td>{this.state.enterpriseBasicInfo.foundDate}</td>
        </tr>
        <tr>
          <td>注册地址</td>
          <td>{this.state.enterpriseBasicInfo.enterpriseAddress}</td>
          <td>营业期限</td>
          <td>{this.state.enterpriseBasicInfo.businessDuetime}</td>
        </tr>
        <tr>
          <td>企业类型</td>
          <td>{this.state.enterpriseBasicInfo.enterpriseTypeText}</td>
          <td>核准日期</td>
          <td>{this.state.enterpriseBasicInfo.approvalDate}</td>
        </tr>
        <tr>
          <td>营业范围</td>
          <td colSpan={'3'}>{this.state.enterpriseBasicInfo.businessScope}</td>
        </tr>
        </tbody>
      </table>

    )
  }
}

