<template>
	<div class="tableItem" :id="tableId">
        <div class="title_bar clearfix">
            <h4>{{tableName}}</h4>
            <i class="el-icon-arrow-up collapseBtn" @click="toggleShow" :class="{hover:isShowing, unhover:!isShowing}"></i>
        </div>
        <transition name="slide-fade">
            <div class="table_box">
                <table class="su_table" stripe v-show="isShowing">
                    <colgroup>
                        <col v-for="(item, index) in tableList.thead" :key="index" :name="'td'+index">
                    </colgroup>

                    <thead>
                        <tr>
                            <th v-for="(item, index) in tableList.thead" :key="index">{{item}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(each, index) in tableList.tbody" :key="index">
                            <td v-for="(item, index) in each" :key="index" :class="'td'+index">{{item}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </transition>
    </div>
</template>

<script>
	export default {
        name:'tableItem',
        props:["tableName", "tableList", "tableId"],
        data: function(){
            return {
                isShowing: true //表格显示状态
            }
        },
        computed:{
            colNum(){
                return this.tableList.thead.length;
            },
            colWidth(){
                if(this.colNum!=0){
                    return parseInt(100/this.colNum);
                }else{
                    return 100;
                }
            }
        },
        methods:{
            //转换为千分位
            toThousands(num){
                num = (num || 0).toString();
                let result = '';
                while (num.length > 3) {
                    result = ',' + num.slice(-3) + result;
                    num = num.slice(0, num.length - 3);
                }
                if (num) { result = num + result; }
                return result;
            },
            check(val){
                if (!isNaN(val)){ //判断是否是数字
                    return this.toThousands(val);
                }else if(!val){
                    return "/";
                }else{
                    return val;
                }          
            },
            toggleShow(){
                this.isShowing = !this.isShowing;
            }
        }
	}
</script>

<style lang="scss" type="text/css">
    .tableItem{
        //标题
        .title_bar{
            position: relative;

            h4{
                font-size: 18px;
                height: 20px;
                color: #606060;
                font-weight: normal; 
                margin-bottom: 8px;
            }
            .collapseBtn{
                display: block;
                position: absolute;
                right: 8px;
                top: 0px;
                font-size: 25px;
                width: 25px;
                cursor: pointer;

                &.hover{
                    transform: rotate(180deg);
                    transition: all .5s;
                }
                &.unhover{
                    transform: rotate(360deg);
                    transition: all .5s;
                }
            }
        }

        //表格
        table{
            width: 100%;
            background-color: #fff;
            border-collapse: collapse;
            border-spacing: 0;

            th,td{
                position: relative;
                padding: 15px 15px;
                min-height: 20px;
                line-height: 20px;
                font-size: 14px;
                font-weight: normal;
                text-align: right;
                //border: 1px solid #ddd;
            }
            thead>tr{
                background-color: #fbfbfb; 
            }
            
            tbody>tr{
                &:nth-child(odd){
                    background-color: #fbfbfb;
                }
                
                &:hover{
                    background-color: $tableActiveColor;
                }
                
                &.active{
                    background-color: $tableActiveColor;
                } 
            }

        }
    
    }
    
</style>