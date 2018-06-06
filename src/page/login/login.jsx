import React from 'react';
import './login.scss';
import { Checkbox, message } from 'antd';
import * as api from '../api/api-login';
export default class ImportExport extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.context.router;
    const me = this;
    this.state = {
      checked: false
    }
  };


  //记住密码
  onChange = (e) => {
    // console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
  };
  render(){
    const me = this;
    //点击登录按钮
    function submitBtn() {
      let userName = document.getElementById('userName').value;
      let passWord = document.getElementById('passWorld').value;


      let loginParams = {
        entityRelated:{
          userName: userName,
          password: passWord
        }
      };
      let params=JSON.stringify(loginParams);
      api.Login.send('jsonData='+params).then((res) => {
        if(res.isSuccess == true) {
          let token = res.data[0].token;
          localStorage.setItem("token", token);
          localStorage.setItem("userName", userName);
          localStorage.setItem("password", passWord);
          //localStorage.removeItem("token");
          //点击登录跳转
          me.props.history.push("/")
        }else {
          message.info('请输入正确的用户名及密码！');
        }
      });
    }
    return(
      <div className={'login-wrapper'}>
        <div className={'login-box'}>
          <form>
            <div className={'form-header'}>
              <h4>用户登录</h4>
              <p className={'bottom-line'}></p>
            </div>
            <div className={'form-group'}>
              <label htmlFor="userName">用户名：</label><br/>
              <input id={'userName'} type="text" placeholder={'请输入您的用户名'}/>
            </div>
            <div className={'form-group'}>
              <label htmlFor="passWorld">密码：</label><br/>
              <input id={'passWorld'} type="password" placeholder={'请输入您的密码'}/>
            </div>
            <div>
              <Checkbox onChange={this.onChange} style={{'color': '#8ed8ff','background': 'transparent'}}>记住密码</Checkbox>
            </div>
            <button className={'login-btn'} type={'button'} onClick={submitBtn}>登录</button>
          </form>
        </div>
      </div>
    )
  }
  componentDidMount(){
    message.config({
      top: 100,
      duration: 2,
      maxCount: 1,
    });
    let strName = localStorage.getItem('userName');
    let strPass = localStorage.getItem('password');
    if(strName) {
      document.getElementById('userName').value = strName;
    }
    if(strPass) {
      document.getElementById('passWorld').value = strPass;
    }

    if (this.props.match.url === '/login'){
      document.querySelector('ul').style.display = 'none';
      document.querySelector('a').style.display = 'none';
    }
  };
  componentWillUnmount() {//组件将要移除时
    document.querySelector('ul').style.display = 'block';
    document.querySelector('a').style.display = 'block';
  }
}