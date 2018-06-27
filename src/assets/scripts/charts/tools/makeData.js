//拼柱状图格式(xdata, ydata, vdata)
function makeBarData(chartData, need2Per) {
    need2Per = need2Per || false;

    let xdata = Enumerable.From(chartData).Select('$.x').Distinct().OrderBy().ToArray(); 
    let ydata = Enumerable.From(chartData).Select('$.y').Distinct().ToArray();
    let vdata = [];

    ydata.forEach((valy)=>{
        let arr = [];
        let sum = 0;
        xdata.forEach((valx)=>{
            if(need2Per){ //转换成百分比
                let sum = Enumerable.From(chartData).Where('$.x=="' + valx+ '"').Sum('$.value');
                arr.push( (Enumerable.From(chartData).Where('$.x=="' + valx + '"&$.y=="' + valy+'"').Sum('$.value')/sum*100).toFixed(2) );
            }else{
                arr.push( Enumerable.From(chartData).Where('$.x=="' + valx + '"&$.y=="' + valy+'"').Sum('$.value') );
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


//拼饼图格式(vdata, legenddata)
function makePieData(chartData) {
    var legenddata = Enumerable.From(chartData).Select('$.name').ToArray();
    var vdata = [];
    var sum = Enumerable.From(chartData).Sum('$.value');

    legenddata.forEach((val)=>{
        var value = Enumerable.From(chartData).Where('$.name=="' + val +'"').Sum('$.value');
        var perValue = parseFloat( (perValue/sum*100).toFixed(2) );
        vdata.push(value);
    });

    return {
        "legenddata":legenddata,
        "vdata":vdata
    }

}

export{
    makeBarData, makePieData
}