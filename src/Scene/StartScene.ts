/**
 *游戏开始场景
 *
 */
class StartScene extends eui.Component{
	/**排行榜按钮*/
	private rank:eui.ToggleButton;
    /**开始游戏按钮*/
	private startGame:eui.ToggleButton;
	/**设置按钮*/
	private setting:eui.ToggleButton;
	/**帮助按钮*/
	private help:eui.ToggleButton;
	/**是否有面板开启，任何一个面板开启，此处均为true*/
	private isOpenPanel:boolean=false;
	/**面板实例*/
	private ipanel:MyPanel;
	/**排行榜面板实例*/
	private rankpanel:RankPanel;
	
	//背景音乐
	private music:eui.ToggleButton;
	//游戏音效
	private effect:eui.ToggleButton;
	
    public constructor() {
    	super();
    	var self=this;
    	this.skinName="resource/my_skins/StartSkin.exml";
    	this.setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchSettingAndHelp,this);
    	this.help.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchSettingAndHelp,this);
    	this.rank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchRank,this);
    	this.startGame.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchStart,this);
    	
	}
	/**
	 * 点击设置和帮助按钮，交替实现按钮是否高亮
	 */ 
	private touchSettingAndHelp(evt:egret.Event):void{
        SoundManager.playBtnTouch();
    	var target=evt.target==this.setting?"setting":"help";
    	if(!this.isOpenPanel){
    	    //判断是否有面板开启，若没有，则创建一个面板对象，并置isOpenPanel为true
            this.ipanel=new MyPanel(target);
            this.isOpenPanel=true;
            //为创建的面板添加侦听事件
            this.ipanel.addEventListener("close",this.panelClose,this);
            this.addChild(this.ipanel);        
    	}else{
        	//若有面板开启,则关闭,close关闭面板，从父级容器移除自身。	
            this.ipanel.close();
            this.isOpenPanel=false;
            //closePanel关闭面板，并触发事件，通知按钮修改状态
            this.ipanel.closePanel();
            if(this.ipanel.Type!=target){
                this.ipanel=new MyPanel(target);
                this.isOpenPanel=true;
                this.ipanel.addEventListener("close",this.panelClose,this);
                this.addChild(this.ipanel);             
            }                  	
    	}	
	}
	/**
	 * 接收来自panel的事件，并根据事件的类型进行相应的处理
	 */ 
	private panelClose(evt:egret.Event):void{
	    if(evt.data=="setting"){    	    
	        this.setting.selected=false;
	        this.isOpenPanel=false;
	              
	    }else{
	        this.help.selected=false;
	        this.isOpenPanel=false;
	    }	    
	}

    private panelClose1(evt: egret.Event): void {
        this.setting.selected = false;
        this.isOpenPanel = false;
    }
    
    private touchRank(evt: egret.Event): void {
        if(!this.isOpenPanel) {
            this.rankpanel = new RankPanel();
            this.addChild(this.rankpanel);
            this.isOpenPanel = true;
            this.rankpanel.addEventListener("close1",this.panelClose1,this);
        } else {
            this.rankpanel.close();
            this.isOpenPanel = false;
        }
        //console.log("touchRank");
        SoundManager.playBtnTouch();

    }


	private touchStart():void{
        HierarchyManager.instance.UIHierarchy.removeChild(this);
    	var gameScene=new GameScene();
	    HierarchyManager.instance.UIHierarchy.addChild(gameScene);
	    Main.instance.views["gameScene"]=gameScene;   
	    

        SoundManager.playBtnTouch();
	}
}
