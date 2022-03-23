import React from 'react';
import AddToCalendar from 'react-add-to-calendar';

class Example extends React.Component {
  static displayName = 'Example';
  state = {
    event: {
      title: 'Sample Event',
      description: 'This is the sample event provided as an example only',
      location: 'Portland, OR',
      startTime: '2016-09-16T20:15:00-04:00',
      endTime: '2016-09-16T21:45:00-04:00'
    }
  };

  render() {
    return <AddToCalendar event={this.state.event}/>;
  };
}

export default Example