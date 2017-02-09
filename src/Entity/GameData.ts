
	/**
	 *
	 * @author 
	 *
	 */
 class GameData {
    	
    	public static singleScore:number=5;//单个道具的分数
    	private _totalScore:number=0;//总分
    	private static baseScore:number=2;//基数分数，用来计算当前的等级所需要的分数
    	
    	
    	private _level:number=1;//当前等级
    	private levelValue:number=0;//当前分数下的等级
    	private static startSpeed:number=500;//初始速度
    	
    	private _speed:number=0;//当前速度
    	
        private _time: number = 0;//当前时间

       
        /**实例*/
        private static _instance: GameData; 
    
        /**实例*/
        public static get instance(): GameData {
            if(GameData._instance == null) {
                GameData._instance = new GameData();
            }
            return GameData._instance;
        }
		public constructor() {

		}
		
        public set time(val: number) {
            this._time = val;
        }

        public get time(): number {
            return this._time;
        }
        

		public getSpeed():number
		{
		    return this._speed;
		}
		
		public getTotalScore():number
		{
		    return this._totalScore;
		}
		public getLevel():number
		{
		    return this._level;
		}
		public refrushScore(v:number=GameData.singleScore):number
		{
    		/*
    		 * v==0当作游戏结束处理
    		 */ 
    		if(v==0)
              {
                  this._totalScore=0;
                  this._level=1;
                  return this._level;
              }
		    this._totalScore += v;
    		return this.checkLevel();
		}
		private checkLevel():number
		{
            this.levelValue = parseInt(window['log2'](this._totalScore / GameData.baseScore));
            if(this.levelValue>this._level)
            {
                this._level++;
                
            }
            
            this._speed=GameData.startSpeed/this._level;
            return this._level;
		}
       public initData():void
       {
           this._totalScore=0;
           this._level=1;
           this._time=0;
       }
		
	}

