<template>
    <div class="pieView">
        <p id="pieNormal" style="width:80%;height:500px;"></p>
        <chart-item :data="pieData01" chartId="饼图01"></chart-item>
    </div>
</template>

<script>
    import {SuCharts} from '@/assets/scripts/charts/suCharts'
    import {dataGet} from '@/assets/scripts/tools/fun.js' //全局函数
    import chartItem from '@/components/chartItem'
	
	export default {
        name: "pieView",
        data (){
            return{
                pieData01: {}
            }
        },
        mounted(){
            //普通柱状图
            dataGet("http://47.98.205.88:3000/api/pieData.json", (data)=>{
                data.title = "普通饼图104";
                var chart = new SuCharts(data, "pieNormal", 104);
                chart.drawChart(); //二级图表重绘
            });

            //普通柱状图
            dataGet("http://47.98.205.88:3000/api/pieData.json", (data)=>{
                data.title = "普通饼图104";
                data.chartType = 104;
                this.pieData01 = data;
            });

        },
        components:{
            chartItem
        }
	}
	
</script>

<style lang="scss" type="test/css">
    .pieView{
        width:100%;
        height:100%;
    }

</style>
