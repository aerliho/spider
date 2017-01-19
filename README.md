# spider
## 思路：
- 选择一位用户的个人主页作为起点；
- 爬取此用户的个人信息；
- 将所有关注他的人的个人主页`uri`push进uriList数组；
- 直到所有关注他的人的`uri`都被push入uriList数组；
- 从uriList中pop出一个uri重复以上操作
