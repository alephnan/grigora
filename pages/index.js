import {Component} from 'react'
import {connect} from 'react-redux'
import Router from 'next/router'
import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'

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
        <Paragraph size='xlarge'>
          Prop from Redux: {String(this.props.authenticated)}
        </Paragraph>
        <Paragraph size='xlarge'>
          Prop from getInitialProps: {this.props.custom}
        </Paragraph>
      </div>
    )
  }
}

export default connect(state => state)(Page)