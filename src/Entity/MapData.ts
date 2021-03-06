/**
 *
 * @author 
 *
 */
class MapData extends egret.DisplayObjectContainer {
    private mapData: any[];
    private snake: Snake;
    private egg: Egg;
    private wallArr: any[];
    private _eggArr:any[]=[]

    public constructor(x: number,y: number,gameMapx: number,gameMapy: number,gameMapw: number,gameMaph: number) {
        super();
        this.wallArr = [];
        this._eggArr=[];

        this.x = gameMapx;
        this.y = gameMapy;
        this.width = gameMapw;
        this.height = gameMaph;

        this.mapData = [];

        var firstPointX = gameMapx;//第一个格子在笛卡尔坐标系中的x值
        var firstPointY = gameMapy;//第一个格子在笛卡尔坐标系中的y值
        
        for(var i = 0;i < x;i++) {
            this.mapData[i] = [];
            for(var j = 0;j < y;j++) {
                this.mapData[i][j] = [];
            }
        }

    }
    
    
    public getMapData(): any[] {
        return this.mapData;
    }

    public setEntity(x,y,entity: SnakeEntity) {
        this.mapData[x][y].push(entity);
    }
	
	/**
     * 绘制地图网格
     */
    public drawGrid(): void {
        var xPointNumber = this.width / 20;
        var yPointNumber = this.height / 20;

        var shape = new egret.Shape();
        shape.width = this.width;
        shape.height = this.height;
        /**
        * lineStyle指定一种线条样式以用于随后对 lineTo() 或 drawCircle() 等 Graphics 方法的调用。
        * 以点为单位表示线条的粗细，有效值为 0 到 255。如果未指定数字，或者未定义该参数，则不绘制线条。值 0 表示极细的粗细；最大粗细为 255。
        */
        shape.graphics.lineStyle(1);
        
        /**
        * 绘制地图线，先画竖线，再画横线，在使用绘图函数前，使用lineStyle 方法制定线条的样式，
        * 使用 moveTo 来设定线条的起始点，使用 lineTo 来设定线条的终点
        * moveTo将当前绘图位置移动到 (x, y)。如果缺少任何一个参数，则此方法将失败，并且当前绘图位置不改变。
        * lineTo使用当前线条样式绘制一条从当前绘图位置开始到(x,y) 结束的直线；当前绘图位置随后会设置为(x,y)。
        */
        for(var i = 0;i <= xPointNumber;i++) {
            shape.graphics.moveTo(shape.x + i * 20,shape.y);
            shape.graphics.lineTo(shape.x + i * 20,shape.y + this.height);
            for(var j = 0;j <= yPointNumber;j++) {
                shape.graphics.moveTo(shape.x,shape.y + j * 20);
                shape.graphics.lineTo(shape.x + this.width,shape.y + j * 20);
            }
        }
        shape.graphics.endFill();
        this.addChildAt(shape,0);
    };

    public setSnake(snake: Snake): void {
        this.snake = snake;
        this.addChildAt(snake,this.numChildren - 1);
    }

    public setEgg(egg: Egg) {
        //如果当前位置有道具的话，直接return；
        if(this.egg &&this.egg.x==egg.x && this.egg.y==egg.y)return;
        this.egg = egg;
        this.addChildAt(egg,this.numChildren - 1);
        this._eggArr.push(egg);
    }

    public setWall(wall: eui.Image) {
        this.wallArr.push(wall);
    }
    
    public get eggArr():Egg[]{
        return this._eggArr;
    }
    
    public recycleEgg(egg:Egg)
    {
        egg.parent&&egg.parent.removeChild(egg);
        this._eggArr.splice(this._eggArr.indexOf(egg),1);
    }
}
