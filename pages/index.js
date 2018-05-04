import {Component} from 'react'
import {connect} from 'react-redux'
import Router from 'next/router'

class Page extends Component {
  static async getInitialProps({store, res, isServer}) {
    const state = store.getState()
    if(!state.authenticated) {
      if(isServer) {
        res.redirect('/login')
        res.end()
      } else {
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
        <div>Prop from Redux: {String(this.props.authenticated)}</div>
        <div>Prop from getInitialProps: {this.props.custom}</div>
      </div>
    )
  }
}

export default connect(state => state)(Page)