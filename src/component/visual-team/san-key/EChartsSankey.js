import React, {Component} from 'react';
import echarts from 'echarts';

const getMax = (arr, key) => {
  return (str) => {
    let arr0 = [];
    arr.forEach(d => {
      if (d[key] === str) arr0.push(d.value);
    });
    return Math.max(...arr0);
  }
};

class EChartsSankey extends Component {
  constructor() {
    super();
    let me = this;
    me.state = {};
  }

  _flag = false;

  setData(d) {
    let me = this;
    me._flag = true;
    me.setState({
      data: d
    });
  }

  render() {
    let me = this;
    let props = me.props;
    return (
      <div style={{
        position: 'absolute',
        left: `${props.left || 0}px`,
        top: `${props.top || 0}px`,
        width: `${props.width || 300}px`,
        height: `${props.height || 100}px`,
        // border: '1px solid #000',
        // background: '#4060cc',
      }} ref={ref => me._sankeyWrapRef = ref}>
        {/*sankey容器*/}
      </div>
    );
  }

  componentDidMount() {
    let me = this;
    let sankeyWrap = me._sankeyWrapRef;
    me._sankey = echarts.init(sankeyWrap);
  }

  componentDidUpdate() {
    let me = this;
    let sankey = me._sankey;
    let data = me.state.data;
    let nodes = data.nodes;
    let links = data.links;

    let colors = {
      '0': 'rgb(70, 235, 255)',
      '1': 'rgb(0, 255, 255)',
      '2-1': 'rgb(42, 245, 148)',
      '2-2': 'rgb(253, 230, 52)',
    };

    let option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        formatter: (params) => {
          let dataType = params.dataType;
          if (dataType === 'node') {
            return `${params.name}:${params.value}万吨`;
          } else if (dataType === 'edge') {
            let source = params.data.source;
            let target = params.data.target;
            return `${nodes[source].name} → ${nodes[target].name}`;
          }
        }
      },
      series: {
        type: 'sankey',
        draggable: false,
        right: '20%',
        lineStyle: {
          color: 'rgb(59, 132, 210)',
          opacity: 0.8,
        },
      }
    };

    let getMaxValue = getMax(nodes, 'level');

    let max0 = getMaxValue('2-1');
    let max1 = getMaxValue('2-2');

    option.series.nodes = nodes.map((d, i) => {
      d.id = i;

      // 矩形
      d.itemStyle = {
        color: colors[d.level]
      };

      // label字体颜色
      let color = '#fff';
      if ((max0 === d.value && d.level === '2-1') || (max1 === d.value && d.level === '2-2')) {
        color = colors[d.level];
      }
      d.label = {
        color: color,
        formatter: params => {
          if (i === 0) {
            return `${params.name} \n${params.value}万吨`;
          } else {
            return params.name;
          }
        }
      };
      return d;
    });
    option.series.links = links;

    sankey.setOption(option);
  }
}

export default EChartsSankey;
