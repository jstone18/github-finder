import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
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

    // Get single Github user
    getUser = (username) => {
      this.setState({ loading: true })

    fetch(`https://api.github.com/users/${username}?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => res.json())
      .then(data => this.setState({ user: data, loading: false })
      )
    }

    // Ger users repos
    getUserRepos = (username) => {
      this.setState({ loading: true })

    fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => res.json())
      .then(data => this.setState({ repos: data, loading: false })
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
      const { users, user, repos, loading } = this.state

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route 
                exact path="/" 
                render={props => (
                  <>
                    <Search 
                      searchUsers={this.searchUsers} 
                      clearUsers={this.clearUsers} 
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert} />
                    <Users loading={loading} users={users} />
                  </>
                )}  
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={props => (
                <User 
                  { ...props } 
                  getUser={this.getUser} 
                  getUserRepos={this.getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading} 
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
