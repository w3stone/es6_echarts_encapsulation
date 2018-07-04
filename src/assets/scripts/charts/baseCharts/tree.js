/**饼图封装**/
import {BaseChart} from './baseChart.js'
import {makePieData} from '../tools/makeData.js'

class PieChart extends BaseChart {
    
    constructor(data){
        super(data);
        this.legenddata = [];
        this.vdata = [];
    }

    //占比饼图
    tree(treeConfig){
        this._init();
        let series = [];

        let innerRadius = pieConfig.innerRadius || '0';
        let outerRadius = pieConfig.outerRadius || '60%';

        //其它series配置项
        var config = {
            name: '占比',
            type: 'pie',
            label: { normal: { formatter: '{b} : {c} ({d}%)' } },
            radius: [innerRadius, outerRadius],
            center: ['50%', '58%'],
            data: this.chartData
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