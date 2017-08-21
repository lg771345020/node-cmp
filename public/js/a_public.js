//每页显示的行数
var linecnt_forpage_g = 20;

//分页条上最多显示的页数
var pagecnt_fordisplay_g = 6;

//MAC地址格式模板，if(!mac_mode_g.test(mac))则mac不是合法的MAC地址
var mac_mode_g = /[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/;
       
//IP地址格式模板
var REG =/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

var ipmask_note_g = "请输入正确格式的IP/掩码：192.168.0.1/24";

var gateway_note_g = "请输入正确格式的网关：192.168.0.1";

var ip_note_g = "请输入正确格式的IP：192.168.1.2";

var mac_note_g = "请输入正确格式的MAC：11:11:11:11:11:11";

var mask_note_g = "请输入正确格式的掩码：255.255.255.0";

var dns_note_g = "请输入正确格式的DNS：114.114.114.114";

var note_length_g = 20;

var protocol_cnt_g = 4096;

/****************************************************************
** 
**  get_port
**
**  Description:
**      获取当前URL的端口号
**
**  Input: 
**      none
**
** 
**  Return: 
**      当前URL的端口号
**      
**  Revision: 
**
****************************************************************/
function get_port()
{
	var port_str = document.location.port;
	if(port_str == "")
	{
            if(document.location.protocol == "http:")
            {
	        port_str = "80";
            }
            else
            {
                port_str = "443";
            }
	}
	return port_str;
}
	
/****************************************************************
** 
**  verify_mask
**
**  Description:
**      输入netmask格式是否合法
**
**  Input: 
**      netmask串
**
** 
**  Return: 
**      -1：不合法
**       0：合法
**      
**  Revision: 
**
****************************************************************/
function verify_mask(netmask){
    var netmask_pro = ipToInt(netmask);

    if (netmask_pro == -1 || ((netmask_pro >>> 0).toString(2)).indexOf('01') >= 0) 
	{
	    return -1;
	}
	return 0;
}
/****************************************************************
** 
**  verify_mac
**
**  Description:
**      输入MAC格式是否合法
**
**  Input: 
**      MAC串
**
** 
**  Return: 
**      -1：不合法
**       0：合法
**      
**  Revision: 
**
****************************************************************/
function verify_mac(mac){
    var result = mac_mode_g.exec(mac);
    if(!result) return -1;

	var mac_arr = mac.split(":");
	
	if(mac_arr.length > 6)
	{
		return -1;
	}
	
	return 0;
}
/****************************************************************
** 
**  ipToInt
**
**  Description:
**      IP串转换为整型数值
**
**  Input: 
**      IP串
**
** 
**  Return: 
**      整型数值， 或-1， -1 表示 IP不合法
**      
**  Revision: 
**
****************************************************************/
function ipToInt(ip){
    var result = REG.exec(ip);
    if(!result) return -1;
    return (parseInt(result[1]) << 24
        | parseInt(result[2]) << 16
        | parseInt(result[3]) << 8
        | parseInt(result[4]))>>>0;
}
/****************************************************************
 **
 **  long2ip
 **
 **  Description:
 **      整型数值转换为IP串
 **
 **  Input:
 **      整型数值
 **
 **
 **  Return:
 **      ip串
 **
 **  Revision:
 **
 ****************************************************************/
function long2ip(num){
    var ip = num % 256;
    for (var i = 1; i <= 3; i++) {
        num = Math.floor(num / 256);
        ip = ip + '.' + num % 256;
    }
    return ip;
}
/****************************************************************
** 
**  reply_status
**
**  Description:
**      根据错误码翻译成文字，提示给用户，并根据需求进行跳转
**
**  Input: 
**      error_code: 错误码
**      refresh_url：希望跳转的链接，不跳转则输入 "" 即可
**
** 
**  Return: 
**      无
**      
**  Revision: 
**
****************************************************************/
function reply_status(error_code, refresh_url) {
    var port_str = get_port();

	var post_url = document.location.protocol + "//" + document.location.hostname + ":" + port_str + "/errcode";
        $.post(post_url,{},function(result){
	    var obj = eval('(' + result + ')');
            for(var i = 0; i < obj['key'].length; i++)
            {
               if(obj['key'][i]['error'] == error_code)
               {
                   alert(obj['key'][i]['ch']);
               }
            }
			if(refresh_url != "")
			{
				window.location.href = refresh_url;
			}        
	});
}

/****************************************************************
** 
**  redirect_to_login
**
**  Description:
**      重定向到登陆界面
**
**  Input:无
**
** 
**  Return: 
**      无
**      
**  Revision: 
**
****************************************************************/
function redirect_to_login()
{
    var port_str = document.location.port;
	if(port_str == "")
	{
	     port_str = "80";
	}
    var new_url = document.location.protocol + "//" + document.location.hostname + ":" + port_str + "/login";
}


/****************************************************************
** 
**  checked_all
**
**  Description:
**      页面的全选处理
**
**  Input:
**        type_name：表格中的checkbox，的name属性值
**        id_val：表格中的全选按钮, 的ID属性值 
**
** 
**  Return: 
**      无
**      
**  Revision: 
**
****************************************************************/
function checked_all(type_name, id_val){
	$("input[name='" + type_name + "']:checkbox").each(function(){ 
		$(this).prop("checked",$("#" + id_val).prop("checked"));
 	});
}

/****************************************************************
** 
**  change_checked
**
**  Description:
**      页面的勾选按钮变化时的联动处理
**
**  Input:
**        type_name：表格中的checkbox，的name属性值
**        id_val：表格中的全选按钮, 的ID属性值 
**
** 
**  Return: 
**      无
**      
**  Revision: 
**
****************************************************************/
function change_checked(type_name, id_val){
    var coll = document.getElementsByName(type_name);
    var collid = document.getElementById(id_val);
    var m = 0;
    for(var i = 0; i < coll.length; i++){
        if(coll[i].checked == true){
            m++ ; 
        }
        else{
            collid.checked = false;
        } 
    }

    if(m == coll.length){
        collid.checked = true;
    }
    
}

/****************************************************************
** 
**  element_in_array
**
**  Description:
**      检测某元素是否在指定数组中
**
**  Input:
**        element_spe： 元素
**        arr:          数组 
**
** 
**  Return: 
**      若在，返回true， 否则false
**      
**  Revision: 
**
****************************************************************/
function element_in_array(element_spe, arr)
{
    var i = 0;
	for(i = 0; i < arr.length; i++)
	{
	    if(element_spe == arr[i])
		{
		    return true;
		}
	}
	return false;
}

/****************************************************************
** 
**  search_value_inarray
**
**  Description:
**      根据键，查找obj组中对应键的值
**
**  Input:
**        key_word      键名
**        obj_arr:      obj组 
**
** 
**  Return: 
**      若在，返回true， 否则false
**      
**  Revision: 
**
****************************************************************/
function search_value_inarray(key_word, obj_arr)
{
    for(var i = 0; i < obj_arr.length; i++)
	{
	    if(key_word == obj_arr[i].key_word)
		{
		    return obj_arr[i].value;
		}
	}
}



function getLowAddr(ip, netMask){
    var lowAddr = "";
    var ipArray = new Array();
    var netMaskArray = new Array();
    // I²Îý·
    if (4 != ip.split(".").length || "" == netMask)
    {
        return "";
    }
    for (var i = 0; i < 4; i++)
    {
        ipArray[i] = ip.split(".")[i];
        netMaskArray[i] = netMask.split(".")[i];
        ipArray[i] = ipArray[i] & netMaskArray[i];
    }
    // ¹¹Ô×СµØ·
    for (var i = 0; i < 4; i++)
    {
        if(i == 3){
            ipArray[i] = ipArray[i] + 1;
        }
        if ("" == lowAddr){
            lowAddr +=ipArray[i];
        } else{
            lowAddr += "." + ipArray[i];
        }
    }
    return lowAddr;
}

function getHostNumber(netMask){
    var hostNumber = 0;
    var netMaskArray = new Array();
    for(var i = 0; i < 4; i++){
        netMaskArray[i] = netMask.split(".")[i];
        if(netMaskArray[i] < 255){
            hostNumber = Math.pow(256,3-i) * (256 - netMaskArray[i]);
            break;
        }
    }

    return hostNumber;
}

function getNetMask(inetMask){
        var netMask = "";
        if(inetMask > 32){
            return netMask;
        }
        //×ÍÑÂΪ1ռÁ¼¸¸öÚ        
		var num1 = parseInt(inetMask / 8);
        //×ÍÑÂµĲ¹λλÊ
        var num2 = inetMask % 8;
        var array = new Array();
        for(var i = 0; i < num1; i++){
            array[i] = 255;
        }
        for(var i = num1; i < 4; i++){
            array[i] = 0;
        }
        for(var i = 0; i < num2; num2--){
            array[num1] += Math.pow(2,8-num2);
        }
        netMask = array[0] + "." + array[1] + "." + array[2] + "." + array[3];

        return netMask;
    }

function getHighAddr(ip,netMask){
    var lowAddr = getLowAddr(ip,netMask);
    var hostNumber = getHostNumber(netMask);
    if("" == lowAddr || hostNumber == 0){
        return "";
    }

    var lowAddrArray = new Array();
    for(var i = 0; i < 4; i++){
        lowAddrArray[i] = lowAddr.split(".")[i];
        if(i == 3){
            lowAddrArray[i] = Number(lowAddrArray[i] - 1);
        }
    }
    lowAddrArray[3] = lowAddrArray[3] + Number(hostNumber - 1);
    //alert(lowAddrArray[3]);
    if(lowAddrArray[3] > 255){
        var k = parseInt(lowAddrArray[3] / 256);
        //alert(k);
        lowAddrArray[3] = lowAddrArray[3] % 256;
        //alert(lowAddrArray[3]);
        lowAddrArray[2] = Number(lowAddrArray[2]) + Number(k);
        //alert(lowAddrArray[2]);
        if(lowAddrArray[2] > 255){
            k = parseInt(lowAddrArray[2] / 256);
            lowAddrArray[2] = lowAddrArray[2] % 256;
            lowAddrArray[1] = Number(lowAddrArray[1]) + Number(k);
            if(lowAddrArray[1] > 255){
                k = parseInt(lowAddrArray[1] / 256);
                lowAddrArray[1] = lowAddrArray[1] % 256;
                lowAddrArray[0] = Number(lowAddrArray[0]) + Number(k);
            }
        }
    }

    var highAddr = "";
    for(var i = 0; i < 4; i++){
        if(i == 3){
            lowAddrArray[i] = lowAddrArray[i] - 1;
        }
        if("" == highAddr){
            highAddr = lowAddrArray[i];

        }else{
            highAddr += "." + lowAddrArray[i];
        }
    }

    return highAddr;
}


function translate_ipstr(ip_str)
{
    var translate_output = new Object();
    translate_output.type = -1;	
	
	var exp=/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/; 
	
	var ip_arr = ip_str.split('-');
	if(ip_arr.length == 2)
	{
	    if((ipToInt(ip_arr[0]) != -1) && (ipToInt(ip_arr[1]) != -1))
		{
		    translate_output.type = 3;
			translate_output.start_ip = ip_arr[0];
			translate_output.end_ip = ip_arr[1];
		}
		return translate_output;
	}
	
	var ip_arr = ip_str.split('/');
	if(ip_arr.length == 2)
	{
	    var reg = ip_arr[1].match(exp); 
		
		if(ipToInt(ip_arr[0]) == -1)
		{
		    return translate_output;      //IP²»ºϷ¨
		}
		if(reg != null) 
		{
		    translate_output.type = 2;
			translate_output.start_ip = getLowAddr(ip_arr[0], ip_arr[1]);
			translate_output.end_ip = getHighAddr(ip_arr[0], ip_arr[1]);
			return translate_output;
		}
		
		if((parseInt(ip_arr[1]) <= 32) && (parseInt(ip_arr[1]) >= 8)) 
		{
		    var netmask = getNetMask(parseInt(ip_arr[1]));
			translate_output.start_ip = getLowAddr(ip_arr[0], netmask);
			translate_output.end_ip = getHighAddr(ip_arr[0], netmask);
		    translate_output.type = 1;
			return translate_output;
		}
		
	}
	
	return translate_output;
}
