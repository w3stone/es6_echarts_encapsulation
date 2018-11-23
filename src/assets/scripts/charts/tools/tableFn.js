/**柱状图表格
    data: {xdata,ydata,vdata, xUnit, yUnit...}
**/
function makeBarTable(data){
    var copydata = $.extend(true, {}, data); //深拷贝
    var xdata = copydata.xdata || [];
    var ydata = copydata.ydata || [];
    var vdata = copydata.vdata || [];
    var xTitle = copydata.xTitle || ""; //x轴标题
    var yTitle = copydata.yTitle || ""; //y轴标题
    var xUnit = copydata.xUnit || ""; //x轴单位
    var yUnit = copydata.yUnit || ""; //y轴单位
    var chartType = copydata.chartType;
    
    xdata.unshift(""); //在xdata前插入空字符串

    if(xUnit){ //如果有x轴单位
        xdata.forEach(function(item, index){
            if(index != 0){
                xdata[index] = item + "(" + xUnit + ")";
            }
        });
    }

    vdata.forEach(function(arr, index){
        if(chartType==105){ //需要转成%
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
            arr.unshift(ydata[index] + "(" + yUnit + ")");
        } 
    });

    return {
        thead: xdata,
        tbody: vdata
    };
}

//
function make2DTable(data, isPer){
    isPer = isPer!=undefined? isPer: true; //默认需要转成比例
    var copydata = $.extend(true, {}, data); //深拷贝
    var chartData = copydata.chartdata || copydata.chartData;
    
    var sum = 0;
    var tbody = [];

    if(isPer)
        sum = Enumerable.from(chartData).sum('o=>o.value');

    chartData.forEach((item)=>{
        var arr = isPer? [item.name, ((item.value/sum)*100).toFixed(2)+"%"]: [item.name, item.value];
        tbody.push(arr);
    })

    return {
        thead: isPer? ["名称", "比例"]: ["名称", "值"],
        tbody: tbody
    };
}

//
function make4DTable(data){
    console.log(data);
    var copydata = $.extend(true, {}, data); //深拷贝
    var chartData = copydata.chartData;
    var xTitle = copydata.xTitle; //x轴标题
    var yTitle = copydata.yTitle; //y轴标题
    var tbody = [];

    chartData.forEach((item)=>{
        var arr = [item.name, item.x, item.y, item.value];
        tbody.push(arr);
    })

    return {
        thead: ["名称", xTitle, yTitle, "值"],
        tbody: tbody
    };
}

export{
    makeBarTable, make2DTable, make4DTable
}