var code;//手机短信验证码
var isdata=[false,false,false,false];//初始化用户输入内容的是否合法
$(init)

var newtime;//短信验证码计时器
var times;//短信验证码发送间隔时间

function init(){
    phone_code();//初始化手机验证码
    texttest();//用户输入信息验证正则表达式
    pwd();//初始化密码强度
    $("#regbut").on("click",adduser);//初始化表单提交条件
    $("#phone_code_test").mouseenter(function(){
         $("#phone_code_test").css("background","#eeeded");
    });
    $("#phone_code_test").mouseleave(function(){
         $("#phone_code_test").css("background","#fff");
    })
}

//获取手机验证码
function phone_code(){
//    $("#phone_code").attr("disabled", "disabled");
    $("#phone_code").attr("disabled", true);//格式不对不能发送验证码
    $("#phone_code").on("click",function(){
        times=60;
        $("#phone_code").attr("disabled", true);//格式不对不能发送验证码
        newtime=setInterval(getphone_code,1000);
        code=1000+Math.round(Math.random()*8999);
        $("#phone_code_test").html(code);
    });
}
//产生手机验证码
function getphone_code(){
    $("#phone_code_time").html(times--+"秒后可重新发送");
    if(times==-1){
        $("#phone_code_time").html("");
        $("#phone_code").removeAttr("disabled");
        clearInterval(newtime);
    }
}
//用户输入正则表达式初始化
function texttest(){
    $("#phone-cont-text,#password-text,#passwordok-text,#phone-text").change(newtest);
}

function newtest(){
    console.log(this.id);
    switch(this.id){
        case "phone-text":{
            var rule=/^\d{11}$/;
            if(!test(rule,this.value)){
                $("#"+this.id+"_lable").html("请输入正确的手机号");
                $("#"+this.id+"_lable").css({color:"#f73947",fontSize:"12px"});
                isdata[0]=false;
                $("#phone_code").attr("disabled", true);//格式不对不能发送验证码
            }else{
                $("#"+this.id+"_lable").html("注册成功后，全美团通用");
                $("#"+this.id+"_lable").css({color:"#999",fontSize:"12px"});
                nametest();
            }
            break;
        }        
        case "phone-cont-text":{
            var rule=/^\w{4}$/;
            if(!test(rule,this.value)){
                $("#"+this.id+"_lable").html("请检查验证码格式");
                $("#"+this.id+"_lable").css({color:"#f73947",fontSize:"12px"});
                isdata[1]=false;
            }else{
                $("#"+this.id+"_lable").html("");
                isdata[1]=true;
            }
            break;
        }    
        case "password-text":{
            $("#passwordok-text_lable").html("密码不一致");
            $("#passwordok-text_lable").css({color:"#f73947",fontSize:"12px"});
            isdata[3]=false;
            var rule=/^[0-9a-zA-Z]{6,12}$/;
            if(!test(rule,this.value)){
                $("#"+this.id+"_lable").html("密码长度6-12");
                $("#"+this.id+"_lable").css({color:"#f73947",fontSize:"12px"});
                isdata[2]=false;
            }else{
                $("#"+this.id+"_lable").html("");
                isdata[2]=true;
            }
            break;
        }
        case "passwordok-text":{
            if(this.value!=$("#password-text").val()){
                $("#"+this.id+"_lable").html("密码不一致");
                $("#"+this.id+"_lable").css({color:"#f73947",fontSize:"12px"});
                isdata[3]=false;
            }else{
                $("#"+this.id+"_lable").html("");
                isdata[3]=true;
            }
            break;
        }    
    }
}
//正则表达式验证
function test(rule,data){
//    console.log(rule.test(data));
    return(rule.test(data));
}
//初始化密码强度
function pwd(){
    $("#password-text").on("input",pwdleng)
}

//密码长度判断
function pwdleng(){
    if($("#password-text").val().length==0){
        $("#pwd_l,#pwd_c,#pwd_r").css("background","#eee");  
    }else if($("#password-text").val().length<7){
              $("#pwd_l").css("background","#f66c6c");
              $("#pwd_c,#pwd_r").css("background","#eee");  
    }else if($("#password-text").val().length<9){
              $("#pwd_l,#pwd_c").css("background","#f66c6c");
              $("#pwd_r").css("background","#eee");  
    }else if($("#password-text").val().length<13){
              $("#pwd_l,pwd_c,#pwd_r").css("background","#f66c6c");
    }
}

function nametest(){
    var namedata=$("#phone-text").val();
    $.ajax({
        type:"post",
        url:"/user/find",
        data:{name:namedata,
             findType:"exact"
             },
        success: function(msg){
//            console.log(msg);
            if(msg.length==1){
               $("#phone-text_lable").html("手机号已被注册");
               $("#phone-text_lable").css({color:"#f73947",fontSize:"12px"});
                isdata[0]=false;
                $("#phone_code").attr("disabled", true);
            } else{
               $("#phone-text_lable").html("手机号可以注册");
               $("#phone-text_lable").css({color:"#07b217",fontSize:"12px"});
                isdata[0]=true;
//                $("#phone_code").removeAttr("disabled");
//                $("#phone_code").prop("disabled",false);
                $("#phone_code").attr("disabled", false);//手机号未被注册才可以发验证码
            } 
         }
    })
}
//初始化表单提交条件
function formsubmit(){
        if($("#phone-cont-text").val()==code){
            for(var i=0;i<isdata.length;i++){
                if(isdata[i]==false){
                    return false;
                }
            } 
            return true;
        } 
    return false;
}
function adduser(){
    $.ajax({
        type:"post",
        data:{name:$("#phone-text").val(),
              password:$("#password-text").val()     
             },
        url:"/user/add",
        beforeSend :function(data){
            console.log(formsubmit());
            return formsubmit();
        },
        success : function(msg){
            location.replace("index.html");
        }
    })
    
//    $('#newform').form({ 
//        type:"post",
//        url:"/user/add",    
//        onSubmit: function(){    
//            return formsubmit();
//        },    
//        success:function(data){    
//        alert(data)    
//        }    
//    }); 
    
}