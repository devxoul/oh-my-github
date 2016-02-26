import React from 'react'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import LazyLoad from 'react-lazy-load'

import TimeLine from '../../TimeLine'
import ActivityTile from './ActivityTile'
import ActivityBadge from './ActivityBadge'
import Filter from '../../Filter'

const styles = {
  title: {
    fontSize: 22,
    marginTop: 35,
    fontWeight: 200,
  },

  container: {
    marginBottom: 25,
  },

  timelineContainer: {
    marginTop: 25,
  },
}

const lazyLoadOffsetVertical = 2000

export default class TabContentActivity extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activities: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activities, } = nextProps

    this.setState({ activities: activities, })
  }

  handleFilterChange(event) {
    const filterKeyword = event.target.value.trim().toLowerCase()
    const allActivities = this.props.activities

    const filtered = allActivities.filter(activity => {
      return (activity.repo.toLowerCase().includes(filterKeyword)
        || activity.type.toLowerCase().includes(filterKeyword))
    })

    this.setState({ activities: filtered, })
  }

  renderTitle() {
    const { activities, } = this.state

    const titleText = (activities === void 0) ? 'No Activity' :
      (activities.length < 2) ? `${activities.length} Activity` :
        `${activities.length} Activities`


    return (
      <div style={styles.title}>{titleText}</div>
    )
  }

  renderLazily(element, index) {
    if (index < 10) return element

    return (
      <LazyLoad offsetVertical={lazyLoadOffsetVertical}>
        {element}
      </LazyLoad>
    )
  }


  render() {
    /**
     * since React doesn't support to passing an object as the ReactElement,
     * we should split TimeLine events to separated arrays (contents, badges)
     */
    const tiles = []
    const badges = []
    const { activities, } = this.state

    activities.map((activity, index) => {
      tiles.push(
        this.renderLazily(<ActivityTile activity={activity} key={index} />, index)
      )
      badges.push(
        this.renderLazily(<ActivityBadge eventType={activity.type} key={index} />, index)
      )
    })

    return (
      <div className='container' style={styles.container}>
        {this.renderTitle()}
        <Filter handler={this.handleFilterChange.bind(this)} floatingLabel='INSERT FILTER' />
        <TimeLine containerStyle={styles.timelineContainer} tiles={tiles} badges={badges} />
      </div>
    )
  }
}

TabContentActivity.propTypes = {
  activities: React.PropTypes.array.isRequired,
}