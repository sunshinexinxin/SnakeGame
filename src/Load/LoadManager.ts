/**
 * Create by 奕昕 2016/04/08
 * 资源加载管理
 */
class LoadManager extends egret.EventDispatcher{
    public static instance: LoadManager;
     private _configs:Array<any>;
    /** 一个自定义加载侦听事件*/
    private loadevent: LoadEvent;
    
    private isInit:boolean=true;
    
    public constructor() {
        super();
        this._configs = new Array<any>();
    }
    
    /**
     * 添加一个配置文件
     * @param jsonPath resource.json路径
     * @param filePath 访问资源路径
     */
    public addConfig(jsonPath:string, filePath:string):void {
        this._configs.push([jsonPath, filePath]);
    }
    
    /**
     * 开始加载配置文件
     * @param $onConfigComplete 加载完成执行函数
     * @param $onConfigCompleteTarget 加载完成执行函数所属对象
     */
    public loadConfig():void {
        this.loadNextConfig();
    }
    
     /**
     * 加载
     */
    private loadNextConfig():void {
        //加载完成
        if (this._configs.length == 0) {
            if(this.isInit){
                /**
                 * 分别通过注册接口来实现
                 * eui.IAssetAdapter素材适配器接口。若项目需要自定义 Image.source的解析规则，需要实现这个接口，
                 * eui.IThemeAdapter主题适配器接口。若项目需要自定义主题需要实现这个接口
                 */ 
                Main.instance.stage.registerImplementation("eui.IAssetAdapter",new AssetAdapter());
                Main.instance.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
                this.isInit=false;
                this.onConfigComplete();
            }
            return;
        }

        var arr:any = this._configs.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        RES.loadConfig(arr[0], arr[1]);
    }
    
    /**
     * 加载完成
     * @param event
     */
    private onConfigCompleteHandle(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.loadNextConfig();
    }
    
    /*
	 * 获取对象实例
	 */
    public static getInstance(): LoadManager {
        if(LoadManager.instance == null) {
            var loader: LoadManager = new LoadManager();
            LoadManager.instance = loader;
        }
        return LoadManager.instance;
    }
   
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json",Main.instance.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE,this.onThemeLoadComplete,this);
        //GROUP_COMPLETE延迟加载组资源加载完成事件。注意：若组内有资源项加载失败，将不会抛出此事件，若要处理组加载失败，需要同时监听 GROUP_LOAD_ERROR 事件。 
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        //GROUP_LOAD_ERROR延迟加载组资源加载失败事件。
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        //GROUP_PROGRESS 延迟加载组资源加载进度事件。 
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("preload");
        RES.loadGroup("loading",1);
    }
    
    /**
    * preload资源组加载进度
    */
    private onResourceProgress(event: RES.ResourceEvent): void {
        //创建一个自定义的侦听加载事件的对象
        this.loadevent = new LoadEvent(LoadEvent.GROUP_PROGRESS);
        //设置加载的资源组名
        this.loadevent.groupName = event.groupName;
        //已经加载的文件总数emsLoaded
        this.loadevent.itemsLoaded = event.itemsLoaded;
        //itemsTotal需要加载的文件总数
        this.loadevent.itemsTotal = event.itemsTotal;
        //dispatchEvent派发事件，即进行广播
        this.dispatchEvent(this.loadevent);
        this.loadevent = null;
    }
    
    public isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.loadevent = new LoadEvent(eui.UIEvent.COMPLETE);
        this.dispatchEvent(this.loadevent);
        this.loadevent = null;
    }
    public isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        
         
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        this.loadevent = new LoadEvent(LoadEvent.GROUP_COMPLETE);
        
        //console.log("ssssssssssssssssssssssssssssssssssssssssss:" ,event.groupName);
        this.loadevent.groupName = event.groupName;
        this.dispatchEvent(this.loadevent);
        this.loadevent = null;
        
    }
    
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    
    /**
    * 加载资源组。
    */
    public load(groupName: string,priority:number=0): void {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup(groupName,priority);
    }
}
