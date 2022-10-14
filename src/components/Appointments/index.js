// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    calenders: '',
    appointmentList: [],
    isStarted: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, calenders} = this.state
    const formattedDate = calenders
      ? format(new Date(calenders), 'dd MMMM yyyy, EEEE')
      : ''

    console.log(formattedDate)
    const newAppointment = {
      id: uuidv4(),
      title,
      dateTime: formattedDate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      calenders: '',
    }))
  }

  starFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachValue => {
        if (eachValue.id === id) {
          return {...eachValue, isFavorite: !eachValue.isFavorite}
        }
        return eachValue
      }),
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({calenders: event.target.value})
  }

  activeStar = () => {
    const {isStarted} = this.state

    if (isStarted) {
      this.setState({isStarted: false})
    } else {
      this.setState({isStarted: true})
    }
  }

  render() {
    const {title, calenders, isStarted} = this.state

    let {appointmentList} = this.state

    if (isStarted) {
      const newAppointmentList = appointmentList.filter(
        eachValue => eachValue.isFavorite === true,
      )
      appointmentList = newAppointmentList
    }

    return (
      <div className="main-container">
        <div className="card">
          <div className="upper">
            <div className="input-container">
              <h1 className="head">Add Appointment</h1>
              <form className="form-container" onSubmit={this.onAddAppointment}>
                <label htmlFor="title">TITLE</label>
                <input
                  className="inputs"
                  id="title"
                  type="text"
                  value={title}
                  onChange={this.onChangeTitle}
                  placeholder="Title"
                />
                <label htmlFor="date">DATE</label>
                <input
                  className="inputs"
                  id="date"
                  type="date"
                  value={calenders}
                  onChange={this.onChangeDate}
                />
                <button
                  type="button"
                  className="button"
                  onClick={this.onAddAppointment}
                >
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="head-container">
            <h1 className="lower-head">Appointments</h1>
            {isStarted && (
              <button
                type="button"
                className="starred-names"
                onClick={this.activeStar}
              >
                Starred
              </button>
            )}
            {!isStarted && (
              <button
                type="button"
                className="starred-name"
                onClick={this.activeStar}
              >
                Starred
              </button>
            )}
          </div>
          <ul className="appointment-container">
            {appointmentList.map(each => (
              <AppointmentItem
                key={each.id}
                items={each}
                starFavorite={this.starFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
