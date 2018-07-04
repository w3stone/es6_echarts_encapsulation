<template>
    <div>
        <chart-item :data="specialData1" chartId="特殊01"></chart-item>
        <!-- <chart-item :data="specialData2" chartId="特殊02"></chart-item> -->
        <chart-item :data="specialData3" chartId="特殊03"></chart-item>
        <chart-item :data="specialData4" chartId="特殊04"></chart-item>
    </div>
</template>

<script>
    import {SuCharts} from '@/assets/scripts/charts/suCharts.js'
    import {makeChart, dataGet} from '@/assets/scripts/tools/fun.js' //全局函数
    import chartItem from '@/components/chartItem'

	export default {
        name: "mapView",
        data (){
            return{
                randomTime: Math.random()*500+500,
                specialData1:{},
                specialData2:{},
                specialData3:{},
                specialData4:{}
            }
        },
        methods:{
            
        },
        mounted(){
            //普通柱状图
            dataGet("http://47.98.205.88:3000/api/barData.json", (data)=>{
                data.title = "数量&增长率分开";
                data.chartType = 991;
                this.specialData1 = data;
            });

            //普通柱状图
            dataGet("http://47.98.205.88:3000/api/barData.json", (data)=>{
                data.title = "按年份分类";
                data.chartType = 990;
                this.specialData2 = data;
            });

            //普通柱状图
            dataGet("http://47.98.205.88:3000/api/barData02.json", (data)=>{
                data.title = "高级百分比";
                data.chartType = 992;
                this.specialData3 = data;
                console.log(this.specialData3);
            });

            //普通柱状图
            dataGet("http://47.98.205.88:3000/api/barData02.json", (data)=>{
                data.title = "饼图百分比";
                data.chartType = 993;
                this.specialData4 = data;
            });

        },
        components:{
            chartItem
        }
	}
	
</script>

<style lang="scss" type="test/css">
    
</style>
