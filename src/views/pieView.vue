<template>
    <div class="pieView">
        <p id="pieNormal" style="width:80%;height:500px;"></p> 
    </div>
</template>

<script>
    import {SuCharts} from '@/components/charts/suCharts'
    import {dataGet} from '@/components/tools/fun.js' //全局函数
	
	export default {
        name: "pieView",
        data (){
            return{
                randomTime: Math.random()*500+500
            }
        },
        mounted(){
            //普通柱状图
            dataGet("pieData", (data)=>{
                data.title = "普通饼图104";
                var chart = new SuCharts(data, "pieNormal");
                chart.drawChart(104); //二级图表重绘
            });

        }
	}
	
</script>

<style lang="scss" type="test/css">
    .pieView{
        overflow-y: auto;
        width:100%;
        height:100%;
    }

</style>
