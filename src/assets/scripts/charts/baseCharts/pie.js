/**饼图封装**/
import {BaseChart} from './baseChart.js'
import {makePieData} from '../tools/makeData.js'

class PieChart extends BaseChart {
    
    constructor(data){
        super(data);
        this.legenddata = [];
        this.vdata = [];
    }

    _init(){
        let workedData = makePieData(this.chartData);
        this.legenddata = workedData.legenddata;
        this.vdata = workedData.vdata;
        //console.log(this.legenddata, this.vdata);
    }

    //占比饼图
    pie(pieConfig){
        this._init();
        let series = [];
        let seriesData = [];
        //let sum = 0; //总和

        //重构vdata数据
        this.vdata.forEach((val, index) => {
            if (!this.legenddata[index]) { 
                this.legenddata[index] = "未填";
            }
            var obj = { name: this.legenddata[index], value: val };
            seriesData.push(obj);
        });

        //其它series配置项
        var config = {
            name: '占比',
            type: 'pie',
            label: { 
                normal: { 
                    show: pieConfig.pieLabelShow,
                    formatter: '{b}({d}%)',
                    fontSize: 16
                } 
            },
            radius: [pieConfig.innerRadius, pieConfig.outerRadius],
            center: [pieConfig.xCenter, pieConfig.yCenter],
            data: seriesData
        }
        series.push(config);

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: series
        };
        
        return option;
    }

}

//导出
export { PieChart }