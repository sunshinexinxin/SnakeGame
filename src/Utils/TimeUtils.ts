/**
 *
 * @author 
 *
 */
class TimeUtils {
    constructor() {

    }
    
	public static getTimeStr(time:number):string{
    	  var str:string ="";
	    var hour:number=Math.floor(time/3600);
	    var mins:number=Math.floor((time-3600*hour)/60);
	    var snds:number=time-3600*hour-60*mins;
        return TimeUtils.fixNumStr(hour,2) + ":" + TimeUtils.fixNumStr(mins,2)+":"+ TimeUtils.fixNumStr(snds,2);
	}
	
	public static fixNumStr(num:number,digit:number):string{
	    if(digit<=0){
	        return num.toString()
	    }
	    if(num>=Math.pow(10,digit)){
	        return "error";
	    }
	    var str:string="";
	    while(digit>0){
	        var d:number=Math.floor(num/Math.pow(10,digit-1));
	        str+=d.toString();
	        num=num-d*Math.pow(10,digit-1);
	        digit--;
	    }
	    return str;
	}
}
