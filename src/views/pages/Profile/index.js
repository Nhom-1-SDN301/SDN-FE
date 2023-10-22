// ** React Imports
import { Fragment, useState, useEffect } from 'react'
// ** Third Party Components
import axios from 'axios'

// ** Custom Components
import UILoader from '@components/ui-loader'
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'

// ** Demo Components
import ProfileBody from './ProfileBody'
import ProfileHeader from './ProfileHeader'

// ** Styles
import '@styles/react/pages/page-profile.scss'

const Profile = () => {
  // ** States
  const [data, setData] = useState(null)
  const [block, setBlock] = useState(false)

  const handleBlock = () => {
    setBlock(true)
    setTimeout(() => {
      setBlock(false)
    }, 2000)
  }

  useEffect(() => {
    axios.get('/profile/data').then(response => setData(response.data))
  }, [])
  return (
    <Fragment>
        <div id='user-profile'>
          <Row>
            <Col sm='12'>
              <ProfileHeader/>
              <ProfileBody/>
            </Col>
          </Row>
        </div>
    </Fragment>
  )
}

export default Profile
