# react-native-web-message

react-native中webview与网页之间通讯用到的组件

[GitHub地址](https://github.com/cuo9958/react-native-web-message)

## 安装

#### 浏览器

 
```html
<script src="/index.js"></script>
```
#### 项目引用

```javascript
npm i react-native-web-message
```
## 使用方式

1. 在APP中实现消息的监听和对应方法的调用，参考`WebView.js`
2. 在网页中监听`ready`事件，APP会在js加载完毕之后触发ready事件

## 例子

APP中实现剪切板的调动
``` javascript
clipBoard(clip) {
    Clipboard.setString(clip)
}
```

网页中直接调用即可
``` javascript
SDK("clipBoard","要粘贴的字符串");
```

## 扩展到微信

实现微信中的事件自定义转化
``` javascript
SDK.exec=function(){
    //do somethings
    var arr=Array.prototype.slice.apply(arguments);
    var name=arr.shift();
    if(SDK[name])SDK[name]();
}
```

添加自定义事件,日志输出
``` javascript
SDK.log=function(){
    console.log(arguments)
}
```

正常调用（在微信和APP中都不需要单独实现）
``` javascript
SDK("log","要粘贴的字符串");
```