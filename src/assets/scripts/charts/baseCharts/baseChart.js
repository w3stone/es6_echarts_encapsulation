class BaseChart{
    
    //构建器
    constructor(data){
        this.chartData = data.chartData; //主要数据源
        this.title = data.title || ""; //标题
        this.xAxis = data.xAxis || ""; //x轴标题
        this.yAxis = data.yAxis || ""; //y轴标题
        this.xUnit = data.xUnit || ""; //x轴单位
        this.yUnit = data.yUnit || ""; //y轴单位
        this.chartType = data.chartType || 0;
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