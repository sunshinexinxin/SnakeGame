/**
 * Create by 奕昕 
 * 蛇
 * 
 */
class Snake extends egret.Sprite {

    private SnakeSprite: SnakeEntity[];

    private direction: Dire;

    private changeDirePoint: any[];//改变方向的点
    
    public constructor() {
        super();
        this.direction = Dire.up;//默认向上
        this.changeDirePoint = new Array<any>();
        this.SnakeSprite = new Array<SnakeEntity>();
    }
    
    /**
     * 初始化蛇数据
     */
    public initSnake(xPoint: number,yPoint: number,name: string): SnakeEntity {
        var entity: SnakeEntity = new SnakeEntity(name);
        entity.name = name;
        this.SnakeSprite.push(entity);
        entity.x = xPoint * 20;
        entity.y = yPoint * 20;
        this.addChild(entity);
        return entity;
    }
    
    /**
     * 
     */
    public addEntity(){
        var tail = this.SnakeTail;
        var xPoint = tail.x/20;
        var yPoint=tail.y/20;
        var entity = this.initSnake(xPoint,yPoint,"tail_png");
        entity.changeDire(tail.getDirection())
        switch(tail.getDirection())
            {
            case Dire.up:
                yPoint++;
            break
            case Dire.down: 
                yPoint--;
            break
            case Dire.left: 
                xPoint++;
            break
            case Dire.right:
                xPoint--;
            break
            }
        tail.changeType("body_png");
    }
    
    /**
     * 得到蛇头
     */
    public get SnakeHead(): SnakeEntity {
        return this.SnakeSprite[0];
    }
    
    /**
     * 取得蛇尾
     */ 
    public get SnakeTail():SnakeEntity{
        return this.SnakeSprite[this.SnakeSprite.length - 1]
    }
    public get SnakeBody(): SnakeEntity[]{
        return this.SnakeSprite.slice(4,this.SnakeSprite.length);
    }
    
    /**
     * 移动方式： 两种移动方式。本游戏采用第二种方法
     * 1.第一种是遍历整个数组，每一节都在当前位置向前移动一格，
     * 2.第二种是只移动三个地方：蛇头，蛇倒数第二个身体，蛇尾。    
     *蛇头向前移动一格，蛇倒数第二个身体补全蛇身，蛇尾前移一格，补全蛇身留下的空当
     *在第二种方法中蛇都用方块来表示。蛇本身不具备方向性。有了位图，蛇每次移动必须调整方向。
     *少了对数组的遍历。在蛇越来越长的时候，理论上肯定是效率更高的
     */
    public run(): void {

        //取到蛇头
        var snakeHead: SnakeEntity = this.SnakeSprite[0];
        snakeHead.changeDire(this.direction);
        
        //取到蛇尾
        var snakeTail: SnakeEntity = this.SnakeSprite[this.SnakeSprite.length - 1];
        
        //从数组中删除最后一个蛇身体
        var entity: SnakeEntity[] = this.SnakeSprite.splice(this.SnakeSprite.length - 2,1);
        //将删除的蛇身体插入到蛇头和第一个蛇身体之间
        this.SnakeSprite.splice(1,0,entity[0]);
        
       
        //判断当前蛇运动方向是否等于蛇头方向
        if(this.direction != snakeHead.getDirection()) {
            //改变蛇头方向
            snakeHead.changeDire(this.direction);
            this.changeDirePoint[0] = [snakeHead.x,snakeHead.y];
            //判断当前方向朝向做相应运动改变
        }
        this.commonChange(this.direction,snakeHead,entity[0],snakeTail);
        
    }
    
    /**
     * 公共的改变移动方向的方法
     * @param dire 方向
     * @param snakeHead 蛇头
     * @param entity 蛇身
     * @param snakeTail 蛇尾
     */
    private commonChange(dire: Dire,snakeHead: SnakeEntity,entity: SnakeEntity,snakeTail: SnakeEntity) {
        //蛇尾填补蛇身
        snakeTail.x = entity.x;
        snakeTail.y = entity.y;

        //改变尾巴的方向 
        if(this.changeDirePoint.length > 0 && this.changeDirePoint[0][0] == snakeTail.x && this.changeDirePoint[0][1] == snakeTail.y) {
            if(snakeTail.getDirection() != this.direction) {
                snakeTail.changeDire(dire);
            }
        }
       
        
        //改变蛇身方向
        if(entity.getDirection() != dire) {
            entity.changeDire(dire);
        }
        if(snakeTail.getDirection() != entity.getDirection()) {
            snakeTail.changeDire(dire);
        }
        
        //蛇身填补蛇头
        entity.x = snakeHead.x;
        entity.y = snakeHead.y;
        
        //蛇头位置在方向上前移一格
        if(dire == Dire.left) {
            snakeHead.x -= 20;
            snakeHead.y = snakeHead.y;
        } else if(dire == Dire.up) {
            snakeHead.x = snakeHead.x;
            snakeHead.y -= 20;
        } else if(dire == Dire.down) {
            snakeHead.x = snakeHead.x;
            snakeHead.y += 20;
        } else {
            snakeHead.x += 20;
            snakeHead.y = snakeHead.y;
        }
    }
    
    /**
     * 改变方向
     */
    public changeDire(dire: Dire,snakeHead: SnakeEntity): void {
        this.direction = dire;
    }
}
