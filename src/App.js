import React, { Component } from 'react';
import './App.css';
import List from './List';
import GithubFollower from './GithubFollower';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
    }
    this.getGithubFollowers = this.getGithubFollowers.bind(this);
  }

  async getGithubFollowers() {
    try {
    this.setState({
      error: '',
      listItems: [],
    })
    const user = this.refs.userInput.value;
    const response = await fetch(`https://api.github.com/users/${user}/followers`);

    const responseData = await response.json();
     console.log(responseData)

    if (responseData.message) {
      let error = responseData.message; 
      if (error === 'Not Found') {
        error = 'Cannot find user with specified name.'
      }
      return this.setState({
        error,
      })
    }
    if (!Array.isArray(responseData)) {
      return this.setState({
        error: 'Invalid Response'
      });
    }
    if(!responseData.length) {
      return this.setState({
        error: 'No followers for the specified user could be found.'
      })
    }
    const listItems = responseData.map((follower) => (
      <GithubFollower follower={follower} />
    ));
    this.setState({
      listItems,
    })
    } catch (ex) {
      this.setState({
        error: `${ex.name}: ${ex.message}`,
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Github Follower Finder</h1>
        <input onKeyDown={(evt) => {if (evt.key === 'Enter') this.getGithubFollowers()}} ref="userInput" type="text" className="userInput" placeholder="Enter Username" />
        <button className="button" onClick={this.getGithubFollowers}>Search</button>
        {this.state.error ? <div className="error">{this.state.error}</div> : null}
        <List listItems={this.state.listItems} />
      </div>
    );
  }
}

export default App;
