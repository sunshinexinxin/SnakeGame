/**
 * 游戏层级管理
 */
class HierarchyManager extends egret.DisplayObjectContainer {
    /**背景*/
    protected bg: egret.Bitmap;
    public  stageW: number=800;
    public  stageH: number=480;
    
    /**当前场景的资源堆栈*/
    protected resAny:any[]=[];

    // 面板层 如 游戏开始结束界面之类的
    public UIHierarchy: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    // 弹窗层 如 设置之类的
    public TOPHierarchy: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    // 特效层 如 飘字之类的
    public EFFECTHierarchy: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();



    /**实例*/
    public static instance: HierarchyManager; 
    
    /**实例*/
    public static getInstance(): HierarchyManager { 
        if(HierarchyManager.instance == null) { 
            HierarchyManager.instance = new HierarchyManager();
        }
        return HierarchyManager.instance;
    }
    
    
    //构造方法
    public constructor() {
        super();
    }
    
    //初始化场景类
    public init(): void {
        Main.instance.addChild(this.UIHierarchy);
        Main.instance.addChild(this.TOPHierarchy);
        Main.instance.addChild(this.EFFECTHierarchy);
     

    }
    
    /**删除当前场景所有资源*/
    protected delresAny(): void { 
        //console.log(this.resAny);
        for(var i = 0;i < this.resAny.length;i++) { 
            HierarchyManager.instance.UIHierarchy.removeChild(this.resAny[i]);
            this.resAny[i] = null;
        }
    }
}

