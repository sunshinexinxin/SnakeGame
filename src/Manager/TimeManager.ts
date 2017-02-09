/**
 *
 * 时间管理器
 *
 */
class TimeManager {
    
    private _curResult: GameData;
    
    
    private static instance: TimeManager;

    public static getInstance(): TimeManager {
        if(TimeManager.instance==null) {
            TimeManager.instance = new TimeManager();
        }
        return TimeManager.instance;
    }

      
      public doGameTick(): void {
          if(this._curResult) {
              this._curResult.time++;
          }
      }
      public get curResult(): GameData {
          return this._curResult;
      }

      
      public get curGameTime(): number {
          if(!this._curResult) {
             this._curResult=GameData.instance;
             return 0;
          }
          return this._curResult.time;
      }  
}
