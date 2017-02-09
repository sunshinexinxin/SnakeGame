/**
 *
 * @author
 *
 */
var TimeUtils = (function () {
    function TimeUtils() {
    }
    var d = __define,c=TimeUtils,p=c.prototype;
    TimeUtils.getTimeStr = function (time) {
        var str = "";
        var hour = Math.floor(time / 3600);
        var mins = Math.floor((time - 3600 * hour) / 60);
        var snds = time - 3600 * hour - 60 * mins;
        return TimeUtils.fixNumStr(hour, 2) + ":" + TimeUtils.fixNumStr(mins, 2) + ":" + TimeUtils.fixNumStr(snds, 2);
    };
    TimeUtils.fixNumStr = function (num, digit) {
        if (digit <= 0) {
            return num.toString();
        }
        if (num >= Math.pow(10, digit)) {
            return "error";
        }
        var str = "";
        while (digit > 0) {
            var d = Math.floor(num / Math.pow(10, digit - 1));
            str += d.toString();
            num = num - d * Math.pow(10, digit - 1);
            digit--;
        }
        return str;
    };
    return TimeUtils;
}());
egret.registerClass(TimeUtils,'TimeUtils');
//# sourceMappingURL=TimeUtils.js.map