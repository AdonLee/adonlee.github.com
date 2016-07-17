// import * from 'babel/babel-polyfill';
// require('babel-require');
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './comp/App';
import reducer from './reducer';
// TOP API
// Children                                     //
// Component                                    //
// DOM                                          // React.DOM.div(null, 'Hello World!')，==》 <div></div>
// PropTypes                                    // 用于验证传入组件的 props
// initializeTouchEvents(bollean)               // 使 React 能处理移动设备的触摸（ touch ）事件。
// createClass                                  //
// createElement                                //
// cloneElement                                 //
// createFactory                                //
// createMixin                                  //
// constructAndRenderComponent                  //
// constructAndRenderComponentByID              //
// isValidElement                               //
// withContext                                  //
// __spread                                     //
// version                                      //
// addons                                       //

// 0.14开始独立出来:ReactDOM
// findDOMNode                                  //
// render(ReactEle, DOMContainer, callback)     // 如果 ReactElement 之前就被渲染到了 container 中，该函数将会更新此ReactElement
// renderToString                               // 把组件渲染成原始的 HTML 字符串。该方法应该仅在服务器端使用
// renderToStaticMarkup                         //
// unmountComponentAtNode                       //
//
//
//
let store = createStore(reducer);
let target = document.querySelector('#container');
render(
    <Provider store={store}>
        <App>你好</App>
    </Provider>,
    target
);
