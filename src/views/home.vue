<template>
    <div class="homeIndex">
	    <headerbar></headerbar>
        <div class="main_content clearfix">
            <left-menu></left-menu>
            <div class="main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import headerbar from '@/components/headerbar'
    import leftMenu from '@/components/leftMenu'
	
	export default {
        name: "home",
        data (){
            return{
                
            }
        },
		components:{
			headerbar,leftMenu
        },
        beforeCreate:function(){
            this.$router.push("/bar"); //默认路由
        }
	}
	
</script>

<style lang="scss" type="test/css">
    .homeIndex{
        width:100%;
        height:100%;

        .main_content{
            position: relative;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            padding-top: 60px;
            background: #fff;
            overflow-x: hidden;
            overflow-y: auto;

            .main{
                box-sizing: border-box;
                float: left;
                width: calc(100% - 100px);
                height: 100%;
                padding: 20px;
                overflow-x: hidden;
                overflow-y: auto;
            }
            
        }
        
    }
    
</style>