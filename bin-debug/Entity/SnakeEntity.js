/**
 *
 * @author
 *
 */
var SnakeEntity = (function (_super) {
    __extends(SnakeEntity, _super);
    function SnakeEntity(name) {
        _super.call(this, name);
    }
    var d = __define,c=SnakeEntity,p=c.prototype;
    /**
     * 得到运动方向
     */
    p.getDirection = function () {
        return _super.prototype.getDirection.call(this);
    };
    p.changeDire = function (dire) {
        return _super.prototype.changeDire.call(this, dire);
    };
    /**
     * 矫正方向
     */
    p.correctDire = function (dire) {
        _super.prototype.correctDire.call(this, dire);
    };
    return SnakeEntity;
}(Snakebase));
egret.registerClass(SnakeEntity,'SnakeEntity');
//# sourceMappingURL=SnakeEntity.js.map