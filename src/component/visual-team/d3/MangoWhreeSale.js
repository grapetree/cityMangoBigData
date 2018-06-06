import React, {Component} from 'react';
import * as d3 from 'd3';
import whreeData from './whreeSale';
const arr = [...new Array(1)].map(t=>{
  return 1
});
class MangoWhreeSale extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  render(){
    return(
      <div ref={'box'} style={this.props.style}> </div>
    )
  }

  setData(d){
    this.setState({
      data: d
    })
  }

  componentDidMount(){
    let me = this;
    const box = me.refs.box;
    me.whreeData = whreeData;
    const width = 340;
    const height = 230;

    let svg = d3.select(box)
      .append('svg')
      .attr('width',width)
      .attr('height',height);

    me.g = svg.append('g')
      .attr('class','circle')
      .attr('transform',`translate(${115} , ${130})`);

    me.g1 = svg.append('g')
      .attr('class','circle')
      .attr('transform',`translate(${135} , ${75})`);

    me.arc = d3.arc();
    me.pie = d3.pie();
    me.text1 = me.g1.append('text');
    me.text2 = me.g1.append('text');
    me.text3 = me.g1.append('text');
    me.text4 = me.g1.append('text');
    me.text5 = me.g1.append('text');

    me.text = [me.text1,me.text2,me.text3,me.text4,me.text5];

    let positionIcon = [-2,15,33,50,68];
    me.whreeData.map((v,i)=>{
      me._createStaticArc(me.g1,0.9,0.6,v.color,0,positionIcon[i]);
    });

    me._createStaticText(me.g1,-130,-40,16,500,'#46ebff','芒果消费渠道偏好');

  }
  componentDidUpdate(){
    let me = this;
    const r = 168;
    const vals = me.state.data;
    const startAngle = 0;
    const endAngle1 = [];
    const whreeData = me.whreeData;

    let names = [];
    let numberes = [];
    let persent = [];
    let num = 0;

    vals.map((v,i)=>{
      names.push(v.name);
      numberes.push( parseFloat(v.vals).toFixed(2) );
    });

    numberes.map((v,i)=>{
      num+= parseFloat(v);
    });
    numberes.map((v,i)=>{
      persent.push( (v/num).toFixed(2) );
    });

    persent.map((v,i)=>{
      endAngle1.push( -( Math.PI + Math.PI/2 ) * ( parseFloat(v) ) );
    });
    //弧度
    endAngle1.map((v,i)=>{
      me._createDataArc(me.g,r,whreeData[i].color,whreeData[i].outs,whreeData[i].ins,startAngle,v);
    });
    //文字
    let positionIcon = [-15,2,20,37,55];
    whreeData.map((v,i)=>{
      me._createDataText(me.text[i],20,positionIcon[i],14,500,'#fff',names[i]+` (${numberes[i]}万吨 ${parseFloat(persent[i]*100)}%)`);
    })

  }

  _createStaticText(g,x,y,size,weight,color,text){
    g.append('text')
      .attr('x',x)
      .attr('y',y)
      .attr("font-size", size)
      .attr("font-weight", weight)
      .attr("fill", color)
      .attr("font-family", "simsun")
      .text(text);
  }

  _createDataText(g,x,y,size,weight,color,text){
    let me = this;
    g
      .attr('x',x)
      .attr('y',y)
      .attr("font-size", size)
      .attr("font-weight", weight)
      .attr("fill", color)
      .attr("font-family", "simsun")
      .text(text);
  }

  _createStaticArc(g,outs,ins,color,left,right){
    let me = this;
    let maxRadius = 50 / 2;
    let outerRadius = maxRadius * outs;
    let innerRadius = outerRadius * ins;

    let pie = d3.pie()
      .startAngle( -Math.PI/6 )
      .endAngle( Math.PI/6 );

    let arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    g.selectAll('.arc')
      .data(pie(arr))
      .enter()
      .append('path')
      .attr('fill',color)
      .attr('d',function(d){
        return arc(d)
      })
      .attr('transform',`translate(${left} , ${right})`);
  }

  _createDataArc(g,r,color,outs,ins,startAngle,endAngle){
    let me = this;
    let maxRadius = r / 2;
    let outerRadius = maxRadius * outs;
    let innerRadius = outerRadius * ins;

    me.pie
      .startAngle(startAngle)
      .endAngle(endAngle)
      .padAngle(0.05);

    // .innerRadius(innerRadius)
    // .outerRadius(outerRadius);
    // .cornerRadius([30]);

    let arc = g.selectAll('.arc')
      .data(me.pie(arr));
    arc
      .enter()
      .append('path')
      .attr('fill',color)
      .transition()
      .duration(1000)
      .attrTween('d',function(d){
        return function(t){
          me.arc
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            // .cornerRadius([30])
            .startAngle(startAngle)
            .endAngle(function(){
              return endAngle * t
            })
            .padAngle(0.05);
          return me.arc(d)
        }
      });
  }

  _createLinearGradient(ele,gradientColor1,gradientColor2,ids){
    let me = this;
    const defs = ele.append('defs');
    const linearGradient = defs.append('linearGradient')
      .attr('id',ids)
      .attr('x1','0%')
      .attr('y1','0%')
      .attr('x2','0%')
      .attr('y2','100%');
    linearGradient.append('stop')
      .attr('offset','0%')
      .attr('stop-color',gradientColor1);
    linearGradient.append('stop')
      .attr('offset','100%')
      .attr('stop-color',gradientColor2);
  }

}
export default MangoWhreeSale;
