
/**柱状图表格
    data: {xdata,ydata,vdata, xUnit, yUnit...}
**/
function makeBarTable(data, need2Per){
    var copydata = $.extend(true, {}, data); //深拷贝
    var xdata = copydata.xdata;
    var ydata = copydata.ydata;
    var vdata = copydata.vdata;
    var xUnit = copydata.xUnit; //x轴单位
    var yUnit = copydata.yUnit; //y轴单位

    xdata.unshift(""); //在xdata前插入空字符串

    if(xUnit){ //如果有x轴单位
        xdata.forEach(function(item, index){
            if(index != 0){
                xdata[index] = item + "(" + xUnit + ")";
            }
        });
    }

    vdata.forEach(function(arr, index){
        if(need2Per){ //需要转成%
            arr.forEach(function(val, i){
                arr[i] = val+"%";
            });
            arr.unshift(ydata[index]);
        }else{ //不需要转成%
            if(yUnit){
                arr.forEach(function(val, i){
                    arr[i] = val+ "(" + yUnit + ")";
                });
            }
            arr.unshift(ydata[index]);
        } 
    });

    return {
        thead: xdata,
        tbody: vdata
    };
}

export{
    makeBarTable
}