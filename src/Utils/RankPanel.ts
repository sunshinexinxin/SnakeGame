/**
 *
 * @author 
 *
 */
class RankPanel extends eui.Panel{
    /**
     * panel上面的文本
     */    
    private panelText1: eui.EditableText;

    /**
     * panel上面的确定按钮
     */
    private panelBtn: eui.Image;
    
    /**
    * 历史最高分数
    */
    public score: eui.BitmapLabel;
    
    
           
    public constructor() {
        super();
        this.skinName = "resource/my_skins/panel/rankPanelSkin.exml";
        
        var gameover = new GameOver();
        var maxscore = gameover.scoreMaxLabel.text;
        this.score.text =maxscore+"";
        this.panelText1.touchEnabled = false;
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
        this.panelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closePanel,this);

	}
	
	   /**将面板添加到舞台，并设置其位置信息*/
    private addToStage(): void {
        this.x = this.stage.stageWidth / 2 - this.width / 2;
        this.y = this.stage.stageHeight / 2 - this.height / 2;
    }
    
    /**
   *  关闭面板，并触发事件，通知按钮修改状态
   */
    public closePanel(): void {
        //dispatchEventWith派发一个指定参数的事件。 
        this.dispatchEventWith("close1",false);
        this.close();
    }
}
