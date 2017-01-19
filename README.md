# spider
node.js & spider
## 思路：
- 选择一位用户的个人主页作为起点；
- 爬取此用户的个人信息；
- 将所有关注他的人的个人主页`url`push进urlList数组；
- 直到所有关注他的人的`url`都被push入urlList数组；
- 从urlList中pop出一个url重复以上操作
