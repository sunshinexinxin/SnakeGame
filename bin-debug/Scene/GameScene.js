/**
 * Create by 奕昕 2016/04/10
 *
 *  判断吃道具，判断撞墙，不能用碰撞检测，
 *  不符合游戏逻辑，应该根据蛇头是否经过道具的位置，以及蛇身的位置
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    /**
     * 构造函数
     */
    function GameScene() {
        _super.call(this);
        /**
         * 是否是反向效果
         */
        this.isReverse = false;
        this.isEff = false;
        this.skinName = "resource/my_skins/gameUiSkin.exml";
        this.snake = new Snake();
        this.upbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeDirection, this);
        this.downbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeDirection, this);
        this.leftbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeDirection, this);
        this.rightbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeDirection, this);
        this._timer = new egret.Timer(1000);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this._onTimer, this);
        this._timer.start();
        egret.callLater(this.addToStage, this);
        document.addEventListener("keydown", this.keyDown.bind(this));
    }
    var d = __define,c=GameScene,p=c.prototype;
    p._onTimer = function (e) {
        TimeManager.getInstance().doGameTick();
        this._updateTime();
    };
    p._updateTime = function () {
        if (!this.timesInfo) {
            return;
        }
        this.timesInfo.text = TimeUtils.getTimeStr(TimeManager.getInstance().curGameTime);
    };
    p.keyDown = function (evt) {
        var event = new egret.TouchEvent("touchTap");
        switch (evt.keyCode) {
            case 37:
                event.$target = this.leftbtn;
                this.leftbtn.dispatchEvent(event);
                break;
            case 39:
                event.$target = this.rightbtn;
                this.rightbtn.dispatchEvent(event);
                break;
            case 38:
                event.$target = this.upbtn;
                this.upbtn.dispatchEvent(event);
                break;
            case 40:
                event.$target = this.downbtn;
                this.downbtn.dispatchEvent(event);
                break;
        }
    };
    /**
     * 改变方向
     */
    p.changeDirection = function (evt) {
        var btn = evt.target;
        egret.callLater(function () {
            btn.selected = false;
        }, this);
        //如果有人违背自然原则去按键，则直接挡掉
        if (this.snake.SnakeHead.getDirection() == Dire.up && evt.target == this.downbtn
            || this.snake.SnakeHead.getDirection() == Dire.down && evt.target == this.upbtn
            || this.snake.SnakeHead.getDirection() == Dire.left && evt.target == this.rightbtn
            || this.snake.SnakeHead.getDirection() == Dire.right && evt.target == this.leftbtn) {
            return;
        }
        switch (evt.target) {
            case this.upbtn:
                this.snake.changeDire(this.isReverse ? Dire.down : Dire.up, this.snake.SnakeHead);
                SoundManager.playBtnTouch();
                break;
            case this.downbtn:
                this.snake.changeDire(this.isReverse ? Dire.up : Dire.down, this.snake.SnakeHead);
                SoundManager.playBtnTouch();
                break;
            case this.leftbtn:
                this.snake.changeDire(this.isReverse ? Dire.right : Dire.left, this.snake.SnakeHead);
                SoundManager.playBtnTouch();
                break;
            case this.rightbtn:
                this.snake.changeDire(this.isReverse ? Dire.left : Dire.right, this.snake.SnakeHead);
                SoundManager.playBtnTouch();
                break;
            default:
                console.log("你按下了啥键！");
                break;
        }
    };
    p.addToStage = function () {
        this.mapWidth = this.gameMap.width;
        this.mapHeight = this.gameMap.height;
        this.xPointNumber = this.mapWidth / 20;
        this.yPointNumber = this.mapHeight / 20;
        this.mapData = new MapData(this.xPointNumber, this.yPointNumber, this.gameMap.x, this.gameMap.y, this.gameMap.width, this.gameMap.height);
        this.addChild(this.mapData);
        this.mapData.setSnake(this.snake);
        this.mapData.setWall(this.wall1);
        this.mapData.setWall(this.wall2);
        this.mapData.setWall(this.wall3);
        this.mapData.setWall(this.wall4);
        var firstPointx = 13;
        var firstPointy = 17;
        var entity = this.snake.initSnake(firstPointx, firstPointy, "head_png");
        this.mapData.setEntity(firstPointx, firstPointy, entity);
        var entity = this.snake.initSnake(firstPointx, firstPointy + 1, "body_png");
        this.mapData.setEntity(firstPointx, firstPointy + 1, entity);
        var entity = this.snake.initSnake(firstPointx, firstPointy + 2, "body_png");
        this.mapData.setEntity(firstPointx, firstPointy + 2, entity);
        var entity = this.snake.initSnake(firstPointx, firstPointy + 3, "tail_png");
        this.mapData.setEntity(firstPointx, firstPointy + 3, entity);
        GameConfig.curPanel = this;
        GameData.instance.initData();
        //是否绘制网格
        if (true) {
            this.mapData.drawGrid();
        }
        //启动，让蛇自由跑动 
        //使用timer就很好。可以修改timer的delay来达到修改速度的目的
        this.delay = 600;
        this.timer = new egret.Timer(this.delay);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.snakeRun, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        this.timer.start();
        EggManager.getInstance().addEventListener("gotoScene", this.gotoScene, this);
        EggManager.getInstance().dispatchEvent("create");
    };
    ;
    /**
     * 将食物添加到舞台
     * 鸡蛋位置就不放在格子中间了。如果要放在中间。可能需要修改锚点。
     */
    p.gotoScene = function (params) {
        //        params.x = Math.floor(Math.random() * this.xPointNumber) * 20 + 10;
        //        params.y = Math.floor(Math.random() * this.yPointNumber) * 20 + 10;
        //round把数四舍五入为最接近的整数。
        params.x = Math.round(Math.random() * (this.xPointNumber - 2 - 2) + 2) * 20;
        params.y = Math.round(Math.random() * (this.yPointNumber - 2 - 2) + 2) * 20;
        this.mapData.setEgg(params);
    };
    /**
     * 由于timer是有总次数的，当达到总次数的时候需要重置timer
     */
    p.timerComFunc = function (evt) {
        console.log("ss");
        this.timer.reset();
        this.timer.start();
    };
    ;
    /**
     * 贪吃蛇移动
     */
    p.snakeRun = function (evt) {
        if (this.isEff) {
            TipsUtils.shakeScreen(2);
        }
        this.snake.run();
        this.eatEgg();
        this.checkIsOver();
        return true;
    };
    ;
    /**
     * 清除所有的数据
     */
    p._clear = function () {
        this.timer.stop();
        this.timer.reset();
        GameData.instance.initData();
        this.isReverse = false;
        this.isEff = false;
    };
    /**
     * 吃到食物
     */
    p.eatEgg = function () {
        for (var i = 0; i < this.mapData.eggArr.length; i++) {
            var egg = this.mapData.eggArr[i];
            //这里就不能用碰撞检测，逻辑错误，应该使用坐标判断蛇头是否有经过该位置
            if (this.snake.SnakeHead.x == egg.x && this.snake.SnakeHead.y == egg.y) {
                this.tipsInfo.text = "耶~顺利度过~~";
                this.isReverse = false;
                this.isEff = false;
                GameData.instance.refrushScore();
                this.score.text = "" + GameData.instance.getTotalScore();
                if (this.speedInfo.text != "" + GameData.instance.getLevel()) {
                    this.speedInfo.text = "" + GameData.instance.getLevel();
                    TipsUtils.shakeScreen(1);
                    TipsUtils.showTipsLeftOrRight("Congratulation!!又过关啦~~~");
                }
                this.timer.delay = GameData.instance.getSpeed();
                this.randegg();
                SoundManager.playEatEgg();
                this.mapData.recycleEgg(egg);
                this.snake.addEntity();
                switch (egg.Type) {
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
    };
    /**
   * 产生随机的蛋
   * 随机产生各种道具
   *
   */
    p.randegg = function () {
        //产生常规成长道具
        EggManager.getInstance().dispatchEvent("gotoScene", new Egg("rect"));
        //产生各种特效道具,根据当前关卡等级
        var rand = Math.floor(Math.random() * (GameData.instance.getLevel()));
        for (var i = 0; i < rand; i++) {
            EggManager.getInstance().dispatchEvent("gotoScene", new Egg(this.getRandomEff()));
        }
    };
    p.getRandomEff = function () {
        var s = Egg.EFF_SPEEDUP;
        switch (Math.floor(Math.random() * 3 + 1)) {
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
    };
    /**
     * 是否结束
     * 1.撞墙
     * 2.碰到自己
     */
    p.checkIsOver = function () {
        //0  400  0 520
        //console.log(this.snake.SnakeHead.x,this.snake.SnakeHead.y);
        if (this.snake.SnakeHead.x < 0 || this.snake.SnakeHead.x > 520
            || this.snake.SnakeHead.y < 0 || this.snake.SnakeHead.y > 400) {
            console.log("【游戏结束】,撞墙啦");
            var gameover = new GameOver();
            HierarchyManager.instance.UIHierarchy.addChild(gameover);
            Main.instance.views["gameScene"] = gameover;
            HierarchyManager.instance.UIHierarchy.removeChild(this);
            SoundManager.getInstance().stop();
            SoundManager.gameover();
            this._clear();
            if (this._timer) {
                this._timer.addEventListener(egret.TimerEvent.TIMER, this._onTimer, this);
                this._timer.stop();
            }
        }
        for (var i = 0; i < this.snake.SnakeBody.length; i++) {
            if (this.snake.SnakeHead.x == this.snake.SnakeBody[i].x && this.snake.SnakeHead.y == this.snake.SnakeBody[i].y) {
                console.log("撞到自己");
                var gameover = new GameOver();
                HierarchyManager.instance.UIHierarchy.addChild(gameover);
                Main.instance.views["gameScene"] = gameover;
                HierarchyManager.instance.UIHierarchy.removeChild(this);
                SoundManager.getInstance().stop();
                SoundManager.gameover();
                this._clear();
                if (this._timer) {
                    this._timer.addEventListener(egret.TimerEvent.TIMER, this._onTimer, this);
                    this._timer.stop();
                }
            }
        }
    };
    return GameScene;
}(eui.Component));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map