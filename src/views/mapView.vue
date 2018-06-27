<template>
    <div class="mapView">
        <p id="map01" style="width:80%;height:500px;"></p>
    </div>
</template>

<script>
    import {SuCharts} from '@/assets/scripts/charts/suCharts.js'
    import {makeChart, dataGet} from '@/assets/scripts/tools/fun.js' //全局函数

	export default {
        name: "mapView",
        data (){
            return{
                randomTime: Math.random()*500+500
            }
        },
        methods:{
            
        },
        mounted(){
            //普通柱状图
            dataGet("mapData", (data)=>{
                data.title = "地图99";
                var chart = new SuCharts(data, "map01");
                chart.drawChart(99); //二级图表重绘
            });

        }
	}
	
</script>

<style lang="scss" type="test/css">
    .mapView{
        overflow-y: auto;
        width:100%;
        height:100%;
    }

    
</style>
