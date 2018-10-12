
'use strict';

import React from 'react';
import {
    Platform,
    WebView,
    Clipboard,
    AsyncStorage
} from 'react-native';

export default class extends React.Component {

    static defaultProps = {
        src: "",
        onError: () => { },
    }

    constructor(props) {
        super(props, {
            webpath: decodeURIComponent(props.src),
        });
        if (this.state.webpath.indexOf("web_env") < 0) {
            if (this.state.webpath.indexOf("?") < 0) {
                this.state.webpath += "?web_env=app";
            } else {
                this.state.webpath += "&web_env=app";
            }
        }
    }

    render() {
        let config = { uri: this.state.webpath }
        return <WebView
            ref="webview"
            source={config}
            javaScriptEnabled={true}
            decelerationRate="normal"
            mixedContentMode="always"
            startInLoadingState={true}
            scalesPageToFit={true}
            onMessage={(t) => this.onMessage(t)}
            onLoad={this.loaded.bind(this)}
            onError={e => this.props.onError(e)}
        />
    }

    onMessage(t) {
        let data = t.nativeEvent.data;
        if (!data) return;
        try {
            let args = JSON.parse(data);
            let name = args.shift();
            if (this[name]) this[name].call(this, ...args)
        } catch (e) {
            //
        }
    }

    clipBoard(clip) {
        Clipboard.setString(clip)
    }
    /**
     * 实现数据存储
     * @param {*} key 
     * @param {*} val 
     */
    async setData(key, val) {
        AsyncStorage.setItem("brower_" + key, val)
    }
    /**
     * 实现获取存储的值并返回页面
     * @param {*} key 
     */
    async getData(key) {
        let val = await AsyncStorage.getItem("brower_" + key);
        this.refs.webview.injectJavaScript('SDK.emit&&SDK.emit("data","' + key + '","' + val + '")');
    }

    javascript() {
        return `window.SDK.current="${Platform.OS}";window.SDK.emit("ready");`;
    }
    /**
     * 加载完之后,注入js
     */
    loaded() {
        this.refs.webview.injectJavaScript(this.javascript());
    }
}