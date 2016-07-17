
import React, {Component, PropTypes} from 'react';

class AddForm extends Component {

    static propTypes = {
        name: PropTypes.string,
        gender: PropTypes.oneOf(['male', 'female']),
        age: PropTypes.number

    };

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        // 0.14后ref直接暴露DOM节点，废除getDOMNode
        // var {name='', gender='male', age=0} = this.props;
        // this.refs[gender].checked = true;
        // this.refs.name.value = name;
        // this.refs.age.value = age;
    }

    render() {
        var {name='', gender='male', age=0} = this.props;
        return (
            <div className="form">
                <input ref="name" name="name" type="text" required defaultValue={name} placeholder="请输入名称" className=""/>
                <input ref="age" name="age" type="number" required defaultValue={age} placeholder="请输入年龄" className=""/>
                <label htmlFor="male"><input className="" defaultChecked={gender=='male'} name="gender" type="radio" ref="male" value="male"/>男</label>
                <label htmlFor="female"><input className="" defaultChecked={gender=='female'} name="gender" type="radio" ref="female" value="female"/>女</label>
            </div>
        );
    }
}
export default AddForm;
