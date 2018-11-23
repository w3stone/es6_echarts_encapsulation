/**散点图封装**/
import {BaseChart} from './baseChart.js'

class ScatterChart extends BaseChart {

    constructor(data){
        super(data);
    }
    
    //散点图
    scatter(scatterConfig){
        var legenddata = [];
        var seriesData = [];

        var sourceData = this.chartData;
        var defSymbolSize = scatterConfig.symbolSize; //默认气泡图大小

        var max = sourceData.length>0? Enumerable.from(sourceData).select('o=>o.value').max(): 0; //value最大值

        //拼接数据
        sourceData.forEach(item => {
            if(item.name=="平均值"){ //平均值
                var av = {
                    name: item.name,
                    type: 'scatter',
                    markLine: {
                        label: {
                            normal: {
                                //fontSize: 14,
                                formatter: (params) => {
                                    return params.name + ": \n" + params.value;
                                }
                            }
                        },
                        lineStyle:{
                            normal:{ type: "solid" }
                        },
                        data: [
                            {
                                name: this.xTitle + item.name,
                                xAxis: item.x
                            },
                            {
                                name: this.yTitle + item.name,
                                yAxis: item.y
                            }
                        ]
                    }  
                }
                seriesData.push(av);

            }else{ //非平均值
                var bs = {
                    name: item.name,
                    type: 'scatter',
                    data: [{
                        name: item.name,
                        value: [item.x, item.y],
                        label:{
                            normal:{
                                fontSize: 14
                            }
                        },
                        symbolSize: max? (item.value/max)*defSymbolSize :defSymbolSize //散点大小
                    }]
                } 
                seriesData.push(bs);
            }
            legenddata.push(item.name);
        });

        var option = {
            legend: {
                data: legenddata,
                type: 'scroll',
                top: '8%',
                textStyle:{fontSize: 14}
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    show: true,
                    type: 'cross',
                    lineStyle: {
                        type: 'dashed',
                        width: 1
                    },
                },
                formatter: (obj) => {
                    //console.log(obj);
                    if (obj.componentType == "series") {
                        var result =  '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                            obj.name + '</div>' +
                            '<span>' + this.xTitle + ':' + obj.data.value[0] + this.xUnit + '</span><br/>' +
                            '<span>' + this.yTitle + ':' + obj.data.value[1] + this.yUnit + '</span>';
                        
                        if(max){ result += '<br/><span>' + this.vTitle + ':' + (obj.data.symbolSize*max/defSymbolSize).toFixed(2) + this.vUnit +  '</span>'; }
                        return result;
                    }
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'bottom',
                    formatter: function(params) {
                        return params.name
                    }
                },
                emphasis: {
                    show: true,
                    position: 'bottom',
                }
            },
            xAxis: {
                name: this.xTitle,
                type: 'value',
                scale: true,
                nameTextStyle:{
                    fontSize: 14
                },
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#3259B8'
                    }
                }
            },
            yAxis: {
                name: this.yTitle,
                type: 'value',
                scale: true,
                nameTextStyle:{
                    fontSize: 14
                },
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#3259B8'
                    }
                }
            },
            grid: {
                top:'20%',
                left: '5%',
                right: '10%',
                bottom: '8%',
                containLabel: true
            },
            series: seriesData
        };

        return option;
    }


    //散点图(相同颜色)
    scatterSameColor(scatterConfig){
        var legenddata = [];
        var seriesData = [];
        var series = [];

        var sourceData = this.chartData;
        var defSymbolSize = scatterConfig.symbolSize; //默认气泡图大小
        
        var max = sourceData.length>0? Enumerable.from(sourceData).select('$.value').max(): 0; //value最大值

        //拼接数据
        sourceData.forEach(item => {
            if(item.name=="平均值"){ //平均值
                var av = {
                    name: item.name,
                    type: 'scatter',
                    data:[{
                        name: item.name,
                        value: [item.x, item.y],
                        symbolSize: 0
                    }],
                    markLine: {
                        label: {
                            normal: {
                                //fontSize: 14,
                                formatter: (params) => {
                                    return params.name + ": \n" + params.value;
                                }
                            }
                        },
                        lineStyle:{
                            normal:{
                                type: "solid"
                            }
                        },
                        data: [
                            {
                                name: this.xTitle + item.name,
                                xAxis: item.x
                            },
                            {
                                name: this.yTitle + item.name,
                                yAxis: item.y
                            }
                        ]
                    }  
                }
                series.push(av);

            }else{
                var each = {
                    name: item.name,
                    value: [item.x, item.y],
                    label:{
                        normal:{
                            fontSize: 14
                        }
                    },
                    symbolSize: max? (item.value/max)*defSymbolSize :defSymbolSize //散点大小
                }
                seriesData.push(each);
            }
            legenddata.push(item.name); 
            
        });
        //所有散点图
        var bs = {
            name: "散点图",
            type: 'scatter',
            data: seriesData
        } 
        series.push(bs);

        var option = {
            legend: {
                data: legenddata,
                type: 'scroll',
                top: '8%',
                textStyle:{fontSize: 14}
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    show: true,
                    type: 'cross',
                    lineStyle: {
                        type: 'dashed',
                        width: 1
                    },
                },
                formatter: (obj) => {
                    //console.log(obj);
                    if (obj.componentType == "series") {
                        var result = '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                            obj.name + '</div>' +
                            '<span>' + this.xTitle + ':' + obj.data.value[0] + this.xUnit + '</span><br/>' +
                            '<span>' + this.yTitle + ':' + obj.data.value[1] + this.yUnit + '</span>';
                        
                        if(max){ result += '<br/><span>' + this.vTitle + ':' + (obj.data.symbolSize*max/defSymbolSize).toFixed(2) + this.vUnit + '</span>'; }
                        return result;
                    }
                }
            },
            label: {
                normal: {
                    show: false,
                    position: 'bottom',
                    formatter: function(params) {
                        return params.name
                    }
                },
                emphasis: {
                    show: true,
                    position: 'bottom',
                }
            },
            xAxis: {
                name: this.xTitle,
                type: 'value',
                scale: true,
                nameTextStyle:{
                    fontSize: 14
                },
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#3259B8'
                    }
                }
            },
            yAxis: {
                name: this.yTitle,
                type: 'value',
                scale: true,
                nameTextStyle:{
                    fontSize: 14
                },
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#3259B8'
                    }
                }
            },
            grid: {
                top:'20%',
                left: '5%',
                right: '10%',
                bottom: '8%',
                containLabel: true
            },
            series: series
        };

        return option;
    }


    //散点图(自动求平均)
    scatterAutoAvg(scatterConfig){
        var legenddata = [];
        var seriesData = [];

        var sourceData = this.chartData;
        var defSymbolSize = scatterConfig.symbolSize; //默认气泡图大小
        var max = sourceData.length>0? Enumerable.from(sourceData).select('$.value').max(): 0; //value最大值

        var avgX = Enumerable.from(sourceData).sum("o=>parseFloat(o.x)") /sourceData.length;
        var avgY = Enumerable.from(sourceData).sum("o=>parseFloat(o.y)") /sourceData.length;

        var av = {
            name: "平均值",
            type: 'scatter',
            markLine: {
                label: {
                    normal: {
                        formatter: (params) => {
                            return params.name + ": \n" + params.value;
                        }
                    }
                },
                lineStyle:{
                    normal:{ type: "solid" }
                },
                data: [
                    {
                        name: this.xTitle + "平均值",
                        xAxis: avgX
                    },
                    {
                        name: this.yTitle + "平均值",
                        yAxis: avgY
                    }
                ]
            }  
        }
        seriesData.push(av);

        //拼接数据
        sourceData.forEach(function(item,index){

            legenddata.push(item.name);
            var bs = {
                name: item.name,
                type: 'scatter',
                data: [{
                    name: item.name,
                    value: [item.x, item.y],
                    label:{
                        normal:{
                            fontSize: 14
                        }
                    },
                    symbolSize: max? (item.value/max)*defSymbolSize :defSymbolSize //散点大小
                }]
            } 
            seriesData.push(bs);
        });

        var option = {
            legend: {
                data: legenddata,
                type: 'scroll',
                top: '8%',
                textStyle:{
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    show: true,
                    type: 'cross',
                    lineStyle: {
                        type: 'dashed',
                        width: 1
                    },
                },
                formatter: (obj) => {
                    //console.log(obj);
                    if (obj.componentType == "series") {
                        var result = '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                            obj.name + '</div>' +
                            '<span>' + this.xTitle + ':' + obj.data.value[0] + '</span><br/>' +
                            '<span>' + this.yTitle + ':' + obj.data.value[1] + '</span>';
                        
                        if(max){ result += '<br/><span>' + this.vTitle + ':' + (obj.data.symbolSize*max/defSymbolSize).toFixed(2) + '</span>'; }
                        return result;
                    }
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'bottom',
                    formatter: function(params) {
                        return params.name
                    }
                },
                emphasis: {
                    show: true,
                    position: 'bottom',
                }
            },
            xAxis: {
                name: this.xTitle,
                type: 'value',
                scale: true,
                nameTextStyle:{
                    fontSize: 14
                },
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#3259B8'
                    }
                }
            },
            yAxis: {
                name: this.yTitle,
                type: 'value',
                scale: true,
                nameTextStyle:{
                    fontSize: 14
                },
                axisLabel: {
                    formatter: '{value}'
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#3259B8'
                    }
                }
            },
            grid: {
                top:'20%',
                left: '5%',
                right: '10%',
                bottom: '8%',
                containLabel: true
            },
            series: seriesData
        };

        return option;
    }

}

//导出
export {ScatterChart}