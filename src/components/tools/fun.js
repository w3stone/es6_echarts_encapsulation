import axios from 'axios'

//拼图表格式(xdata, ydata, vdata)
function makeChart(arrlist, need2Per, parentName) {
    if(parentName){
        var subdata= Enumerable.From(arrlist).Where('$.y=="'+parentName+'"').ToArray();
        var subdata2 = $.extend(true, [], subdata); //深拷贝
        subdata2.forEach((val, index)=>{
            val.y = val.yc;
        });
        return this.makeChart(subdata2, need2Per); //递归
    }

    var xdata = Enumerable.From(arrlist).Select('$.x').Distinct().OrderBy().ToArray(); 
    var ydata = Enumerable.From(arrlist).Select('$.y').Distinct().ToArray();
    var vdata = [];

    ydata.forEach((valy)=>{
        var arr = [];
        var sum = 0;
        xdata.forEach((valx)=>{
            if(need2Per){ //转换成百分比
                var sum = Enumerable.From(arrlist).Where('$.x=="' + valx+ '"').Sum('$.value');
                arr.push( (Enumerable.From(arrlist).Where('$.x=="' + valx + '"&$.y=="' + valy+'"').Sum('$.value')/sum*100).toFixed(2) );
            }else{
                arr.push( Enumerable.From(arrlist).Where('$.x=="' + valx + '"&$.y=="' + valy+'"').Sum('$.value') );
            }
            
        });
        vdata.push(arr);
    });

    return {
        "xdata": xdata, 
        "ydata": ydata, 
        "vdata": vdata
    };

}

//拼图表格式(xdata, ydata, vdata)
function makePieChart(arrlist, need2Per) {

    var xdata = Enumerable.From(arrlist).Select('$.x').Distinct().OrderBy().ToArray(); 
    var ydata = Enumerable.From(arrlist).Select('$.name').Distinct().ToArray();
    var vdata = [];

    ydata.forEach((valy)=>{
        var arr = [];
        var sum = 0;
        xdata.forEach((valx)=>{
            if(need2Per){ //转换成百分比
                var sum = Enumerable.From(arrlist).Where('$.x=="' + valx+ '"').Sum('$.value');
                arr.push( (Enumerable.From(arrlist).Where('$.x=="' + valx + '"&$.y=="' + valy+'"').Sum('$.value')/sum*100).toFixed(2) );
            }else{
                arr.push( Enumerable.From(arrlist).Where('$.x=="' + valx + '"&$.y=="' + valy+'"').Sum('$.value') );
            }
            
        });
        vdata.push(arr);
    });

    return {
        "xdata": xdata, 
        "ydata": ydata, 
        "vdata": vdata
    };

}


//ajaxGet封装
function dataGet(apiName, params, callback){
    var url = "/static/api/" + apiName + ".json";

    if (typeof arguments[1] == "function"){
        callback = arguments[1];
        params = {};
    }

    axios.get(url, {params: params}).then((response) => {
        var result = response.data.data;
        if(callback) callback(result);

    }).catch((error)=>{
        console.log(error);
        //if(callback) callback(0);

    });
}


export{
    makeChart, dataGet
}
