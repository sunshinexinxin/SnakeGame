/**
 *
 * @author
 *
 */
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        _super.call(this);
        this.skinName = "resource/my_skins/gameoverSkin.exml";
        this.back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnMenu, this);
        this.again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.againGame, this);
        this.updateView();
        Utils.sunturn(this.sc4wheel1);
        Utils.sunturn(this.sc4wheel2, 5000, true);
    }
    var d = __define,c=GameOver,p=c.prototype;
    p.updateView = function () {
        //更新成绩
        this.scoreLabel.text = GameData.instance.getTotalScore() + "";
        //更新称号
        this.chenghaoLabel.text = this.getChenghao();
        //获取最高分
        var scoreMax = Utils.getNumberData("scoreMax");
        if (GameData.instance.getTotalScore() > scoreMax) {
            this.titleLabel.text = "新纪录！";
            Utils.saveData("scoreMax", GameData.instance.getTotalScore());
        }
        else {
            this.titleLabel.text = "得分";
        }
        this.scoreMaxLabel.text = "" + Utils.getNumberData("scoreMax");
    };
    //根据成绩获取称号
    p.getChenghao = function () {
        if (GameData.instance.getLevel() < 5) {
            return "幼稚园小班";
        }
        else if (GameData.instance.getTotalScore() < 10) {
            return "幼稚园中班";
        }
        else if (GameData.instance.getTotalScore() < 20) {
            return "幼稚园大班";
        }
        else if (GameData.instance.getTotalScore() < 30) {
            return "小学";
        }
        else if (GameData.instance.getTotalScore() < 40) {
            return "初中";
        }
        else if (GameData.instance.getTotalScore() < 50) {
            return "高中";
        }
        else if (GameData.instance.getTotalScore() < 60) {
            return "中专";
        }
        else if (GameData.instance.getTotalScore() < 70) {
            return "大专";
        }
        else if (GameData.instance.getTotalScore() < 80) {
            return "大学";
        }
        else if (GameData.instance.getTotalScore() < 90) {
            return "研究生";
        }
        else if (GameData.instance.getTotalScore() < 100) {
            return "博士";
        }
        else {
            return "走火入魔";
        }
    };
    /**
     * 返回主界面
     */
    p.returnMenu = function () {
        //game.GameData.instance.getTotalScore()=0;
        var startScene = new StartScene();
        HierarchyManager.instance.UIHierarchy.addChild(startScene);
        EggManager.getInstance().disposeAllEvents();
        Main.instance.views["startScene"] = startScene;
        HierarchyManager.instance.UIHierarchy.removeChild(this);
        SoundManager.playBtnTouch();
    };
    /**
     * 再来一局游戏
     */
    p.againGame = function () {
        //    	  game.GameData.instance.getTotalScore()=0;
        var gameScene = new GameScene();
        HierarchyManager.instance.UIHierarchy.addChild(gameScene);
        EggManager.getInstance().disposeAllEvents();
        Main.instance.views["gameScene"] = gameScene;
        HierarchyManager.instance.UIHierarchy.removeChild(this);
        SoundManager.playBtnTouch();
    };
    return GameOver;
}(eui.Component));
egret.registerClass(GameOver,'GameOver');
//# sourceMappingURL=GameOver.js.map