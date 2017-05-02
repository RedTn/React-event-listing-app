import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

/*
const events = { "events": [
    { "id": 37, "title": "itgroove Party", "start_time": "2017-06-03 17:00:00.000", "end_time": "2017-06-03 17:30:00.000", "location": "1925 Blanshard Street" },
    { "id": 38, "title": "itgroove Real Party", "start_time": "2017-06-03 17:00:00.000", "end_time": "2017-06-03 23:30:00.000", "location": "Irish Times Pub, Victoria BC" },
    { "id": 92, "title": "City-Wide Capture the Flag", "start_time": "2017-06-08 12:00:00.000", "end_time": "2017-06-08 15:00:00.000", "location": "Centennial Square, Victoria BC" },
    { "id": 101, "title": "March for Science", "start_time": "2017-06-09 14:00:00.000", "end_time": "2017-06-09 16:00:00.000", "location": "Centennial Square, Victoria BC" },
    { "id": 128, "title": "Chinatown Walking Tour", "start_time": "2017-06-12 13:00:00.000", "end_time": "2017-06-12 14:00:00.000", "location": "Chinatown, Victoria BC" },
    { "id": 101, "title": "Vancouver Island Comic Con", "start_time": "2017-06-11 10:00:00.000", "end_time": "2017-06-11 20:00:00.000", "location": "Sidney, BC" },
    { "id": 122, "title": "Jazz Fest", "start_time": "2017-06-23 17:00:00.000", "end_time": "2017-06-23 22:00:00.000", "location": "Various" },
    { "id": 130, "title": "Comedy Night", "start_time": "2017-06-25 18:00:00.000", "end_time": "2017-06-25 20:00:00.000", "location": "Heckler's Bar & Grill" },
    { "id": 132, "title": "Movie Night at the Hudson", "start_time": "2017-06-18 17:00:00.000", "end_time": "2017-06-18 22:00:00.000", "location": "The Hudson" },
    { "id": 146, "title": "Canada Day Fireworks", "start_time": "2017-07-01 22:00:00.000", "end_time": "2017-07-01 23:00:00.000", "location": "Victoria, BC" },
    { "id": 152, "title": "Team Brunch", "start_time": "2017-07-02 09:30:00.000", "end_time": "2017-07-01 11:00:00.000", "location": "Floyd's" },
    { "id": 160, "title": "itgroove Open House", "start_time": "2017-07-03 15:30:00.000", "end_time": "2017-07-03 17:00:00.000", "location": "1925 Blanshard Street" },
    { "id": 162, "title": "Lunch and Learn", "start_time": "2017-06-20 11:30:00.000", "end_time": "2017-06-20 13:30:00.000", "location": "1925 Blanshard Street" },
    { "id": 201, "title": "Victoria Pride Week", "start_time": "2017-07-03 10:00:00.000", "end_time": "2017-07-05 17:00:00.000", "location": "Multiple Venues" },
    { "id": 203, "title": "Leg Kiosk Open House", "start_time": "2017-07-10 09:00:00.000", "end_time": "2017-07-10 17:00:00.000", "location": "Legislative Assembly of BC" }
]}
*/
const EventModel = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  start_time: PropTypes.string,
  end_time: PropTypes.string,
  location: PropTypes.string
}

const EventRow = ({id, title, start_time, end_time, location}) => {
  const dateOptions = {  
    weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
  }
  const newStartTime = new Date(start_time).toLocaleTimeString("en-us", dateOptions)
  const newEndTime = new Date(end_time).toLocaleTimeString("en-us", dateOptions)
return(
  <tr>
    <td className="col-md-3">
      {title}
    </td>
    <td className="col-md-3">
      {newStartTime}
    </td>
    <td className="col-md-3">
      {newEndTime}
    </td>
    <td className="col-md-3">
      {location}
    </td>
  </tr>
)}

EventRow.propTypes = EventModel

const EventList = ({event}) =>  {
  event.sort(function SortByDate(a, b) {
    return b.start_time < a.start_time ?  1 
         : b.start_time > a.start_time ? -1 
         : 0
  })
  return(
  <div>
    <table className="table table-striped table-bordered table-condensed">
      <thead>
        <tr>
          <th>Title</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {event.map((event, i) => 
                 <EventRow key={i}
                   {...event}
                   />
                 )}
      </tbody>
    </table>
  </div>
)}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allEvents: [],
      loading: false
    }
  }
  async fetchDataSync(url) {
      try {
        this.setState({loading:true})
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
        })
        const responseJson = await response.json()
        this.setState({allEvents:responseJson})
      } catch(error) {
          console.error(error)
      }
      this.setState({loading:false})
  }
  componentDidMount() {
    this.fetchDataSync("http://localhost:3004/events")
  }
  render() {
    const { loading } = this.state
    return(
      <div className="app">
        {
            (loading) ?
            <span>Loading...</span> :
            <span></span>
        }
        <EventList event={this.state.allEvents} />
      </div>
    )
  }
}

export default App;
