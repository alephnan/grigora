import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Animate from 'grommet/components/Animate'
import IconCloud from 'grommet/components/icons/base/Cloud'
import Box from 'grommet/components/Box'
import Search from 'grommet/components/Search'
import Anchor from 'grommet/components/Anchor'
import IconMail from 'grommet/components/icons/base/Mail'
import IconShell from 'grommet/components/icons/base/Cli'
import IconHelp from 'grommet/components/icons/base/CircleQuestion'
import Menu from 'grommet/components/Menu'
import IconCaretDown from 'grommet/components/icons/base/CaretDown'
import IconLanguage from 'grommet/components/icons/base/Language'
import IconConfigure from 'grommet/components/icons/base/Configure'
import IconLogout from 'grommet/components/icons/base/Logout'
import IconBug from 'grommet/components/icons/base/Bug'

export default () => (
  <Header>
    <Animate enter={{ "animation": "fade", "duration": 4000, "delay": 0 }}>
      <Title>
        <IconCloud />
        Bezel
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
        dropAlign={{ "right": "right" }} />
      <Anchor href='#'
        icon={<IconHelp />}>
      </Anchor>
      <Anchor href='#'
        icon={<IconMail />}>
      </Anchor>
      <Anchor href='#'
        icon={<IconShell />}>
      </Anchor>
      <Menu icon={<IconCaretDown />}
        dropAlign={{ "right": "right" }}>
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
)