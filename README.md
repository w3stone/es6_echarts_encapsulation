
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# 数据格式(Data Format)
data:{
	"chartData": [ //主要数据
		{"x":"", "y":"", "value":0, "name":""},
		{"x":"", "y":"", "value":0, "name":""},
		......
	],
    title:"", //标题
	chartType: 0, //图表模板id
    xTitle: "", //x轴标题
    yTitle: "", //y轴标题
    xUnit: "", //x轴单位
    yUnit: "", //y轴单位
    vUnit: "", //value轴单位   
}
