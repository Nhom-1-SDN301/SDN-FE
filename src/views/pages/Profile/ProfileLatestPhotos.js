// ** Reactstrap Imports
import { Card, CardBody, Row, Col } from 'reactstrap'

const ProfileLatestPhotos = () => {
  const data = [
    { img: 'https://png.pngtree.com/png-clipart/20220111/ourlarge/pngtree-black-goat-cartoon-avatar-elements-png-image_4152253.png' },
    { img: 'https://png.pngtree.com/png-clipart/20220111/ourlarge/pngtree-black-goat-cartoon-avatar-elements-png-image_4152253.png' },
    { img: 'https://png.pngtree.com/png-clipart/20220111/ourlarge/pngtree-black-goat-cartoon-avatar-elements-png-image_4152253.png' },
    // Thêm các đối tượng hình ảnh khác nếu cần
  ];
  const renderPhotos = () => {
    return data.map((item, index) => {
      return (
        <Col key={index} md='4' xs='6' className='profile-latest-img'>
          <a href='/' onClick={e => e.preventDefault()}>
            <img className='img-fluid rounded' src={item.img} alt='latest-photo' />
          </a>
        </Col>
      )
    })
  }

  return (
    <Card>
      <CardBody>
        <h5 className='mb-0'>Latest Photos</h5>
        <Row>{renderPhotos()}</Row>
      </CardBody>
    </Card>
  )
}

export default ProfileLatestPhotos
