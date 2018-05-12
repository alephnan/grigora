import Link from 'next/link'
import Anchor from 'grommet/components/Anchor'
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
import Sidebar from 'grommet/components/Sidebar'
import Box from 'grommet/components/Box'

export default () => (
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
)