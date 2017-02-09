/**
 * 加载场景
 */
var LoadScene = (function (_super) {
    __extends(LoadScene, _super);
    /**加载场景构造函数*/
    function LoadScene() {
        _super.call(this);
        this.skinName = "resource/my_skins/loadingSkin.exml";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=LoadScene,p=c.prototype;
    /**
     * 添加到舞台事件实现
     */
    p.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //由于EUI特性所致，在渲染完成之前无法获得实际的属性，必须在下一帧获取。
        egret.callLater(this.addMcAndLoad, this);
    };
    /**设置MC，然后load资源*/
    p.addMcAndLoad = function () {
        var loadingbarbg_y = this.loadingbarbg.y;
        var loadingbarbg_x = this.loadingbarbg.x;
        this.loadingbarbgWidth = this.loadingbarbg.width;
        var data = RES.getRes("snake_json");
        var texture = RES.getRes("snake_png");
        this.mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.mc = new egret.MovieClip(this.mcDataFactory.generateMovieClipData("snake"));
        this.mc.y = loadingbarbg_y - this.mc.height * 2;
        console.log(this.mc.y);
        this.mc.x = loadingbarbg_x;
        //        console.log(this.mc.y);
        this.addChild(this.mc);
        this.mc.play(-1);
        LoadManager.getInstance().load("assets", 3);
    };
    /*
     * 设置进度条
     */
    p.setProgress = function (current, total) {
        this.loadingbarpic.width = current / total * this.loadingbarbgWidth;
        //加载进度*1.12用来平衡snake动画尺寸不标准导致的视觉误差
        this.mc.x = current / total * this.loadingbarbgWidth * 1.12;
    };
    /**
     * 资源加载完成
     */
    p.loadComp = function (str) {
        Main.instance.init(str);
        this.dispose();
    };
    p.dispose = function () {
        HierarchyManager.instance.UIHierarchy.removeChild(Main.instance.views["loadScene"]);
        Main.instance.views["loadScene"] = null;
    };
    return LoadScene;
}(eui.Component));
egret.registerClass(LoadScene,'LoadScene');
//# sourceMappingURL=LoadScene.js.map