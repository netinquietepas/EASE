var M = {
  v : 'v',
  f : function(){
    console.log(this.v);
  }
}

module.exports = M; //M이 가르키는 객체를 모듈 밖에서 쓸 수 있도록 export 해주는 행위.
