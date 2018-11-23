import FileSaver from 'file-saver'
import XLSX from 'xlsx'

//合并对象(临时方法)
function mergeJson(prev, next){
    var newJson = {};
    for(var key in prev){
        if(next.hasOwnProperty(key)){ //如果next有key属性
            if(typeof prev[key] == "object"){ //如果是对象
                //newJson[key] = Object.assign(prev[key], next[key]);
                newJson[key] = $.extend({}, prev[key], next[key]); //深拷贝
            }else{ //如果不是对象
                newJson[key] = next[key];
            }
        }else{ //如果next没有key属性
            newJson[key] = prev[key];
        }
    }
    //console.log(prev);
    return newJson;
}

//导出excel
function exportExcel(dom, excelName){
    /* generate workbook object from table */
    var wb = XLSX.utils.table_to_book(dom);
    /* get binary string as output */
    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), excelName + '.xlsx')
    } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
    return wbout;
}

export{
    mergeJson, exportExcel
}