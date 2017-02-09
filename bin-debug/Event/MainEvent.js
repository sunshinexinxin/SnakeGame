/**
 *
 * 主类事件
 * @author
 *
 */
var MainEvent = (function (_super) {
    __extends(MainEvent, _super);
    /**
    * type事件的类型，可以作为 Event.type 访问。
    * bubbles返回布尔值，确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
    * cancelable返回布尔值，确定是否可以取消 Event 对象。默认值为 false。
    */
    function MainEvent(type, resName, bubbles, cancelable) {
        if (resName === void 0) { resName = ""; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this._resName = "";
        this._resName = resName;
    }
    var d = __define,c=MainEvent,p=c.prototype;
    d(p, "resName"
        ,function () {
            return this._resName;
        }
    );
    MainEvent.OPENLOADBAR = "loadbar";
    MainEvent.REMOVE = "remove";
    MainEvent.LOADCOMP = "loadcomp";
    return MainEvent;
}(egret.Event));
egret.registerClass(MainEvent,'MainEvent');
//# sourceMappingURL=MainEvent.js.map