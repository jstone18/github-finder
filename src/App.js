import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
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

    // Set Alert
    setAlert = (msg, type) => {
      this.setState({ alert: { msg, type }})

      setTimeout(() => this.setState({ alert: null }), 4000)
    }
    
    render() {
      const { users, loading } = this.state

    return (
      <div className="App">
      <Navbar />
      <div className="container">
        <Alert alert={this.state.alert} />
        <Search 
          searchUsers={this.searchUsers} 
          clearUsers={this.clearUsers} 
          showClear={users.length > 0 ? true : false}
          setAlert={this.setAlert} />
        <Users loading={loading} users={users} />
      </div>
      </div>
    );
  }
}

export default App;
