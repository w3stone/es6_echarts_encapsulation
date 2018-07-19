import {BarChart} from "./baseCharts/bar.js";
import {PieChart} from "./baseCharts/pie.js";
import {LineChart} from "./baseCharts/line.js";
import {ScatterChart} from "./baseCharts/scatter.js";
import {MapChart} from "./baseCharts/map.js";
import {SpecialChart} from "./baseCharts/special.js";
import {TreeChart} from "./baseCharts/tree.js";
import {defaultConfig} from "./tools/defaultConfig.js"
import {mergeJson, exportExcel} from "./tools/otherFn.js"


class SuCharts{
    /**
     * data格式:{
     *      title: "",
     *      chartData: [],
     *      xUnit: "",
     *      xAxis: "",
     *      .....
     * }
     * **/
    //构建器
    constructor(data, panelId, chartType){
        this.data = data; //传入数据
        this.panelId = panelId; //dom节点id名
        this.chartType = chartType; //图表类型
        this.echart = {}; //创建的echarts对象
        this.chartObj = {}; //含data中的数据，及xdata, ydata, vdata等处理过的数据...
    }

    //设置option
    setOption(config){
        let option = {}; //option配置对象
        config = config? mergeJson(defaultConfig, config): defaultConfig; //合并对象

        switch (this.chartType){
            case 97: //水平树状图
                this.chartObj = new TreeChart(this.data);
                option = this.chartObj.tree_horizon();
                break;
            case 98: //纵向树状图
                this.chartObj = new TreeChart(this.data);
                option = this.chartObj.tree_vertical();
                break;
            case 99: //地图
                this.chartObj = new MapChart(this.data);
                option = this.chartObj.map();
                break;
            case 101: //柱状图普通
                this.chartObj = new BarChart(this.data);
                option = this.chartObj.bar(config.barConfig);
                break;
            case 102: //柱状图+增长率
                this.chartObj = new BarChart(this.data);
                option = this.chartObj.barWithLine(config.barConfig);
                break;
            case 105: //柱状图百分比
                this.chartObj = new BarChart(this.data);
                option = this.chartObj.barPercent(config.barConfig);
                break;
            case 106: //普通散点图
                this.chartObj = new ScatterChart(this.data);
                option = this.chartObj.scatter(config.scatterConfig);
                break;
            case 113: //柱状图动态求和
                this.chartObj = new BarChart(this.data);
                option = this.chartObj.barDynamic(this.echart, config.barConfig);
                break;
            case 12: //折线图普通
                nchart = new LineChart(this.data);
                option = nchart.line();
                break;
            case 201: //饼图
                this.chartObj = new PieChart(this.data);
                option = this.chartObj.pie(config.pieConfig);
                break;
            case 990: //年份分类
                this.chartObj = new SpecialChart(this.data);
                option = this.chartObj.special02();
                break;
            case 991: //数量&增长率分开
                this.chartObj = new SpecialChart(this.data);
                option = this.chartObj.special01();
                break;
            case 992: //高级百分比
                this.chartObj = new SpecialChart(this.data);
                option = this.chartObj.special03();
                break;
            case 993: //饼图百分比
                this.chartObj = new SpecialChart(this.data);
                option = this.chartObj.special04();
                break;
            default:
                option = {};  
        }

        //补充添加配置项
        if(config.ifTitle==true){
            option.title = addTitle(this.data.title);
        }
        if(config.ifToolBox==true){
            option.toolbox = addToolbox(this.data);
        }
        if(config.ifDataZoom==true && this.chartObj.xdata){
            option.grid.bottom = "10%"; //改变底部距离
            option.dataZoom = addDataZoom(this.chartObj.xdata);
        }

        return option;
    }

    //绘制图表
    drawChart(config){
        this.echart = echarts.init(document.getElementById(this.panelId), "macarons"); //初始化echarts实例
        let option = this.setOption(config);

        this.echart.setOption(option);  
        //屏幕大小改变
        window.addEventListener("resize", ()=>{
            this.echart.resize();
        });
        return this;
    }


    //绑定点击事件
    bind(callback){
        this.echart.on('click', (params)=> {
            console.log(params);
            callback(params.seriesIndex, params.seriesName); //回调函数
        });
    }

}

//导出
export { SuCharts }


//添加标题
function addTitle(chartTitle){
    let title = {
        text: chartTitle,
        right:'center',
        top: 10
    };
    return title;
}

//添加toolbox
function addToolbox(data){
    let toolbox = {
        right: 24,
        feature: {
            saveAsImage: { 
                show: true,
                title: '下载图片',
                backgroundColor:'#ffffff' 
            },
            //报表下载
            myDownload:{
                show: false,
                title: '下载报表',
                icon: 'path://M438.0166 0h208.33132v63.541053h384.892114v833.32528h-386.454598v126.040448H520.8283a755.201035 755.201035 0 0 1-81.249215 0c-58.853598-6.770768-117.186368-15.624849-175.519137-23.958101l-192.185643-27.083072L0 958.324072V63.020224L190.10233 36.457981l192.706471-27.083072z m527.599068 829.679482V129.165418h-319.267748v63.020225h61.978568v64.061881h-62.499396v63.020224h62.499396v65.624366h-62.499396v62.499396h62.499396v64.582709h-62.499396V572.91113h62.499396v65.103538h-62.499396v65.103537h62.499396v64.061881h-61.978568v62.499396zM128.123762 266.66409l5.208283 11.458222c35.416324 72.915962 71.353477 145.831924 107.29063 218.747886a25.520587 25.520587 0 0 1 0 26.562244l-117.186368 215.622916-5.729111 10.937394H216.143745a14.583192 14.583192 0 0 0 16.145677-10.416566c24.47893-56.249456 48.95786-112.498913 73.957618-168.748369v-5.208283c27.083072 61.457739 52.08283 122.915479 81.249215 184.894046a16.145677 16.145677 0 0 0 16.145678 11.458223l79.165901 4.687455h29.687213l-4.687454-9.895738q-63.020224-117.707196-127.602934-239.581018a22.395617 22.395617 0 0 1 0-23.437274q62.499396-117.707196 123.957135-236.456048l5.729112-11.458222h-21.353961l-81.249214 4.687454a14.583192 14.583192 0 0 0-14.583193 9.895738L329.163486 404.683589c-5.729111 13.020708-11.458223 26.562243-17.187334 41.145436l-4.687455-9.895738-60.936911-156.24849C238.539361 260.41415 238.539361 260.41415 216.664573 260.41415H208.33132z',
                onclick: function(){
                    var ele = $("#"+panelId).parent().find(".su_table");
                    exportExcel($(ele)[0], data.title);
                }
            }
        }
    };
    return toolbox;
}

//添加dataZoom
function addDataZoom(xdata) {
    let startValue = xdata[0];
    let endValue = xdata.length>10 ? xdata[9] : xdata[xdata.length-1];

    let dataZoom = [{
        show: true,
        height: 30,
        bottom: 10,
        startValue: startValue,
        endValue: endValue,
        handleSize: '110%',
    }, {type: 'inside'}];

    return dataZoom;
}