const phantom = require('phantom'),
      cheerio = require('cheerio'),
      fs = require('fs');

var urlList = [],
    userList = [];

function getUrl(){ //获取关注此用户的其他用户的url
  for(let i = 0; i < $('.UserItem-name .UserLink-link').length ; i++){
    urlList.push('https://www.zhihu.com'+$('.UserItem-name .UserLink-link').eq(i).attr('href')+'/followers?page=1');
  }
}

async function getInfo() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function(requestData) {
        // console.info('Requesting', requestData.url)
    });

    const status = await page.open('https://www.zhihu.com/people/verna-fu/followers');
    // console.log(status);

    const content = await page.property('content');

    $ = cheerio.load(content);

    const reg = /\w-->\w.*\w<!--/g

    let user = {
      'name' : $('.ProfileHeader-name').text(),
      'place' : $('').text(),
      'intro' : $('.RichText.ProfileHeader-headline').text(),
      'type' : $('.ProfileHeader-infoItem').eq(0).text(),
      'edu' : $('.ProfileHeader-infoItem').eq(1).text(),
    };

    userList.push(user);


    getUrl();

    // $('.UserItem-name .UserLink-link').map(function(i){
    //   console.log($('.UserItem-name .UserLink-link').eq(i).text());
    // })

    await instance.exit();

    console.log(urlList);
    console.log(userList);


};

getInfo();
