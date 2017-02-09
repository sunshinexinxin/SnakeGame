/**
 *
 * 主类事件
 * @author 
 *
 */
class MainEvent extends egret.Event {
    public static OPENLOADBAR: string = "loadbar";
    public static REMOVE: string = "remove";
    public static LOADCOMP: string = "loadcomp";
    
    private _resName: string = "";
    /**
    * type事件的类型，可以作为 Event.type 访问。
    * bubbles返回布尔值，确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
    * cancelable返回布尔值，确定是否可以取消 Event 对象。默认值为 false。
    */
    public constructor(type: string,resName: string = "",bubbles: boolean = false,cancelable: boolean = false) {
        super(type,bubbles,cancelable);
        this._resName = resName;
    }

    public get resName(): string {
        return this._resName;
    }
}
