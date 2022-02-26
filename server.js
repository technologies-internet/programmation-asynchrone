var http = require('http'),
    html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <title>Programmation asynchrone</title> 
  <style>body{margin:1em;}pre{border:solid;padding:1em;}</style></head>
<body><h1>Programmation asynchrone</h1>
  <div><input type="text"><button>Chercher...</button></div>
  <div><pre>?</pre></div><script>
    var [input,button,pre] = ['input','button','pre'].map(e => document.querySelector(e)),
        getRequest = (urls, cb) => {
          Promise.all(urls.map(url => fetch(url).then(resp => resp.text())))
          .then(s => cb(null,s)).catch(cb)},
        executer = () => {
          var urls = input.value.split(',');
          getRequest(urls, (err,s) => {
            pre.style.color = err ? 'red' : 'blue';
            pre.innerText = err || s.join(", ")});};
    button.addEventListener('click', executer);
    input.addEventListener('keyup', e => (e.key=='Enter') ? executer() : 0);
</script></body></html>`,
    yp = {
      "/jean" : "611 233-4555",
      "/ala": "513 333-6543",
      "/wojtek": "613 443-4321",
      "/emily": "411 998-0001",
      "/katrina": "555 987-2421"
    };

var f = (req, res) => {
  var url = req.url;
  if (yp[url]) return res.end(yp[url]);
  if (url == "/") return res.end(html);
  res.writeHeader(404).end("Not found!");
};

http.createServer(f).listen(8080);
