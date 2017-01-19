var express = require('express');
var app = express();
var cheerio = require('cheerio');
var request = require('request');


var url = 'https://www.zhihu.com/people/wei-zhen-dong-73/followers?page=1'，
    userList = [],
    urlList = [];


function getUrl(){ //获取关注此用户的其他用户的url

  for(let i = 0; i < $('.UserLink-link').length ; i=i+2){

    urlList.push('https://www.zhihu.com'+$('.UserLink-link').eq(i).attr('href')+'/followers');

  }

}


function getInfo(url){ //获取当前用户信息，并递归

  request(url, function (error, response, body) {

    if (!error && response.statusCode == 200) {

      $ = cheerio.load(body);

      let user = {
        "name" : $('.ProfileHeader-name').text() || ""，
      }
      getUrl();

      var allPage = $('.Pagination button').eq(-2).text();//获取总页数

      var currentpage = url.split("?page=")[1]; //获取当前页数

      if(currentpage < allPage && currentpage<=5){//以防总页数太多

        url = url.split('?page=')[0]+'?page='+(parseInt(currentpage)+1);
        getInfo(url);

      }else{

        userList.push(user);

        getInfo(urlList.shift()+'?page=1')；

      }
    }
  })
}

getInfo(url);
