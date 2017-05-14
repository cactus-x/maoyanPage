$(init)

function init(){
    acctest();//用户名验证
    pwdtest();//用户名验证
    loginData();//初始化登录验证
}

//用户名验证
function acctest(){
    $("#acc").change(function(){
        if($("#acc").val()==""){
            $("#acc_span").html("用户名不能为空");
        }else{
            $("#acc_span").html("");
        }
        
    })
}

//用户名验证
function pwdtest(){
     $("#pwd").change(function(){
        if($("#pwd").val()==""){
            $("#pwd_span").html("密码不能为空");
        }else{
            $("#pwd_span").html("");
        }
        
    })
}

//登录验证
function loginData(){ 
    $('#login_form').form({
        type:'post',
        url:'/user/find',
        onSubmit:function(data){
            data.findType="exact";
            data.addSession={name:$("#acc").val(),
                             password:$("#pwd").val()
                            };
            if($("#acc").val()==""){
                $("#acc_span").html("用户名不能为空");
                return false;
            }
            if($("#pwd").val()==""){
                $("#pwd_span").html("密码不能为空");
                return false;
            }
        },
        success:function(msg){
           console.log(msg);
           msg=JSON.parse(msg);
           if(msg.length==1){
               if($("#auto").attr("checked")!="checked"){
                   delsess();
               }
               location.replace("index.html"); 
           } else{
               $("#login_span").html("密码错误或用户名不存在"); 
           }        
        }
    });
}
        
function delsess(){
    $.ajax({
        type:"post",
        url:"/logout"
    });
}
        


         
              

              
              
              
              
              
