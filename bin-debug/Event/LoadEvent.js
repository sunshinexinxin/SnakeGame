/**
 * Create by 奕昕 2016/04/08
 * 资源加载事件
 */
var LoadEvent = (function (_super) {
    __extends(LoadEvent, _super);
    /**
     * type	返回当前 Event 对象表示的事件的名称。
     * bubbles返回布尔值，指示事件是否是起泡事件类型。
     * cancelable返回布尔值，指示事件是否可拥可取消的默认动作。
     * 表示是否可以阻止与事件相关联的行为。如果可以取消该行为，则此值为 true；否则为 false。
     */
    function LoadEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=LoadEvent,p=c.prototype;
    return LoadEvent;
}(RES.ResourceEvent));
egret.registerClass(LoadEvent,'LoadEvent');
//# sourceMappingURL=LoadEvent.js.map