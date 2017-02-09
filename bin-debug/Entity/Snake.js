/**
 * Create by 奕昕
 * 蛇
 *
 */
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake() {
        _super.call(this);
        this.direction = Dire.up; //默认向上
        this.changeDirePoint = new Array();
        this.SnakeSprite = new Array();
    }
    var d = __define,c=Snake,p=c.prototype;
    /**
     * 初始化蛇数据
     */
    p.initSnake = function (xPoint, yPoint, name) {
        var entity = new SnakeEntity(name);
        entity.name = name;
        this.SnakeSprite.push(entity);
        entity.x = xPoint * 20;
        entity.y = yPoint * 20;
        this.addChild(entity);
        return entity;
    };
    /**
     *
     */
    p.addEntity = function () {
        var tail = this.SnakeTail;
        var xPoint = tail.x / 20;
        var yPoint = tail.y / 20;
        var entity = this.initSnake(xPoint, yPoint, "tail_png");
        entity.changeDire(tail.getDirection());
        switch (tail.getDirection()) {
            case Dire.up:
                yPoint++;
                break;
            case Dire.down:
                yPoint--;
                break;
            case Dire.left:
                xPoint++;
                break;
            case Dire.right:
                xPoint--;
                break;
        }
        tail.changeType("body_png");
    };
    d(p, "SnakeHead"
        /**
         * 得到蛇头
         */
        ,function () {
            return this.SnakeSprite[0];
        }
    );
    d(p, "SnakeTail"
        /**
         * 取得蛇尾
         */
        ,function () {
            return this.SnakeSprite[this.SnakeSprite.length - 1];
        }
    );
    d(p, "SnakeBody"
        ,function () {
            return this.SnakeSprite.slice(4, this.SnakeSprite.length);
        }
    );
    /**
     * 移动方式： 两种移动方式。本游戏采用第二种方法
     * 1.第一种是遍历整个数组，每一节都在当前位置向前移动一格，
     * 2.第二种是只移动三个地方：蛇头，蛇倒数第二个身体，蛇尾。
     *蛇头向前移动一格，蛇倒数第二个身体补全蛇身，蛇尾前移一格，补全蛇身留下的空当
     *在第二种方法中蛇都用方块来表示。蛇本身不具备方向性。有了位图，蛇每次移动必须调整方向。
     *少了对数组的遍历。在蛇越来越长的时候，理论上肯定是效率更高的
     */
    p.run = function () {
        //取到蛇头
        var snakeHead = this.SnakeSprite[0];
        snakeHead.changeDire(this.direction);
        //取到蛇尾
        var snakeTail = this.SnakeSprite[this.SnakeSprite.length - 1];
        //从数组中删除最后一个蛇身体
        var entity = this.SnakeSprite.splice(this.SnakeSprite.length - 2, 1);
        //将删除的蛇身体插入到蛇头和第一个蛇身体之间
        this.SnakeSprite.splice(1, 0, entity[0]);
        //判断当前蛇运动方向是否等于蛇头方向
        if (this.direction != snakeHead.getDirection()) {
            //改变蛇头方向
            snakeHead.changeDire(this.direction);
            this.changeDirePoint[0] = [snakeHead.x, snakeHead.y];
        }
        this.commonChange(this.direction, snakeHead, entity[0], snakeTail);
    };
    /**
     * 公共的改变移动方向的方法
     * @param dire 方向
     * @param snakeHead 蛇头
     * @param entity 蛇身
     * @param snakeTail 蛇尾
     */
    p.commonChange = function (dire, snakeHead, entity, snakeTail) {
        //蛇尾填补蛇身
        snakeTail.x = entity.x;
        snakeTail.y = entity.y;
        //改变尾巴的方向 
        if (this.changeDirePoint.length > 0 && this.changeDirePoint[0][0] == snakeTail.x && this.changeDirePoint[0][1] == snakeTail.y) {
            if (snakeTail.getDirection() != this.direction) {
                snakeTail.changeDire(dire);
            }
        }
        //改变蛇身方向
        if (entity.getDirection() != dire) {
            entity.changeDire(dire);
        }
        if (snakeTail.getDirection() != entity.getDirection()) {
            snakeTail.changeDire(dire);
        }
        //蛇身填补蛇头
        entity.x = snakeHead.x;
        entity.y = snakeHead.y;
        //蛇头位置在方向上前移一格
        if (dire == Dire.left) {
            snakeHead.x -= 20;
            snakeHead.y = snakeHead.y;
        }
        else if (dire == Dire.up) {
            snakeHead.x = snakeHead.x;
            snakeHead.y -= 20;
        }
        else if (dire == Dire.down) {
            snakeHead.x = snakeHead.x;
            snakeHead.y += 20;
        }
        else {
            snakeHead.x += 20;
            snakeHead.y = snakeHead.y;
        }
    };
    /**
     * 改变方向
     */
    p.changeDire = function (dire, snakeHead) {
        this.direction = dire;
    };
    return Snake;
}(egret.Sprite));
egret.registerClass(Snake,'Snake');
//# sourceMappingURL=Snake.js.map