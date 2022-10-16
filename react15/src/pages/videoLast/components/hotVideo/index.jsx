import React from 'react'
import './index.scss'

import NoPraise from '../../../../assets/no-praise.png'
import blueArrow from '../../../../assets/blue-arrow.png'

class HotVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          img: 'http://localhost:3000/images/car-two.png',
          title: '爱在大草原 吉利豪越的设计师一定是个暖男',
          number: '3026',
          type: '导购',
          status: true
        },
        {
          img: 'http://localhost:3000/images/car-two.png',
          title: '爱在大草原 吉利豪越的设计师一定是个暖男',
          number: '3026',
          type: '导购',
          status: false
        },
        {
          img: 'http://localhost:3000/images/car-two.png',
          title: '爱在大草原 吉利豪越的设计师一定是个暖男',
          number: '3026',
          type: '导购',
          status: false
        },
        {
          img: 'http://localhost:3000/images/car-two.png',
          title: '爱在大草原 吉利豪越的设计师一定是个暖男',
          number: '3026',
          type: '导购',
          status: false
        },
        {
          img: 'http://localhost:3000/images/car-two.png',
          title: '爱在大草原 吉利豪越的设计师一定是个暖男',
          number: '3026',
          type: '导购',
          status: false
        },
      ],
    }
  }

  render() {
    const { list } = this.state
    return (
      <div className="hot-video-container">
        <div className="hot-video-title">
          热门视频推荐
        </div>
        <div className="hot-video-list">
          {
            list.map(item => {
              return (
                <div className="hot-video-item">
                  <div className="hot-video-item-img">
                    <img src={item.img} alt=""/>
                  </div>
                  <div>
                    <div className="hot-video-item-title">{item.title}</div>
                    <div className="hot-video-item-operation">
                      <span>{item.type}</span>
                      <span>
                        <img src={NoPraise} alt=""/>
                        10
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className='hot-video-button'>
          展开全部10条
          <img src={blueArrow} alt=""/>
        </div>
      </div>
    )
  }
}

export default HotVideo
