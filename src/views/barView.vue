<template>
    <div class="barView">
        <chart-item :data="barData02" title="101柱状图普通" chartId="bar01" :chartType="101"></chart-item>

        <chart-item :data="barData02" title="102柱状图+增长率" chartId="bar02" :chartType="102"></chart-item>

        <chart-item :data="barData05" title="103柱状图+折线图" chartId="bar03" :chartType="103"></chart-item>

        <chart-item :data="barData01" title="104柱状图普通(含平均值线)" chartId="bar04" :chartType="104"></chart-item>

        <chart-item :data="barData02" title="105柱状图百分比(相同xdata和为100%, 堆叠)" chartId="bar05" :chartType="105"></chart-item>

        <chart-item :data="barData02" title="106柱状图百分比(相同xdata和为100%)" chartId="bar06" :chartType="106"></chart-item>

        <chart-item :data="barData02" title="107柱状图百分比(相同ydata,即相同颜色和为100%)" chartId="bar07" :chartType="107"></chart-item>

        <chart-item :data="barData02" title="108柱状图百分比(相同ydata,即相同颜色和为100%)+增长率" chartId="bar08" :chartType="108"></chart-item>

        <chart-item :data="barData02" title="109柱状图(相同ydata,即相同颜色和为100%)+增长率" chartId="bar09" :chartType="109"></chart-item>

        <chart-item :data="barData02" title="110柱状图普通堆叠" chartId="bar10" :chartType="110"></chart-item>

        <chart-item :data="barData04" title="113柱状图动态求和" chartId="bar13" :chartType="113"></chart-item>
    </div>
</template>

<script>
    import {SuCharts} from '@/assets/scripts/charts/suCharts.js'
    import chartItem from '@/components/chartItem'
	
	export default {
        name: "barView",
        data (){
            return{
                barData01: {},
                barData02: {},
                barData03: {},
                barData04: {},
                barData05: {},
                chartConfig:{
                    "ifTitle": true,
                    "ifDataZoom": true,
                },
                chartConfig1:{
                    barConfig:{
                        barWidth: '20%'
                    }
                }
            }
        },
        methods:{
            
        },
        mounted(){
            //普通柱状图
            this.$dataGet("http://47.98.205.88:3000/api/barData.json", (data)=>{
                this.barData01 = data[0];
                this.barData02 = data[1];
                this.barData03 = JSON.parse(JSON.stringify(data[1]));
                this.barData03.xunit = "月份";

                // //直接绘制
                // var chart = new SuCharts(data, "barNormal", 101);
                // chart.drawChart(this.chartConfig); 
            });
            //普通柱状图
            this.$dataGet("http://47.98.205.88:3000/api/barData02.json", (data)=>{
                this.barData04 = data[0];
            });
            //柱状图+增长率
            this.$dataGet("http://47.98.205.88:3000/api/barData03.json", (data)=>{
                this.barData05 = data[0];
            });
        },
        components: {
            chartItem
        }
	}
	
</script>

<style lang="scss" type="test/css">
    .barView{
        h4{
            text-align: center;
            font-size: 20px;
        }
    }
    
</style>
