/**饼图封装**/
import {BaseChart} from './baseChart.js'

class TreeChart extends BaseChart {
    
    constructor(data){
        super(data);
        this.treeData = data.treeData || [];
    }

    //占比饼图
    tree(treeConfig){
        let option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series:[
                {
                    type: 'tree',
                    data: [this.treeData],
                    left: '4%',
                    right: '4%',
                    top: '15%',
                    bottom: '25%',
    
                    symbol: 'emptyCircle',
    
                    orient: 'vertical',
    
                    expandAndCollapse: true,
    
                    label: { 
                        normal: {
                            position: 'top',
                            rotate: 0,
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 16
                        }
                    },
    
                    leaves: {
                        label: {
                            normal: {
                                position: 'bottom',
                                rotate: -90,
                                verticalAlign: 'middle',
                                align: 'left',
                                fontSize: 10
                            }
                        }
                    },
    
                    animationDurationUpdate: 750
                }
            ]
        }
        
        return option;
    }

}

//导出
export { TreeChart }