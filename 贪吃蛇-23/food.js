/**
 * Created by luodianlei on 2018/5/18.
 */
// 封装一个食物对象

//为了避免全局变量污染,用自调用函数将所有的代码包裹起来
//沙箱模式
(function(){
  var container; //用于存储之前的食物
  function Food(option) {
    //防止用户不传参数会报错
    option = option || {};
    this.width = option.width || 20;
    this.height = option.height || 20;
    this.bgc = option.bgc || 'green';
    this.x = option.x || 0;
    this.y = option.y || 0;
  }
  
  Food.prototype.render = function () {
    //每一次渲染新的之前就把原来的移除掉
    if(container){
      map.removeChild(container);
    }
    
    var food = document.createElement('div');
    container = food;
    food.style.width = this.width + 'px';
    food.style.height = this.height + 'px';
    food.style.backgroundColor = this.bgc;
    food.style.position = 'absolute';
    // 返回0 - 780整数  779  0 -39
    // this.x = Tool.getRandom(0, map.offsetWidth - this.width);
    // //返回的是 0 - 580  579  0 - 29
    // this.y = Tool.getRandom(0, map.offsetHeight - this.height);
    //由于要让食物的位置在每一个格子里面,所有获取随机数的算法要重新计算
    this.x = Tool.getRandom(0, (map.offsetWidth / this.width - 1)) * this.width;
    //返回的是 0 - 580  579  0 - 29
    this.y = Tool.getRandom(0, (map.offsetHeight / this.height - 1)) * this.height;
    console.log(this.x, this.y);
    food.style.left = this.x + 'px';
    food.style.top = this.y + 'px';
    map.appendChild(food);
    
  }
  
  //因为要在全局使用Food,需要吧Food拿出去
  window.Food = Food;
})()
