import Nav from '../components/Nav'
import App, {Container} from 'next/app'
import React from 'react'
import nextReduxWrapper from 'next-redux-wrapper'
import makeStore from '../store/store'

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    const { isServer, res, store } = ctx

    const authenticated = isServer ?
        res.locals.authenticated :
        (await (await fetch('/authenticated', {credentials: 'same-origin'})).json()).authenticated;
    store.dispatch({type: 'AUTHENTICATION', payload: authenticated})

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