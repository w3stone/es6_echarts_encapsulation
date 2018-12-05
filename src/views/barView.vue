<template>
    <div class="barView">
        <chart-item :data="barData02" title="101柱状图普通" chartId="bar01" :chartType="101"></chart-item>

        <chart-item :data="barData02" title="102柱状图+增长率" chartId="bar02" :chartType="102"></chart-item>

        <!-- <chart-item :data="barData03" title="103柱状图+折线图" chartId="bar03" :chartType="103"></chart-item> -->

        <chart-item :data="barData01" title="104柱状图普通(含平均值线)" chartId="bar04" :chartType="104"></chart-item>

        <chart-item :data="barData02" title="105柱状图百分比(相同xdata和为100%, 堆叠)" chartId="bar05" :chartType="105"></chart-item>

        <chart-item :data="barData02" title="106柱状图百分比(相同xdata和为100%)" chartId="bar06" :chartType="106"></chart-item>

        <chart-item :data="barData02" title="107柱状图百分比(相同ydata,即相同颜色和为100%)" chartId="bar07" :chartType="107"></chart-item>

        <chart-item :data="barData04" title="113柱状图动态求和" chartId="bar08" :chartType="113"></chart-item>

        <chart-item :data="barData03" title="x轴单位不为“年”或“月”，自动出现滚动条" chartId="bar09" :chartType="106"></chart-item>
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

                // //直接绘制
                // var chart = new SuCharts(data, "barNormal", 101);
                // chart.drawChart(this.chartConfig); 
            });
            // //柱状图+增长率
            // dataGet("barWithLine", (data)=>{
            //     data.title = "柱状图+增长率102";
            //     data.chartType = 102;
            //     this.barWithLineData = data;
                
                
            //     //直接绘制
            //     var chart = new SuCharts(data, "barWithLine", 102);
            //     chart.drawChart(this.chartConfig); 
            // });
            // //百分柱状图
            // dataGet("barPerData", (data)=>{
            //     data.title = "百分比柱状图105";
            //     var chart = new SuCharts(data, "barPer", 105);
            //     chart.drawChart(this.chartConfig);
            // });
            // //动态求和
            // dataGet("barPerData", (data)=>{
            //     data.title = "柱状图动态求和113";
            //     var chart = new SuCharts(data, "barDynamic", 113);
            //     chart.drawChart(this.chartConfig1);
            // });
            
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
