import React, {Component} from 'react';
import * as d3 from 'd3';
import circleBg from './img/circle-bg.png';
import circleTop from './img/circle-top.png';
import store from '../../../store/Store';
import data from './data';
const middle = [...new Array(50)].map(t => {
  return 1
});
// const ids = 'linearGradientZll';
class CircleSmall extends Component {
  constructor(props) {
    super(props);
    let me = this;
    me.typeData = me.props.typeData;
    me.times = me.props.times;

    me.styleData = data[me.props.propsMarke];

    me.colors = me.styleData.color;
    // me.gradientColor1 = me.styleData.gradientColor1;
    // me.gradientColor2 = me.styleData.gradientColor2;
    me.textWords = me.styleData.text;
    me.ids = me.styleData.ids;


  }

  render() {
    let me = this;
    return (

      <div ref={'boxes'} style={this.props.style}>
        <p style={{fontSize:'20px',color:me.colors,position:'absolute',left:'35px',top:'160px'}}>{this.textWords}</p>
        <p style={{
          position:'absolute',
          left:'0px',
          top:'142px',
          width:'100%',
          height:'10px',
          borderRadius: '60px',
          background:'radial-gradient(closest-side ellipse at 65px 5px,rgba(9,46,126,0.3), rgba(9,46,126,0))'
        }}> </p>
        <p style={{background:`url(${circleTop}) no-repeat center center`,backgroundSize:'contain',position:'absolute',left:'33px',top:'45px',width:'70px',height:'35px'}}></p>
      </div>
    )
  }
  componentWillMount(){

  }
  componentDidMount(){
    let me = this;
    let width = 135;
    let height = 135;

    me.maxRadius = Math.min(width, height) / 2;
    me.svg = d3.select(me.refs.boxes)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    let defs = data.defs;
    defs.map((v,i)=>{
      me._createLinearGradient(v.gradientColor1,v.gradientColor2,v.ids);
    });

    me.g = me.svg.append('g')
      .attr('transform', `translate(${width / 2} , ${height / 2})`);

    me.g2 = me.svg.append('g')
      .attr('transform', `translate(20 , 22)`);

    me.g1 = me.svg.append('g')
      .attr('transform', `translate(${width / 2} , ${height / 2})`);

    me.text = me.g1.append('text');

    me.g.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 67)
      .attr('fill', '#182d86');

    me.g.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', '60')
      .attr('fill', 'none')
      .attr('stroke', me.colors)
      .attr('stroke-width', '5');

    me._createArcs(me.colors);

    me.createImage();

    me._createTextStatic(-18,30,15,me.colors,'元/斤');
  }

  componentDidUpdate() {
    let me = this;

    let newData = store.getState().PriceIndex;

    if(Object.keys(newData).length !== 0){

      me._createText(-25,7,36,`url(#${me.ids})`,newData[me.typeData][me.times]);

    }
  }

  createImage(){
    let me = this;
    me.g2.append('image')
      .attr("xlink:href", circleBg)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("height", 95)
      .attr("width", 95);
  }

  _createArcs(color){
    let me = this;
    let outerRadius = me.maxRadius * 0.75;
    let inRadius = outerRadius * 0.75;
    let arc = d3.arc()
      .innerRadius(inRadius)
      .outerRadius(outerRadius);

    let pie = d3.pie()
      .startAngle(0)
      .endAngle(Math.PI * 2)
      .padAngle(0.05);

    me.g.selectAll('.aa')
      .data(pie(middle))
      .enter()
      .append('path')
      .attr('fill', 'transparent')
      .transition()
      .duration(500)
      .attr('d', function (d) {
        return arc(d)
      })
      .attr('fill', color);
  }

  _createTextStatic(x,y,size,color,text){
    this.g1.append('text')
      .attr("x", x)
      .attr("y", y)
      .attr("font-size", size)
      .attr("font-weight", 700)
      .attr("fill", color)
      .attr("font-family", "simsun")
      .text(text);
  }

  _createText(x,y,size,color,text){
    this.text
      .attr("x", x)
      .attr("y", y)
      .attr("font-size", size)
      .attr("font-weight", 700)
      .attr("fill", color)
      .attr("font-family", "simsun")
      .text(text);
  }

  _createLinearGradient(gradientColor1,gradientColor2,ids){
    let me = this;
    let defs = me.svg.append("defs");
    let linearGradient = defs.append("linearGradient")
      .attr("id", ids)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    let stop1 = linearGradient.append("stop")
      .attr("offset", "0%")
      .style("stop-color", gradientColor1);
    let stop2 = linearGradient.append("stop")
      .attr("offset", "100%")
      .style("stop-color", gradientColor2);
  }

}

export default CircleSmall;
