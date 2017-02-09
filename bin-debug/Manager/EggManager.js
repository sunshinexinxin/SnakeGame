/**
 *
 * @author
 * 管理鸡蛋的产生和销毁
 */
var EggManager = (function () {
    function EggManager() {
        this._events = {};
        this.addEventListener("create", this.create, this);
        this.addEventListener("dispose", this.dispose, this);
    }
    var d = __define,c=EggManager,p=c.prototype;
    EggManager.getInstance = function () {
        if (EggManager.instance == null) {
            EggManager.instance = new EggManager();
        }
        return EggManager.instance;
    };
    p.create = function () {
        this.dispatchEvent("gotoScene", new Egg("egg"));
    };
    p.dispose = function (params) {
        if (params.length <= 0) {
            console.info("没有需要消毁的鸡蛋");
            return;
        }
        params[0] = null;
    };
    p.addEventListener = function (eventName, callback, thisObj) {
        if (this._events[eventName] != null) {
            console.info("不允许对同一个事件监听两遍,error event name:", eventName);
            return;
        }
        this._events[eventName] = { "callback": callback, "thisObj": thisObj };
    };
    p.dispatchEvent = function (eventName, eventData) {
        if (this._events[eventName] == null) {
            console.info("不允许对一个空事件进行派发,error event name:", eventName);
            return;
        }
        var event = this._events[eventName];
        eventData ? event["callback"].apply(event["thisObj"], [eventData]) : event["callback"].call(event["thisObj"]);
    };
    p.disposeAllEvents = function () {
        for (var key in this._events) {
            if (key != "create") {
                delete this._events[key];
            }
        }
    };
    return EggManager;
}());
egret.registerClass(EggManager,'EggManager');
//# sourceMappingURL=EggManager.js.map