

### 浅拷贝和深拷贝初探索
---
#### 基本数据类型和引用数据类型

数据分为**基本数据类型**和**引用数据类型**

- **基本数据类型** ：String、Number、Boolean、Null、Undefined、Symbol。解百纳数据类型是直接存储在栈中的数据。
- **引用数据类型**： Array、Object。引用数据类型存储的是该对象在栈中引用，真实的数据存储在内存中。

```
// 基本数据类型
let str1 = '123';
str2 = str1;
str2 = '456';
console.log(str1); // '123'
console.log(str2); // '456'

// 引用数据类型
let arr1 = [1, 2, 3];
arr2 = arr1;
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4]
console.log(arr2); // [1, 2, 3, 4]


```

如上，由于基本数据类型是直接存储的，所以如果我们对基本数据类型进行拷贝，然后修改新数据后，不会影响到原数据。

而当你对引用数据类型进行拷贝，然后修改新数据后，它就会影响到原数据。

#### 了解 **基本数据类型和引用数据类型** 后，咱们进一步探索赋值、浅拷贝和深拷贝：

```
/**
 * @name 赋值
 */
const dataOne = {
  title: 'study',
  number: ['jsliang', 'JavaScriptLiang', 'LiangJunrong'],
};
const dataTwo = dataOne;
dataTwo.title = 'play';
dataTwo.number = ['null'];
console.log(dataOne);
// dataOne: { title: 'play', number: ['null'] }
console.log(dataTwo);
// dataTwo: { title: 'play', number: ['null'] }

/**
 * @name 浅拷贝
 */
const dataThree = {
  title: 'study',
  number: ['jsliang', 'JavaScriptLiang', 'LiangJunrong'],
};
const dataFour = shallowClone(dataThree); // shallowClone 待实现
dataFour.title = 'play';
dataFour.number = ['null'];
console.log(datadataThreeOne);
// dataThree: { title: 'study', number: ['null'] }
console.log(dataFour);
// dataFour: { title: 'play', number: ['null'] }

/**
 * @name 深拷贝
 */
const dataFive = {
  title: 'study',
  number: ['jsliang', 'JavaScriptLiang', 'LiangJunrong'],
};
const dataSix = deepClone(dataFive); // deepClone 待实现
dataSix.title = 'play';
dataSix.number = ['null'];
console.log(dataFive);
// dataFive: { title: 'study', number: ['jsliang', 'JavaScriptLiang', 'LiangJunrong'] }
console.log(dataSix);
// dataSix: { title: 'play', number: ['null'] }

```

结论：
- 赋值：引用地址的拷贝。修改赋值后的数据，不管是基本数据类型还是引用数据类型，都会影响到原数据。
- 浅拷贝：一层拷贝。在浅拷贝中，修改基本数据类型不会影响原有数据的基本数据类型，修改引用数据类型会影响原有的数据类型。
- 深拷贝：无限层级拷贝。在深拷贝中，修改基本数据类型和引用数据类型都不会影响原有的数据类型。
---



|   | 和原数据是否指向同一对象 | 原数据为基本数据类型 | 原数据包含子对象
---|---|---|---|
赋值 | 是 | 改变【会】使原数据一同改变 |改变【会】使原数据一同改变
浅拷贝 | 否 | 改变【不会】使原数据一同改变 |改变【会】使原数据一同改变
深拷贝|否|	改变【不会】使原数据一同改变 |改变【不会】使原数据一同改变
 
 ---
 ## 1.浅拷贝

### 1.1手写浅拷贝 

例子:
```
const arr1 = [1, 2, ['jsliang', 'JavaScriptLiang'], 4];

const shallowClone = (arr) => {
  const dst = [];
  for (let prop in arr) {
    if (arr.hasOwnProperty(prop)) {
        dst[prop] = arr[prop];
    }
  }
  return dst;
}

const arr2 = shallowClone(arr1);
arr2[2].push('LiangJunrong');
arr2[3] = 5;

console.log(arr1);
// [ 1, 2, [ 'jsliang', 'JavaScriptLiang', 'LiangJunrong' ], 4 ]
console.log(arr2);
// [ 1, 2, [ 'jsliang', 'JavaScriptLiang', 'LiangJunrong' ], 5 ]

```

可以看到，这里我们修改引用数据类型里面的引用数据类型的时候，还是会影响到原数据，但是如果我们修改里面的基本数据类型的时候，就不会影响到原数据了。

**上面代码为啥能浅拷贝数据**:
- for...in：遍历 Object 对象 arr1，将可枚举值列举出来。
- hasOwnProperty()：检查该枚举值是否属于该对象 arr1，如果是继承过来的就去掉，如果是自身的则进行拷贝。


### 1.2 Object.assign()

==Object.assign()== 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。

但是需要注意的是，==Object.assgin()== 进行的是浅拷贝，拷贝的是对象的属性的引用，而不是对象本身。

```
const obj1 = {
  username: 'zcf',
  skill: {
    play: ['basketball', 'computer game'],
    read: 'book',
  },
  girlfriend: ['1 号备胎', '2 号备胎', '3 号备胎'],
};
const obj2 = Object.assign({}, obj1);
obj2.username = 'pty'; 修改基本类型
obj2.skill.read = 'computer book'; // 修改二层基本类型
obj2.skill.play = ['footboll']; // 修改二层引用类型
obj2.girlfriend = ['之前的都是瞎吹的！'];
console.log(obj1);
// { username: 'zcf',
//   skill: { play: [ 'footboll' ], read: 'computer book' },
//   girlfriend: [ '1 号备胎', '2 号备胎', '3 号备胎' ] }
console.log(obj2);
// { username: 'pty',
//   skill: { play: [ 'footboll' ], read: 'computer book' },
//   girlfriend: [ '之前的都是瞎吹的！' ] }

```

**注意**：可以看到的是，Object.assign() 对于第一层的数据来说，是深拷贝，对于第二层及以上的数据来说，是浅拷贝。

### 1.3 Array.prototype.concat()

==concat()== 是数组的一个内置方法，用户合并两个或者多个数组。

这个方法不会改变现有数组，而是返回一个新数组。

```
const arr1 = [
  1,
  {
    username: 'zcf',
  },
];

let arr2 = arr1.concat();
arr2[0] = 2;
arr2[1].username = 'pty';
console.log(arr1);
// [ 1, { username: 'pty' } ]
console.log(arr2);
// [ 2, { username: 'pty' } ]


```
**结论：通过 concat() 进行的浅拷贝，可以修改里面的基本数据类型而不影响原值，但是修改里面的引用数据类型，就会影响到原有值了。**


### 1.4 Array.prototype.slice()

==slice()== 也是数组的一个内置方法，该方法会返回一个新的对象。

==slice()== 不会改变原数组。

```
MDN - Array.prototype.concat()

const arr1 = [
  1,
  {
    username: 'jsliang',
  },
];

let arr2 = arr1.slice();
arr2[0] = 2;
arr2[1].username = 'LiangJunrong';
console.log(arr1);
// [ 1, { username: 'LiangJunrong' } ]
console.log(arr2);
// [ 2, { username: 'LiangJunrong' } ]

```

**结论：和前面的 concat() 表现的浅拷贝一模一样**

### 1.5 ...Object 扩展运算符

展开运算符是 ES6 中新提出来的一种运算符。

在拷贝数组、对象以及拼接数组等方面都可以使用。

这边我们也可以尝试下使用 ==const obj2 = {...obj1}== 的形式进行浅拷贝。

```
/**
 * @name ...obj拷贝数组
 */
const arr1 = [1, 2, 3];
const arr2 = [...arr1]; // like arr.slice()
arr2.push(4); 

console.log(arr1); // [ 1, 2, 3 ]
console.log(arr2); // [ 1, 2, 3, 4 ]

/**
 * @name ...obj拷贝对象
 */
const obj1 = {
  name: 'jsliang',
  arr1: ['1', '2', '3'],
  obj: {
    name: 'JavaScriptLiang',
    arr2: ['4', '5', '6'],
  },
};
const obj2 = {...obj1};
obj2.name = 'LiangJunrong';
obj2.arr1 = ['null'];
obj2.obj.name = 'jsliang';
obj2.obj.arr2 = ['null'];

console.log(obj1);
// { name: 'jsliang',
//   arr1: [ '1', '2', '3' ],
//   obj: { name: 'jsliang', arr2: [ 'null' ] } }
console.log(obj2);
// { name: 'LiangJunrong',
//   arr1: [ 'null' ],
//   obj: { name: 'jsliang', arr2: [ 'null' ] } }

```

**结论：ES6的扩展运算符能深拷贝第一层数据，而第二层数据为浅拷贝;**

---

## 2 深拷贝

依旧先手写: (问题超多，看看就好，千万别用)

```
//定义检测数据类型的功能函数

const checkedType = (target )=>{
    return Object.prototype.toString.call(target).slice(8,-1);
}

//实现深度克隆对象或者数组
const deepClone = (target) =>{
    //判断拷贝的数据类型
    //初始化变量result 成为最终数据
    let result , targetType = checkedType(target);
    if(targetType === 'Object'){
        result ={};
    }else if(targetType === 'Array'){
        result = []
    }else{
        return target
    }


    //遍历目标数据
    for(let i in target ){
    //获取遍历数据结构的每一项值
    let value = target[i];
    if(checkedType(value) === 'Object' || checkedType(value) === 'Array'){
    //如果对象或者数组中还嵌套了对象或者数组，那么继续遍历
        result[i]  = deepClone(value)
        
        }else{
            result[i] = value
        }
    }
    return result
}


const obj1 = [
    1, 
    'hello!',
    {name : 'pty'},
    [
        {
            name:'zcf',
        }
    ],
];

const obj2 = deepClone(obj1) ; 
obj2[0] = 2 ;
obj2[1] = 'Hi!';
obj2[2].name = 'zcf';
obj2[3][0].name = 'pty';

console.log(obj1);
// [
//   1,
//   'Hello!',
//   { name: 'jsliang1' },
//   [
//     { name: 'LiangJunrong1' },
//   ],
// ]

console.log(obj2);
// [
//   2,
//   'Hi!',
//   { name: 'jsliang2' },
//   [
//     { name: 'LiangJunrong2' },
//   ],
// ]



```

解析：
首先对比下检车JavaScript数据类型的4种方式: 
- **方式一：typeof：无法判断 null 或者 new String() 等数据类型。**
- **方式二：instanceof：无法判断 'jsliang'、123 等数据类型。**
- **方式三：constructor：判断 null 和 undefined 会直接报错。**
- **方式四：Object.prototype.toString.call()：稳健地判断 JavaScript 数据类型方式，可以符合预期的判断基本数据类型 String、Undefined 等，也可以判断 Array、Object 这些引用数据类型。**

**然后:** 通过方法 targetType() 中的 Object.prototype.toString.call()，判断传入的数据类型属于那种，从而改变 result 的值为 {}、[] 或者直接返回传入的值（return target）。

**最后** ，我们再通过 for...in 判断 target 的所有元素，如果属于 {} 或者 []，那么就递归再进行 clone() 操作；如果是基本数据类型，则直接传递到数组中……从而在最后返回一个深拷贝的数据。


#### 2.1 JSON.parse(JSON.stringfy())

其实利用工具，达到目的，是非常聪明的做法，下面我们讨论下 ==JSON.parse(JSON.stringify())。==

- JSON.stringify()：将对象转成 JSON 字符串。
- JSON.parse()：将字符串解析成对象。
 
通过 JSON.parse(JSON.stringify()) 将 JavaScript 对象转序列化（转换成 JSON 字符串），再将其还原成 JavaScript 对象，一去一来我们就产生了一个新的对象，而且对象会开辟新的栈，从而实现深拷贝。

>注意，该方法的局限性：
1、不能存放函数或者 Undefined，否则会丢失函数或者 Undefined；
2、不要存放时间对象，否则会变成字符串形式；
3、不能存放 RegExp、Error 对象，否则会变成空对象；
4、不能存放 NaN、Infinity、-Infinity，否则会变成 null；
5、……更多请自行填坑，具体来说就是 JavaScript 和 JSON 存在差异，两者不兼容的就会出问题。

```
const arr1 = [
  1,
  {
    username: 'jsliang',
  },
];

let arr2 = JSON.parse(JSON.stringify(arr1));
arr2[0] = 2;
arr2[1].username = 'LiangJunrong';
console.log(arr1);
// [ 1, { username: 'jsliang' } ]
console.log(arr2);
// [ 2, { username: 'LiangJunrong' } ]

```

### 2.2 函数库Lodash

Lodash 作为一个深受大家喜爱的、优秀的 JavaScript 函数库/工具库，它里面有非常好用的封装好的功能，大家可以去试试：

- [Lodash](http://lodash.net/)

查看它的cloneDeep()方法:
- [Lodash-_.cloneDeep(value)](https://lodash.net/docs/4.15.1.html#_clonedeepvalue)


测试一下cloneDeep():

```
//  npm i -S lodash
var _ = require('lodash');

const obj1 = [
  1,
  'Hello!',
  { name: 'jsliang1' },
  [
    {
      name: 'LiangJunrong1',
    }
  ],
]
const obj2 = _.cloneDeep(obj1);
obj2[0] = 2;
obj2[1] = 'Hi!';
obj2[2].name = 'jsliang2';
obj2[3][0].name = 'LiangJunrong2';

console.log(obj1);
// [
//   1,
//   'Hello!',
//   { name: 'jsliang1' },
//   [
//     { name: 'LiangJunrong1' },
//   ],
// ]

console.log(obj2);
// [
//   2,
//   'Hi!',
//   { name: 'jsliang2' }, 
//   [
//     { name: 'LiangJunrong2' },
//   ],
// ]


```

#### 总结:打字打得手累，看来要学习东西还多得很，这都还只是九牛一毛