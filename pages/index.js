import {Component} from 'react'
import {connect} from 'react-redux'
import Router from 'next/router'

class Page extends Component {
  static async getInitialProps({store, res, isServer}) {
    if(isServer) {
      const isAuthenticated = res.locals.authenticated
      if(!isAuthenticated) {
        res.redirect('/login')
        res.end()
      }
    } else {
      const json = await (await fetch('/authenticated', {credentials: 'same-origin'})).json()
      const isAuthenticated = json.authenticated
      if(!isAuthenticated) {
        Router.push('/login')
      }
    }

    return {
      custom: 'custom'
    };
  }
  render() {
    return (
      <div>
        <div>Prop from Redux: {this.props.authState}</div>
        <div>Prop from getInitialProps: {this.props.custom}</div>
      </div>
    )
  }
}

export default connect(state => state)(Page)