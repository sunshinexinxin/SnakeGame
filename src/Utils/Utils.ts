/**
 * 工具类
 */
class Utils {

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    
    public static updateBitmapByName(bit:egret.Bitmap,name:string):egret.Bitmap{
        var texture: egret.Texture = RES.getRes(name);
        bit.texture = texture;
        return bit; 
    }
    
  /**
  * egret.localStorage.全局函数   保存指定数据
  * @param name
  * @param value
  */
    public static saveData(name: string,value: any) {
        egret.localStorage.setItem(name,value);
    }
        
    /**
    * 获取指定数据
    * @param name
    * @returns {number}
    */
    public static getNumberData(name: string): number {
        var result: number;
        var temp: string = egret.localStorage.getItem(name);
        if(temp == null) {
            result = 0;
        } else {
            result = parseInt(temp);
        }
        return result;
    }
    /**
     * 模仿太阳中心旋转
     */
        public static sunturn(obj: egret.DisplayObject,time: number = 5000,anticlockwise: boolean = false) {
            var x = obj.x;
            var y = obj.y;
        
            obj.anchorOffsetX = obj.width / 2;
            obj.anchorOffsetY = obj.height / 2;
        
            obj.x = x + obj.anchorOffsetX;
            obj.y = y + obj.anchorOffsetY;
            if(anticlockwise) {
                egret.Tween.get(obj,{ loop: true }).to({ rotation: -180 },time / 2).to({ rotation: -360 },time / 2);
            } else {
                egret.Tween.get(obj,{ loop: true }).to({ rotation: 180 },time / 2).to({ rotation: 360 },time / 2);
            }
        }
    


    /**
     * 碰撞检测
     */ 
//    public static hit(obj1: egret.DisplayObject,obj2: egret.DisplayObject): boolean {
//        if(obj1 == null || obj2 == null) {
//            return false;
//        }
//        var rect1: egret.Rectangle = obj1.getBounds();
//        var rect2: egret.Rectangle = obj2.getBounds();
//        rect1.x = obj1.x;
//        rect1.y = obj1.y;
//        rect2.x = obj2.x;
//        rect2.y = obj2.y;
//       /**
//        * 确定所指定的矩形对象rect2是否与此矩形rect1 对象是否相交。此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。 
//        *  如果两个矩形相交，返回true，否则返回false       
//        */ 
//        return rect1.intersects(rect2);
//    }

}
