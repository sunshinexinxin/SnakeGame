/**
  * 游戏配置文件
  * 存放游戏的配置数据
  * 比如：游戏界面尺寸、分享随机百分比、获取系统数据
  */
module GameConfig {

    //是否在线
    //export var isOnLine: boolean = navigator.onLine;

    //全局字体颜色表--可以扩展
    export var TextColors = {
        white: 0xFFFFFF,//白色
        milkWhite: 0xfbf1af,//乳白色 
        grayWhite: 0xceb6a2,//灰白色
        yellow: 0xffff00,//金黄色 
        lightYellow: 0xffd375,//淡黄色
        orangeYellow: 0xff9900,//橘黄色//道具名称 //玩家姓名
        red: 0xf11300,//红色
        green: 0x00e500,//绿色 
        blue: 0x1a94d7,//蓝色 
        grayBlue: 0x2f5177,//墨蓝色 
        purple: 0xe938f2,//紫色 
        pink: 0xFF3030,//粉色 
        black: 0x2e2d2d,//黑色
        golden: 0xFFD700 //金色
    }

    //全局字体大小表--可以扩展
    export var LabelFontSize = {
        littleSize: 12,//小型字体大小
        middleSize: 18,//中型字体大小
        normalSize: 24,//正常字体大小
        bigSize: 36//大型字体大小
    }

   
    //当前舞台
    export function curStage(): egret.Stage {
        return egret.MainContext.instance.stage;
    }

    //当前面板
    export var curPanel: egret.DisplayObjectContainer;

    //当前游戏宽度
    export function curWidth(): number {
        return egret.MainContext.instance.stage.stageWidth;
    }

    //当前游戏高度
    export function curHeight(): number {
        return egret.MainContext.instance.stage.stageHeight;
    }

	
}



