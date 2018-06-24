import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Checkbox, Spin } from 'antd';
import { Redirect, Route, Switch,Link } from 'react-router-dom';
import '../../style/login.less';
const FormItem = Form.Item;

const login = [{
  username:'admin',
  password:'admin'
},{
  username:'zju',
  password:'123456'
}];

class NormalLoginForm extends Component {
  constructor(props){
    super(props)
    // if(sessionStorage.getItem('userinfo')!=null||localStorage.getItem('userinfo')!=null)
    //   this.props.history.push({pathname:'/app'});

  }
  componentWillMount(){

    /*如果要自动登录的话,使用下面语句*/
    /*如果Storage里有用户信息,就从localStroage或者sessionStorage里面获取用户信息,并且不再驻留login的页面*/
    // if(localStorage.getItem('userinfo')!=null){
    //   let values=JSON.parse(localStorage.getItem('userinfo'))
    //   this.props.history.push({pathname:'/app',state:values});
    //
    // }
  }
  state = {
      isLoding:false,
  };
  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
          if (!err) {
              console.log('Received values of form: ', values);

              //把用户名和密码传递过去,如果返回的data为1,说明登录成功,否则不成功*/
                // let myHeaders = new Headers({
                //   // 'Access-Control-Allow-Origin': '*',
                //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                //   // 'Content-Type': 'application/json',
                //   // 'mode':'no-cors'
                // });
                // let myHeaders = new Headers({
                //   "Access-Control-Allow-Origin": "www.XXX.com",
                //   mode:'no-cors'
                // });
                let url='http://127.0.0.1:8080/account/username_pwd.json'
                let project_url="http://192.144.171.192:3000/api/login"

                fetch(project_url,{
                  method:"POST",//#method: "POST",
                  headers:{
                    'Content-Type': 'application/json',
                    },
                   body:JSON.stringify({
                     // user:"201806212226",
                     // pwd:'123456'
                     user:values.username,
                     pwd:values.password,
                     })
                  })
                .then(res=>{
					//console.log(res);
                    if(res.status==200){
                      return res.json()
                    }
                    else{
                      return 0;
                    }
                  })
                .then(
                    (res)=>{
						/*error*/
                        if(res==0||res['state_code']==1){
                          message.error('登录失败')
                          return;
                        }
                        /*ok*/
                        console.log(res)
                        localStorage.setItem('token',res['token'])
                        localStorage.setItem('account_id',res['userInfo']['account_id'])
    
                        this.setState({
                            isLoding: true,
                        });
    
                        /*如果记住我,就在localStorage里面设置值*/
                        if(values.remember==true){
                          localStorage.setItem('userinfo',JSON.stringify(values));
                        }
    
                        /*无论有没有记住我,都在sessionStorage里面设置值*/
                        sessionStorage.setItem('userinfo',JSON.stringify(values));
                        message.success('login successed!'); //成功信息
                        let that = this;
    
                        setTimeout(function() { //延迟进入
                            console.log(values)
                            that.props.history.push({pathname:'/app',state:values});
                        }, 2000);
                      
                  })
          }
      });
  };
  validateUsername(rule,value,callback){
    /*如果通过了检验,就不提示任何东西,如果没有,就提示输入正确的格式*/
    // if(/^([a-zA-z_]{1})([\w]*)$/g.test(value)){
    //   callback()
    // }else if(value!=''){
    //   callback('请输入下划线和字母开头的用户名')
    // }
    callback()
  }
  validatePassword(rule,value,callback){
    if(/[^0-9a-zA-Z]/g.test(value)){
      /*表示密码中含有数字和英文字母以外的值,说明格式错误*/
      callback('请输入只包含数字和英文字母的密码')
    }else{
      callback()
    }
  }
  render() {

      /*状态规定:1. 已登录<=>sessionStorage或localStorage里面有userinfo 2.未登录<=>sessionStorage和localStorage里面都没有userinfo*/
      /*思路:
      如果已登录,访问login:跳转到/app;
                访问其他:不跳转;
      如果未登录,访问login,不跳转;
                访问其他,跳转到/login;*/
      //如果已经登录,就跳转到/app
      if(sessionStorage.getItem('userinfo')!=null||localStorage.getItem('userinfo')!=null){
        /*确保sessionStorage里面有userinfo*/
        if(sessionStorage.getItem('userinfo')===null){
          let tmp=localStorage.getItem('userinfo')
          sessionStorage.setItem('userinfo',tmp)
        }
        return <Redirect to='/app'></Redirect>
      }



      const { getFieldDecorator } = this.props.form;
      return (
          this.state.isLoding?<Spin size="large" className="loading" />:
          <div className="login">
              <div className="login-form">
                  <div className="login-logo">
                      <div className="login-name">iStock</div>
                  </div>
                  <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                      <FormItem label="用户名">
                          {getFieldDecorator('username', {
                              rules: [{ required: true, message: '请输入用户名!' },
                            {validator:this.validateUsername}],
                          })(
                              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                          )}
                      </FormItem>
                      <FormItem label="密码">
                          {getFieldDecorator('password', {
                              rules: [{ required: true, message: '请输入密码!' },
                            {validator:this.validatePassword}],
                          })(
                              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                          )}
                      </FormItem>
                      <FormItem style={{marginBottom:'0'}}>
                          {getFieldDecorator('remember', {
                              valuePropName: 'checked',
                              initialValue: true,
                          })(
                              <Checkbox>记住我</Checkbox>
                          )}
                          <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                              登录
                          </Button>
                          {/*Or <a href="">现在就去注册!</a>*/}
                      </FormItem>
                  </Form>
                  {/*<a className="githubUrl" href="https://github.com/zhaoyu69/antd-spa"> </a>*/}
              </div>
          </div>
      );
  }
}

const Login = Form.create()(NormalLoginForm);
export default Login;
