//默认配置表
const defaultConfig = {
    ifTitle: false, //标题
    ifToolBox: true, //工具栏
    ifDataZoom: false, //区域缩放
    //柱状图配置项
    barConfig:{
        barWidth: '' //柱状图宽度
    },
    //饼图配置项
    pieConfig: {
        innerRadius: '0', //内圈半径
        outerRadius: '60%', //外圈半径
        pieLabelShow: true, //饼图数据显示
        xCenter: '50%', //
        yCenter: '60%' //
    },
    //散点图配置项
    scatterConfig:{
        symbolSize: 30 //默认散点大小
    }
    
}


export{
    defaultConfig
}