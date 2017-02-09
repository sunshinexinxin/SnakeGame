/**
 *
 * @author
 *
 */
var RankPanel = (function (_super) {
    __extends(RankPanel, _super);
    function RankPanel() {
        _super.call(this);
        this.skinName = "resource/my_skins/panel/rankPanelSkin.exml";
        var gameover = new GameOver();
        var maxscore = gameover.scoreMaxLabel.text;
        this.score.text = maxscore + "";
        this.panelText1.touchEnabled = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.panelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
    }
    var d = __define,c=RankPanel,p=c.prototype;
    /**将面板添加到舞台，并设置其位置信息*/
    p.addToStage = function () {
        this.x = this.stage.stageWidth / 2 - this.width / 2;
        this.y = this.stage.stageHeight / 2 - this.height / 2;
    };
    /**
   *  关闭面板，并触发事件，通知按钮修改状态
   */
    p.closePanel = function () {
        //dispatchEventWith派发一个指定参数的事件。 
        this.dispatchEventWith("close1", false);
        this.close();
    };
    return RankPanel;
}(eui.Panel));
egret.registerClass(RankPanel,'RankPanel');
//# sourceMappingURL=RankPanel.js.map