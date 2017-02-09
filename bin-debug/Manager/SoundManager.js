/**
 *
 * @author
 *
 */
var SoundManager = (function (_super) {
    __extends(SoundManager, _super);
    function SoundManager() {
        _super.call(this);
        this._position = 0;
    }
    var d = __define,c=SoundManager,p=c.prototype;
    SoundManager.getInstance = function () {
        if (SoundManager.instance == null) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    };
    d(p, "bgMusic"
        //背景音乐的设置
        ,function () {
            if (!this._bg_music)
                this._bg_music = RES.getRes("Music_mp3");
            return this._bg_music;
        }
    );
    //按钮点击音乐
    SoundManager.playBtnTouch = function () {
        this.playSound("btntouch_mp3");
    };
    //吃鸡蛋音乐
    SoundManager.playEatEgg = function () {
        this.playSound("yes_mp3");
    };
    //游戏结束音乐
    SoundManager.gameover = function () {
        this.playSound("gameover_mp3");
    };
    SoundManager.playSound = function (soundName) {
        var sound = RES.getRes(soundName);
        sound.play(this.position, 1);
    };
    p.play = function () {
        this._bg_channel = this.bgMusic.play(this._position, -1);
    };
    p.stop = function () {
        if (this._bg_music) {
            this._position = this._bg_channel.position;
            this._bg_channel.stop();
        }
    };
    SoundManager.position = 0;
    return SoundManager;
}(egret.DisplayObjectContainer));
egret.registerClass(SoundManager,'SoundManager');
//# sourceMappingURL=SoundManager.js.map