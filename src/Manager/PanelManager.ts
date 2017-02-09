/**
 *
 * 游戏面板管理器
 *
 */
class PanelManager {
    /**面板堆栈*/
    public panelArray:any[]=[];
    
	public constructor() {
	}
	
	//单例
	private static instance:PanelManager;
	public static getInstance():PanelManager{
	    if(PanelManager.instance=null){
	        PanelManager.instance=new PanelManager;
	    }
	    return PanelManager.instance;
	}
	/**
	 * 创建面板
	 * @panelName:面板名称
	 */
	public showPanel(panelName:string):void{
	    var PanelClass=egret.getDefinitionByName(panelName);
	    var obj=new PanelClass();
	    HierarchyManager.instance.TOPHierarchy.addChild(obj);
	    this.panelArray[panelName]=obj;	     
	}
	
	/**
	 * 销毁面板
	 * @panelName：面板名称
	 */ 
	public disposePanel(panelName:string){
	    HierarchyManager.instance.TOPHierarchy.removeChild(this.panelArray[panelName]);
	    this.panelArray[panelName]=null;
	}
	
}
