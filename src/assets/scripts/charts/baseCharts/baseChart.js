class BaseChart{
    
    //构建器
    constructor(data){
        this.chartData = data.chartdata || data.chartData || []; //主要数据源
        this.title = data.title || ""; //标题
        this.xTitle = data.xtitle || data.xTitle || ""; //x轴标题
        this.yTitle = data.ytitle || data.yTitle  || ""; //y轴标题
        this.vTitle = data.vtitle || data.vTitle || ""; //y轴标题
        this.xUnit = data.xunit || data.xUnit || ""; //x轴单位
        this.yUnit = data.yunit || data.yUnit || ""; //y轴单位
        this.vUnit = data.vunit || data.vUnit || ""; //value单位
        this.chartType = data.charttype || data.chartType || 0;
        this.dataType = data.datatype || data.dataType || 0; //是否需要过滤数据
    }

    //保留小数点后一位
    toDecimal(num){
        return parseFloat(num).toFixed(1);
    }

    //设置单位
    setUnit(value) {
        if(value >= 100000000) {
            return value / 100000000 + ' 亿'
        } else if(value >= 1000000) {
            return value / 10000 + ' 万'
        } else {
            return value + ''
        }
    }
    
}

//导出
export {BaseChart}