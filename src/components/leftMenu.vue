<template>
	<div class="leftMenu clearfix" id="leftMenu">
        <div class="logo_box">
            <div class="logo">
                <img src="../assets/img/logo.png">
            </div>
        </div>

        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical"
            @open="handleOpen"
            @close="handleClose"
            background-color="#ededed"
            text-color="#333"
            active-text-color="#3a8ee6"
            :router="true">
            <el-menu-item index="/bar">
                <i class="el-icon-setting"></i>
                <span slot="title">柱状图</span>
            </el-menu-item>
            <el-menu-item index="/pie">
                <i class="el-icon-setting"></i>
                <span slot="title">饼图</span>
            </el-menu-item>
            <el-menu-item index="/scatter">
                <i class="el-icon-setting"></i>
                <span slot="title">散点图</span>
            </el-menu-item>
            <el-menu-item index="/map">
                <i class="el-icon-setting"></i>
                <span slot="title">地图</span>
            </el-menu-item>
            <el-menu-item index="/special">
                <i class="el-icon-setting"></i>
                <span slot="title">特殊图</span>
            </el-menu-item>
            <el-menu-item index="/tree">
                <i class="el-icon-setting"></i>
                <span slot="title">树状图</span>
            </el-menu-item>
            
        </el-menu> 
    </div>
</template>

<script>
	export default {
	    name:'leftMenu',
        mounted(){
            //console.log(this.$route.path);
        },
        methods: {
            handleOpen(key, keyPath) {
                //console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                //console.log(key, keyPath);
            }
        }
	}
</script>

<style lang="scss" type="text/css">
    //样式重构
    .el-menu-vertical{
        height: 100%;
    }

    .el-menu-item{
        padding: 0 10px !important;
    }

    .leftMenu{
        position: relative;
        width: 100px;
        float: left;
        height: 100%;
        
        .logo_box{
            background-color: #ededed;
            text-align: center;
            padding: 10px 0;

            .logo{
                display: inline-block;
                width: 80px;
            }
        }
    }
    
</style>