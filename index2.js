const phantom = require('phantom'),
      cheerio = require('cheerio'),
      fs = require('fs');

var url = 'https://www.zhihu.com/people/verna-fu/followers',
    urlList = [],
    userList = [];

phantom.create()
    .then(instance => {
        return instance.createPage();
    })
    .then(page => {
        page.on("onResourceRequested", function(requestData) {
            console.info('Requesting', requestData.url)
        });
        return page;
    })
    .then(page => {
        console.log(111);
        const status = page.open(url);
        console.log(222);
        return page;
    })
    .then(page => {
        return page.property('content');
    })
    .then(content => {
        $ = cheerio.load(content);
        console.log($('.ProfileHeader-name').text());
        return 0;
    })
    .catch(error => {
        console.log(error);
        instance.exit();
    });
