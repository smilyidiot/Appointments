// Write your code here\
import './index.css'

const AppointmentItem = props => {
  const {items, starFavorite} = props
  const {id, title, dateTime, isFavorite} = items

  const onClickStar = () => {
    starFavorite(id)
  }

  const starImg = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="listed">
      <div className="holder">
        <p className="top-heading">{title}</p>
        <button
          type="button"
          className="star-btn"
          //   testid="star"
          onClick={onClickStar}
        >
          <img src={starImg} className="star" alt="star" />
        </button>
      </div>
      <p className="dated">Date: {dateTime}</p>
    </li>
  )
}

export default AppointmentItem
