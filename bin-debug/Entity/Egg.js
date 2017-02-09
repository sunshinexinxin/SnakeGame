/**
 *
 * @author
 * 鸡蛋
 */
var Egg = (function (_super) {
    __extends(Egg, _super);
    /**
     * 构造函数
     */
    function Egg(type) {
        _super.call(this);
        this.type = type;
        switch (type) {
            case "eff_speedup":
                var data = RES.getRes("egg_json");
                var texture = RES.getRes("egg_png");
                var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
                var mc = new egret.MovieClip(mcDataFactory.generateMovieClipData("egg"));
                mc.scaleX = 0.5;
                mc.x = 200;
                mc.scaleY = 0.5;
                this.addChild(mc);
                mc.play(-1);
                break;
            case "eff_speeddown":
                var updata = RES.getRes("upspeed_json");
                var uptexture = RES.getRes("upspeed_png");
                var mcDataFactory = new egret.MovieClipDataFactory(updata, uptexture);
                var upmc = new egret.MovieClip(mcDataFactory.generateMovieClipData("upspeed"));
                upmc.scaleX = 0.5;
                upmc.scaleY = 0.5;
                this.addChild(upmc);
                upmc.play(-1);
                break;
            case "eff_reverse":
                var downdata = RES.getRes("downspeed_json");
                var downtexture = RES.getRes("downspeed_png");
                var mcDataFactory = new egret.MovieClipDataFactory(downdata, downtexture);
                var downmc = new egret.MovieClip(mcDataFactory.generateMovieClipData("downspeed"));
                downmc.scaleX = 0.5;
                downmc.scaleY = 0.5;
                this.addChild(downmc);
                downmc.play(-1);
                break;
            default:
                var rect = this.getRect();
                this.addChild(rect);
                break;
        }
        this.width = 20;
        this.height = 20;
    }
    var d = __define,c=Egg,p=c.prototype;
    p.getRect = function () {
        var rect = new eui.Rect;
        rect.fillColor = parseInt('0x' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6));
        rect.width = 20;
        rect.height = 20;
        return rect;
    };
    d(p, "Type"
        ,function () {
            return this.type;
        }
        ,function (type) {
            this.type = type;
        }
    );
    Egg.EFF_SPEEDUP = "eff_speedup"; //加速效果
    Egg.EFF_SPEEDDOWN = "eff_speeddown"; //减速效果
    Egg.EFF_REVERSE = "eff_reverse"; //反向效果
    return Egg;
}(egret.Sprite));
egret.registerClass(Egg,'Egg');
//# sourceMappingURL=Egg.js.map