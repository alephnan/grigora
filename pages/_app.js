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
import IconMail from 'grommet/components/icons/base/Mail'
import IconLogout from 'grommet/components/icons/base/Logout'
import IconActivity from 'grommet/components/icons/base/History'
import IconShell from 'grommet/components/icons/base/Cli'
import IconBug from 'grommet/components/icons/base/Bug'
import IconConfigure from 'grommet/components/icons/base/Configure'
import IconNext from 'grommet/components/icons/base/Next'
import IconApps from 'grommet/components/icons/base/Apps'
import IconHelp from 'grommet/components/icons/base/CircleQuestion'
import IconBilling from 'grommet/components/icons/base/CreditCard'
import IconCloud from 'grommet/components/icons/base/Cloud'
import IconDragDrop from 'grommet/components/icons/base/Select'
import IconPin from 'grommet/components/icons/base/Pin'
import IconGroup from 'grommet/components/icons/base/Group'
import IconStart from 'grommet/components/icons/base/Directions'
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
import Animate from 'grommet/components/Animate'
import Slider from 'react-slick'
import Paragraph from 'grommet/components/Paragraph'

// TODO: Replace temp product icons with actual ones
import IconAppEngine from 'grommet/components/icons/base/Launch'
import IconKubernetes from 'grommet/components/icons/base/Cubes'
import IconCompute from 'grommet/components/icons/base/Calculator'
import IconSQL from 'grommet/components/icons/base/Database'
import IconBigTable from 'grommet/components/icons/base/Table'
import IconDatastore from 'grommet/components/icons/base/Inherit'
import IconStorage from 'grommet/components/icons/base/Storage'
import IconBigQuery from 'grommet/components/icons/base/Columns'
import IconPubSub from 'grommet/components/icons/base/Plan'
import IconML from 'grommet/components/icons/base/Grid'

const pageViewStyle = {
  borderRadius: '15px',
  marginRight: '10px',
  minHeight: '500px',
}

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
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
            <Animate enter={{"animation": "fade", "duration": 4000, "delay": 0}}>
            <Title>
              <IconCloud /> Bezel
            </Title>
            </Animate>
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
                  icon={<IconHelp />}>
              </Anchor>
              <Anchor href='#'
                  icon={<IconMail />}>
              </Anchor>
              <Anchor href='#'
                  icon={<IconShell />}>
              </Anchor>
              <Anchor href='#'
                  icon={<IconApps />}>
              </Anchor>
              <Menu icon={<IconCaretDown />}
                  dropAlign={{"right": "right"}}>
                <Anchor href='#' icon={<IconLanguage />}>
                  Language
                </Anchor>
                <Anchor href='#'
                    icon={<IconConfigure />}
                    >
                  Preferences
                </Anchor>
                <Anchor href='#'
                    icon={<IconBug />}
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
          <Box id="slider-container">
            <Label
                uppercase='true'
                margin='small'>
              Recent Products:
            </Label>
            <Slider {...carouselSettings}
                prevArrow={<div/>}
                nextArrow={<IconNext/>}>
              <Anchor href='#' icon={<IconAppEngine />} align='center'>
                App Engine
              </Anchor>
              <Anchor href='#' icon={<IconKubernetes />}  align='center'>
                Kubernetes
              </Anchor>
              <Anchor href='#' icon={<IconCompute/>} align='center'>
                Compute
              </Anchor>
              <Anchor href='#' icon={<IconSQL/>} align='center'>
                SQL
              </Anchor>
              <Anchor href='#' icon={<IconBigQuery/>}  align='center'>
                BigQuery
              </Anchor>
              <Anchor href='#' icon={<IconStorage/>} align='center'>
                Storage
              </Anchor>
              <Anchor href='#' icon={<IconDatastore/>} align='center'>
                Datastore
              </Anchor>
              <Anchor href='#' icon={<IconPubSub/>} align='center'>
                PubSub
              </Anchor>
              <Anchor href='#' icon={<IconML/>} align='center'>
                Machine Learning
              </Anchor>
            </Slider>
          </Box>
          <Split flex='right'
              showOnResponsive='both'>
            <Animate enter={{"animation": "slide-left", "duration": 1000, "delay": 300}}>
              <Box margin={{vertical: 'none', right: 'large'}}>
                <Box>
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
                <Box separator='top'>
                  <Label uppercase='true'  id='pinboard'>
                    <IconPin /> Pinned
                  </Label>
                  <Box id='pin-box'>
                    <Paragraph>Drag a product here</Paragraph>
                    <IconDragDrop style={{display:'block', margin: 'auto'}} />
                  </Box>
                </Box>
              </Box>
            </Animate>
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