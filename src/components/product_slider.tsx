import Box from 'grommet/components/Box'
import Slider from 'react-slick'
import IconNext from 'grommet/components/icons/base/Next'
import IconPrev from 'grommet/components/icons/base/Previous'
import Anchor from 'grommet/components/Anchor'

// TODO: Replace temp product icons with actual ones
import IconAppEngine from 'grommet/components/icons/base/Launch'
import IconKubernetes from 'grommet/components/icons/base/Cubes'
import IconCompute from 'grommet/components/icons/base/Calculator'
import IconSQL from 'grommet/components/icons/base/Database'
import IconDatastore from 'grommet/components/icons/base/Inherit'
import IconStorage from 'grommet/components/icons/base/Storage'
import IconBigQuery from 'grommet/components/icons/base/Columns'
import IconPubSub from 'grommet/components/icons/base/Plan'
import IconML from 'grommet/components/icons/base/Grid'

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 8,
}

export default () => (
  <Box id="slider-container" style={{ paddingLeft: '25px', paddingRight: '25px' }}>
    <Slider {...carouselSettings}
      prevArrow={<IconPrev />}
      nextArrow={<IconNext />}>
      <Box textAlign='center'>
        <Anchor href='#' icon={<IconAppEngine />}>
          <Box>App Engine</Box>
        </Anchor>
      </Box>
      <Box textAlign='center'>
        <Anchor href='#' icon={<IconKubernetes />}>
          <Box>Kubernetes</Box>
        </Anchor>
      </Box>
      <Box textAlign='center'>
        <Anchor href='#' icon={<IconCompute />}>
          <Box>Compute</Box>
        </Anchor>
      </Box>
      <Box textAlign='center'>
        <Anchor href='#' icon={<IconSQL />}>
          <Box>SQL</Box>
        </Anchor>
      </Box>
      <Box textAlign='center'>
        <Anchor href='#' icon={<IconBigQuery />}>
          <Box>BigQuery</Box>
        </Anchor>
      </Box>
      <Box textAlign='center'>
        <Anchor href='#' icon={<IconStorage />}>
          <Box>Storage</Box>
        </Anchor>
      </Box>
      <Box textAlign='center'>
        <Anchor href='#' icon={<IconDatastore />}>
          <Box>Datastore</Box>
        </Anchor>
      </Box>
      <Box textAlign='center'>
        <Anchor href='#' icon={<IconPubSub />}>
          <Box>PubSub</Box>
        </Anchor>
      </Box>
      <Box textAlign='center'>
        <Anchor href='#' icon={<IconML />}>
          <Box>Machine Learning</Box>
        </Anchor>
      </Box>
    </Slider>
  </Box>
)