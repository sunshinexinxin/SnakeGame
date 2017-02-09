/**
 *
 * 时间管理器
 *
 */
var TimeManager = (function () {
    function TimeManager() {
    }
    var d = __define,c=TimeManager,p=c.prototype;
    TimeManager.getInstance = function () {
        if (TimeManager.instance == null) {
            TimeManager.instance = new TimeManager();
        }
        return TimeManager.instance;
    };
    p.doGameTick = function () {
        if (this._curResult) {
            this._curResult.time++;
        }
    };
    d(p, "curResult"
        ,function () {
            return this._curResult;
        }
    );
    d(p, "curGameTime"
        ,function () {
            if (!this._curResult) {
                this._curResult = GameData.instance;
                return 0;
            }
            return this._curResult.time;
        }
    );
    return TimeManager;
}());
egret.registerClass(TimeManager,'TimeManager');
//# sourceMappingURL=TimeManager.js.map