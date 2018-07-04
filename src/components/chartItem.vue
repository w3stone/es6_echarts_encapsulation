<template>
    <div class="chart_item" :style="{height:f_height}">
        <div class="chart_panel" :id="finalChartId" :style="{height:f_height}">
            <div class="no_data center" v-show="data">
                <img src="../assets/img/noData.png" />
            </div>
        </div>
    </div>
</template>

<script>
    import {SuCharts} from '@/assets/scripts/charts/suCharts.js'
    
    export default {
        name: "chartItem",
        props:{
            data:{ //主要数据源
                type: Object,
                required: true
            },
            chartId:{ //图表id
                type: String,
                required: false
            },
            chartType:{ //图表模板序号
                type: Number,
                required: false
            },
            chartConfig:{ //图表配置项
                type: Object,
                required: false
            },
            height:{
                type: String,
                required: false
            }
        },
        data: function() {
            return {
                
            }
        },
        computed:{
            chart(){
                let chart = new SuCharts(this.data, this.finalChartId, this.finalChartType);
                return chart;
            },
            option(){ //echarts配置项
                return this.chart.setOption(this.chartConfig); //初始化option，并添加config
            },
            finalChartId(){
                return this.chartId || this.data.title;
            },
            finalChartType(){
                return parseInt(this.chartType || this.data.chartType);
            },
            f_height(){
                return this.height || "400px";
            }
        },
        mounted(){
            //console.log(this.option);
            if(this.data.chartData && this.finalChartId && this.finalChartType){
                //this.drawChart(); //绘制图表 
            }
            
        },
        methods:{
            //绘制图表
            drawChart(){
                if($("#"+ this.finalChartId).length>0){
                //if(this.option['series'].length>0 && Object.keys(this.option).length>0){
                    let echart = echarts.init(document.getElementById(this.finalChartId), "macarons"); //初始化echarts实例

                    echart.setOption(this.option);
                    //屏幕大小改变
                    window.addEventListener("resize", ()=>{
                        echart.resize();
                    });
                } 
            }

        },
        watch:{
            data:{
                immediate: true,
                handler(newVal, oldVal){
                    this.drawChart();
                }
            },
        }

	}
</script>

<style lang="scss" scoped="" type="text/css">
    .chart_item{
        box-sizing: border-box;
        width: 100%;
        padding: 16px;
        border-bottom: 1px solid #e6e6e6;
        background-color: #fff;
        margin-bottom: 10px;

        .title{
            font-weight: normal;
            font-size: 18px;
        }

        .chart_panel{
            position: relative;
            width: 100%;

            .no_data{
                width: 100px;
                height: 100px;
            }

        }
        
    }

</style>