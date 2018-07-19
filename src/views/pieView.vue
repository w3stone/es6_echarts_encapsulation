<template>
    <div class="pieView">
        <p id="pieNormal" style="width:80%;height:500px;"></p>
        <chart-item :data="pieData01" chartId="饼图01"></chart-item>
        <chart-item :data="pieData02" chartId="饼图02" :chartConfig="config"></chart-item>
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
                pieData01: {},
                pieData02: {},
                config:{
                    pieConfig:{
                        innerRadius: '30%', //内圈半径
                    }
                }
            }
        },
        mounted(){
            //普通柱状图
            dataGet("http://47.98.205.88:3000/api/pieData.json", (data)=>{
                data.title = "普通饼图201";
                var chart = new SuCharts(data, "pieNormal", 201);
                chart.drawChart(); //绘制图表
            });

            //普通柱状图
            dataGet("http://47.98.205.88:3000/api/pieData.json", (data)=>{
                data.chartType = 201;
                this.pieData01 = JSON.parse(JSON.stringify(data));
                this.pieData02 = JSON.parse(JSON.stringify(data));
                this.pieData01.title = "普通饼图201";
                this.pieData02.title = "添加配置项201";
            });

        },
        components:{
            chartItem
        }
	}
	
</script>

<style lang="scss" type="test/css">

</style>
