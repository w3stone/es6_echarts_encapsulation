/**柱状图封装**/
import {BaseChart} from './baseChart.js'

class BarChart extends BaseChart {
    
    constructor(data){
        super(data);
        this.xdata = [];
        this.ydata = [];
        this.vdata = [];
    }

    //拼柱状图格式(xdata, ydata, vdata)
    makeBarData(need2Per) {
        if (need2Per != true)
            need2Per=false;

        var xdata = Enumerable.From(this.list).Select('$.x').Distinct().OrderBy().ToArray(); 
        var ydata = Enumerable.From(this.list).Select('$.y').Distinct().ToArray();
        var vdata = [];

        ydata.forEach((valy)=>{
            var arr = [];
            var sum = 0;
            xdata.forEach((valx)=>{
                if(need2Per){ //转换成百分比
                    var sum = Enumerable.From(this.list).Where('$.x=="' + valx+ '"').Sum('$.value');
                    arr.push( (Enumerable.From(this.list).Where('$.x=="' + valx + '"&$.y=="' + valy+'"').Sum('$.value')/sum*100).toFixed(2) );
                }else{
                    arr.push( Enumerable.From(this.list).Where('$.x=="' + valx + '"&$.y=="' + valy+'"').Sum('$.value') );
                }
                
            });
            vdata.push(arr);
        });

        this.xdata = xdata;
        this.ydata = ydata;
        this.vdata = vdata;

        return this;
    }

    //普通柱状图
    bar(){
        let series = [];

        //设置series配置项
        this.vdata.forEach((val, index) => {
            let bs = {
                name: this.ydata[index],
                type: 'bar',
                itemStyle: {normal: {}},
                data: val,
                barWidth: '18%',
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

    //柱状图百分比(y轴和为100%)
    barPercent(){
        let legenddata = this.ydata;
        let legshow=legenddata.length<=20;
        let series = [];
        
        this.vdata.forEach((val, index)=>{
            var bs = {
                name: this.ydata[index],
                type: 'bar',
                stack:'堆积',
                data: val,
                barWidth: '40%',
                label:{
                    normal:{
                        show: true,
                        postion: 'inside',
                    }	
                }
            };
            
            series.push(bs);
        });
        
        let option = {
            title:{text:this.title, right:'center'},
            legend: {
                data: legenddata,
                type:'scroll',
                top:'8%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {          
                    type: 'shadow'     
                },
                formatter:function(p){
                    var res="";
                    for(var i=0;i<p.length;i++){
                        if(p[i].value>0){
                            res+=p[i].seriesName+':'+p[i].value+'%</br>';
                        }
                    }
                    return res;
                }
            },
            grid: {
                top:'20%',
                left: '5%',
                right: '4%',
                bottom: '6%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                axisLine:{lineStyle:{color:'#000'}},
                data: this.xdata,
                axisLabel: {interval: 0,rotate: 50,textStyle:{color:'#000'}}
            },
            yAxis: {
                max:100,
                name:'',axisLine:{lineStyle:{color:'#000'}},
                type: 'value',
                axisLabel: {
                    textStyle:{color:'#000'},
                    formatter: '{value} %'
                }
            },
            series: series
        };

        return option;
    }

    //柱状图+增长率
    barWithLine(){
        let xdata = this.xdata;
        let ydata = [];
        let vdata = [];
        let series = [];

        //重新拼ydata
        this.ydata.forEach((val, index)=>{
            ydata.push(val);
            ydata.push(val+"增长率");
        });
        //重新拼vdata
        this.vdata.forEach((arr)=>{
            vdata.push(arr);
            let lastval = 0;
            let raiseArr = [];
            arr.forEach((val)=>{
                if(lastval != 0){
                    raiseArr.push( ((val-lastval)/lastval*100).toFixed(2)  )
                }else{
                    raiseArr.push(0);
                }
                lastval = val;
            });
            vdata.push(raiseArr);
        });

        vdata.forEach((val, index)=>{
            if(!index%2){ //柱图
                var bs = {
                    name: ydata[index],
                    type: 'bar',
                    data: val,
                    itemStyle:{normal:{color:''}},
                    label: {normal: {show: true,position: 'top'}},
                    barWidth:'30%'
                };
                series.push(bs);
            }else{ //增长率
                var rs = {
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

        let option = {
            title:{text: this.title, right:'center'},
            legend: {
                data: ydata,
                type:'scroll',
                top:'8%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { //坐标轴指示器，坐标轴触发有效
                    type: 'shadow' //默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                top:'20%',
                left: '5%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',axisLine:{lineStyle:{color:'#000'}},axisLabel:{textStyle:{color:'#000'}},
                    data: xdata
                }
            ],
            yAxis: [
                {
                    name: this.yAxis,
                    type: 'value',
                    axisLine:{lineStyle:{color:'#000'}},
                    axisLabel: {textStyle:{color:'#000'},
                        formatter: (value)=>{
                            return this.setUnit(value);
                        },
                    }
                },
                {   
                    name:'增长率(%)',
                    type:'value',
                    axisLine:{lineStyle:{color:'#000'}},
                    axisLabel: {textStyle:{color:'#000'}}
                }
            ], 
            // dataZoom: [{
            //     show: true,
            //     height: 30,
            //     bottom: 10,
            //     start: 0,
            //     end: 100,
            //     handleSize: '110%',
            // }, {type: 'inside'}],
            series: series
        };

        return option;
    }

    //各类占比柱状图(动态求和)
    barDynamic(chart){
        let selected = {};
        let series = [];
        let legenddata = this.ydata;
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
                areaStyle: {normal: {}},
                data: val,
                barWidth: '40%',
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

        let option = {
            title:{text: this.title, right:'center'},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    crossStyle: {
                        color: '#999'
                    }
                },
                formatter: function(params){
                    params.pop();
                    if (params[0]){
                        let res = params[0].name+'<br/>';
                        for (let i=0; i<params.length; i++) { 
                            res+= (params[i].marker + params[i].seriesName +" : "+ params[i].value +'<br/>');
                        }
                        return res;
                    } 
                }
            },
            legend: {
                data: legenddata,
                type: 'scroll',
                top: '6%'
            },
            xAxis: [{
                data: this.xdata,
            }],
            yAxis: [{
                name: '',
                type: 'value',
                axisLabel: {
                    formatter: function(value) {
                        if (value >= 100000000) {
                            return value / 100000000 + ' 亿'
                        } else if (value >= 1000000) {
                            return value / 10000 + ' 万'
                        } else {
                            return value + ''
                        }
                    },
                }
            }],
            grid: {
                top:'16%',
                left: '3%',
                right: '4%',
                bottom: '6%',
                containLabel: true
            },     
            series: series
        };
        
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

}

//导出
export { BarChart }
