/**折线图封装**/
import {BaseChart} from './baseChart.js'

class LineChart extends BaseChart{
    
    //普通折线图
    line(){
        let series = [];

        //设置series配置项
        this.vdata.forEach((val, index) => {
            let bs = {
                name: this.ydata[index],
                type: 'line',
                itemStyle: {normal: {}},
                data: val,
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                }
            };
            series.push(bs);
            
        });
        
        let option = {
            title:{text: this.title, right:'center'},
            toolbox: {
                right: 30,
                feature: {
                    saveAsImage: { 
                        show: true,
                        title: '下载图片',
                        backgroundColor:'#ffffff' 
                    }
                }
            },
            legend: {
                data: this.ydata, 
                type:'scroll', 
                top:'8%'
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
                bottom: '12%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    axisLine:{lineStyle:{color:'#000'}},
                    data: this.xdata,
                    axisLabel: {interval:0, rotate:50, textStyle:{color:'#000'}}
                }
            ],
            yAxis: [
                {
                    name: this.yAxis,
                    type: 'value',
                    axisLine:{lineStyle:{color:'#000'}},
                    axisLabel: {
                        textStyle:{color:'#000'},
                        formatter:function(value){
                            return setUnit(value);
                        },
                    }
                }
            ],
            dataZoom: [{
                show: true,
                height: 30,
                bottom: 10,
                startValue: this.xdata[0],
                endValue: this.xdata[9],
                handleSize: '100%',
            }, {type: 'inside'}],
            series: series
        };
        
        return option;
    }

    //画折线图
    line2(){
        let series = [];

        this.vdata.forEach((val, index) => {
            var bs = {
                name: this.title,
                type: 'line',
                smooth: true,
                itemStyle: {normal: {}},
                data: val,
                markLine: {
                    lineStyle: {
                        normal: {
                            color: '#fc97af'
                        }
                    },
                    label: {
                        normal: {
                            position: 'start'
                        }
                    },
                    data: [{
                        name: '平均值',
                        type: 'average'
                    }]
                }
            };
            series.push(bs);  
        });
        
        var option = {
            title: {
                text: this.title,
                x: 'left',
                textStyle: {
                    color: '#333',
                    fontWeight: 'normal',
                    fontSize: '16'
                },
                top: 10,
                padding:[0,12,0]
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: '{b}月<br>{c}天'
            },
            grid: {
                top: '40px',
                left: '50px',
                right: '15px',
                bottom: '20px',
            },
            xAxis: {
                type: 'category',
                axisLine: {
                    show: true,
                },
                splitLine: {
                    show: false,
                },
                data: this.xdata
            },
            yAxis: {
                min:'dataMin',
                type: 'value'
            },
            label: {
                normal: {
                    show: true,
                    position: 'top', //值显示
                    format:'{c}例'
                }
            },
            series: series
        };

        return option;
    }

}

//设置单位
function setUnit(value) {
    if(value >= 100000000) {
        return value / 100000000 + ' 亿'
    } else if(value >= 1000000) {
        return value / 10000 + ' 万'
    } else {
        return value + ''
    }
}


//导出
export { LineChart }