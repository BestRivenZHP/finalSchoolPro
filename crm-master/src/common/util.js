/**
 * Created by ouyang on 2017/06/14.
 */

/*import { getOneGoods,getZsmInfo } from '../api/api'*/
var util ={

	//深复制，去除关联性
	deepClone:function(initalObj) {
		var obj = JSON.parse(JSON.stringify(initalObj));
		return obj;
	},
	//重置JSON为空
	resetJson:function(json){
		if(json == "" || json == null)return json;
		for(var o in json){
			json[o] = "";
		}
		return json;
	},

  /*//判断二维码||条形码  获取商品信息
  scanGetGoodsData:function(scancode){
    var codeInfo = scancode.split(",")
    var goodsData = {}
    if(codeInfo.length > 1){
      getZsmInfo({
        zsm: "201704270008100557090840"
      }).then(res => {
      goodsData = {"res": "溯源码"}
      return goodsData
      })
    }else {
      getOneGoods({
          bar_code: scancode
      }).then(function(res){
        goodsData = {"res": "条形码"}
         return goodsData
      })
    }
  },*/

}

export default util
