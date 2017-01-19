var express = require('express');
var app = express();
var cheerio = require('cheerio');
var request = require('request');

app.get('/', function (req, res) {
  request('https://www.zhihu.com/people/zhongyi.tong/answers', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      console.log($('.ProfileHeader-name').text());
    }
  })
  res.send('Hello World!');
});

app.listen(3000);
