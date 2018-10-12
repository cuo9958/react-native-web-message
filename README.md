# react-native-web-message

react-native中webview与网页之间通讯用到的组件

[GitHub地址](https://github.com/cuo9958/react-native-web-message)

## 使用方式

1. 在APP中实现消息的监听和对应方法的调用，参考`WebView.js`
2. 在网页中监听`ready`事件，APP会在js加载完毕之后触发ready事件

