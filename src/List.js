import React, { Component } from 'react';
import './List.css';

class List extends Component {
    render() {
        return (
            <div className="List">
                {this.props.listItems.map((item, index) => (
                    <div key={index} className="ListItem">
                        {item}
                    </div>
                ))}
            </div>
        )
    }
}

export default List;