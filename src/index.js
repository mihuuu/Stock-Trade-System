import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyRoute from './routes/MyRoute';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <MyRoute/>,
    document.getElementById('root')
);
registerServiceWorker();

