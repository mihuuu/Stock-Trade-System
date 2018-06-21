import React from 'react';
import {Table} from 'antd'

const columns = [{
  title: '代码',
  dataIndex: 'code',
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.code.length - b.code.length,
}, {
  title: '名称',
  dataIndex: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '持有股数',
  dataIndex: 'number',
  sorter: (a, b) => a.number - b.number,
}, {
  title: '当前价格',
  dataIndex: 'price',
  sorter: (a, b) => a.price - b.price,
}, {
  title: '持有成本',
  dataIndex: 'cost',
  sorter: (a, b) => a.cost - b.cost,
}, {
  title: '股票损益',
  dataIndex: 'income',
}

];

const data = [{
  key: '1',
  code: 'A1',
  name: '阿里巴巴',
  number: 10,
  price: 25.38,
  cost: 45.95,
  income: '+2.3%'
}, {
  key: '2',
  code: 'B1',
  name: '腾讯',
  number: 15,
  price: 14.38,
  cost: 25.95,
  income: '+6.4%'
}, {
  key: '3',
  code: 'Z4',
  name: '百度',
  number: 20,
  price: 32.44,
  cost: 45.95,
  income: '-4.9%'
}
];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}


class MyStock extends React.Component {
  
  render() {
    return (
      <Table columns={columns} dataSource={data} onChange={onChange} />
    );
  }
}

export default MyStock;