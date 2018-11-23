/**柱状图封装**/
import {BaseChart} from './baseChart.js'
import {makeBarData} from '../tools/makeData.js'

class BarChart extends BaseChart {
    
    constructor(data){
        super(data);
        this.xdata = [];
        this.ydata = [];
        this.vdata = [];
        this.extraChartData = [];
    }

    _init(perMode){
        let workedData = makeBarData(this.chartData, this.dataType, perMode);
        this.xdata = workedData.xdata;
        this.ydata = workedData.ydata;
        this.vdata = workedData.vdata;
        this.extraChartData = workedData.extraChartData;
    }

    //基础配置
    _baseBarOption(isPer){
        let option = {
            legend: {
                data: this.ydata, 
                type:'scroll', 
                top:'8%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {          
                    type: 'shadow'     
                },
                formatter: (p)=>{
                    let res = "";
                    if(isPer){ //需要转成百分比
                        for(let i=0;i<p.length;i++){
                            if(p[i].value>0){
                                res += p[i].seriesName + ":" + p[i].value + "%</br>";
                            }
                        }
                    }else{ //不需要转成百分比
                        for(let i=0;i<p.length;i++){
                            if(p[i].seriesName.indexOf("率")!=-1){ //？
                                res += p[i].seriesName + ":" + p[i].value + "%</br>";
                            }else{
                                res += p[i].seriesName + ":" + p[i].value + "("+ this.vUnit + ")</br>";
                            }
                        }
                    }
                    return res;
                },
            },
            grid: {
                top:'20%',
                left: '6%',
                right: '8%',
                bottom: '6%',
                containLabel: true
            },
            xAxis: [
                {
                    name: this.xTitle + "(" + this.xUnit + ")",
                    type: 'category',
                    axisLine:{lineStyle:{color:'#000'}},
                    data: this.xdata,
                    axisLabel: {
                        interval:0, 
                        rotate: 45,
                        textStyle:{color:'#000'}
                    }
                }
            ],
            yAxis: [
                {
                    name: this.yTitle + "(" + (isPer? "%": this.yUnit) + ")",
                    type: 'value',
                    axisLine:{lineStyle:{color:'#000'}},
                    axisLabel: {
                        textStyle:{color:'#000'},
                        formatter: (value)=>{
                            return this.setUnit(value);
                        },
                    }
                }
            ],
            series: []
        };
        
        //如果是百分比y轴最多为100
        if(isPer) {
            option.yAxis[0].max = 100;
        }
        //显示滚动条
        let ydataLength = !(this.chartType==105 || this.chartType==113)? this.ydata.length: 1;
        if(this.xdata.length*ydataLength > 20){
            option.grid.bottom = "12%";
            option.dataZoom = [{
                show: true,
                height: 30,
                bottom: 10,
                startValue: this.xdata[0],
                endValue: this.xdata[parseInt(20/this.ydata.length)-1],
                handleSize: '110%',
            }, {type: 'inside'}];
        }

        return option;
    }


    //普通柱状图
    bar(isAvg){
        this._init();
        let series = [];

        //设置series配置项
        this.vdata.forEach((val, index) => {
            let bs = {
                name: this.ydata[index],
                type: 'bar',
                data: val,
                barMaxWidth: "25%",
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }
            };

            //添加平均线
            if(isAvg && 0==index){
                bs.markLine = {
                    lineStyle: {
                        normal: { color: '#fc97af'}
                    },
                    label: {
                        normal: {
                            position: 'start',
                            formatter: (data)=>{
                                return this.setUnit(data.value);
                            }
                        }
                    },
                    data: [{
                        name: '平均值',
                        type: 'average'
                    }]
                };
            }
            series.push(bs);
        });
        
        let option = this._baseBarOption(false);
        option.series = series;
        
        return option;
    }


    //柱状图百分比(相同xdata和为100%, 数据堆叠)
    barPercentStack(){
        this._init("ex");
        let series = [];
        
        this.vdata.forEach((val, index)=>{
            let bs = {
                name: this.ydata[index],
                type: 'bar',
                stack:'堆积',
                data: val,
                barMaxWidth: "25%",
                label:{
                    normal:{
                        show: true,
                        position: index%2 ? 'left': 'right',
                        color: "#303133",
                        formatter: function(p){
                            return (p.value=="0.00")? "": p.value + "%";
                        }
                    }	
                }
            };
            series.push(bs);
        });

        let option = this._baseBarOption(true);
        option.series = series;
        
        return option;
    }


    //柱状图百分比(数据不堆叠)
    barPercent(perMode){
        this._init(perMode);
        let series = [];
        
        this.vdata.forEach((val, index)=>{
            let bs = {
                name: this.ydata[index],
                type: 'bar',
                data: val,
                barMaxWidth: "25%",
                label:{
                    normal:{
                        show: true,
                        position: 'top',
                        color: "#303133",
                        formatter: function(p){
                            return (p.value=="0.00")? "": p.value + "%";
                        }
                    }
                }
            };
            series.push(bs);
        });

        let option = this._baseBarOption(true);
        option.series = series;
        
        return option;
    }


    //柱状图+增长率
    barWithRate(){
        this._init();
        let ydata = [];
        let vdata = [];
        let series = [];

        //重新拼ydata
        this.ydata.forEach(val => {
            ydata.push(val);
            ydata.push(val+"增长率");
        });
        //重新拼vdata
        this.vdata.forEach(arr => {
            vdata.push(arr);
            let lastval = 0;
            let raiseArr = [];
            arr.forEach(val => {
                if(lastval != 0){
                    let rate = ((val-lastval)/lastval*100).toFixed(2);
                    raiseArr.push( parseFloat(rate) );
                }else{
                    raiseArr.push(0);
                }
                lastval = val;
            });
            vdata.push(raiseArr);
        });

        vdata.forEach((val, index)=>{
            if( !(index%2) ){ //柱图
                let bs = {
                    name: ydata[index],
                    type: 'bar',
                    data: val,
                    barMaxWidth: "25%",
                    itemStyle:{normal:{color:''}},
                    label: {normal: {show: true,position: 'top'}},
                };
                series.push(bs);
            }else{ //增长率
                let rs = {
                    name: ydata[index],
                    type: 'line',
                    itemStyle:{normal:{color:''}},
                    yAxisIndex: 1,
                    smooth: true,
                    data: val
                }
                series.push(rs);
            }
        });

        let option = this._baseBarOption(false);
        this.ydata = ydata;
        this.vdata = vdata;

        option.legend.data = ydata;
        option.xAxis[0].nameGap = 40;
        option.yAxis[1] = {   
            name:'增长率(%)',
            type:'value',
            axisLine:{lineStyle:{color:'#000'}},
            axisLabel: {textStyle:{color:'#000'}}
        };
        option.series = series;

        return option;
    }


    //各类占比柱状图(动态求和)
    barDynamic(chart, barConfig){
        this._init();
        let selected = {};
        let series = [];
        let sumData = []; //存放每一列的和

        //求每一列的和,并存放于sumData
        (() => {
            for (let i=0; i<this.vdata[0].length; i++){
                let sum = 0;
                for(let j=0; j<this.vdata.length; j++){
                    sum += this.vdata[j][i];
                }
                sumData[i] = this.toDecimal(sum);
            }
        })();

        this.vdata.forEach((val, index) => {
            let bs = {
                name: this.ydata[index],
                type: 'bar',
                smooth: true,
                data: val,
                barMaxWidth: "25%",
                stack: '总量'
            };
            series.push(bs);
        });

        //series总体配置项
        let config = {
            name: '总量',
            type: 'line',
            data: sumData,
            lineStyle: {
                normal:{ color: "none" }
            },
            label: {
                normal:{
                    show:true,
                    position: 'top'
                }
            },
            markLine: {
                lineStyle: {
                    normal: { color: '#fc97af'}
                },
                label: {
                    normal: { position: 'start' }
                },
                data: [{
                    name: '年平均',
                    type: 'average'
                }]
            }
        };
        series.push(config);

        let option = this._baseBarOption(false);
        option.series = series;

        //lengend点击事件
        chart.on("legendselectchanged", (params)=>{
            selected = params.selected; //ydata被选中的实时状态
            //循环
            for (let i=0; i<this.vdata[0].length; i++){
                let sum = 0;
                for (let key in selected){
                    if(selected[key]){ //如果被选中
                        let j = this.ydata.indexOf(key); //找到被选中键值在ydata中的索引
                        sum += this.vdata[j][i]; //实时求每一列的和
                    }
                }
                sumData[i] = this.toDecimal(sum);
            }
            chart.setOption(option);
        });

        return option;
    }


    //柱状图+折线图(手动区分)
    barAndLine(){
        let bar_vdata=[], line_vdata = [];
        let series = [];
        let chartData = this.chartData;
        
        this.xdata = Enumerable.from(chartData).select("o=>o.x").distinct().toArray(); 
        let barChartData = chartData.filter((o)=>{return o.name=="BarChart"});
        let lineChartData = chartData.filter((o)=>{return o.name=="LineChart"});
        
        let bar_ydata = Enumerable.from(barChartData).select("o=>o.y").distinct().toArray();
        let line_ydata = Enumerable.from(lineChartData).select("o=>o.y").distinct().toArray();

        bar_ydata.forEach((valy)=>{
            let barArr = [];
    
            this.xdata.forEach((valx)=>{
                let eachBarValue = Enumerable.from(barChartData).where((o)=>{return o.x==valx && o.y==valy}).sum('o=>o.value');
                barArr.push(eachBarValue);   
            });
            if(barArr.length>0) bar_vdata.push(barArr);
        });

        line_ydata.forEach((valy)=>{
            let lineArr = [];
    
            this.xdata.forEach((valx)=>{
                let eachLineValue = Enumerable.from(lineChartData).where((o)=>{return o.x==valx && o.y==valy}).sum('o=>o.value');
                lineArr.push(eachLineValue);
            });
            
            if(lineArr.length>0) line_vdata.push(lineArr);
        });

        //设置series配置项
        bar_vdata.forEach((val, index) => {
            let bs = {
                name: bar_ydata[index],
                type: 'bar',
                yAxisIndex: 0,
                data: val,
                barMaxWidth: "25%",
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }
            };
            series.push(bs);
        });

        line_vdata.forEach((val, index)=>{
            let ls = {
                name: line_ydata[index],
                type: 'line',
                yAxisIndex: 1,
                data: val,
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }
            };
            series.push(ls);
        });

        this.vdata = bar_vdata.concat(line_vdata);
        this.ydata = bar_ydata.concat(line_ydata);
        
        let option = {
            legend: {
                data: this.ydata, type:'scroll', top:'8%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {          
                    type: 'shadow'     
                }
            },
            grid: {
                top:'20%',
                left: '6%',
                right: '4%',
                bottom: '6%',
                containLabel: true
            },
            xAxis: [
                {
                    name: this.xTitle,
                    type: 'category',
                    axisLine:{lineStyle:{color:'#000'}},
                    data: this.xdata,
                    axisLabel: {interval:0, rotate:50, textStyle:{color:'#000'}}
                }
            ],
            yAxis: [
                {
                    name: this.yUnit,
                    type: 'value',
                    axisLine:{lineStyle:{color:'#000'}},
                    axisLabel: {
                        textStyle:{color:'#000'},
                        formatter: (value)=>{
                            return this.setUnit(value);
                        },
                    }
                },
                {
                    name: this.xUnit,
                    type: 'value',
                    axisLine:{lineStyle:{color:'#000'}},
                    axisLabel: {
                        textStyle:{color:'#000'},
                        formatter: (value)=>{
                            return this.setUnit(value);
                        },
                    }
                }
            ],
            series: series
        };
        
        return option;
    }

}

//导出
export { BarChart }
