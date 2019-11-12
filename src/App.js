import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  // Search Github users
  searchUsers = (text) => {
    this.setState({ loading: true })

    fetch(`https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => res.json())
      .then(data => this.setState({ users: data.items, loading: false })
      )
    }

    clearUsers = () => {
      this.setState({ users: [], loading: false })
    }
    
    render() {

    return (
      <div className="App">
      <Navbar />
      <div className="container">
        <Search 
          searchUsers={this.searchUsers} 
          clearUsers={this.clearUsers} 
          showClear={this.state.users.length > 0 ? true : false} />
        <Users loading={this.state.loading} users={this.state.users} />
      </div>
      </div>
    );
  }
}

export default App;
