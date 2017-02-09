/**
 *
 * @author 
 *
 */
class SoundManager extends egret.DisplayObjectContainer {

    //  public  soundChannel: egret.SoundChannel;
    //单例
    private static instance: SoundManager;
    public static getInstance(): SoundManager {
        if(SoundManager.instance == null) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }
    
    public constructor() {
        super();

    }
    //加载音乐
    private _bg_music: egret.Sound;
    private _bg_channel: egret.SoundChannel;
    
    private  static position:number=0;
    private _position: number = 0;
    
    //背景音乐的设置
    private get bgMusic() {
        if(!this._bg_music)
            this._bg_music = RES.getRes("Music_mp3");
        return this._bg_music;
    }
    
    //按钮点击音乐
    public static playBtnTouch(): void {
        this.playSound("btntouch_mp3");
    }
    //吃鸡蛋音乐
    public static playEatEgg():void{
        this.playSound("yes_mp3");
    }
    //游戏结束音乐
    public static gameover():void{
        this.playSound("gameover_mp3");
    }
    
    private static playSound(soundName) {
        var sound: egret.Sound = RES.getRes(soundName);
        sound.play(this.position,1);
    }

    public play() {
        this._bg_channel = this.bgMusic.play(this._position,-1);
    }

    public stop() {
        if(this._bg_music){
            this._position = this._bg_channel.position;
            this._bg_channel.stop();
        }
      
    }
  
}

