<!--核心图表组件-->
<template>
    <div class="chart_item">
        <div class="chart_top" :style="{'height':f_height+'px'}">
            <div class="chart_inner">
                <div class="title_bar">
                    <h3 class="title">{{f_title}}</h3>
                </div>
                <!--图表-->
                <div class="chart_panel" :id="f_chartId"></div>
                
                <!--控制台显示option-->
                <p v-show="false">{{ JSON.stringify(option) }}</p>

                <div class="no_data center" v-show="f_chartData.length==0">
                    <img src="../assets/img/noData.png" />
                </div>
            </div>
        </div>

        <!--表格-->
        <!-- <div class="table_panel" v-show="f_tableShow">
            <table-item :tableList="tableList"></table-item>
        </div> -->
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    // import tableItem from './tableItem'
    import {SuCharts} from '@/assets/scripts/charts/suCharts.js'
    import {makeBarTable, make2DTable, make4DTable} from '@/assets/scripts/charts/tools/tableFn.js'
    
    export default {
        name: "chartItem",
        props:{
            data:{ type: Object, required: true},
            title: String,
            chartId: String,
            chartType: Number,
            config: Object,
            iconURL: String,
            height: Number,
            immediate: Boolean, //watch
            showtable: Boolean
        },
        data() {
            return {
                echart: {}, //生成的echart对象
                tableList: { //表格数据
                    thead:[],
                    tbody:[]
                },
                tableData: {},
                option: {}
            }
        },
        computed:{
            level3Id(){ //三级菜单id
                return this.$route.query.chartId;
            },
            dataString(){ //用于watch(Immediate为false)默认
                if(this.immediate==false || this.immediate==undefined){
                    return JSON.stringify(this.data);
                }else{
                    return "";
                }          
            },
            dataStringImmediate(){ //用于watch(Immediate为true的情况)
                if(this.immediate==true){
                    return JSON.stringify(this.data);
                }else{
                    return "";
                }
            },

            f_title(){
                let title =  this.title || this.data.title || "";
                return  title
            },

            f_chartId(){ return this.chartId || "" },

            f_chartData(){ return this.data.chartdata || [] }, //用于绘图数据

            f_chartType(){ return this.chartType || this.data.charttype || 0 },
            
            f_tableShow(){ return this.showtable; },
            
            //最终图片绝对路径
            f_iconURL(){
                //console.log(this.data); 
                let iconURL = this.iconURL || this.data.iconSource || "";
                return iconURL? this.imgDomain +'/menu_icon' + iconURL: "";
            },

            f_height(){ return this.height || 450 },

        },
        methods:{
            ...mapMutations({
                changeChartDgVisible: "changeChartDgVisible",
                innerChartData: 'changeInnerChartData' //改变图表弹框数据
            }),
            makeTableList(){
                if(this.f_chartData.length==0){
                    return {thead:[],tbody:[]};
                }

                let chartType = this.f_chartType;
                if((chartType>=100 && chartType<=199) || (chartType>=300 && chartType<=399)){
                    return makeBarTable(this.tableData);

                }else if(chartType>=400 && chartType<=499){
                    return make4DTable(this.tableData);

                }else{
                    return make2DTable(this.tableData);

                }
            },
            //绘制图表
            drawChart(){
                if($("#"+ this.f_chartId).length>0){
                    let suCharts = new SuCharts(this.data, this.f_chartId, parseInt(this.f_chartType));
                    
                    this.option = suCharts.setOption(this.config);
                    this.tableData = suCharts.chartObj;

                    let echart = echarts.init(document.getElementById(this.f_chartId), "macarons"); //初始化echarts实例

                    echart.clear(); //清空
                    echart.setOption(this.option);

                    //屏幕大小改变
                    window.addEventListener("resize", ()=>{
                        echart.resize();
                    });
                } 
            }

        },
        watch:{
            dataString:{
                immediate: false,
                handler(newVal, oldVal){
                    if(newVal=="") return false;
                    this.$nextTick(()=>{
                        //console.log("newVal", newVal);
                        //console.log("oldVal", oldVal);
                        //console.log( JSON.stringify(this.option) );
                        this.drawChart(this.config);
                        this.tableList = this.makeTableList(); //给tableList附上数据
                        //console.log(this.tableList);
                    }) 
                }
            },
            dataStringImmediate:{
                immediate: true,
                handler(newVal, oldVal){
                    if(newVal=="") return false;
                    this.$nextTick(()=>{
                        //console.log("newVal", newVal);
                        // console.log("oldVal", oldVal);
                        // console.log( JSON.stringify(this.option) );
                        this.drawChart(this.config);
                        this.tableList = this.makeTableList(); //给tableList附上数据
                        //console.log(this.tableList);
                    }) 
                }
            },
        }

	}
</script>

<style lang="scss" scoped="" type="text/css">
    $chartTitleHeight: 36px;

    .chart_item{
        //box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #ededed;
        padding: 0 16px;

        .chart_inner{
            position: relative;
            height: 100%;

            //没有数据图片
            .no_data{
                width: 100px;
                height: 100px;
            }
        }
        .chart_top{
            padding: 16px 0;
            box-sizing: border-box;
        }
        .table_panel{
            padding-bottom: 16px;
        }

        //标题
        .title_bar{
            position: relative;
            height: $chartTitleHeight;
            line-height: $chartTitleHeight;

            .title_icon{
                display: block;
                float: left;
                width: $chartTitleHeight;
                height: $chartTitleHeight;
            }
            .title{
                padding-left: $chartTitleHeight;
                font-weight: normal;
                font-size: 18px;
            }
        }
        //图表
        .chart_panel{
            position: relative;
            width: 100%;
            height: calc(100% - #{$chartTitleHeight}); //panel高度
        }
    
    }
</style>