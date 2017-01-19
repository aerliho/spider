var express = require('express');
var app = express();
var cheerio = require('cheerio');
var request = require('request');

var uri = 'https://www.zhihu.com/people/zhongyi.tong/followers';
var userList = [],
    uriList = [];

function getUri(){
  for(let i = 0; i < $('.UserLink-link').length ; i++){
    uriList.push('https://www.zhihu.com'+$('.UserLink-link').eq(i).attr('href')+'/followers');
  }
}


function getInfo(uri){
  request(uri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      let user = {
        "name" : $('.ProfileHeader-name').text()||""
      }
      getUri();
      console.log(uriList);
      console.log(user);
    }
  })
}

getInfo(uri);
