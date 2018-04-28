<template>
    <div class="lineView">
        <p id="line01" style="width:46%;height:300px;"></p>  
    </div>
</template>

<script>
	
	export default {
        name: "lineView",
        data (){
            return{
                randomTime: Math.random()*500+500
            }
        },
        methods:{
            
        },
        mounted(){
            

        }
	}
	
</script>

<style lang="scss" type="test/css">
    .lineView{
        overflow-y: auto;
        width:100%;
        height:100%;
    }

    
</style>
