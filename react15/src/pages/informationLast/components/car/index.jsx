import React from 'react'
import './index.scss'

class InformationLastCar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <div className="information-last-car">
        <div className="information-last-car-detail">
          <div className="information-last-car-img">
            <img src="http://localhost:3000/images/car-three.png" alt=""/>
          </div>
          <div className="information-last-car-price">
            <div>高尔夫</div>
            <div>26.98-55.44万</div>
          </div>
        </div>

        <div className="information-last-car-button">
          询底价
        </div>
      </div>
    )
  }
}

export default InformationLastCar
