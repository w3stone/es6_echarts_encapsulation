<template>
    <div class="scatterView">
        <p id="scatterNormal" style="width:80%;height:500px;"></p>
    </div>
</template>

<script>
    import {SuCharts} from '@/assets/scripts/charts/suCharts.js'
    import {makeChart, dataGet} from '@/assets/scripts/tools/fun.js' //全局函数
	
	export default {
        name: "scatterView",
        methods:{
            
        },
        mounted(){
            //普通柱状图
            dataGet("scatterData", (data)=>{
                data.title = "普通散点图106";
                var chart = new SuCharts(data, "scatterNormal");
                chart.drawChart(106); //二级图表重绘
            });
        }
	}
	
</script>

<style lang="scss" type="test/css">
    .scatterView{
        overflow-y: auto;
        width:100%;
        height:100%;
    }

    
</style>
