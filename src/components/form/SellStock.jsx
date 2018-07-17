import React from 'react';
import { Form, Icon, Input, Button,message, Modal } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
var central_url='http://95.169.8.179:5000/sell'

class TransactionForm extends React.Component {
  constructor(){

    super()
    this.state={
      visible:false,
      "price":"",
      "recommended_price":0,
    }

  }
	componentDidMount() {
			// To disabled submit button at the beginning.
			this.props.form.validateFields();
		}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);

        /*预备数据*/
        let account_id=JSON.parse(localStorage.getItem('userInfo')).account_id
        let stock_code=values.stockCode
        let sell_price=Number(values.sellPrice)
        let sell_number=Number(values.sellNumber)
        //console.log(username)
        console.log(account_id,stock_code,sell_price,sell_number)

        /*将用户名+股票代码+卖出价格+卖出数量发送给中央交易系统,如果购买成功,则返回1,否则失败(不知道到底传给我什么)*/
        //fetch('http://127.0.0.1:8080/central/name_code_price_amount_sell.json')
        fetch(central_url, {
          method:"POST",
          headers:{
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
             account_id:account_id,
             stock_id:stock_code,
             number:sell_number,
             price:sell_price,
           })
        })
        .then(res=>{
          if(res['status']==200){
            return res.json()
          }
          else{
            return 0;
          }
        })
        .then(res=>{
          console.log(res);
          if(res==0){
            message.error('卖出失败')
            return;
          }
          if(res['succeed']){
            /*操作成功*/
            message.success('卖出成功')
          }

          else{
            message.error(res['error_text'])
            console.log(res['msg'])
          }
            setTimeout(()=>{
              this.handleCancel()
            },2000)
        })
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
  validatePrice(rule,value,callback){
    /*价格只包含数字和点*/
    if(value&&/[^0-9\.]/g.test(value)){
      callback('请输入只包含数字和点的卖出价格')
    }else{
      callback()
    }
  }
  validateAmount(rule,value,callback){
    /*数量只包含数字*/
    if(value&&/[^0-9]/g.test(value)){
      callback('请输入只包含数字的卖出数量')
    }else{
      callback()
    }
  }

    state = { visible: false }
  showModal1 = () => {
    this.setState({
      visible: true,
    });
  }
      showModal = () => {
		this.props.form.validateFields((err, values) => {

    /*先通过股票代码拿到股票当前价格,
      如果返回错误,说明不能点击,
      如果正确,就setState*/
        /*通过股票代码获得股票的价格*/
          let publish_url='http://192.144.171.192:3000'
          let code=values.stockCode
          let get_url1=publish_url+'/api/stockprice?code='+code+"&mode="+'single'
          /*price*/
          fetch(get_url1)
          .then(res=>{
            if(res['status']==200){
              return res.json()
            }
            else{
              console.log(res)
              return false;
              return 0;
            }})
          .then(res=>{
            if(res==0){
              return;
            }
            if(res['data']['state_code']!=1){
              let price=res['data']['list']['price']
              this.setState({
                "recommended_price":price,
              })

              // stock['income']=stock['price']*stock['number']-

            }
            console.log(res)
    this.setState({
      visible: true,
    });

            // let data=this.state.data;
            // data.push(stock)
            // this.setState({
            //   data:data
            // })
          })


    })
    }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
	render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
		const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <div>
      <Form layout="horizontal" id="sell_stock_form" style={{marginLeft:50, width:300}} onSubmit={this.handleSubmit}>
        <FormItem
					validateStatus={userNameError ? 'error' : ''}
					label="股票代码"
        >
          {getFieldDecorator('stockCode', {
            rules: [{ required: true, message: '请输入股票代码!' },
          {validator:this.validateStockCode}],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="code" />
          )}
        </FormItem>
        <FormItem
					validateStatus={passwordError ? 'error' : ''}
					label="卖出价格"
        >
          {getFieldDecorator('sellPrice', {
            rules: [{ required: true, message: '请输入卖出价格!' },
          {validator:this.validatePrice}],
          })(
            <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder={"price"+this.state.price }/>
          )}
        </FormItem>
				<FormItem
					validateStatus={userNameError ? 'error' : ''}
					label="卖出数量"
        >
          {getFieldDecorator('sellNumber', {
            rules: [{ required: true, message: '请输入卖出数量!' },
          {validator:this.validateAmount}],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="number" />
          )}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="button"
            onClick={this.showModal}
            disabled={hasErrors(getFieldsError())}
          >
            卖出
          </Button>
        </FormItem>
          <FormItem>

          </FormItem>
      </Form>
        <Modal
          title="卖出股票"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <p>{this.state.recommended_price!=0&&<span>当前推荐的价格是{this.state.recommended_price},</span>}请问是否继续当前操作</p>

          <FormItem>

          <Button
            style={{float:'right'}}
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
          继续
          </Button>
            <Button
            style={{float:'right',marginRight:20}}
            type="default"
            htmlType="button"
            onClick={this.handleCancel}
          >
          返回
          </Button>

          </FormItem>
          </Form>
        </Modal>
        </div>
    );
  }
}

const SellStock = Form.create()(TransactionForm);

export default SellStock;
