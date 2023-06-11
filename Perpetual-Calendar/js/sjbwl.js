$(function () {
    load();
    $(".btn").on("click", function () {
        if($("#in").val()==''){
            alert('备忘不能为空！')
        }else{
            function getNow(s) {
                return s < 10 ? '0' + s : s;
            }
    
            var myDate = new Date();
    
            var year = myDate.getFullYear();        //获取当前年
            var month = myDate.getMonth() + 1;   //获取当前月
            var date = myDate.getDate();            //获取当前日
            var h = myDate.getHours();              //获取当前小时数(0-23)
            var m = myDate.getMinutes();          //获取当前分钟数(0-59)
            var s = myDate.getSeconds();
    
            var now = year + '-' + getNow(month) + "-" + getNow(date) + " " + getNow(h) + ':' + getNow(m) + ":" + getNow(s);
            var local = getDate();
            console.log(local);
            local.push({title:$("#in").val(),time:now,done:false});
            saveDate(local);
            load();
            $("#in").val('');
        }
    });

    $(".weiwancheng ul,.yiwancheng ul").on("click","em",function(){
        var data=getDate();
        var index=$(this).attr("index");
        data.splice(index,1);
        saveDate(data);
        load();
    });
    $(".weiwancheng ul,.yiwancheng ul").on("click","input",function(){
        var data=getDate();
        var index=$(this).siblings("em").attr("index");
        data[index].done=$(this).prop("checked");
        saveDate(data);
        load();
    });

    function saveDate(data){
        localStorage.setItem("todolist",JSON.stringify(data))
    }


    function load(){
        var data=getDate();
        $(".weiwancheng ul,.yiwancheng ul").empty();
        var todocount=0;
        var donecount=0;
        $.each(data,function(i,n){
            if(n.done){
                donecount++;
                $(".yiwancheng ul").prepend("<li><input type='checkbox' checked='checked'><p class='content'>"+n.title+"</p><span>"+n.time+"</span><em index="+i+" class='glyphicon glyphicon-remove'></em></li>")
            }else{
                todocount++;
                $(".weiwancheng ul").prepend("<li><input type='checkbox'><p class='content'>"+n.title+"</p><span>"+n.time+"</span><em index="+i+" class='glyphicon glyphicon-remove'></em></li>")

            }
            
        });
        $(".weicount").text(todocount);
        $(".yicount").text(donecount);
    }


    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    
})



