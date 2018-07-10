/**
 * Created by luodianlei on 2018/5/18.
 */
(function(){
  
  var arr = []; //用于存储蛇的每一节
  
  function Snake(option){
    option = option || {};
    this.width = option.width || 20;  //每一个蛇节的宽度
    this.height = option.height || 20;  //每一个蛇节的高度
    this.body  = [
      {x:3, y:2, col:'red'},//蛇头的位置和颜色
      {x:2, y:2, col:'blue'}, //社身体的位置和颜色
      {x:1, y:2, col:'blue'}
    ];
    this.direction = option.direction || 'right'; //蛇的方向
  }
  
  //蛇渲染到map上的方法
  Snake.prototype.render = function(){
    
    //为了防止多个snake渲染页面上,一渲染之前先清除掉原来的
    for(var i = 0; i < arr.length; i++) {
      map.removeChild(arr[i]);  //移除页面上的蛇节
    }
    arr.splice(0, arr.length); //蛇节都被移除掉了,那么数组中也应该都移除掉
  
    // console.log(this);
    //根据body中的个数,动态的创建蛇节
    this.body.forEach(function(item, index){
      
      //动态的创建蛇的每一节
      var snakeNode = document.createElement('div');
      arr.push(snakeNode);
      snakeNode.style.width = this.width + 'px';
      snakeNode.style.height = this.height + 'px';
      snakeNode.style.position = 'absolute';
      snakeNode.style.left = item.x * this.width + 'px';
      snakeNode.style.top = item.y * this.height + 'px';
      snakeNode.style.backgroundColor = item.col;
      map.appendChild(snakeNode);
      
    }.bind(this));
    
  }
  
  //蛇移动的方法
  Snake.prototype.move = function(){
    //从后往前赋值 只设置蛇的身体
    for(var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    
    //暂时蛇头往右走
    // this.body[0].x += 1;
    
    //蛇头一定的位置,要根据蛇的方向来决定
    switch(this.direction){
      
      case 'left':
        this.body[0].x -= 1;
        break;
      case 'right':
        this.body[0].x += 1;
        break;
      case 'top':
        this.body[0].y -= 1;
        break;
      case 'bottom':
        this.body[0].y += 1;
        break;
    }
  }
  
  
  
  window.Snake = Snake;
})();