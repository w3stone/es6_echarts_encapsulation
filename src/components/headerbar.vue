<template>
	<div class="header">
		<div class="leftLogo">
			<!-- <span class="logoNarrow"><img src="../assets/img/login_logo0.png"></span> -->
		</div>
		<div class="rightLogo">
			<span class="mainLogo">
				<img src="../assets/img/login_logo1.png">
			</span>
			<h1>{{ title }}</h1>
		</div>
		
	</div>
</template>

<script>
	export default {
	    name:'headerbar',
	  	data:function() {
		    return {
		    	title: '图表demo'
		    }
		}
	}
</script>

<style lang="scss" scoped="" type="text/css">
	.header{
		position: fixed;
		width: 100%;
		height: 60px;
		background: $pageColor;
		z-index: 9;
		border-bottom: 1px solid #ddd;
		
		.leftLogo{
			position: relative;
			float: left;
			//width: 110px;
			height: 60px;
			line-height: 60px;
			//background: $subColor;
			text-align: center;
			vertical-align: top;
			
			span{
				display: inline-block;
				width: 27px;
				height: 34px;
			}
		}
		
		.rightLogo{
			float: left;
			height: 60px;
			padding-left: 22px;
			background: #fff;
			
			span.mainLogo{
				display: block;
				float: left;
				font-size: 0;
				width: 78px;
				line-height: 60px;
			}
			
			h1{
    			float: left;
    			color: #1ba9fc;
    			font-size: 15px;
				font-weight: bold;
    			height: 20px;
				line-height: 20px;
				padding-top: 28px;
    			padding-left: 18px;
			}
		}
	}
</style>