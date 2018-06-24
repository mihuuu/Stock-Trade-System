import React from 'react';
import { message,Form, Icon, Input, Button,Modal } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class BuyStockForm extends React.Component {
  constructor(){
    super()
    this.state={
      "price":"",
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
        // let userinfo=JSON.parse(sessionStorage.getItem('userinfo'))
        // let username=userinfo['username']
        let account_id=localStorage.getItem('account_id')
        let stock_code=values.stockCode
        let buy_price=Number(values.buyPrice)
        let buy_number=Number(values.buyNumber)
        // console.log(username)
        console.log(stock_code)
        console.log(buy_price)
        console.log(buy_number)


        /*将用户名+股票代码+购买价格+购买数量发送给中央交易系统,如果购买成功,则返回1,否则失败(不知道到底传给我什么)*/
        // fetch('http://127.0.0.1:8080/central/name_code_price_amount_buy.json')
        let central_url='http://10.189.143.181:5000/buy'
        fetch(central_url,{
          method:"POST",
          headers:{
            'Content-Type': 'application/json',
          },
           body:JSON.stringify({
             account_id:account_id,
             stock_id:stock_code,
             number:buy_number,
             price:buy_price,
           })
        })
        .then(res=>{
          console.log(res);
          if(res.status==200){
            message.success('操作成功')

            // setTimeout(()=>{
            //   window.location.reload()
            // },5000)
            return res.json()
          }
          else{
            message.error('操作失败')
            return 0;
          }

        })
        .then(res=>{
          if(res!=0){
          console.log(res)

          }

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
    /*提醒价格只包含数字和点*/
    if(value&&/[^0-9\.]/g.test(value)){
      callback('请输入只包含数字和点的买入价格')
    }else{
      callback()
    }
  }
  validateAmount(rule,value,callback){
    /*提醒价格只包含数字和点*/
    if(value&&/[^0-9]/g.test(value)){
      callback('请输入只包含数字的买入数量')
    }else{
      callback()
    }
  }
    showModal = () => {
    this.setState({
      visible: true,
    });
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
      <Form layout="horizontal" style={{marginLeft:50, width:300}} onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
					validateStatus={userNameError ? 'error' : ''}
					label="股票代码"
        >
          {getFieldDecorator('stockCode', {
            rules: [
              { required: true, message: '请输入股票代码!',},
              {validator:this.validateStockCode}
          ],
          })(
            <Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="code" />
          )}
        </FormItem>
        <FormItem
					validateStatus={passwordError ? 'error' : ''}
					label="买入价格"
        >
          {getFieldDecorator('buyPrice', {
            rules: [{ required: true, message: '请输入买入价格!' },
          {validator:this.validatePrice}],
          })(
            <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder={"price"+this.state.price } />
          )}
        </FormItem>
				<FormItem
					validateStatus={userNameError ? 'error' : ''}
					label="买入数量"
        >
          {getFieldDecorator('buyNumber', {
            rules: [{ required: true, message: '请输入买入数量!' },
          {validator:this.validateAmount}],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="number" />
          )}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            onClick={this.showModal}
            htmlType="button"
            disabled={hasErrors(getFieldsError())}
          >
            买入
          </Button>
        </FormItem>
      </Form>
      <Modal
          title="确认"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <p>当前推荐的价格是xxx,请问是否继续当前操作</p>

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
            type="primary"
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

const BuyStock = Form.create()(BuyStockForm);

export default BuyStock;
