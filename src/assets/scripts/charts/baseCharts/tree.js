/**饼图封装**/
import {BaseChart} from './baseChart.js'

class PieChart extends BaseChart {
    
    constructor(data){
        super(data);
        this.treeData = data.treeData || {};
    }

    //占比饼图
    tree(treeConfig){
        
        
        return option;
    }

}

//导出
export { PieChart }