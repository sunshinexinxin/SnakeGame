/**
 * Create by 奕昕 2016/04/08
 */
var MyPanel = (function (_super) {
    __extends(MyPanel, _super);
    /**
     *  面板构造函数
     *
     */
    function MyPanel(type) {
        _super.call(this);
        this.type = type;
        this.skinName = "resource/my_skins/panel/myPanelSkin.exml";
        switch (type) {
            case "setting":
                this.music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.musicSetting, this);
                this.effect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.effectSetting, this);
                this.panelText1.visible = false;
                this.panelText2.visible = false;
                break;
            case "help":
                this.music.visible = false;
                this.effect.visible = false;
                this.panelText1.text = "       游戏简介：按方向键或按钮来控制游戏移动方向,每吃到一个道具或食物则加5分，吃到加速蛋则速度加快，吃到减速蛋则速度减慢，吃到反向道具，则蛇会按照玩家所按按钮的相反方向进行移动，碰到障碍物或自身则游戏结束。\n\n        游戏规则：玩家可以通过按钮或者键盘来对蛇进行操作。\n ";
                this.panelText2.text = "作者：韩奕昕";
                this.panelText1.touchEnabled = false;
                this.panelText2.touchEnabled = false;
                break;
            default:
                console.log("并没有这种类型");
                break;
        }
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.panelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
    }
    var d = __define,c=MyPanel,p=c.prototype;
    /**将面板添加到舞台，并设置其位置信息*/
    p.addToStage = function () {
        this.x = this.stage.stageWidth / 2 - this.width / 2;
        this.y = this.stage.stageHeight / 2 - this.height / 2;
    };
    /**
     * 背景音乐的设置
     */
    p.musicSetting = function () {
        console.log(this.music.selected);
        if (this.music.selected) {
            SoundManager.getInstance().play();
        }
        else {
            SoundManager.getInstance().stop();
        }
    };
    /**
     * 背景音效的设置
     */
    p.effectSetting = function () {
        console.log(this.effect.selected);
    };
    /**
     *  关闭面板，并触发事件，通知按钮修改状态
     */
    p.closePanel = function () {
        //dispatchEventWith派发一个指定参数的事件。 
        this.dispatchEventWith("close", false, this.type);
        this.close();
    };
    d(p, "Type"
        /**
         *  获取当前面板类型
         */
        ,function () {
            return this.type;
        }
    );
    return MyPanel;
}(eui.Panel));
egret.registerClass(MyPanel,'MyPanel');
//# sourceMappingURL=MyPanel.js.map