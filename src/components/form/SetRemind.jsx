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
        /*准备数据*/
        let code=values.code
        let remind_price=values.remind_price
        console.log(code)
        console.log(remind_price)

        /*将股票代码和提醒价格发送给账户业务,如果返回1,就说明ok,否则说明操作失败*/
        // fetch('http://127.0.0.1:8080/account/code_remindprice_set.json')
        // .then(res=>res.json())
        // .then(res=>{
        //   if(res['code']==200){
        //     /*操作成功*/
        //     message.success('添加提醒成功')
        //   }
        //   else{
        //     /*操作失败*/
        //     message.error('添加失败,失败原因是'+res['msg'])
        //     console.log(res['msg'])
        //   }
        // })
        }
      });
    }
  validateStockCode(rule,value,callback){
    /*股票代码只包含数字和英文字母*/
    if(value&&/[^0-9a-zA-Z]/g.test(value)){
      callback('请输入只包含数字和英文字母的股票代码')
    }else{
      callback()
    }
  }
  validateRemindPrice(rule,value,callback){
    /*提醒价格只包含数字和点*/
    if(value&&/[^0-9\.]/g.test(value)){
      callback('请输入只包含数字和点的提醒价格')
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
          label="股票代码"
        >
          {getFieldDecorator('code', {
            rules: [{
              required: true, message: 'Please input your stock code!',
            },
            {validator:this.validateStockCode}
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="提醒价格"
        >
          {getFieldDecorator('remind_price', {
            rules: [{
              required: true, message: 'Please input your remind price!',
            },
            {validator:this.validateRemindPrice}
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem >
          <Button type="primary" htmlType="submit">添加提醒</Button>
        </FormItem>
      </Form>
    );
  }
}

const ChangePassword = Form.create()(RegistrationForm);
export default ChangePassword
