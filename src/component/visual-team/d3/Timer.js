class Timer {
  start(time,callback){
    clearInterval(this.timer);
    this.timer = setInterval(()=>{
      if( typeof callback !== 'function' ) return;
      callback();
    },time)
  }
  stop(){
    clearInterval(this.timer);
  }
}
export default Timer;
