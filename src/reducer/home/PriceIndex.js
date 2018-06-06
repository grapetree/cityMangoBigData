const PriceIndex = (state = {}, active)=>{
  if(active.type === 'price'){
    return active.data
  }else{
    return state
  }
};
export default PriceIndex;
