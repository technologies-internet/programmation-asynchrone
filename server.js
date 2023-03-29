const http = require("http");
const html = `
  <!DOCTYPE html>
  <html>
    <body style="margin:1em;">
      <h1>Programmation asynchrone</h1>
      <div>
        <input type="text">
        <button>Chercher...</button>
      </div>
      <div>
        <pre style="border:solid;padding:1em;">?</pre>
      </div>
      <script>
        const $input  = document.querySelector('input');
        const $button = document.querySelector('button');
        const $pre    = document.querySelector('pre');
        const getRequest = (url, cb) =>
          fetch(url)
            .then(resp => resp.text())
            .then(text => cb(null,text))
            .catch(cb);
        const executer = () =>
          getRequest($input.value, (err,s) => {
            $pre.style.color = err ? 'red' : 'blue';
            $pre.innerText = err || ($input.value +": " + s);
          });
        $button.addEventListener('click', executer);
        $input.addEventListener('keyup', e => (e.key=='Enter') ? executer() : 0);
      </script>
    </body>
  </html>`;
const yp = {
  jean: "611 233-4555",
  wojtek: "613 443-4321",
  emily: "411 998-0001",
  katrina: "555 987-2421",
};

const requestHandler = (req, res) => {
  const tel = yp[req.url.substr(1)];
  if (tel) return res.end(tel);
  if (req.url == "/") return res.end(html);
  res.writeHeader(404).end("Not found!");
};

http
  .createServer(requestHandler)
  .listen(8080, () => console.log("http://localhost:8080/"));
