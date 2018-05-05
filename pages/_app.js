import Nav from '../components/Nav'
import App, {Container} from 'next/app'
import React from 'react'
import nextReduxWrapper from 'next-redux-wrapper'
import makeStore from '../store/store'
import GrommetApp from 'grommet/components/App'
import Split from 'grommet/components/Split'
import Box from 'grommet/components/Box'
import IconLanguage from 'grommet/components/icons/base/Language'
import IconDashboard from 'grommet/components/icons/base/Article'
import IconCaretDown from 'grommet/components/icons/base/CaretDown'
import IconView from 'grommet/components/icons/base/View'
import IconInstall from 'grommet/components/icons/base/Install'
import IconMail from 'grommet/components/icons/base/Mail'
import IconLogout from 'grommet/components/icons/base/Logout'
import IconActivity from 'grommet/components/icons/base/History'
import IconCli from 'grommet/components/icons/base/Cli'
import IconFlag from 'grommet/components/icons/base/Flag'
import IconConfigure from 'grommet/components/icons/base/Configure'
import IconHelp from 'grommet/components/icons/base/Help'
import IconBilling from 'grommet/components/icons/base/CreditCard'
import IconCloud from 'grommet/components/icons/base/Cloud'
import IconPin from 'grommet/components/icons/base/Pin'
import IconGroup from 'grommet/components/icons/base/Group'
import List from 'grommet/components/List'
import ListItem from 'grommet/components/ListItem'
import Header from 'grommet/components/Header'
import Search from 'grommet/components/Search'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Link from 'next/link'
import Title from 'grommet/components/Title'
import Label from 'grommet/components/Label'
import Tip from 'grommet/components/Tip'

const NavStyle = {
  minWidth: '200px'
}

const pageViewStyle = {
  borderRadius: '15px',
  marginRight: '10px',
  minHeight: '500px'
}


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
        <GrommetApp>
          <Header>
            <Title>
              <IconCloud /> Bezel
            </Title>
            <Box flex={true}
              justify='end'
              direction='row'
              responsive={false}>
              <Search inline={true}
                fill={true}
                size='medium'
                placeHolder='Search'
                dropAlign={{"right": "right"}} />
              <Anchor href='#'
                  icon={<IconMail />}>
              </Anchor>
              <Anchor href='#'
                  icon={<IconHelp />}>
              </Anchor>
              <Anchor href='#'
                  icon={<IconCli />}>
              </Anchor>
              <Menu icon={<IconCaretDown />}
                dropAlign={{"right": "right"}}>
                            <Anchor href='#'
                    icon={<IconLanguage />}
                    >
                  Language
                </Anchor>
                <Anchor href='#'
                    icon={<IconConfigure />}
                    >
                  Preferences
                </Anchor>
                <Anchor href='#'
                    icon={<IconFlag />}
                    >
                  Report Bug
                </Anchor>
                <Anchor href='#'
                    icon={<IconLogout />}
                    >
                  Signout
                </Anchor>
              </Menu>
            </Box>
          </Header>
          <Split flex='right'
              showOnResponsive='both'>
            <Box pad='medium'>
              <Box>
                <Menu size="large"
                    style={NavStyle}
                    padding='none'>
                  <Link href="/">
                    <Anchor
                        icon={<IconDashboard />}
                        label='Overview'>
                    </Anchor>
                  </Link>
                  <Link href="/version">
                    <Anchor href='#'
                        icon={<IconInstall />}
                        label='Products'>
                    </Anchor>
                  </Link>
                  <Anchor href='#'
                      icon={<IconActivity />}
                      label='Activity'>
                  </Anchor>
                  <Anchor href='#'
                      icon={<IconGroup />}
                      label='Admin'>
                  </Anchor>
                  <Anchor href='#'
                      icon={<IconBilling />}
                      label='Billing'>
                  </Anchor>
                </Menu>
              </Box>
              <Box separator='top'>
                <Label uppercase='true'  id='pinboard'>
                  <IconPin /> Pinned
                </Label>

              </Box>
            </Box>
            <Box colorIndex='light-2'
                style={pageViewStyle}
                pad='medium'>
              <Component {...pageProps} />
            </Box>
          </Split>
        </GrommetApp>
      </Container>
    )
  }
}

export default nextReduxWrapper(makeStore)(MyApp)