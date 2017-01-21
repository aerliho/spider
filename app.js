const phantom = require('phantom'),
      cheerio = require('cheerio'),
      fs = require('fs');

var url = 'https://www.zhihu.com/people/verna-fu/followers',
    urlList = [],
    userList = [];

function getUrl(){ //获取关注此用户的其他用户的url
  for(let i = 0; i < $('.UserItem-name .UserLink-link').length ; i++){
    urlList.push('https://www.zhihu.com'+$('.UserItem-name .UserLink-link').eq(i).attr('href')+'/followers?page=1');
  }
}

async function getInfo(url) {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function(requestData) {
        console.info('Requesting', requestData.url)
    });

    const status = await page.open(url);


    const content = await page.property('content');

    $ = cheerio.load(content);

    let user = {
      'name' : $('.ProfileHeader-name').text(),
      'intro' : $('.RichText.ProfileHeader-headline').text(),
      'type' : $('.ProfileHeader-infoItem').eq(0).text(),
      'edu' : $('.ProfileHeader-infoItem').eq(1).text(),
    };

    userList.push(user);

    getUrl();

    await instance.exit();

    // console.log(urlList);
    console.log(userList);

    var allPage = $('.Pagination button').eq(-2).text();//获取总页数
    console.log(allPage);

    var currentpage = url.split("?page=")[1]; //获取当前页数
    console.log(currentpage);

    if(currentpage < allPage && currentpage<=5){//以防总页数太多
      url = url.split('?page=')[0]+'?page='+(parseInt(currentpage)+1);
      getInfo(url);
    }else{
      userList.push(user);
      getInfo(urlList.shift()+'?page=1');
    }


};

getInfo(url);
