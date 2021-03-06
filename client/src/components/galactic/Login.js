import React from "react"
import { withRouter } from "react-router-dom"
import { Col, Form, FormGroup, Label, Input } from "reactstrap"
import axios from "axios"
import helpers from "../../helpers"

const initialState = {
  loginEmail: "",
  loginPassword: ""
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  // HANDLE CHANGE IN LOGIN FORM

  handleChange = event => {
    const name = event.target.name
    const value = event.target.value

    this.setState({
      [name]: value
    })
  }

  // HANDLE SUBMIT LOGIN

  handleSubmit = event => {
    event.preventDefault()

    const payload = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, payload)
      .then(response => {
        if (response.data.token) {
          helpers.setToken(response.data.token)
          this.setState(initialState)
          // NOTIFY VISITOR
          // console.log(response.data)
          alert(`Login success!`)
          // REDIRECT TO HOME
          this.props.history.push("/")
        } else {
          throw new Error()
        }
      })
      .catch(error => {
        alert(`${error}`)
        console.log(error)
      })
  }

  // RENDER LOGIN FORM

  render() {
    return (
      <div>
      <Col xs={6}>
        <h3>Login</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="loginEmail">Email</Label>
            <Input
              type="email"
              name="loginEmail"
              id="loginEmail"
              value={this.state.loginEmail}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="loginPassword">Password</Label>
            <Input
              type="password"
              name="loginPassword"
              id="loginPassword"
              value={this.state.loginPassword}
              onChange={this.handleChange}
            />
          </FormGroup>
          <input type="submit" value="Login" />
        </Form>
      </Col>
      </div>
    )
  }
}

export default withRouter(Login)