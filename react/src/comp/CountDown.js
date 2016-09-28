import React, {Component, PropTypes} from 'react';

// 计数器
class CountDown extends Component {

    // 验证器
    // [array,bool,func,number,object,string,any,element,node,
    // arrayOf(),instanceOf(),objectOf(),oneOf([values]),oneOfType([types]),shape({})]
    // customProp: function(props, propName, componentName)
    static propTypes = {
        servertime: PropTypes.number, // 验证servertime为数字类型
        endtime: PropTypes.number, // 验证endtime为数字类型
        children: PropTypes.string
        // servertime: PropTypes.number.isRequired // 不可空
    };

    static childContextTypes = {

    };

    // this.props 引用组件属性, 可通过propTypes限定类型
    //              readonly: 从拥有者流向归属者，总是与拥有者保持一致
    //              <component name=value /> ==> this.props.name == value
    // this.props.children // 引用
    // this.refs  readonly引用对应ref属性的子组件
    // this.state
    // this.setState({}) // 设置state 会触发render

    // 1.设置默认props
    // 实例创建前调用，实例间共享
    defaultProps = {
    };

    constructor(props) {
        super(props);
        var timeRest = this.props.endtime - this.props.servertime;
        console.log('time rest', timeRest);

        this.state = {
            timeRest: timeRest,
            timeObj: this.outputTimeObj(timeRest),
            showLog: true
        };

    }

    // 4.组件初次渲染前
    componentWillMount() {
        this.showLog && console.log('Component Will Mount');

    }

    // 5.组件被渲染完时被自动调用
    componentDidMount() {
        this.showLog && console.log('Component Did Mount', this, this.props.children);

        // 渲染完成，已经有了DOM结构，开始逻辑业务代码
        this.timer =  setInterval(function() {
            // 设置组件状态
            this.setState({
                timeObj: this.outputTimeObj(this.state.timeRest--)
            });
        }.bind(this), 1000);

        // $.get(url, function() {
        //      // 异步执行需先检测组件是否还是mounted
        //      if(this.isMounted()) {}
        // })
    }

    // 组件初次渲染后，接受到新prop时, render()渲染前调用
    componentWillReceiveProps(nextProps) {
        console.log('Conponent Will Receive Props');

        //

    }

    // 状态更新时触发, 慎用！！！
    // ,shouldComponentUpdate: function(nextProps, nextState) {
    //  this.showLog && console.log('Should Component Update');

    //  // return true; // 返回false则组件不更新
    // }
    //
    componentWillUpdate(nextProps, nextState) {
        this.showLog && console.log('Component Will Update');
    }
    //
    componentDidUpdate(nextProps, nextState) {
        // 不可在此调用setState()
        this.showLog && console.log('Component Did Update') || (this.showLog = false);
    }
    // n.类似析构函数，做一些清理工作
    componentWillUnmount() {
        this.showLog && console.log('Component Will Unmount');

        clearInterval(this.timer);
    }

    // 自定义函数
    outputTimeObj(time) {
        var seconds = time%60;
        var rest = Math.floor(time/60);
        var mimutes = rest%60;
        rest = Math.floor(rest/60);
        var hours = rest%24;
        var days = Math.floor(rest/24);

        return {
            days: days,
            hours: hours,
            mimutes: mimutes,
            seconds: seconds
        };
    }
    // 3.渲染组件
    render() {
        this.showLog && console.log('Render Start');
        var timeObj = this.state.timeObj;

        // 只能渲染单个根节点，所以必须被包含在同一个节点里
        return (
            <span >剩余时间：{timeObj.days}天{timeObj.hours}小时{timeObj.mimutes}分{timeObj.seconds}秒</span>
        )
    }

    // 其他生命周期方法

    //,contextTypes
    //,childContextTypes
    //,getChildContext
    //,updateComponent


    // 定义静态方法，可在组件类上调用, 但这些方法不能获取组件的 props 和 state
    //,statics{
    //  customMethod: function() {}
    //}

    // 加载插件,
    // 每个插件是一个包含生命周期方法+自定义方法的对象，
    // 不同插件相同的生命周期方法会根据引入顺序保证执行
    // ,mixins: [
    //    React.addons.TransitionGroup              // 用于处理动画和过渡
    //   ,React.addons.CSSTransitionGroup           //
    //   ,React.addons.LinkedStateMixin             // 用于简化用户表单输入数据和组件 state 之间的双向数据绑定。
    //   ,React.addons.PureRenderMixin              // 如果props, state新值==旧值时阻止组件更新
    //   ,React.addons.batchedUpdates               //
    //   ,React.addons.classSet                     // 用于更加干净简洁地操作 DOM 中的 class 字符串。
    //   ,React.addons.cloneWithProps(oriCom, {props})// 用于实现 React 组件浅复制，同时改变它们的 props
    //   ,React.addons.createFragment               //
    //   ,React.addons.update                       // 一个辅助方法，使得在 JavaScript 中处理不可变数据更加容易
    //   ,React.addons.Perf                         // 用于性能测评，并帮助你检查出可优化的功能点。
    //   ,React.addons.TestUtils                    // 简单的辅助工具，用于编写测试用例（仅存在于未压缩版）
    // ]

    //,contextTypes     // a set of attributes that are implicitly passed down from an element to all of its descendants.
    //,childContextTypes // specify a context that applies to all of its descendants
    //,getChildContext  // return an object specified by childrenContextTypes as default context of its descendants
    //,updateComponent

}

export default CountDown;
