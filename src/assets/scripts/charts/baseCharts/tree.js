/**饼图封装**/
import {BaseChart} from './baseChart.js'

class TreeChart extends BaseChart {
    
    constructor(data){
        super(data);
        this.treeData = data.treeData || [];
    }

    //水平树图
    tree_horizon(){
        let option = {
            tooltip: {
                trigger: 'item',
                //triggerOn: 'mousemove'
            },
            series:[
                {
                    type: 'tree',
                    data: [this.treeData],
                    symbol: 'emptyCircle',
                    //orient: 'vertical',
                    label: { 
                        normal: {
                            position: 'top',
                            rotate: 0,
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 14,
                            offset: [10, -20],
                            formatter:(ele)=>{
                                var data = ele.data;
                                return data.value? data.name+":"+data.value+ "("+ this.vUnit +")": data.name + "("+ this.vUnit +")";
                                //return data.value?"("+ this.vUnit +")" + data.name+":"+data.value: "("+ this.vUnit +")"+ data.name;
                            }
                        }
                    },
                    leaves: {
                        label: {
                            normal: {
                                //show:false,
                                position: 'bottom',
                                verticalAlign: 'middle',
                                align: 'left',
                                fontSize: 14,
                                offset: [10, -10]
                            }
                        }
                    },
                    left: '15%',
                    right: '10%',
                    top: '10%',
                    bottom: '10%',
                    width: '50%',
                    //expandAndCollapse: true,
                    //animationDurationUpdate: 400
                }
            ]
        }
        return option;
    }

    //纵行树图
    tree_vertical(){
        let option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series:[
                {
                    type: 'tree',
                    data: [this.treeData],
                    symbol: 'emptyCircle',
                    orient: 'vertical',
                    label: { 
                        normal: {
                            position: 'top',
                            rotate: 0,
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 16,
                            formatter:(ele)=>{
                                var data = ele.data;
                                return data.value? data.name+":"+data.value: data.name;
                            }
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
                    left: '4%',
                    right: '4%',
                    top: '15%',
                    bottom: '25%'
                    //expandAndCollapse: true,
                    //animationDurationUpdate: 750
                }
            ]
        }
        return option;
    }

}

//导出
export { TreeChart }