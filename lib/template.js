module.exports = {
  HTML: function (title, list, body, control){
      return`
      <!doctype html>
      <html>
      <head>
        <title>Everythin About Satisfactory Eating - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">E.A.S.E.</a></h1>
        <center><img src="EAT.jpg"></center>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
      `;
  }, list:function templateList(filelist){
    var list = '<ul>';
    var i = 0;
    while(i<filelist.length){
      list = list + `<li><a href ="/?id=${filelist[i]}">${filelist[i]}</a></li>`
      i = i+1;
    }
    list = list + '</ul>';
    return list;
  }
}
