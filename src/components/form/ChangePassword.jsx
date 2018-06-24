import React from 'react';
import ReactDOM from 'react-dom';
import {message, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        /*如果确认一遍的密码和新密码一致,则继续执行,否则不执行*/
        if(values&&values.password==values.confirm){
          /*将旧密码和新密码发送给服务器,如果正常的话,就是code==200,否则不是*/
          console.log(values)
          // fetch('http://127.0.0.1:8080/account/changpwd.json')
          // .then(res=>res.json())
          // .then(res=>{
          //
          //   /*如果code为正确,那么就是改变了密码成功,所以data也是1了.所以不用再判断data了*/
          //   if(res['code']==200){
          //       message.success('修改密码成功');
          //       setTimeout(()=>{
          //         window.location.reload()
          //       },1000)
          //   }
          //     else{
          //       message.error('密码不正确,请再输入一遍');
          //       console.log(res['msg']);
          //     }
          //   })
          let token=localStorage.getItem('token')
          let account_url='http://111.231.75.113:5002/api/account/newpassword'
          fetch(account_url,{
              method:"POST",//#method: "POST",
              headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+token,
                },
               body:JSON.stringify({
                 old_password:values.old_password,
                 new_password:values.password,
          })
          })
          .then(res=>{
            if(res.status==200){
              message.success('修改密码成功');
              setTimeout(()=>{
                window.location.reload()
              },1000)
            }
            else{
              message.error('密码不正确,请再输入一遍');
              // console.log(res)
              // console.log(res.status)
            }


          })




          // res=>res.json())
          // .then(res=>{
          //   console.log(res)
          // })
          //


          }
        }
      });
    }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;


    return (
      <Form layout="horizontal" style={{marginLeft:50, width:300}} onSubmit={this.handleSubmit}>
        <FormItem
          label="旧密码"
        >
          {getFieldDecorator('old_password', {
            rules: [{
              required: true, message: 'Please input your password!',
            },
            {validator:this.validatePassword}
            ],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          label="新密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            },
            {validator:this.validatePassword}
            ],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          label="新密码确认"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem >
          <Button type="primary" htmlType="submit">修改密码</Button>
        </FormItem>
      </Form>
    );
  }
}

const ChangePassword = Form.create()(RegistrationForm);
export default ChangePassword
