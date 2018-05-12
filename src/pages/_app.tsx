import Nav from 'src/components/nav'
import Header from 'src/components/header'
import ProductSlider from 'src/components/product_slider'

import App, { Container } from 'next/app'
import React from 'react'
import nextReduxWrapper from 'next-redux-wrapper'
import makeStore from 'src/store/store'
import GrommetApp from 'grommet/components/App'
import Split from 'grommet/components/Split'
import Box from 'grommet/components/Box'
import IconDashboard from 'grommet/components/icons/base/Article'
import IconActivity from 'grommet/components/icons/base/History'
import IconBilling from 'grommet/components/icons/base/CreditCard'
import IconDragDrop from 'grommet/components/icons/base/Select'
import IconPin from 'grommet/components/icons/base/Pin'
import IconGroup from 'grommet/components/icons/base/Group'
import IconStart from 'grommet/components/icons/base/Directions'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Link from 'next/link'
import Label from 'grommet/components/Label'
import Animate from 'grommet/components/Animate'
import Paragraph from 'grommet/components/Paragraph'
import Sidebar from 'grommet/components/Sidebar';
import { Provider } from 'react-redux'



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
    return (
      <Container>
        <GrommetApp>
          <Header />
          <ProductSlider />
          <Split fixed={false} flex='right' showOnResponsive='both' >
            <Animate enter={{ "animation": "slide-left", "duration": 1000, "delay": 300 }}>
              <Sidebar full={false}>
                <Box flex='grow'
                  justify='start'>
                  <Menu size="large"
                    padding='none'>
                    <Link href="/">
                      <Anchor
                        icon={<IconDashboard />}
                        label='Overview'>
                      </Anchor>
                    </Link>
                    <Anchor href='#'
                      icon={<IconActivity />}
                      label='Activity'>
                    </Anchor>
                    <Anchor href='#'
                      icon={<IconActivity />}
                      label='APIs'>
                    </Anchor>
                    <Anchor href='#'
                      icon={<IconGroup />}
                      label='Admin'>
                    </Anchor>
                    <Anchor href='#'
                      icon={<IconBilling />}
                      label='Billing'>
                    </Anchor>
                    <Anchor href='#'
                      icon={<IconStart />}
                      label='Start'>
                    </Anchor>
                  </Menu>
                </Box>
                <Box>
                  <Label uppercase='true' id='pinboard'>
                    <IconPin /> Pinned
                  </Label>
                  <Box pad='medium'>
                    <Box id='pin-box' textAlign='center'>
                      <Paragraph>Drag a product here</Paragraph>
                      <IconDragDrop style={{ display: 'block', margin: 'auto' }} />
                    </Box>
                  </Box>
                </Box>
              </Sidebar>
            </Animate>
            <Box style={pageViewStyle}
              pad='medium'>
              <Provider store={store}>
                <Component {...pageProps} />
              </Provider>
            </Box>
          </Split>
        </GrommetApp>
      </Container>
    )
  }
}

export default nextReduxWrapper(makeStore)(MyApp)