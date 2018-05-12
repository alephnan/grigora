import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Button from 'grommet/components/Button'
import Paragraph from 'grommet/components/Paragraph';
import Heading from 'grommet/components/Heading'

export default () => {
  return (
    <Box full={true} align="center" alignContent='center' justify='center'>
      <Paragraph>
        You need to authenticate with Google.
      </Paragraph>
      <Button
        label='Authenticate'
        href='/auth/google' />
    </Box>
  )
}