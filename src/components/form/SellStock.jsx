import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class TransactionForm extends React.Component {
	componentDidMount() {
			// To disabled submit button at the beginning.
			this.props.form.validateFields();
		}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}

	render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
		const passwordError = isFieldTouched('password') && getFieldError('password');
		
    return (
      <Form layout="horizontal" style={{marginLeft:50, width:300}} onSubmit={this.handleSubmit}>
        <FormItem
					validateStatus={userNameError ? 'error' : ''}
					label="股票代码"
          help={userNameError || ''}
        >
          {getFieldDecorator('stockCode', {
            rules: [{ required: true, message: 'Please input stock code!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="code" />
          )}
        </FormItem>
        <FormItem
					validateStatus={passwordError ? 'error' : ''}
					label="卖出价格"
          help={passwordError || ''}
        >
          {getFieldDecorator('sellPrice', {
            rules: [{ required: true, message: 'Please input purchase price!' }],
          })(
            <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="price" />
          )}
        </FormItem>
				<FormItem
					validateStatus={userNameError ? 'error' : ''}
					label="卖出数量"
          help={userNameError || ''}
        >
          {getFieldDecorator('sellNumber', {
            rules: [{ required: true, message: 'Please input purchase number!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="number" />
          )}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            卖出
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const SellStock = Form.create()(TransactionForm);

export default SellStock;