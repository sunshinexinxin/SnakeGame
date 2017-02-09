/**
 * Create by 奕昕 2016/04/10 
 * 
 *  判断吃道具，判断撞墙，不能用碰撞检测，
 *  不符合游戏逻辑，应该根据蛇头是否经过道具的位置，以及蛇身的位置
 * 
 */
class GameScene extends eui.Component {

    /**
     * map 数据结构
     */
    private mapData: MapData;
    /**
     *  贪吃蛇
     */
    private snake: Snake;
    /**
     * 地图宽
     */
    private mapWidth: number;
    /**
     * 地图映射的image
     */
    private gameMap: eui.Image;
    /**
     * 地图高
     */
    private mapHeight: number;
    /**
     * 笛卡尔坐标系中x方向的所有点
     */
    private xPointNumber: number;
    /**
     * 笛卡尔坐标系中y方向的所有点
     */
    private yPointNumber: number;
    /**
     * 和image一样大小的一样位置的容器。
     */
    private mapContainer: egret.DisplayObjectContainer;
    /**
     * 地图数据
     */
    private map: any[];
    /**
     * 贪吃蛇移动控制器间隔
     */
    private delay: number;
    /**
     * 贪吃蛇移动控制器
     */
    private timer: egret.Timer;
    /**
     * 向上移动
     */
    private upbtn: eui.ToggleButton;
    /**
     * 向下移动
     */
    private downbtn: eui.ToggleButton;
    /**
     * 向左移动
     */
    private leftbtn: eui.ToggleButton;
    /**
     * 向右移动
     */
    private rightbtn: eui.ToggleButton;
    /**
     * 分数
     */
    public score: eui.BitmapLabel;
    
    
    /**
     * 障碍墙
     */
    private wall1: eui.Image;

    private wall2: eui.Image;

    private wall3: eui.Image;

    private wall4: eui.Image;
    
    /**
     * 当前关卡值
     */ 
    private speedInfo:eui.Label;  

    /**
     * 提示信息
     */
    private tipsInfo:eui.Label;
    
    /**
     * 时间信息
     */ 
    public timesInfo: eui.Label;
    
    public _timer: egret.Timer;

    

    
    /**
     * 是否是反向效果
     */ 
    private isReverse:boolean=false;
    
    private isEff:boolean=false;
    
    /**
     * 构造函数
     */
    public constructor() {
        super();
        this.skinName = "resource/my_skins/gameUiSkin.exml";
        this.snake = new Snake();
        this.upbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeDirection,this);
        this.downbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeDirection,this);
        this.leftbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeDirection,this);
        this.rightbtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeDirection,this);

        
        this._timer = new egret.Timer(1000);
        this._timer.addEventListener(egret.TimerEvent.TIMER,this._onTimer,this);
        this._timer.start();
        
        egret.callLater(this.addToStage,this);
        document.addEventListener("keydown",this.keyDown.bind(this));
        
    }

    
    private _onTimer(e: egret.TimerEvent): void {
        TimeManager.getInstance().doGameTick();
        this._updateTime();
    }
    
    private _updateTime(): void {
        if(!this.timesInfo) {
            return;
        }
        this.timesInfo.text = TimeUtils.getTimeStr(TimeManager.getInstance().curGameTime);
    }
    
    public keyDown(evt) {
        var event: egret.TouchEvent = new egret.TouchEvent("touchTap");

        switch(evt.keyCode) {
            case 37://左
                event.$target = this.leftbtn;
                this.leftbtn.dispatchEvent(event);

                break;
            case 39://右
                event.$target = this.rightbtn;
                this.rightbtn.dispatchEvent(event);
                break;
            case 38://上
                event.$target = this.upbtn;
                this.upbtn.dispatchEvent(event);
                break;
            case 40://下
                event.$target = this.downbtn;
                this.downbtn.dispatchEvent(event);
                break;
        }
    }   
	
	/**
	 * 改变方向
	 */
    public changeDirection(evt: egret.TouchEvent): void {
        var btn: eui.ToggleButton = <eui.ToggleButton>evt.target;

        egret.callLater(function() {
            btn.selected = false;
        },this);
        //如果有人违背自然原则去按键，则直接挡掉
        if(this.snake.SnakeHead.getDirection() == Dire.up && evt.target == this.downbtn
            || this.snake.SnakeHead.getDirection() == Dire.down && evt.target == this.upbtn
            || this.snake.SnakeHead.getDirection() == Dire.left && evt.target == this.rightbtn
            || this.snake.SnakeHead.getDirection() == Dire.right && evt.target == this.leftbtn
        ) {
            return;
        }


        switch(evt.target) {
            case this.upbtn:
                this.snake.changeDire(this.isReverse?Dire.down:Dire.up,this.snake.SnakeHead);
                SoundManager.playBtnTouch();
                break;
            case this.downbtn:
                this.snake.changeDire(this.isReverse ?Dire.up:Dire.down,this.snake.SnakeHead);
                SoundManager.playBtnTouch();
                break;
            case this.leftbtn:
                this.snake.changeDire(this.isReverse ?Dire.right:Dire.left,this.snake.SnakeHead);
                SoundManager.playBtnTouch();
                break;
            case this.rightbtn:
                this.snake.changeDire(this.isReverse?Dire.left:Dire.right,this.snake.SnakeHead);
                SoundManager.playBtnTouch();
                break;
            default: console.log("你按下了啥键！"); break;
        }
    }

    public addToStage(): void {
        this.mapWidth = this.gameMap.width;
        this.mapHeight = this.gameMap.height;
        this.xPointNumber = this.mapWidth / 20;
        this.yPointNumber = this.mapHeight / 20;

        this.mapData = new MapData(this.xPointNumber,this.yPointNumber,this.gameMap.x,this.gameMap.y,this.gameMap.width,this.gameMap.height);
        this.addChild(this.mapData);
        this.mapData.setSnake(this.snake);

        this.mapData.setWall(this.wall1);
        this.mapData.setWall(this.wall2);
        this.mapData.setWall(this.wall3);
        this.mapData.setWall(this.wall4);

        var firstPointx = 13;
        var firstPointy = 17;

        var entity: SnakeEntity = this.snake.initSnake(firstPointx,firstPointy,"head_png");
        this.mapData.setEntity(firstPointx,firstPointy,entity);

        var entity: SnakeEntity = this.snake.initSnake(firstPointx,firstPointy + 1,"body_png");
        this.mapData.setEntity(firstPointx,firstPointy + 1,entity);

        var entity: SnakeEntity = this.snake.initSnake(firstPointx,firstPointy + 2,"body_png");
        this.mapData.setEntity(firstPointx,firstPointy + 2,entity);

        var entity: SnakeEntity = this.snake.initSnake(firstPointx,firstPointy + 3,"tail_png");
        this.mapData.setEntity(firstPointx,firstPointy + 3,entity);
        
        GameConfig.curPanel = this;
        GameData.instance.initData();
        //是否绘制网格
        if(true) {
            this.mapData.drawGrid();
        }
        //启动，让蛇自由跑动 
        //使用timer就很好。可以修改timer的delay来达到修改速度的目的
        this.delay = 600;
        this.timer = new egret.Timer(this.delay);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.snakeRun,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
        this.timer.start();
        
        EggManager.getInstance().addEventListener("gotoScene",this.gotoScene,this);
        EggManager.getInstance().dispatchEvent("create");


    };
    
    
    

    
    /**
     * 将食物添加到舞台
     * 鸡蛋位置就不放在格子中间了。如果要放在中间。可能需要修改锚点。
     */ 
    private gotoScene(params: any): void {
//        params.x = Math.floor(Math.random() * this.xPointNumber) * 20 + 10;
//        params.y = Math.floor(Math.random() * this.yPointNumber) * 20 + 10;
        //round把数四舍五入为最接近的整数。
        params.x = Math.round(Math.random() * (this.xPointNumber - 2 - 2) + 2) * 20;
        params.y = Math.round(Math.random() * (this.yPointNumber - 2 - 2) + 2) * 20;
       
        this.mapData.setEgg(params);
    }
    
    
    /**
     * 由于timer是有总次数的，当达到总次数的时候需要重置timer
     */
    private timerComFunc(evt: egret.TimerEvent): void {
        console.log("ss");

        this.timer.reset();
        this.timer.start();
    };
    
    /**
     * 贪吃蛇移动
     */
    public snakeRun(evt: egret.TimerEvent): boolean {
      
        if(this.isEff)
        {
            TipsUtils.shakeScreen(2);
        }
        this.snake.run();
        this.eatEgg();
        this.checkIsOver();

        return true;
    };
    
    
    /**
     * 清除所有的数据
     */
    private _clear() {
        this.timer.stop();
        this.timer.reset();
        GameData.instance.initData();
        this.isReverse=false;
        this.isEff=false;
    }
    
    
    /**
     * 吃到食物
     */
    public eatEgg() {
        for(var i = 0;i < this.mapData.eggArr.length;i++) {

            var egg: Egg = this.mapData.eggArr[i];

            //这里就不能用碰撞检测，逻辑错误，应该使用坐标判断蛇头是否有经过该位置
            if(this.snake.SnakeHead.x == egg.x && this.snake.SnakeHead.y == egg.y) {

                this.tipsInfo.text = "耶~顺利度过~~";
                this.isReverse = false;
                this.isEff = false;
                GameData.instance.refrushScore();
                this.score.text = "" + GameData.instance.getTotalScore();
                if(this.speedInfo.text != "" + GameData.instance.getLevel()) {
                    this.speedInfo.text = "" + GameData.instance.getLevel();
                    TipsUtils.shakeScreen(1);
                    TipsUtils.showTipsLeftOrRight("Congratulation!!又过关啦~~~");
                }

                this.timer.delay = GameData.instance.getSpeed();
                this.randegg();
                SoundManager.playEatEgg();
                this.mapData.recycleEgg(egg);
                this.snake.addEntity();
                switch(egg.Type) {
                    case Egg.EFF_SPEEDUP:
                        this.timer.delay = GameData.instance.getSpeed() / 2;
                        this.tipsInfo.text = "小心！现在加速状态哦！！！";
                        this.isEff = true;
                        break;
                    case Egg.EFF_SPEEDDOWN:
                        this.timer.delay = GameData.instance.getSpeed() * 2;
                        this.tipsInfo.text = "小心！现在减速状态哦！！！";
                        this.isEff = true;
                        break;
                    case Egg.EFF_REVERSE:
                        this.isReverse = true;
                        this.tipsInfo.text = "小心！ 现在是反向状态哦！！！";
                        this.isEff = true;
                        break;
                }
          }
        }
    }
    
    
    /**
   * 产生随机的蛋
   * 随机产生各种道具
   * 
   */
    public randegg() {

        //产生常规成长道具
        EggManager.getInstance().dispatchEvent("gotoScene",new Egg("rect"));


        //产生各种特效道具,根据当前关卡等级
        var rand = Math.floor(Math.random() * (GameData.instance.getLevel()));
        for(var i = 0;i < rand;i++) {
            EggManager.getInstance().dispatchEvent("gotoScene",new Egg(this.getRandomEff()));
        }

    }
    private getRandomEff(): string {
        var s: string = Egg.EFF_SPEEDUP;
        switch(Math.floor(Math.random() * 3 + 1)) {
            case 1:
                s = Egg.EFF_SPEEDUP;
                break;
            case 2:
                s = Egg.EFF_SPEEDDOWN;
                break;
            case 3:
                s = Egg.EFF_REVERSE;
                break;

        }
        return s;
    }
    
    
    /**
     * 是否结束
     * 1.撞墙
     * 2.碰到自己
     */
    public checkIsOver() {
        //0  400  0 520
        //console.log(this.snake.SnakeHead.x,this.snake.SnakeHead.y);
        if(this.snake.SnakeHead.x < 0 || this.snake.SnakeHead.x > 520 
            || this.snake.SnakeHead.y < 0 || this.snake.SnakeHead.y > 400) {
            console.log("【游戏结束】,撞墙啦");
            
            
            var gameover = new GameOver();
            HierarchyManager.instance.UIHierarchy.addChild(gameover);
            Main.instance.views["gameScene"] = gameover;

            HierarchyManager.instance.UIHierarchy.removeChild(this);
           
            SoundManager.getInstance().stop();
            SoundManager.gameover();
            this._clear();
            
            if(this._timer) {
                this._timer.addEventListener(egret.TimerEvent.TIMER,this._onTimer,this);
                this._timer.stop();
            }
        }
        for(var i = 0;i < this.snake.SnakeBody.length;i++) {
            
           
            if(this.snake.SnakeHead.x == this.snake.SnakeBody[i].x && this.snake.SnakeHead.y==this.snake.SnakeBody[i].y)
            {
                console.log("撞到自己");
               
                var gameover = new GameOver();
                HierarchyManager.instance.UIHierarchy.addChild(gameover);
                Main.instance.views["gameScene"] = gameover;

                HierarchyManager.instance.UIHierarchy.removeChild(this);
                SoundManager.getInstance().stop();
                SoundManager.gameover();
                this._clear();
                
                if(this._timer) {
                    this._timer.addEventListener(egret.TimerEvent.TIMER,this._onTimer,this);
                    this._timer.stop();
                }
            }
            
        }

    }
    

        
   
}  
    
    


