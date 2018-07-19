<template>
    <div class="pieView">
        <chart-item :data="treeData01" chartId="树状图01" height="600px"></chart-item>
        <chart-item :data="treeData02" chartId="树状图02" height="1200px"></chart-item>
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
                treeData02: {},
            }
        },
        mounted(){
            //树状图数据
            dataGet("treeData", (data)=>{
                //console.log(data);
                data.chartType = 98;
                this.treeData01 = JSON.parse(JSON.stringify(data));
                this.treeData01.chartType = 98;
                this.treeData01.title = "纵向树状图";

                this.treeData02 = JSON.parse(JSON.stringify(data));
                this.treeData02.chartType = 97;
                this.treeData02.title = "水平树状图";
               
            });

        },
        components:{
            chartItem
        }
	}
	
</script>

<style lang="scss" type="test/css">

</style>
