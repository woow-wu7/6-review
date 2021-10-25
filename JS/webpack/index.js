require("./index.css");
require("./index.less");

const a = 1;
console.log(`AUTH`, AUTH); // 测试 webpack.DefinePlugin
console.log("hello"); // 测试 replaceLoader，将 hello -> hi

// 图片相关
import one from "./images/1.jpg";
function useJsGeneratorImg() {
  const divDOM = document.createElement("div");
  divDOM.setAttribute("style", "background: yellow;");
  const textDOM = document.createElement("span");
  textDOM.innerHTML = "js方式生成img标签";
  const _img = new Image(100, 100);
  divDOM.appendChild(_img); // 将图片插入到divDOM中，作为最后一个孩子节点
  divDOM.insertBefore(textDOM, _img); // 将 ( textDOM ) 插入到 ( divDOM ) 子元素 ( _img ) 的 ( 前面 )
  _img.src = one;
  if (_img.complete) {
    addChild();
  } else {
    _img.onload = addChild;
  }
  function addChild() {
    document.body.appendChild(divDOM);
  }
}
useJsGeneratorImg();
