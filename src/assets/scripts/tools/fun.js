import axios from 'axios'


//ajaxGet封装
function dataGet(apiName, params, callback){
    var url;

    if(apiName.indexOf("http")>-1 || apiName.indexOf("https")>-1){
        url = apiName;
    }else{
        url = "/static/api/" + apiName + ".json";
    }

    if (typeof arguments[1] == "function"){
        callback = arguments[1];
        params = {};
    }

    axios.get(url, {params: params}).then((response) => {
        var result = response.data.data;
        if(callback) callback(result);

    }).catch((error)=>{
        console.log(error);
        //if(callback) callback(0);

    });
}


export{
    dataGet
}
