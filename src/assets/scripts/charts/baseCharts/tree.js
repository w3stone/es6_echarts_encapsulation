/**饼图封装**/
import {BaseChart} from './baseChart.js'

class TreeChart extends BaseChart {
    
    constructor(data){
        super(data);
        this.treeData = data.treeData || [];
    }

    //占比饼图
    tree2(){
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
                                position: 'bottom',
                                rotate: -90,
                                verticalAlign: 'middle',
                                align: 'left',
                                fontSize: 11,
                                offset: [0, 5]
                            }
                        }
                    },
                    left: '4%',
                    right: '4%',
                    top: '10%',
                    bottom: '25%',
                    height: 240
                    //expandAndCollapse: true,
                    //animationDurationUpdate: 400
                }
            ]
        }
        
        return option;
    }

    //横向树状图
    tree(chart){
        var treeData = this.treeData;
        
        for(var i=0; i<treeData[0].children.length; i++){
            if(this.dataType && treeData[0].children[i].children.length>0 ){ //如果大于等于第三级，从第三级开始转换

                for(var j=0; j<treeData[0].children[i].children.length; j++){
                    treeData[0].children[i].children[j].children = filterTreeData(treeData[0].children[i].children[j].children);
                }
            }
        }


        let option = {
            tooltip: {
                trigger: 'item',
                //triggerOn: 'mousemove'
            },
            series:[
                {
                    type: 'tree',
                    data: treeData,
                    symbol: 'emptyCircle',
                    symbolSize: 10,
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
                    bottom: '25%',
                    width: '50%',
                    height: '400',
                    expandAndCollapse: true,
                    initialTreeDepth: 2,
                    symbolKeepAspect: true 
                    //animationDurationUpdate: 400
                }
            ]
        }

        // chart.on("click", (params)=>{
        //     console.log(params);
        //     //chart.setOption(option);
        // });
        
        return option;
    }

}

//导出
export { TreeChart }

//过滤树状图数据
function filterTreeData(data){
    var sum = Enumerable.from(data).sum('o=>o.value'); //value最大值
    var need2DeleteArr = [];
    var otherValue = 0;
    
    //寻找小于1%的项
    data.forEach((item,index)=>{
        if(parseFloat(item.value)/sum <0.01){
            need2DeleteArr.unshift(index);
            otherValue += parseFloat(item.value);
        }
    })
    
    if(need2DeleteArr.length>0){
        //删除被过滤的项
        need2DeleteArr.forEach((val)=>{
            data.splice(val, 1);
        })
        data.push({"name":"其它", "value":otherValue})
    }
    
    //递归
    data.forEach((item,index)=>{
        if(item.name!="其它" && item.children)
            item.children = filterTreeData(item.children);
    })
    
    return data;

}