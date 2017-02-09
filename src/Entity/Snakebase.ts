/**
 * Create by 奕昕 
 */
abstract class Snakebase extends egret.Sprite implements ISnake {
    private direction: Dire;
    private bitmap: egret.Bitmap;

    public constructor(name: string) {
        super();
        this.direction = Dire.up;
        this.bitmap = Utils.createBitmapByName(name);
        this.addChild(this.bitmap);
    }
    public changeType(name){
        Utils.updateBitmapByName(this.bitmap,name);
    }
    
	/**
	 * 得到运动方向
	 */
    public getDirection(): Dire {
        return this.direction;
    }

    /**
     * 改变方向
     */
    public changeDire(dire: Dire): Dire {
        this.correctDire(dire);
        return this.direction = dire;
    }
	
	/**
	 * 矫正方向
	 */
    public correctDire(dire: Dire): void {
        if(this.direction != dire) {
            this.direction = dire;
            if(dire == Dire.left) {
                this.bitmap.anchorOffsetX = 20;
                this.bitmap.anchorOffsetY = 0;
                this.bitmap.rotation = -90;
            } else if(dire == Dire.up) {
                this.bitmap.anchorOffsetX = 0;
                this.bitmap.anchorOffsetY = 0;
                this.bitmap.rotation = 0;
            } else if(dire == Dire.down) {
                this.bitmap.anchorOffsetX = 20;
                this.bitmap.anchorOffsetY = 20;
                this.bitmap.rotation = 180;
            } else {
                this.bitmap.anchorOffsetX = 0;
                this.bitmap.anchorOffsetY = 20;
                this.bitmap.rotation = 90;
            }
        }
    }
}
