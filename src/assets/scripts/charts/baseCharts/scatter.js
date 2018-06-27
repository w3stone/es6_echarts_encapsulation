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
        var max = Enumerable.From(sourceData).Select('$.value').Max(); //value最大值

        //拼接数据
        sourceData.forEach(function(item,index){
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
                                formatter: function(params) {
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
                                name: item.name,
                                xAxis: item.x
                            },
                            {
                                name: item.name,
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
                        symbolSize: max? (item.value/max).toFixed(2)*50 :scatterConfig.symbolSize //散点大小
                    }]
                } 
                seriesData.push(bs);
            }
            legenddata.push(item.name);
        });

        var option = {
            title: {
                text: this.title,
                right:'center'
            },
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
                formatter: (obj)=> {
                    if (obj.componentType == "series") {
                        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                            obj.name + '</div>' +
                            '<span>' + this.xAxis + ':' + obj.data.value[0] + '</span><br/>' +
                            '<span>' + this.yAxis + ':' + obj.data.value[1] + '</span>';
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
                name: this.xAxis,
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
                name: this.yAxis,
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

        console.log(option);

        return option;
    }

}

//导出
export {ScatterChart}