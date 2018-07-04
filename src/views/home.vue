<template>
    <div class="homeIndex clearfix">
        <left-menu></left-menu>
        <div class="main_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import leftMenu from '@/components/leftMenu'
	
	export default {
        name: "home",
		components:{
			leftMenu
        },
        beforeCreate:function(){
            this.$router.push("/bar"); //默认路由
        }
	}
	
</script>

<style lang="scss" type="test/css">
    .homeIndex{
        position: relative;
        width:100%;
        height:100%;
        background: #fff;
        overflow-x: hidden;
        overflow-y: hidden;         

        .main_content{
            box-sizing: border-box;
            float: left;
            width: calc(100% - 100px);
            height: 100%;
            padding: 20px;
            overflow-x: hidden;
            overflow-y: auto;
        }
                
    }
    
</style>