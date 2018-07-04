<template>
    <div class="barView">
        <h4>直接使用</h4>
        <div id="barNormal" class="inner" style="width:80%;height:500px;"></div>
        <div id="barWithLine" class="inner" style="width:80%;height:500px;"></div>
        <div id="barPer" class="inner" style="width:80%;height:500px;"></div>
        <div id="barDynamic" class="inner" style="width:80%;height:500px;"></div>

        <h4>使用组件</h4>
        <chart-item :data="barNormalData" chartId="组件01"></chart-item>
        <chart-item :data="barWithLineData" chartId="组件02"></chart-item>

    </div>
</template>

<script>
    import {SuCharts} from '@/assets/scripts/charts/suCharts.js'
    import {makeChart, dataGet} from '@/assets/scripts/tools/fun.js' //全局函数
    import chartItem from '@/components/chartItem'
	
	export default {
        name: "barView",
        data (){
            return{
                randomTime: Math.random()*500+500,
                barNormalData: {},
                barWithLineData: {},
                chartConfig:{
                    "ifTitle": true,
                    "ifDataZoom": true,
                },
                chartConfig1:{
                    barConfig:{
                        barWidth: '20%'
                    }
                }
            }
        },
        methods:{
            
        },
        mounted(){
            //普通柱状图
            dataGet("barData", (data)=>{
                this.barNormalData = data;
                console.log(this.barNormalData);
                data.title = "普通柱状图101";
                var chart = new SuCharts(data, "barNormal", 101);
                chart.drawChart(this.chartConfig); //二级图表重绘 
            });
            //柱状图+增长率
            dataGet("barWithLine", (data)=>{
                this.barWithLineData = data;
                data.title = "柱状图+增长率100";
                var chart = new SuCharts(data, "barWithLine", 100);
                chart.drawChart(this.chartConfig); //二级图表重绘
            });
            //百分柱状图
            dataGet("barPerData", (data)=>{
                data.title = "百分比柱状图105";
                var chart = new SuCharts(data, "barPer", 105);
                chart.drawChart(this.chartConfig); //二级图表重绘
            });
            //动态求和
            dataGet("barPerData", (data)=>{
                data.title = "柱状图动态求和113";
                var chart = new SuCharts(data, "barDynamic", 113);
                chart.drawChart(this.chartConfig1); //二级图表重绘
            });
            
        },
        components: {
            chartItem
        }
	}
	
</script>

<style lang="scss" type="test/css">
    .barView{
        h4{
            text-align: center;
            font-size: 20px;
        }
    }
    
</style>
