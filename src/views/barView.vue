<template>
    <div class="barView">
        <p id="barNormal" style="width:80%;height:500px;"></p>
        <p id="barWithLine" style="width:80%;height:500px;"></p>
        <p id="barPer" style="width:80%;height:500px;"></p>
        <p id="barDynamic" style="width:80%;height:500px;"></p>
    </div>
</template>

<script>
    import {SuCharts} from '@/components/charts/suCharts.js'
    import {makeChart, dataGet} from '@/components/tools/fun.js' //全局函数
	
	export default {
        name: "barView",
        data (){
            return{
                randomTime: Math.random()*500+500,
                bardata01: []
            }
        },
        methods:{
            
        },
        mounted(){
            //普通柱状图
            dataGet("barData", (data)=>{
                data.title = "普通柱状图101";
                var chart = new SuCharts(data, "barNormal");
                chart.drawChart(101, true); //二级图表重绘
            });
            //柱状图+增长率
            dataGet("barWithLine", (data)=>{
                data.title = "柱状图+增长率100";
                var chart = new SuCharts(data, "barWithLine");
                chart.drawChart(100); //二级图表重绘
            });
            //百分柱状图
            dataGet("barPerData", (data)=>{
                data.title = "百分比柱状图105";
                var chart = new SuCharts(data, "barPer");
                chart.drawChart(105); //二级图表重绘
            });
            //动态求和
            dataGet("barPerData", (data)=>{
                data.title = "柱状图动态求和113";
                var chart = new SuCharts(data, "barDynamic");
                chart.drawChart(113, true); //二级图表重绘
            });
            
        },
        components: {
            
        }
	}
	
</script>

<style lang="scss" type="test/css">
    .barView{
        overflow-y: auto;
        width:100%;
        height:100%;
    }

    .suCharts{
        float: left;
    }

    
</style>
