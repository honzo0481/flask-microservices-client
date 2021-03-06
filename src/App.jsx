import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import UsersList from './components/UsersList'
import AddUser from './components/AddUser'
import About from './components/About'
import NavBar from './components/NavBar'

class App extends Component {
  constructor () {
    super()
    this.state = {
      users: [],
      username: '',
      email: '',
      title: 'TestDriven.io',
      formData: {
        username: '',
        email: '',
        password: ''
      }
    }
  }
  componentDidMount() {
    console.log('componentDidMount started')
    this.getUsers()
    console.log('componentDidMount finished')
  }
  getUsers() {
    console.log('getUsers started')
    console.log('state before get: ', this.state)
    axios.get(`localhost/users`)
    .then((res) => { console.log(res); this.setState({ users: res.data.data.users }) })
    .catch((err) => { console.log(err) })
  }
  addUser(event) {
    event.preventDefault()
    const data = {
      username: this.state.username,
      email: this.state.email
    }
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
    .then((res) => {
      this.getUsers()
      this.setState({ username: '', email: '' })
    })
    .catch((err) => { console.log(err) })
  }
  handleChange(event) {
    const obj = {}
    obj[event.target.name] = event.target.value
    this.setState(obj)
  }
  render() {
    return (
      <div>
        <NavBar
          title={this.state.title}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <br/>
              <Switch>
                <Route exact path='/' render={() => (
                  <div>
                    <h1>All Users</h1>
                    <hr/><br/>
                    <AddUser
                      username={this.state.username}
                      email={this.state.email}
                      handleChange={this.handleChange.bind(this)}
                      addUser={this.addUser.bind(this)}
                    />
                    <br/>
                    <UsersList users={this.state.users}/>
                  </div>
                )} />
                <Route exact path='/about' component={About}/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
