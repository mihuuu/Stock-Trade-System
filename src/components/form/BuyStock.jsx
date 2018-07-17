import React from 'react';
import { message,Form, Icon, Input, Button,Modal } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

var central_url='http://95.169.8.179:5000/buy'
class BuyStockForm extends React.Component {
  constructor(){
    super()
    this.state={
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
        // let userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
        // let username=userInfo['username']
        // let account_id=localStorage.getItem('account_id')
        let id=JSON.parse(localStorage.getItem('userInfo')).id
        let account_id=JSON.parse(localStorage.getItem('userInfo')).account_id

        let stock_code=values.stockCode
        let buy_price=Number(values.buyPrice)
        let buy_number=Number(values.buyNumber)

        /*将用户名+股票代码+购买价格+购买数量发送给中央交易系统,如果购买成功,则返回1,否则失败(不知道到底传给我什么)*/
        // fetch('http://127.0.0.1:8080/central/name_code_price_amount_buy.json')
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
            // setTimeout(()=>{
            //   window.location.reload()
            // },5000)
            return res.json()
          }
          else{
            message.error('API获取失败')
            return 0;
          }

        })
        .then(res=>{
          console.log(res)
          if(res.succeed){
            message.success('操作成功!')
          } else{
            message.error(res['error_text'])
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
          title="购买股票"
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

const BuyStock = Form.create()(BuyStockForm);

export default BuyStock;
