import React,{Component} from 'react';
import * as d3 from 'd3';
import data from './mangoData';
const arr = [...new Array(1)].map(t=>{
  return 1
});
class MangoValue extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        <div ref={'box'} style={{...this.props.style}}> </div>
      </div>
    )
  }
  componentDidMount(){
    let me = this;

    const vals = 40;
    const dataIcon = me.props.dataIcon;
    let box = me.refs.box;
    let r = 125;
    let height= 200;
    let svg = d3.select(box)
      .append('svg')
      .attr('width',r)
      .attr('height',height);
    //创建渐变色
    const gDefs = svg.append('g')
      .attr('class','linear-gradient');

    let defs = data[dataIcon];
    defs.map((v,i)=>{
      me._createLinearGradient(gDefs,v.gradientColor1,v.gradientColor2,v.ids);
    });

    const arcDefs = svg.append('g')
      .attr('class','arc')
      .attr('transform',`translate(${r/2},${r/2})`);

    const textG = svg.append('g')
      .attr('class','text')
      .attr('transform',`translate(${r/2},${r/2})`);

    const circleR = 42;
    const circleColor = data.circle[dataIcon];

    me._createStaticArc(arcDefs,r,'rgba(35,204,238,0.3)',0.97,0.85);

    me._createStaticCircle(arcDefs,circleR,circleColor);

    me._createStaticArc(arcDefs,r,`url(#${defs[1].ids})`,0.7,0.9);

    let startAngle = 0;
    let endAngle = Math.PI*2 * ( vals / 100 );
    me._createDataArc(arcDefs,r,`url(#${defs[0].ids})`,0.97,0.85,startAngle,endAngle);

    const text = data.text[dataIcon];
    me._createText(textG,-60,90,15,400,'#46ebff',text);
  }

  componentDidUpdate(){
    let me = this;
  }

  _createText(g,x,y,size,weight,color,text){
    let me = this;
    g.append('text')
      .attr('x',x)
      .attr('y',y)
      .attr("font-size", size)
      .attr("font-weight", weight)
      .attr("fill", color)
      .attr("font-family", "simsun")
      .text(text);
  }

  _createStaticCircle(g,r,color){
    g.append('circle')
      .attr('r',r)
      .attr('fill',color)
  }

  _createDataArc(g,r,color,outs,ins,startAngle,endAngle){
    let me = this;
    let maxRadius = r / 2;
    let outerRadius = maxRadius * outs;
    let innerRadius = outerRadius * ins;
    let pie = d3.pie()
      .startAngle(startAngle)
      .endAngle(endAngle)
      .padAngle(0.05);

    let arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius([30]);

    g.selectAll('.arc')
      .data(pie(arr))
      .enter()
      .append('path')
      .attr('fill',color)
      .transition()
      .duration(500)
      .attrTween('d',function(d){
        return function(t){
          arc
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius([30])
            .startAngle(startAngle)
            .endAngle(function(){
              return endAngle * t
            })
            .padAngle(0.05);
          return arc(d)
        }
      })
  }

  _createStaticArc(g,r,color,outs,ins){
    let me = this;
    let maxRadius = r / 2;
    let outerRadius = maxRadius * outs;
    let innerRadius = outerRadius * ins;

    let pie = d3.pie()
      .startAngle(0)
      .endAngle(Math.PI*2)
      .padAngle(0.05);

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
  }

  _createLinearGradient(svg,gradientColor1,gradientColor2,ids){
    let me = this;
    const defs = svg.append('defs');
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
export default MangoValue;
