const $input = document.querySelector("input");
const $button = document.querySelector("button");
const $pre = document.querySelector("pre");
const getRequest = (url, cb) =>
  fetch(url)
    .then((resp) => resp.text())
    .then((text) => cb(null, text))
    .catch(cb);
const executer = () =>
  getRequest($input.value, (err, s) => {
    $pre.style.color = err ? "red" : "blue";
    $pre.innerText = err || $input.value + ": " + s;
  });
$button.addEventListener("click", executer);
$input.addEventListener("keyup", (e) => (e.key == "Enter" ? executer() : 0));
