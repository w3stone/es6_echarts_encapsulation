/**饼图封装**/
import {BaseChart} from './baseChart.js'

class PieChart extends BaseChart {
    
    constructor(data){
        super(data);
        this.legenddata = [];
        this.vdata = [];
    }

    //拼饼图格式(xdata, ydata, vdata)
    makePieData() {
        var legenddata = Enumerable.From(this.list).Select('$.name').ToArray();
        var vdata = [];
        var sum = Enumerable.From(this.list).Sum('$.value');

        legenddata.forEach((val)=>{
            var value = Enumerable.From(this.list).Where('$.name=="' + val +'"').Sum('$.value');
            var perValue = parseFloat( (perValue/sum*100).toFixed(2) );
            vdata.push(value);
        });

        this.legenddata = legenddata;
        this.vdata = vdata;

        return this;
    }

    //占比饼图
    pie(){
        var series = [];
        var seriesData = [];
        var sum = 0; //总和
        
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
            label: { normal: { formatter: '{b}({d}%)' } },
            radius: [0, '60%'],
            center: ['50%', '60%'],
            data: seriesData
        }
        series.push(config);

        var option = {
            title: {
                text: this.title,
                x: 'center',
                top: 16,
                padding: [0, 12, 0]
            },
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