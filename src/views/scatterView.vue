<template>
    <div class="scatterView">
        <chart-item :data="scatterData01" chartId="饼图01"></chart-item>
    </div>
</template>

<script>
    import {SuCharts} from '@/assets/scripts/charts/suCharts.js'
    import {makeChart, dataGet} from '@/assets/scripts/tools/fun.js' //全局函数
    import chartItem from '@/components/chartItem'
	
	export default {
        name: "scatterView",
        data (){
            return{
                scatterData01: {}
            }
        },
        mounted(){
            //普通柱状图
            dataGet("scatterData", (data)=>{
                data.title = "普通散点图106";
                data.chartType = 106;
                this.scatterData01 = data;
            });
        },
        components:{
            chartItem
        }
	}
	
</script>

<style lang="scss" type="test/css">
    
</style>
