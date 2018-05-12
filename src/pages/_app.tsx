import App, { Container } from 'next/app'
import nextReduxWrapper from 'next-redux-wrapper'
import React from 'react'
import { Provider } from 'react-redux'

import GrommetApp from 'grommet/components/App'
import Split from 'grommet/components/Split'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'

import Nav from 'src/components/nav'
import Header from 'src/components/header'
import ProductSlider from 'src/components/product_slider'
import makeStore from 'src/store/store'
import Authenticate from 'src/components/authenticate'

const pageViewStyle = {
  borderRadius: '20px',
  minHeight: '500px',
  backgroundColor: '#fafafa',
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { isServer, res, store } = ctx

    const authenticated = isServer ?
      res.locals.authenticated :
      (await (await fetch('/authenticated', { credentials: 'same-origin' })).json()).authenticated;
    store.dispatch({ type: 'AUTHENTICATION', payload: authenticated })

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    const state = store.getState()
    const isAuthenticated = state.authenticated
    return (
      <Container>
        {(() => {
          if (isAuthenticated) {
            return (
              <GrommetApp>
                <Header />
                <ProductSlider />
                <Split fixed={false} flex='right' showOnResponsive='both' >
                  <Nav />
                  <Box style={pageViewStyle}
                    pad='medium'>
                    <Provider store={store}>
                      <Component {...pageProps} />
                    </Provider>
                  </Box>
                </Split>
              </GrommetApp>
            )
          } else {
            return (
              <GrommetApp>
                <Authenticate />
              </GrommetApp>
            )
          }
        })()}
      </Container>
    )
  }
}

export default nextReduxWrapper(makeStore)(MyApp)