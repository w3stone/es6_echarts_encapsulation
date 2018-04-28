/**地图封装**/
import {BaseChart} from './baseChart.js'

class MapChart extends BaseChart{

    //占比饼图
    map(){
        var seriesData = [];

        this.list.forEach((item, index) => {
            var d = {
                name: item.name, value: item.value,
                itemStyle: {
                    normal: {
                        areaColor: "#349eea",
                        borderColor: "#fff"
                    },
                    emphasis: {
                        areaColor: "#349eea",
                        borderColor: "#fff"
                    }
                }
            };
            seriesData.push(d);
        });

        var option = {
            title: {
                text: this.title,
                right:'center'
            },
            tooltip: {
                trigger: 'item',
                show: false
            },
            dataRange: {
                min: 0,
                max: 50,
                x: 'left',
                y: 'bottom',
                text: ['多', '少'], // 文本，默认为数值文本
                calculable: true,
                color: ['#5ab1ef', '#2ec7c9']//值域颜色349eea
            },
            series: [
                {
                    name: 'name',
                    type: 'map',
                    mapType: 'china',
                    zoom: 1.2,
                    selectedMode: 'single',
                    label: {
                        normal: {
                            show: true,
                            formatter: function (data) {
                                if (data.value) {
                                    return data.name + data.value;
                                } else {
                                    return data.name;
                                }
                            }
                        },
                        emphasis: {
                            show: true,
                            color: "#000"
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#ccc',
                            areaColor: '#f3f3f3',
                        },
                        emphasis: {
                            borderColor: '#ccc',
                            areaColor: '#f3f3f3'
                        }
                    },
                    data: seriesData
                }
            ]
        };

        return option;
    }

}

//导出
export {
    MapChart
}