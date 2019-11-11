import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true })

    fetch(`https://api.github.com/users?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => res.json())
      .then(data => this.setState({ users: data, loading: false })
      )
  }

  render() {

    return (
      <div className="App">
      <Navbar />
      <div className="container">
        <Users loading={this.state.loading} users={this.state.users} />
      </div>
      </div>
    );
  }
}

export default App;
