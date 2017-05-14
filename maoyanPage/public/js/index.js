$(init)

function init(){
    cc();
    
    
    
    
}



function cc(){
    $.ajax({
        type:"post",
        url:"/getSession",
        success:function(msg){
            console.log(msg);
        }
    });
}