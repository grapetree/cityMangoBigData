const dataBox = (state = {}, active)=>{
  if(active.type === 'box'){
    return active.data
  }else{
    return state
  }
};
export default dataBox;
