# BitRun
Cores For BitRun

**一个可验证的随机数生成器** <br>
与传统的基于电脑状态的随机数生成器不同（比如说 UNIX 内核中的随机数发生器（/dev/random））,这是一个可以验证其随机性的生成器。
这个生成器的基本思想很简单：**用户不知道五分钟前电脑产生了什么硬件噪音，但是他肯定能找到五分钟前的区块哈希值。**<br>

**工作原理**<br>
生成器在Appchain上抓取最新的区块Hash值作为随机源，经过转换，输出在取值范围内的N个随机数。<br>
安装nodejs-websocket作为ab.js文件和random1.html & random2.html 交互的环境<br>

**环境配置和使用方法**<br>
1) clone<br>
```
git clone https://github.com/BBJBBQ/BitRun/ <br>
```
2) 启动ab.js<br>
```
node ab.js
```

3) 用浏览器打开random1.html或random2.html<br>

4）输入取值区间的最大值、最小值和随机数生成个数<br>

5）得到随机数以及所引用的Appchain区块。以后用户可以用这个区块验证自己得到的随机数是不是伪造的<br>



