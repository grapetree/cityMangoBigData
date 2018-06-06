const ids = ['linearGradientZll-1','linearGradientZll-2'];
const data = {
  monthPriceBlue: {
    color:'#3ff6f2',
    ids: ids[0],
    text: '月均价'
  },
  dataPriceBlue: {
    color:'#3ff6f2',
    ids: ids[0],
    text: '日均价'
  },
  monthPriceGreen: {
    color: '#2af594',
    ids: ids[1],
    text: '月均价'
  },
  dataPriceGreen: {
    color: '#2af594',
    ids: ids[1],
    text: '日均价'
  },
  defs: [
    {
      ids: 'linearGradientZll-1',
      gradientColor1 :'rgba(154, 255, 255)',
      gradientColor2 : 'rgba(33, 209, 245)'
    },
    {
      ids: 'linearGradientZll-2',
      gradientColor1 : 'rgba(175,255,217)',
      gradientColor2 : 'rgba(42,245,148)',
    }
  ]
};
export default data;
