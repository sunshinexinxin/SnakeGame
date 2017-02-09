/**
 *
 * @author 
 * 管理鸡蛋的产生和销毁
 */
class EggManager {
    public _events;

    public constructor() {
        this._events = {};
        this.addEventListener("create",this.create,this);
        this.addEventListener("dispose",this.dispose,this);
    }

    private static instance: EggManager;

    public static getInstance(): EggManager {
        if(EggManager.instance == null) {
            EggManager.instance = new EggManager();
        }
        return EggManager.instance;
    }

    private create(): void {

        this.dispatchEvent("gotoScene",new Egg("egg"));
    }

    private dispose(params: any[]): void {
        if(params.length <= 0) {
            console.info("没有需要消毁的鸡蛋");
            return;
        }
        params[0] = null;
    }

    public addEventListener(eventName: string,callback: Function,thisObj: any): void {
        if(this._events[eventName] != null) {
            console.info("不允许对同一个事件监听两遍,error event name:",eventName);
            return;
        }

        this._events[eventName] = { "callback": callback,"thisObj": thisObj };
    }

    public dispatchEvent(eventName: string,eventData?: any): void {
        if(this._events[eventName] == null) {
            console.info("不允许对一个空事件进行派发,error event name:",eventName);
            return;
        }

        var event = this._events[eventName];

        eventData ? event["callback"].apply(event["thisObj"],[eventData]) : event["callback"].call(event["thisObj"]);
    }

    public disposeAllEvents(): void {
        for(var key in this._events) {
            if(key != "create") {
                delete this._events[key];
            }
        }
    }
}
