import Nav from '../components/Nav'
import App, {Container} from 'next/app'
import React from 'react'
import nextReduxWrapper from 'next-redux-wrapper'
import makeStore from '../store/store'

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    ctx.store.dispatch({type: 'AUTHENTICATION', payload: 'pending'});

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props
    return (
      <Container>
        <Nav />
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default nextReduxWrapper(makeStore)(MyApp)