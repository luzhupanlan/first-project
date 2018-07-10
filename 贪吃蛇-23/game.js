/**
 * Created by luodianlei on 2018/5/18.
 */
//游戏对象控制,蛇和食物
(function(){
  
  var timeid; //用于存储定时器的id
  // 游戏对象的属性:
  // 由于游戏对象要控制蛇和食物,所以游戏对象应该拥有蛇的实例和食物的实例
  function Game(){
    this.snake = new Snake();
    this.food = new Food();
    
  }
  
  //开始游戏的方法
  Game.prototype.start = function(){
    //游戏一开始,蛇和食物就渲染出来
    this.snake.render();
    this.food.render();
    
    //让蛇自动动起来
    timeid = setInterval(function(){
      this.snake.move(); //里面蛇的坐标的数据发生变化
      // 判断蛇是否到墙边界了
      // 只需要判断蛇头的坐标
      var snakeHead = this.snake.body[0];
      //求蛇头可以移动的水平/垂直的最大位置
      var maxX = map.offsetWidth / this.snake.width - 1;
      var maxY = map.offsetHeight / this.snake.height - 1;
      if(snakeHead.x < 0 || snakeHead.x > maxX || snakeHead.y < 0 || snakeHead.y > maxY ){
        //只要能进来,就证明撞墙了
        clearInterval(timeid);
        alert('game over');
        return;
      }
      
      
      //判断蛇是否吃到食物
      //   判断依据: 蛇头的坐标 和 食物的坐标重合
      var snakeX = snakeHead.x * this.snake.width;
      var snakeY = snakeHead.y * this.snake.height;
      var foodX = this.food.x;
      var foodY = this.food.y;
      //如果符合这个条件,证明蛇吃到了食物
      if(snakeX == foodX && snakeY == foodY){
        // 如果蛇迟到食物,食物要消失,并且重新渲染一个新的食物
        this.food.render();
        // 蛇要变长
        //其实就往snake.body中push一个新的对象
        //为了解决新添加的蛇节闪一下的问题,我们需要把最后一节的数据,赋值给新的蛇节
        var last = this.snake.body[this.snake.body.length - 1];
        this.snake.body.push({
          x:last.x,
          y:last.y,
          col:last.col
        });
        //this.snake.body.push(last); //last本身已经在数组中,再次添加,其实对象的个数没有增加
        
      }
      
      
      
      this.snake.render(); //真正看到的蛇动起来
    }.bind(this), 150)
    
    
    // 给页面注册键盘按下的事件
    // 监听用户是否按下了上,下,左,右的按键
    document.onkeydown = function(e){
      // console.log(this);
      e = e || window.event;
      console.log(e.keyCode);
      // 左37  上38  右39   下40
      switch(e.keyCode){

        case 37:
        //需要找到蛇,修改蛇的direction属性
          //防止原地掉头
          if(this.snake.direction === 'right'){
            return;
          }
          this.snake.direction = 'left';
          break;
        case 38:
          if(this.snake.direction === 'bottom'){
            return;
          }
          this.snake.direction = 'top';
          break;
        case 39:
          if(this.snake.direction === 'left'){
            return;
          }
          this.snake.direction = 'right';
          break;
        case 40:
          if(this.snake.direction === 'top') return; //如果if中只有一行代码就可以不写花括号,然后这一行代码要紧跟在if后面记得加分号
          this.snake.direction = 'bottom';
          break;

      }
    }.bind(this);
   
  }
  
  
  
  window.Game = Game;
  
  
})();