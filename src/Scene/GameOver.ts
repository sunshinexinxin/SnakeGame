/**
 *
 * @author 
 *
 */
class GameOver extends eui.Component{
    /*返回主菜单*/
    private back:eui.ToggleButton;
    /*再来一局*/
    private again:eui.ToggleButton;
    //分数
    private scoreLabel: eui.Label;
    //称号
    private chenghaoLabel: eui.Label;
   //标题
    private titleLabel: eui.Label;
    //最高分
    public scoreMaxLabel: eui.Label;
    
    private sc4wheel1: egret.DisplayObject;
    private sc4wheel2: egret.DisplayObject;
    private sc4carshadow: egret.DisplayObject;
 
    
	public constructor() {
    	super();   
    	this.skinName="resource/my_skins/gameoverSkin.exml";
    	this.back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnMenu,this);
    	this.again.addEventListener(egret.TouchEvent.TOUCH_TAP,this.againGame,this);
      this.updateView();
      Utils.sunturn(this.sc4wheel1);
      Utils.sunturn(this.sc4wheel2,5000,true);
      
	}
   
 
    private updateView() {
        //更新成绩
        this.scoreLabel.text = GameData.instance.getTotalScore() + "";
        //更新称号
        this.chenghaoLabel.text = this.getChenghao();
            
        //获取最高分
        var scoreMax: number = Utils.getNumberData("scoreMax");
        if(GameData.instance.getTotalScore() > scoreMax) {
            this.titleLabel.text = "新纪录！";
            Utils.saveData("scoreMax",GameData.instance.getTotalScore());
        } else {
            this.titleLabel.text = "得分";
        }
        this.scoreMaxLabel.text = "" + Utils.getNumberData("scoreMax");

    }
        
    //根据成绩获取称号
    private getChenghao(): string {
        if(GameData.instance.getLevel() < 5) {
            return "幼稚园小班";
        } else if(GameData.instance.getTotalScore() < 10) {
            return "幼稚园中班";
        } else if(GameData.instance.getTotalScore() < 20) {
            return "幼稚园大班";
        } else if(GameData.instance.getTotalScore() < 30) {
            return "小学";
        } else if(GameData.instance.getTotalScore() < 40) {
            return "初中";
        } else if(GameData.instance.getTotalScore() < 50) {
            return "高中";
        } else if(GameData.instance.getTotalScore() < 60) {
            return "中专";
        } else if(GameData.instance.getTotalScore() < 70) {
            return "大专";
        } else if(GameData.instance.getTotalScore() < 80) {
            return "大学";
        } else if(GameData.instance.getTotalScore() < 90) {
            return "研究生";
        } else if(GameData.instance.getTotalScore() < 100) {
            return "博士";
        } else {
            return "走火入魔";
        }
    }
	
	/**
	 * 返回主界面
	 */ 
	private returnMenu():void{
    	  //game.GameData.instance.getTotalScore()=0;

    	
        var startScene = new StartScene();
        HierarchyManager.instance.UIHierarchy.addChild(startScene);
        EggManager.getInstance().disposeAllEvents();
        Main.instance.views["startScene"] = startScene;
       
        HierarchyManager.instance.UIHierarchy.removeChild(this); 
        SoundManager.playBtnTouch();
	}
	
	/**
	 * 再来一局游戏
	 */ 
	private againGame():void{
//    	  game.GameData.instance.getTotalScore()=0;
        var gameScene = new GameScene();
        HierarchyManager.instance.UIHierarchy.addChild(gameScene);
        EggManager.getInstance().disposeAllEvents();
        Main.instance.views["gameScene"] = gameScene;
        
        HierarchyManager.instance.UIHierarchy.removeChild(this);
        SoundManager.playBtnTouch();
        
	}
	
}
