/**
 *
 * @author 
 *
 */
class SnakeEntity extends Snakebase {

    public constructor(name: string) {
        super(name);
    }
	
	/**
	 * 得到运动方向
	 */
    public getDirection(): Dire {
        return super.getDirection();
    }

    public changeDire(dire: Dire): Dire {
        return super.changeDire(dire);
    }
	
	/**
	 * 矫正方向
	 */
    public correctDire(dire: Dire): void {
        super.correctDire(dire);
    }

}