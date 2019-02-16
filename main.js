var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require ('querystring');
var template = require('./lib/template.js')
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var urlencode = require('urlencode');
var express = require('express');
// var images = require('./images')


var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

    if (pathname === '/'){
      if (queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          // console.log(filelist);
          var title = 'Welcome';
          // console.log(images);
          var description = 'Hello, EASE';
          var list = template.list(filelist);
          var html = template.HTML(title, list,
              `<h2>${title}</h2> <p>${description}</p>`,
              `<a href = "/create">글쓰기</a>`);
          response.writeHead(200);
          response.end(html);
        })
      } else {
        fs.readdir('./data', function(error, filelist){
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
            // var decodedtitle = urlencode.decode(queryData.id);
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
              allowedTags: ['img', 'div', 'center'],
              allowedAttributes : {
                img: [ 'src', 'width' ]
              },
            });
            var list = template.list(filelist);
            var HTML = template.HTML(sanitizedTitle, list,
              `<h2>${sanitizedTitle}</h2>
              <p>${sanitizedDescription}</p>`,
              `<a href = "/create">글쓰기</a>
              <a href = "/update?id=${sanitizedTitle}">업데이트</a>
              <script> function deletecheckmsg(){
                  alert("삭제하시겠습니까?");
              } </script>
              <form action="delete_process" method="post" onsubmit="deletecheckmsg();">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
              </form>
              `);
        response.writeHead(200);
        response.end(HTML);
      // response.end('egoing : '+url);
      // response.end(fs.readFileSync(__dirname + url));
      // console.log(__dirname + url);
      });
    });
    }
  } else if(pathname === '/create'){
    fs.readdir('./data', function(error, filelist){
      // console.log(filelist);
      var title = 'Create';
      var list = template.list(filelist);
      var HTML = template.HTML(title, list, `
        <form action = "/create_process" method = "post">
          <p><input type = "text" name = "title" placeholder = "title"></p>
          <p>
            <textarea name = "description" placeholder = "description"></textarea>
          </p>
          <p>
            <input type = "submit">
          </p>
        </form>
        `, '');
      response.writeHead(200);
      response.end(HTML);
    });
  }
  else if(pathname === '/create_process'){
    var body = '';
    request.on('data', function(data){
      body = body + data; //콜백이 실행될때마다 데이터 추가해주기. 너무 클 때 대비해서 조각조각 넣음.
    });
    request.on('end', function(){
      var post = qs.parse(body); //정보를 post에 담아서 객체화
      var encodedtitle = urlencode(post.title);
      var title = post.title;
      console.log(title);
      var description = post.description;
      fs.writeFile(`data/${title}`, description, function(err){
        response.writeHead(302, {Location: `/?id=${encodedtitle}`});
        response.end();
      })
    });

  } else if (pathname === '/update'){
    fs.readdir('./data', function(error, filelist){
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        var title = queryData.id;
        var list = template.list(filelist);
        var HTML = template.HTML(title, list,
          `
          <form action = "/update_process" method = "post">
            <input type = "hidden" name = "id" value = "${title}">
            <p><input type = "text" name = "title" placeholder = "title" value = "${title}"></p>
            <p>
              <textarea name = "description" placeholder = "description">${description}</textarea>
            </p>
            <p>
              <input type = "submit">
            </p>
            <p>
          </form>
          `,
          `<a href = "/create">글쓰기</a> <a href = "/update?id=${title}">업데이트</a>`);
    response.writeHead(200);
    response.end(HTML);
  });
});
} else if (pathname === '/update_process'){
  var body = '';
  request.on('data', function(data){
    body = body + data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var id = post.id;
    var title = post.title;
    var encodedtitle = urlencode(post.title);
    var description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function(error){
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/?id=${encodedtitle}`});
        response.end();
      })
    });
  });
} else if (pathname === '/delete_process'){
  var body = '';
  request.on('data', function(data){
    body = body + data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var id = post.id;
    var filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, function(error){
      response.writeHead(302, {Location: `/`});
      response.end();
    })
  });
}

else {
      response.writeHead(404);
      response.end('Not found');
}
});
app.listen(3000);
