import {Component} from 'react'
import {connect} from 'react-redux'
import Router from 'next/router'
import Section from 'grommet/components/Section'

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
      <Section>
        <div>Prop from Redux: {String(this.props.authenticated)}</div>
        <div>Prop from getInitialProps: {this.props.custom}</div>
      </Section>
    )
  }
}

export default connect(state => state)(Page)