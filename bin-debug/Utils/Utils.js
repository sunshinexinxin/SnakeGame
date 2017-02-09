/**
 * 工具类
 */
var Utils = (function () {
    function Utils() {
    }
    var d = __define,c=Utils,p=c.prototype;
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Utils.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Utils.updateBitmapByName = function (bit, name) {
        var texture = RES.getRes(name);
        bit.texture = texture;
        return bit;
    };
    /**
    * egret.localStorage.全局函数   保存指定数据
    * @param name
    * @param value
    */
    Utils.saveData = function (name, value) {
        egret.localStorage.setItem(name, value);
    };
    /**
    * 获取指定数据
    * @param name
    * @returns {number}
    */
    Utils.getNumberData = function (name) {
        var result;
        var temp = egret.localStorage.getItem(name);
        if (temp == null) {
            result = 0;
        }
        else {
            result = parseInt(temp);
        }
        return result;
    };
    /**
     * 模仿太阳中心旋转
     */
    Utils.sunturn = function (obj, time, anticlockwise) {
        if (time === void 0) { time = 5000; }
        if (anticlockwise === void 0) { anticlockwise = false; }
        var x = obj.x;
        var y = obj.y;
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
        obj.x = x + obj.anchorOffsetX;
        obj.y = y + obj.anchorOffsetY;
        if (anticlockwise) {
            egret.Tween.get(obj, { loop: true }).to({ rotation: -180 }, time / 2).to({ rotation: -360 }, time / 2);
        }
        else {
            egret.Tween.get(obj, { loop: true }).to({ rotation: 180 }, time / 2).to({ rotation: 360 }, time / 2);
        }
    };
    return Utils;
}());
egret.registerClass(Utils,'Utils');
//# sourceMappingURL=Utils.js.map