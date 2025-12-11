import React from 'react';
import PropTypes from 'prop-types';

class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.isMounted = false;
  }

  componentDidMount() {
    this.isMounted = true;
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  safeSetState = (state, callback) => {
    if (this.isMounted) {
      this.setState(state, callback);
    }
  };

  render() {
    return null;
  }
}

BaseComponent.propTypes = {
  // Add common prop types here
};

export default BaseComponent;
