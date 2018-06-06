const ids = ['linearGradientMango-1','linearGradientMango-2','linearGradientMango-3','linearGradientMango-4'];
const data = {
  circle: {
    fruits: 'rgba(35,204,238,0.2)',
    agriculture: 'rgba(0,255,0,0.2)'
  },
  text: {
    fruits: '占华坪水果总产值',
    agriculture: '占华坪农业总产值'
  },
  fruits: [
    {
      ids: ids[0],
      gradientColor1 :'rgb(24, 234, 251)',
      gradientColor2 : 'rgb(57, 190, 252)'
    },
    {
      ids: ids[1],
      gradientColor1 : 'rgba(34,199,252,0)',
      gradientColor2 : 'rgba(34,199,252,1)'
    }
  ],
  agriculture: [
    {
      ids: ids[2],
      gradientColor1 :'rgb(114, 255, 188)',
      gradientColor2 : 'rgb(38, 239, 143)'
    },
    {
      ids: ids[3],
      gradientColor1 : 'rgba(162,255,211,0)',
      gradientColor2 : 'rgba(162,255,211,1)'
    },
  ],
};
export default data;
