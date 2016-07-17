import React, {PropTypes} from 'react'

export default class HomeBody extends React.Component{
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.string,
            type: PropTypes.string,
            pic_width: PropTypes.number,
            pic_Height: PropTypes.number,
            hyperlink: PropTypes.string
        }))
    }

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data || window._G_data && window._G_data.data ||[]
        }
    }
    render() {
        return (
            <div>
            {this.state.data.map((item) => {
                if (item.type == 'text') {
                    if (item.hyperlink) {
                        return (
                            <p className="ta-l mt-5">
                                <a href={item.hyperlink} className="linkColor">
                                    <i className="i-link"></i>
                                    {item['content']}
                                </a>
                            </p>
                        )
                    } else {
                        return <p>{item.content}</p>
                    }
                } else {
                    return (
                        <p className="imgWrap wait-img">
                            <img src="__PUBLIC__/App/img/transparent.gif" data-src={item['content']} align="center" alt="" style={{width:item.pic_width +'px'}} />
                        </p>
                    )
                }
            })}
            </div>
        );
    }
}
