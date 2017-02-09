/**
 *  Create by 奕昕 2016/04/08
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        /**场景堆栈 */
        this.views = [];
        /**资源组 */
        this.resGroup = [];
        Main.instance = this;
        //初始化游戏层级管理器
        HierarchyManager.getInstance();
        HierarchyManager.instance.init();
        //初始化面板管理器
        this.panelManager = PanelManager.getInstance();
        //初始化声音管理器
        SoundManager.getInstance();
        Main.instance.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        ////RES加载类
        LoadManager.getInstance();
        LoadManager.instance.addEventListener(LoadEvent.GROUP_COMPLETE, this.loadComp, Main.instance);
        LoadManager.instance.addEventListener(eui.UIEvent.COMPLETE, this.loadEuiComp, Main.instance);
        LoadManager.instance.addEventListener(LoadEvent.GROUP_PROGRESS, this.loadprogress, Main.instance);
        //将需要解析的资源文件添加到待加载项
        LoadManager.getInstance().addConfig("resource/default.res.json", "resource/");
        LoadManager.getInstance().addConfig("resource/myResource.json", "resource/");
        LoadManager.getInstance().loadConfig();
        //移除上一场景
        this.addEventListener(MainEvent.REMOVE, this.removeLast, this);
        //侦听加载界面调用事件
        this.addEventListener(MainEvent.OPENLOADBAR, this.createLoadBar, this);
        //侦听加载完成加载场景事件
        this.addEventListener(MainEvent.LOADCOMP, this.addSence, this);
    };
    /*
     * 分组资源加载进度
     */
    p.loadprogress = function (e) {
        var str = e.groupName;
        switch (str) {
            case "preload":
                //TODO ：preload assets,no action
                break;
            case "assets":
                this.loadScene.setProgress(e.itemsLoaded, e.itemsTotal);
                break;
            default:
                //            console.log("请问，你在加载什么？");
                break;
        }
    };
    /*
     * EUI资源加载完成
     */
    p.loadEuiComp = function () {
        LoadManager.instance.isThemeLoadEnd = true;
        this.createScene();
    };
    /*
     * 分组资源加载完成
     */
    p.loadComp = function (e) {
        var str = e.groupName;
        switch (str) {
            case "preload":
                // TODO ：no action
                break;
            case "loading":
                this.loadingView = null;
                LoadManager.instance.isResourceLoadEnd = true;
                this.createScene();
                break;
            case "assets":
                this.loadScene.loadComp("StartScene");
                break;
            default:
                console.log("呵呵哒！根本没有这个资源呀！");
                break;
        }
    };
    /*
     * 加载进度条 传递加载资源组名
     */
    p.createLoadBar = function (e) {
        this.resName = e.resName;
        this.loadBar = new LoadBar();
        this.addChild(this.loadBar);
    };
    /*
    * 移除上一场景
    */
    p.removeLast = function (e) {
        //加载新资源组
        LoadManager.instance.load(this.resName);
        //移除上一场景
        //shift删除并返回数组的第一个元素
        var view = this.views.shift();
        view.destroy();
    };
    /*
     * 根据分组资源创建相应关卡
     */
    p.addSence = function (e) {
        //反射
        var objClass = egret.getDefinitionByName(this.resGroup[e.resName]);
        var obj = new objClass();
        HierarchyManager.instance.UIHierarchy.addChild(obj);
        this.views.push(obj);
    };
    /**
     * 创建场景界面
     */
    p.createScene = function () {
        if (LoadManager.instance.isThemeLoadEnd && LoadManager.instance.isResourceLoadEnd) {
            this.loadScene = new LoadScene();
            this.loadScene.name = "loadScene";
            Main.instance.views["loadScene"] = this.loadScene;
            HierarchyManager.instance.UIHierarchy.addChild(this.loadScene);
        }
    };
    /*
     * 移除加载页面
     */
    p.init = function (panel) {
        var obj;
        try {
            var objClass = egret.getDefinitionByName(panel);
            obj = new objClass();
        }
        catch (e) {
            alert(e);
        }
        //        obj.name = panel;
        HierarchyManager.instance.UIHierarchy.addChild(obj);
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map