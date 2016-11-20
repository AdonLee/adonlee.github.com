var page = require('webpage').create();
var sys = require('system');
var $ = require('jquery');
var url = sys.args[1];
var docLoaded = false;
var reqQue = []; // 某些请求会重复触发resourcereceive,所以不能直接加减计数
/*global phantom*/
$.extend(page, {
    settings: {
        javascriptEnabled: true,
        loadImages: true
    },
    // 指定视窗大小
    viewportSize: {
        width: 375,
        height: 2000
        // height: 667
    },
    scrollPosition: {
        top: 0,
        left: 0
    },
    // 指定截取范围
    // clipRect:  {
    //     top: 100,
    //     left: 0,
    //     width: 375,
    //     height: 200
    // },
    onConsoleMessage: function(msg) {
        console.log('receive message from console', msg);
    },
    onResourceRequested: function(body) {
        if (body.url.indexOf('data:image') == 0) return;

        reqQue.push(body.url);
        // if (body.url.indexOf('image.huigoumai') > -1) console.log('【Image Loading] : ', body.url);
        // if (body.contentType.indexOf('json') > -1) console.log('Request', JSON.stringify(body, null, 4));
    },
    onResourceReceived: function(body) {
        if (body.url.indexOf('data:image') == 0) return;
        var index = reqQue.indexOf(body.url);
        if (index < 0) return;
        reqQue.splice(index, 1);
        // if (body.url.indexOf('image.huigoumai') > -1) console.log('【Image Loaded] : ', body.url);
        // if (body.contentType.indexOf('json') > -1) console.log('Receive', JSON.stringify(body, null, 4));
        tryExit();
    }
});

function tryExit() {
    if (reqQue.length) return;

    // 延迟结束，防止计数错误
    setTimeout(function() {
        if (reqQue.length) return;

        console.time('render');
        console.log('rendering example.png');
        page.render('example.png');
        console.timeEnd('render');
        console.timeEnd('start');
        phantom.exit();
    }, 200);

    // 滚动到页面底部，触发懒加载
    // page.evaluate(function() {
    //     $('body').scrollTop(9999999);
    // });
}

if (!url) {
    while(true) {
        console.log('[url required] please enter your url or type "q" to quit');
        var cmd = sys.stdin.readLine().trim();
        if (!cmd) continue;
        if (cmd == 'q') {
            phantom.exit();
            break;
        }
    }

}


console.log('opening', url, status);
console.time('start');
page.open(url, function (status) {
    docLoaded = true;
    var height = page.evaluate(function() {
        $('.js-report-wrapper').children().remove().first().appendTo($('.js-report-wrapper'))
        $('.navTabConList').children().remove().first().appendTo($('.navTabConList'))
        $('.evMoreEventList').children().remove().first().appendTo($('.evMoreEventList'))
        document.body.scrollTop = 10000000
        return window.screen.availHeight;
    })
    console.log(height);
    console.log('open', url, status);
});


// _appendScriptElement(QString)
// _getFilePickerCallback()
// _getGenericCallback()
// _getJsConfirmCallback()
// _getJsInterruptCallback()
// _getJsPromptCallback()
// _uploadFile(QString,QStringList)
// addCookie(QVariantMap)
// canGoBack
// canGoBack()
// canGoForward
// canGoForward()
// childFramesCount()
// childFramesName()
// clearCookies()
// clearMemoryCache()
// clipRect
// close()
// closing(QObject*)
// content
// cookieJar
// cookieJar()
// cookies
// cookies()
// currentFrameName()
// customHeaders
// deleteCookie(QString)
// deleteLater()
// destroyed()
// destroyed(QObject*)
// evaluateJavaScript(QString)
// focusedFrameName
// frameContent
// frameName
// framePlainText
// framesCount
// framesName
// frameTitle
// frameUrl
// getPage(QString)
// go(int)
// goBack()
// goForward()
// initialized()
// injectJs(QString)
// javaScriptAlertSent(QString)
// javaScriptConsoleMessageSent(QString)
// javaScriptErrorSent(QString,int,QString,QString)
// libraryPath
// loadFinished(QString)
// loading
// loadingProgress
// loadStarted()
// navigationLocked
// navigationRequested(QString,QString,bool,bool)
// objectName
// objectNameChanged(QString)
// offlineStoragePath
// offlineStorageQuota
// openUrl(QString,QVariant,QVariantMap)
// ownsPages
// pages
// pagesWindowName
// paperSize
// plainText
// rawPageCreated(QObject*)
// release()
// reload()
// render(QString)
// render(QString,QVariantMap)
// renderBase64()
// renderBase64(QByteArray)
// repaintRequested(int,int,int,int)
// resourceError(QVariant)
// resourceReceived(QVariant)
// resourceRequested(QVariant,QObject*)
// resourceTimeout(QVariant)
// scrollPosition
// sendEvent(QString)
// sendEvent(QString,QVariant)
// sendEvent(QString,QVariant,QVariant)
// sendEvent(QString,QVariant,QVariant,QString)
// sendEvent(QString,QVariant,QVariant,QString,QVariant)
// setContent(QString,QString)
// setCookieJar(CookieJar*)
// setCookieJarFromQObject(QObject*)
// setCookies(QVariantList)
// setProxy(QString)
// stop()
// stopJavaScript()
// switchToChildFrame(int)
// switchToChildFrame(QString)
// switchToFocusedFrame()
// switchToFrame(int)
// switchToFrame(QString)
// switchToMainFrame()
// switchToParentFrame()
// title
// url
// urlChanged(QString)
// viewportSize
// windowName
// zoomFactor
