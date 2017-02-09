/**
 * Create by 奕昕
 */
var Snakebase = (function (_super) {
    __extends(Snakebase, _super);
    function Snakebase(name) {
        _super.call(this);
        this.direction = Dire.up;
        this.bitmap = Utils.createBitmapByName(name);
        this.addChild(this.bitmap);
    }
    var d = __define,c=Snakebase,p=c.prototype;
    p.changeType = function (name) {
        Utils.updateBitmapByName(this.bitmap, name);
    };
    /**
     * 得到运动方向
     */
    p.getDirection = function () {
        return this.direction;
    };
    /**
     * 改变方向
     */
    p.changeDire = function (dire) {
        this.correctDire(dire);
        return this.direction = dire;
    };
    /**
     * 矫正方向
     */
    p.correctDire = function (dire) {
        if (this.direction != dire) {
            this.direction = dire;
            if (dire == Dire.left) {
                this.bitmap.anchorOffsetX = 20;
                this.bitmap.anchorOffsetY = 0;
                this.bitmap.rotation = -90;
            }
            else if (dire == Dire.up) {
                this.bitmap.anchorOffsetX = 0;
                this.bitmap.anchorOffsetY = 0;
                this.bitmap.rotation = 0;
            }
            else if (dire == Dire.down) {
                this.bitmap.anchorOffsetX = 20;
                this.bitmap.anchorOffsetY = 20;
                this.bitmap.rotation = 180;
            }
            else {
                this.bitmap.anchorOffsetX = 0;
                this.bitmap.anchorOffsetY = 20;
                this.bitmap.rotation = 90;
            }
        }
    };
    return Snakebase;
}(egret.Sprite));
egret.registerClass(Snakebase,'Snakebase',["ISnake"]);
//# sourceMappingURL=Snakebase.js.map