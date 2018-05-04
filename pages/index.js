import {Component} from 'react'
import {connect} from 'react-redux'

class Page extends Component {
  static getInitialProps({store}) {
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