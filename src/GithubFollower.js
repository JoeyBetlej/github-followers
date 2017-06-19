import React, { Component } from 'react';
import './GithubFollower.css';

class GithubFollower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minimized: true,
        }
    }
    render() {
        return (
            <div>
                <div className="followerHeader"  onClick={() => this.setState({minimized: !this.state.minimized})}>
                    {this.props.follower.login}
                </div>
                <div className="followerExpand"  hidden={this.state.minimized}>
                    <div className="expandContent">
                        <img className="avatar" src={this.props.follower.avatar_url} alt={`avatar for ${this.props.follower.login}`} />
                        <a className='button' href={this.props.follower.html_url}> View User Page </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default GithubFollower;