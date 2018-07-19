//拼柱状图格式(xdata, ydata, vdata)
function makeBarData(chartData, need2Per) {
    need2Per = need2Per || false;

    let xdata = Enumerable.from(chartData).select('$.x').distinct().orderBy().toArray(); 
    let ydata = Enumerable.from(chartData).select('$.y').distinct().toArray();
    let vdata = [];

    ydata.forEach((valy)=>{
        let arr = [];
        let sum = 0;
        xdata.forEach((valx)=>{
            if(need2Per){ //转换成百分比
                let sum = Enumerable.from(chartData).where('$.x=="' + valx+ '"').sum('$.value');
                arr.push( (Enumerable.from(chartData).where('$.x=="' + valx + '"&$.y=="' + valy+'"').sum('$.value')/sum*100).toFixed(2) );
            }else{
                arr.push( Enumerable.from(chartData).where('$.x=="' + valx + '"&$.y=="' + valy+'"').sum('$.value') );
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
    var legenddata = Enumerable.from(chartData).select('$.name').toArray();
    var vdata = [];
    var sum = Enumerable.from(chartData).sum('$.value');

    legenddata.forEach((val)=>{
        var value = Enumerable.from(chartData).where('$.name=="' + val +'"').sum('$.value');
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