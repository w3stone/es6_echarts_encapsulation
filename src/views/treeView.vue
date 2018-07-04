<template>
    <div class="pieView">
        <chart-item :data="treeData01" chartId="树状图01" height="600px"></chart-item>
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
                treeData01: {},
                pieData02: {},
            }
        },
        mounted(){
            //树状图数据
            dataGet("treeData", (data)=>{
                console.log(data);
                data.chartType = 98;
                this.treeData01 = data;
               
            });

        },
        components:{
            chartItem
        }
	}
	
</script>

<style lang="scss" type="test/css">

</style>
