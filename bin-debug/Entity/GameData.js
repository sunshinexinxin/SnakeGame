/**
 *
 * @author
 *
 */
var GameData = (function () {
    function GameData() {
        this._totalScore = 0; //总分
        this._level = 1; //当前等级
        this.levelValue = 0; //当前分数下的等级
        this._speed = 0; //当前速度
        this._time = 0; //当前时间
    }
    var d = __define,c=GameData,p=c.prototype;
    d(GameData, "instance"
        /**实例*/
        ,function () {
            if (GameData._instance == null) {
                GameData._instance = new GameData();
            }
            return GameData._instance;
        }
    );
    d(p, "time"
        ,function () {
            return this._time;
        }
        ,function (val) {
            this._time = val;
        }
    );
    p.getSpeed = function () {
        return this._speed;
    };
    p.getTotalScore = function () {
        return this._totalScore;
    };
    p.getLevel = function () {
        return this._level;
    };
    p.refrushScore = function (v) {
        if (v === void 0) { v = GameData.singleScore; }
        /*
         * v==0当作游戏结束处理
         */
        if (v == 0) {
            this._totalScore = 0;
            this._level = 1;
            return this._level;
        }
        this._totalScore += v;
        return this.checkLevel();
    };
    p.checkLevel = function () {
        this.levelValue = parseInt(window['log2'](this._totalScore / GameData.baseScore));
        if (this.levelValue > this._level) {
            this._level++;
        }
        this._speed = GameData.startSpeed / this._level;
        return this._level;
    };
    p.initData = function () {
        this._totalScore = 0;
        this._level = 1;
        this._time = 0;
    };
    GameData.singleScore = 5; //单个道具的分数
    GameData.baseScore = 2; //基数分数，用来计算当前的等级所需要的分数
    GameData.startSpeed = 500; //初始速度
    return GameData;
}());
egret.registerClass(GameData,'GameData');
//# sourceMappingURL=GameData.js.map