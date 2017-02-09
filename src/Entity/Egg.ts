/**
 * 
 * @author 
 * 鸡蛋
 */
class Egg extends egret.Sprite {
    /**
     * 当前鸡蛋所属类型
     */     
    private type: string;
   
    public static EFF_SPEEDUP:string="eff_speedup"; //加速效果
    public static EFF_SPEEDDOWN:string="eff_speeddown";//减速效果
    public static EFF_REVERSE:string="eff_reverse";//反向效果
   
   
    
    /**
     * 构造函数
     */ 
    public constructor(type:string) {
        super();
       
        this.type=type;
        
        switch(type){
            case "eff_speedup":
                var data: any = RES.getRes("egg_json");
                var texture: egret.Texture = RES.getRes("egg_png");
                var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,texture);
                var mc: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("egg"));
                mc.scaleX = 0.5;
                mc.x=200;
                mc.scaleY = 0.5;
                this.addChild(mc);
                mc.play(-1);
            break;
            case "eff_speeddown":
                var updata: any = RES.getRes("upspeed_json");
                var uptexture: egret.Texture = RES.getRes("upspeed_png");
                var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(updata,uptexture);
                var upmc: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("upspeed"));
                upmc.scaleX = 0.5;
                upmc.scaleY = 0.5;

                this.addChild(upmc);
                upmc.play(-1);    
            break;
            
            case "eff_reverse":
                var downdata: any = RES.getRes("downspeed_json");
                var downtexture: egret.Texture = RES.getRes("downspeed_png");
                var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(downdata,downtexture);
                var downmc: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("downspeed"));
                downmc.scaleX = 0.5;
                downmc.scaleY = 0.5;
                this.addChild(downmc);
                downmc.play(-1);   
            break;
            default:
                var rect: eui.Rect = this.getRect();
                this.addChild(rect);
            break;
            

        }
        this.width = 20;
        this.height = 20;
    } 
    private getRect():eui.Rect
    {
         
        var rect:eui.Rect=new eui.Rect;
        rect.fillColor = parseInt('0x' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6));
        rect.width = 20;
        rect.height = 20;
        return rect;
    }
    public set Type(type:string){
        this.type=type;
    }
    
    public get Type():string{
        return this.type;
    }
}
