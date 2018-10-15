/**
 * react-native-web-message
 */
const win = window;
let _sdk = function () {
    _sdk.exec(arguments);
}
const event = {
    //APP环境准备好了
    ready: [],
};
//环境判断
_sdk.current = win.location.href.indexOf("web_env=app") > 0 ? "app" : "web";
//监听
_sdk.on = function (name, fn) {
    if (!event[name]) {
        event[name] = [];
    }
    event[name].push(fn);
}
//只执行一次
_sdk.once = function (name, fn) {
    if (!event[name]) {
        event[name] = [];
    }

    function one() {
        fn.apply(_sdk, arguments);
        this.off(name, one);
    }
    event[name].push(one);
}
//触发事件
_sdk.emit = function (name, data, val) {
    var list = event[name]
    if (list.constructor !== Array) return;
    for (var i = 0, j = list.length; i < j; i++) {
        var item = list[i];
        item.call(SDK, data, val);
    }
}
//去掉监听
_sdk.off = function (name, fn) {
    var list = event[name];
    var index = list.indexOf(fn);
    event[name].splice(index, 1);
}
_sdk.exec = function () {
    win.postMessage(Array.prototype.slice.apply(arguments));
}

//实现数据传输
_sdk.getData = function (key, fn) {
    _sdk.once("data", function (name, val) {
        if (key === name) fn.call(this, val);
    });
    _sdk("getData", key);
}
//实现数据保存
_sdk.setData = function (key, val) {
    _sdk("setData", key, val);
}
win.SDK = _sdk;
export default _sdk;