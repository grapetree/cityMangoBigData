import React from 'react';
import './overview.css';

class Overview extends React.Component {
  constructor() {
    super()
  }

  chart = undefined;

  render() {
    const me = this;
    const props = me.props;
    const width = props.width;
    const height = props.height;
    return (
      <div ref={ref => me.chart = ref} style={{width, height}}>

      </div>
    )
  }

  appear() {
    const me = this;
    const chart = me.chart;
    console.log(chart);
  }
}

export default Overview;
