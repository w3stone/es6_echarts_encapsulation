
## 数据格式(Data Format)
```javascript

  data:{
    "chartData": [ //主要数据
      {"x":"", "y":"", "value":0, "name":""},
      {"x":"", "y":"", "value":0, "name":""},
      ......
    ],
    "title":"", //标题
	"chartType": 0, //图表模板id
    "xTitle": "", //x轴标题
    "yTitle": "", //y轴标题
    "xUnit": "", //x轴单位
    "yUnit": "", //y轴单位
    "vUnit": "", //value轴单位   
}

```

## 使用方法(How to Use)

### 1、使用chartItem组件(Use chartItem template)

```html

    <chart-item :data="data" chartId="id" :chartType="101" chartConfig=""></chart-item>

```

### 2、直接使用(Direct Use)

```javascript

    var chart = new SuCharts(data, chartId, chartType);
    chart.drawChart(chartConfig);

```

### 补充(Additional Remarks)
chartType: see in "@/assets/scripts/charts/suCharts.js"
chartConfig: see in "@/assets/scripts/charts/tools/defaultConfig.js"
