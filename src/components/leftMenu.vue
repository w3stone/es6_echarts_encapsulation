<template>
	<div class="leftMenu clearfix" id="leftMenu">
        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
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
            <!-- <el-menu-item index="/line">
                <i class="el-icon-setting"></i>
                <span slot="title">折线图</span>
            </el-menu-item>
            <el-menu-item index="/scatter">
                <i class="el-icon-setting"></i>
                <span slot="title">散点图</span>
            </el-menu-item>
            <el-menu-item index="/map">
                <i class="el-icon-setting"></i>
                <span slot="title">地图</span>
            </el-menu-item> -->
        </el-menu> 
    </div>
</template>

<script>
	export default {
	    name:'leftMenu',
	  	data:function () {
		    return {
		    	
		    }
        },
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
    }
    
</style>