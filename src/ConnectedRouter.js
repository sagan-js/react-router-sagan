import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router'

import { withStore } from 'react-sagan'

class ConnectedRouter extends React.Component {

  constructor(props) {
    super(props)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.initialize()
  }

  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.object.isRequired,
    children: PropTypes.node,
    isSSR: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  initialize() {
    const { history, isSSR } = this.props

    if (!isSSR) {
        this.unsubscribeFromHistory = history.listen(this.handleLocationChange)
    }

    this.handleLocationChange(history.location)
  }

  handleLocationChange(location) {
    this.props.dispatch({type: 'location/change', payload: location})
  };

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) {this.unsubscribeFromHistory()}
  }

  render() {
    return (
      <Router {...this.props} />
    )
  }
}

export default withStore()(ConnectedRouter)