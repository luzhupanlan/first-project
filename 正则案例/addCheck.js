// var obj;// 用于存储我们需要的对象

//验证规则
var rules = [{
        name: 'qq',
        reg: /^\d{5,12}$/,
        tip: "请输入正确的QQ"
    },
    {
        name: 'email',
        reg: /^\w+@\w+\.\w+(\.\w+)?$/,
        tip: "请输入正确的邮箱地址"
    },
    {
        name: 'phone',
        reg: /^\d{11}$/,
        tip: "请输入正确的手机号码"
    },
    {
        name: 'date',
        reg: /^\d{4}-\d{1,2}-\d{1,2}$/,
        tip: "请输入正确的出生日期"
    },
    {
        name: 'cn',
        reg: /^[\u4e00-\u9fa5]{2,4}$/,
        tip: "请输入正确的姓名"
    }
];


function addCheck(formid){
   var form = document.getElementById(formid);
    //1. 获取页面上的input,给每一个注册失去焦点事件
   var inputs =  form.getElementsByTagName('input');
    for(var i = 0; i < inputs.length; i++) {
        
        inputs[i].onblur = inpBlur;
      
    }
    
    
}

// input失去焦点的时候触发的函数
function inpBlur(){
    // console.log(1);
    // 2. 获取用户输入的文本
    // console.log(this.value);
    var text = this.value;
    
    //3. 根据文本框的data-rule获取对应的正则表达式
    //在html中通过data-xx自定义的属性,在js中可以通过dataset.xxx获取对应的值
    //3.1 获取对应标签的rule
    // console.log(this.dataset.rule);
    var ruleName = this.dataset.rule;
    //3.2 根据rule获取对应的正则表达式
    // var result =  rules.forEach(function(item,index,arr){
    //
    //     if(item.name === ruleName){
    //         // console.log(item);
    //        obj = item;
    //     }
    //
    // });
    
    // console.log(obj);
    
    // 数组的方法 filter过滤器 返回一个数组,数组里面存储的是在代码中判断结果是true的那个item
    var result = rules.filter(function(item, index, arr){
        return item.name === ruleName;
    });
    
    // console.log(result);
    // console.log(result[0].reg);
    var reg = result[0].reg;
    
    //3.3  通过正则去验证用户输入是否符合条件'
    if(reg.test(text)){
        //符合条件
        var span = this.nextElementSibling;
        span.innerText = '';
    }else{
        //不符合条件
        // 给input后面的span添加文本
        // console.log(this.nextElementSibling);
        var span = this.nextElementSibling;
        span.innerText = result[0].tip;
        span.style.color = 'red';
    }
    
}




// function addCheck(form) {
//
//     //获取form表单元素
//     var form = document.getElementById(form);
//     //获取所有子元素
//     var childs = form.children;
//
//     //遍历伪数组
//     Array.prototype.forEach.call(childs, function (element) {
//         //判断是否是input
//         if (element.name) {
//             //是input元素
//             //给input注册失去焦点事件
//             element.onblur = blurFn;
//         }
//
//     })
//
// }
//
//
// //这个是input失去焦点时,触发的函数
//
// function blurFn() {
//     //获取到用户输入的内容
//     var value = this.value;
//     // 去做验证(获取对应的验证规则)
//     //获取元素上面data-rule属性的值
//     // var rule = this.getAttribute('data-rule');
//     //在元素上通过data-xx 写的自定义属性 ,可以通过对象.dataset拿到
//     var rule = this.dataset.rule;
//     // console.log(this.dataset)
//     console.log(rule);
//     var ruleObj = getRule(rule);
//     console.log(ruleObj)
//
//     //根据得到的结果去做判断
//
//     //获取到span
//     var span = this.nextElementSibling;
//     if(ruleObj.reg.test(value)){
//         //如果进入到这里就是符合条件
//         span.style.color = '';
//         span.innerText = '';
//     }else{
//         span.style.color = 'red';
//         span.innerText = ruleObj.tip;
//     }
//
//
// }
//
//
// //根据element上面的data-rule的值,去rules中获取对应的对象
// function getRule(rule) {
//
//     //遍历rules
//     // var arr = rules.filter(function(item){
//     //     //判断字符串最好使用===
//     //     return item.name === rule;
//
//     // });
//
//     // return arr[0];
//
//     return rules.filter(function (item) {
//         //判断字符串最好使用===
//         return item.name === rule;
//
//     })[0];
//
//
//
// }