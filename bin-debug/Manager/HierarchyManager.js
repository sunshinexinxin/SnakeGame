/**
 * 游戏层级管理
 */
var HierarchyManager = (function (_super) {
    __extends(HierarchyManager, _super);
    //构造方法
    function HierarchyManager() {
        _super.call(this);
        this.stageW = 800;
        this.stageH = 480;
        /**当前场景的资源堆栈*/
        this.resAny = [];
        // 面板层 如 游戏开始结束界面之类的
        this.UIHierarchy = new egret.DisplayObjectContainer();
        // 弹窗层 如 设置之类的
        this.TOPHierarchy = new egret.DisplayObjectContainer();
        // 特效层 如 飘字之类的
        this.EFFECTHierarchy = new egret.DisplayObjectContainer();
    }
    var d = __define,c=HierarchyManager,p=c.prototype;
    /**实例*/
    HierarchyManager.getInstance = function () {
        if (HierarchyManager.instance == null) {
            HierarchyManager.instance = new HierarchyManager();
        }
        return HierarchyManager.instance;
    };
    //初始化场景类
    p.init = function () {
        Main.instance.addChild(this.UIHierarchy);
        Main.instance.addChild(this.TOPHierarchy);
        Main.instance.addChild(this.EFFECTHierarchy);
    };
    /**删除当前场景所有资源*/
    p.delresAny = function () {
        //console.log(this.resAny);
        for (var i = 0; i < this.resAny.length; i++) {
            HierarchyManager.instance.UIHierarchy.removeChild(this.resAny[i]);
            this.resAny[i] = null;
        }
    };
    return HierarchyManager;
}(egret.DisplayObjectContainer));
egret.registerClass(HierarchyManager,'HierarchyManager');
//# sourceMappingURL=HierarchyManager.js.map