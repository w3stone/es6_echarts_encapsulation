<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" type="text/css">
    #app {
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        height: 100%;
    }
    html,body{
        font-size: 14px;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        overflow-y: auto;
        font-family: Arial,'Microsoft YaHei';
    }
    .clearfix::after{
        display: table;
        clear: both;
    }
    .clearfix{
        *zoom:1;
    }
    h1,h2,h3,h4,h5,h6{
        margin: 0;
        padding: 0;
    }
    div,p{
        margin: 0;
        padding: 0;
    }
    img{
        width: 100%;
        vertical-align: middle;
    }
    i{
        font-style: normal;
    }
    ul,ol,ul li,ol li{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    a{
        text-decoration: none;
        &:focus{
            outline: none;
        }
    }
    input,button{
        border: none;
        outline: none;
    }
    .inner{
        margin: 0 auto;
    }
    .center{
        position: absolute;
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    //自定义表格样式
    table{
        width: 100%;
        margin: 10px 0;
        background-color: #fff;
        border-collapse: collapse;
        border-spacing: 0;

        th,td{
            position: relative;
            padding: 18px 15px;
            min-height: 20px;
            line-height: 20px;
            font-size: 14px;
            font-weight: normal;
            text-align: center;
        }
        thead>tr{
            background-color: #fbfbfb; 
        }
        
        tbody>tr{
            &:nth-child(even){
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
    .table-normal{
        border: 1px solid $tableBorderColor;
        
        // th{
        //     border: 1px solid $tableBorderColor;  
        // }

        // td{
        //     border: 1px solid $tableBorderColor;
        //     border-top: none;
        // }

        // tbody{
        //     border-right: 1px solid $tableBorderColor; 
        // }

    }

    //label标签
    .label{
        display: inline;
        padding: .2em .6em .3em;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: .25em;
    }
    .label-info{
        background-color: #49b8ff !important;
    }
    .label-success{
        background-color: #a4ce4e !important;
    }
    
</style>
