// ** Third Party Components
import classnames from 'classnames'
import { Star } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap'

const ProfileSuggestedPages = () => {

  const data = [
    {
      avatar: 'https://png.pngtree.com/png-clipart/20220111/ourlarge/pngtree-black-goat-cartoon-avatar-elements-png-image_4152253.png',
      username: 'User1',
      subtitle: 'Subtitle for User1',
      favorite: true,
    },
    {
      avatar: 'https://png.pngtree.com/png-clipart/20220111/ourlarge/pngtree-black-goat-cartoon-avatar-elements-png-image_4152253.png',
      username: 'User2',
      subtitle: 'Subtitle for User2',
      favorite: false,
    },
    // Add more data objects as needed
  ];
  const renderSuggestions = () => {
    return data.map((suggestion, index) => {
      return (
        <div
          className={classnames('d-flex justify-content-start align-items-center', {
            'mb-1': index !== data.length - 1
          })}
          key={index}
        >
          <Avatar className='me-1' img={suggestion.avatar} imgHeight={40} imgWidth={40} />
          <div className='profile-user-info'>
            <h6 className='mb-0'>{suggestion.username}</h6>
            <small className='text-muted'>{suggestion.subtitle}</small>
          </div>
          <div className='profile-star ms-auto'>
            <Star
              size={18}
              className={classnames('cursor-pointer', {
                'profile-favorite': suggestion.favorite === true
              })}
            />
          </div>
        </div>
      )
    })
  }

  return (
    <Card>
      <CardBody className='profile-suggestion'>
        <h5 className='mb-2'>Suggested Pages</h5>
        {renderSuggestions()}
      </CardBody>
    </Card>
  )
}

export default ProfileSuggestedPages
