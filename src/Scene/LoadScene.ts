/**
 * 加载场景
 */
class LoadScene extends eui.Component{
    /**加载背景*/
    private loadingbg:eui.Image;
    /**游戏logo*/
    private gamename:eui.Image;
    /**加载进度条背景*/
    private loadingbarbg:eui.Image;
    /**加载进度条背景宽*/
    private loadingbarbgWidth:number;
    
    /**加载进度图片*/
    private loadingbarpic:eui.Image;
    /**mc工厂*/
    private mcDataFactory:egret.MovieClipDataFactory;
    /**mc实例*/
    private mc:egret.MovieClip;
    
    /**加载场景构造函数*/
    public constructor() {
        super(); 
        this.skinName="resource/my_skins/loadingSkin.exml";
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
	
	/**
	 * 添加到舞台事件实现
	 */
    private onAddToStage(): void { 
       this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
       //由于EUI特性所致，在渲染完成之前无法获得实际的属性，必须在下一帧获取。
       egret.callLater(this.addMcAndLoad,this);
    }
    
    /**设置MC，然后load资源*/
    private addMcAndLoad():void{
        var loadingbarbg_y = this.loadingbarbg.y;
        var loadingbarbg_x = this.loadingbarbg.x;

        this.loadingbarbgWidth = this.loadingbarbg.width;
        var data = RES.getRes("snake_json");
        var texture = RES.getRes("snake_png");
        this.mcDataFactory = new egret.MovieClipDataFactory(data,texture);
        this.mc = new egret.MovieClip(this.mcDataFactory.generateMovieClipData("snake"));

        this.mc.y = loadingbarbg_y - this.mc.height*2;
        console.log(this.mc.y);
        this.mc.x = loadingbarbg_x;

//        console.log(this.mc.y);
        this.addChild(this.mc);
        this.mc.play(-1);
        

        LoadManager.getInstance().load("assets",3);
    }
    
    /*
     * 设置进度条
     */
    public setProgress(current,total): void {
        
        this.loadingbarpic.width = current / total * this.loadingbarbgWidth;
        //加载进度*1.12用来平衡snake动画尺寸不标准导致的视觉误差
        this.mc.x = current / total * this.loadingbarbgWidth*1.12;
    }
    
    /**
     * 资源加载完成
     */
    public loadComp(str:string): void {
        Main.instance.init(str);
        this.dispose();
    }
    
    private dispose():void{
        HierarchyManager.instance.UIHierarchy.removeChild(Main.instance.views["loadScene"]);
        Main.instance.views["loadScene"]=null;
    }
}
