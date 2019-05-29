import axios from 'axios';
let crm='https://crm.jianong.com.cn'

let config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};
/*add*/
//基础数据->商品->商品->获取商品分类列表
export const getGoodsCategory = params => {
  return axios.get(`${crm}/api/v1/Goods/getGoodsCategory`,{
    params: params
  }).then(res => res.data);
};
//基础数据->商品->商品->新增商品分类
export const addGoodsCategory = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);;
  param.append('name', params.name);
  param.append('code', params.code);
  param.append('parent_id', params.parent_id);
  return axios.post(`${crm}/api/v1/Goods/editGoodsCategory`, param).then(res => res.data);
};
//基础数据->商品->商品->修改商品分类
export const editGoodsCategory = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);;
  param.append('name', params.name);
  param.append('code', params.code);
  param.append('id', params.id);
  param.append('parent_id', params.parent_id);
  return axios.post(`${crm}/api/v1/Goods/editGoodsCategory`, param).then(res => res.data);
};
// 基础数据->商品->商品->删除商品分类
export const delGoodsCategory = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);;
  param.append('id', params.id);
  return axios.post(`${crm}/api/v1/Goods/delGoodsCategory`, param).then(res => res.data);
};
// 基础数据->商品->商品->商品分类下的商品列表
export const getGoods = params => {
  return axios.get(`${crm}/api/v1/Goods/getGoods`,{
    params: params
  }).then(res => res.data);
};
//基础数据->商品->商品->商品分类下添加或者编辑商品
export const addGoods = params => {
  return axios.get(`${crm}/api/v1/Goods/editGoods`,{
    params: params
  }).then(res => res.data);
};
//基础数据->商品->商品->商品分类下删除商品
export const delGoods = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);;
  param.append('id', params.id);
  return axios.post(`${crm}/api/v1/Goods/delGoods`, param).then(res => res.data);
};
//基础数据->商品->商品->商品分类添加或者编辑商品时需要获取品牌列表
export const getGoodsBrand = params => {
  return axios.get(`${crm}/api/v1/Goods/getGoodsBrand`,{
    params: params
  }).then(res => res.data);
};
//系统管理->用户管理->组织机构列表
export const getOrg = params => {
  return axios.get(`${crm}/api/v1/Goods/getOrg`,{
    params: params
  }).then(res => res.data);
};
//系统管理->用户管理->组织机构列表添加
export const addOrg = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);
  param.append('name', params.name);
  param.append('org_code', params.org_code);
  param.append('parent_id', params.parent_id);
  return axios.post(`${crm}/api/v1/Goods/editOrg`, param).then(res => res.data);
};
//系统管理->用户管理->组织机构列表修改
export const editOrg = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);
  param.append('name', params.name);
  param.append('org_code', params.org_code);
  param.append('parent_id', params.parent_id);
  param.append('id', params.id);
  return axios.post(`${crm}/api/v1/Goods/editOrg`, param).then(res => res.data);
};
//系统管理->用户管理->组织机构列表删除
export const delOrg = params => {
  let param = new FormData(); //创建form对象
  param.append('id', params.id);
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/Goods/delOrg`, param).then(res => res.data);
};
//系统管理->用户管理->组织机构列表->用户列表
/*export const getUser = params => {
  return axios.get(`${crm}/api/v1/Goods/getUser`,{
    params: params
  }).then(res => res.data);
};*/
export const getUser = params => {
  let param = new FormData();
  param.append('ticket', params.ticket);
  return axios.post(`https://crm.jianong.com.cn/api/v1/users/getAllUser`, param).then(res => res.data);
}





//系统管理->用户管理->组织机构列表->用户列表->添加修改用户
/*export const editUser = params => {
  return axios.get(`${crm}/api/v1/Goods/editUser`,{
    params: params
  }).then(res => res.data);
};*/
//系统管理->用户管理->组织机构列表->用户列表->添加用户
export const addUser = params => {
  return axios.get(`https://crm.jianong.com.cn/api/v1/users/addUser`, {
    params: params
  }).then(res => res.data);
};
//系统管理->用户管理->组织机构列表->用户列表->修改用户
export const userEdit = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);
  param.append('username', params.username);
  param.append('nickname', params.nickname);
  param.append('password', params.password);
  param.append('birthday', params.birthday);
  param.append('email', params.email);
  param.append('ID_card', params.ID_card);
  param.append('mobile', params.mobile);
  param.append('family_address', params.family_address);
  param.append('status', params.status);
  param.append('sex', params.sex);
  return axios.post(`https://crm.jianong.com.cn/api/v1/users/userEdit`, param).then(res => res.data);
};





//系统管理->用户管理->组织机构列表->用户列表->删除用户
export const delUser = params => {
  let param = new FormData(); //创建form对象
  param.append('id', params.id);
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/Goods/delUser`, param).then(res => res.data);
};
// 系统管理->业务日志
export const getBizLog = params => {
  return axios.get(`${crm}/api/v1/Goods/getBizLog`,{
    params: params
  }).then(res => res.data);
};
// 基础数据->商品->计量单位->商品计量单位列表
export const getGoodsUnit = params => {
  return axios.get(`${crm}/api/v1/Goods/getGoodsUnit`,{
    params: params
  }).then(res => res.data);
};
// 基础数据->商品->计量单位->添加商品计量单位
export const addGoodsUnit = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);;
  param.append('name', params.name);
  return axios.post(`${crm}/api/v1/Goods/editGoodsUnit`, param).then(res => res.data);
};
// 基础数据->商品->计量单位->编辑商品计量单位
export const editGoodsUnit = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);;
  param.append('name', params.name);
  param.append('id', params.id);
  return axios.post(`${crm}/api/v1/Goods/editGoodsUnit`, param).then(res => res.data);
};
// 基础数据->商品->计量单位->删除商品计量单位
export const delGoodsUnit = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);;
  param.append('id', params.id);
  return axios.post(`${crm}/api/v1/Goods/delGoodsUnit`, param).then(res => res.data);
};
/*add end*/

//基础数据-商品-商品品牌列表
export const brandList = params => {
  return axios.get(`${crm}/api/v1/Goods/getGoodsBrand`, {
    params:params
  }).then(res => res.data);
};
//基础数据-商品-添加编辑商品品牌
export const addBrand = params => {
  return axios.get(`${crm}/api/v1/Goods/editGoodsBrand`, {
    params:params
  }).then(res => res.data);
};
//基础数据-商品-删除商品品牌
export const deleteBrand = params => {
  return axios.get(`${crm}/api/v1/Goods/delGoodsBrand`, {
    params: params
  }).then(res => res.data);
};
//基础数据-商品-价格体系列表
export const PriceSystemListinfo = params => {
  return axios.get(`${crm}/api/v1/Goods/getPriceSystem`, {
    params: params
  }).then(res => res.data);
};
//基础数据-商品-价格体系-添加编辑价格
export const addNewPrice = params => {
  return axios.get(`${crm}/api/v1/Goods/editPriceSystem`, {
    params: params
  }).then(res => res.data);
};
//基础数据-商品-价格体系-删除编辑价格
export const deletePrice = params => {
  return axios.get(`${crm}/api/v1/Goods/delPriceSystem`, {
    params: params
  }).then(res => res.data);
};
//基础数据-仓库-获取仓库列表
export const getStockinfos= params => {
  return axios.get(`${crm}/api/v1/Goods/getWarehouse`, {
    params: params
  }).then(res => res.data);
};
//基础数据-仓库-添加编辑仓库
export const addNewStock= params => {
  return axios.get(`${crm}/api/v1/Goods/editWarehouse`, {
    params: params
  }).then(res => res.data);
};
//基础数据-仓库-删除仓库
export const deleteStock= params => {
  return axios.get(`${crm}/api/v1/Goods/delWarehouse`, {
    params: params
  }).then(res => res.data);
};
//基础数据-仓库-修改数据域-获取数据域列表
export const getAlldatedataorg= params => {
  return axios.get(`${crm}/api/v1/Goods/getAllUser`, {
    params: params
  }).then(res => res.data);
};
//基础数据-仓库-修改数据域
export const updatedataorg= params => {
  return axios.get(`${crm}/api/v1/Goods/updateDataOrg`, {
    params: params
  }).then(res => res.data);
};
//基础数据-供应商档案-供应商档案列表
export const getSupplierCategoryList= params => {
  return axios.get(`${crm}/api/v1/Goods/getSupplierCategory`, {
    params: params
  }).then(res => res.data);
};
//基础数据-供应商档案-新增供应商分类
export const addSupplierCategory= params => {
  return axios.get(`${crm}/api/v1/Goods/editSupplierCategory`, {
    params: params
  }).then(res => res.data);
};
//基础数据-供应商档案-删除供应商分类
export const deleteSupplierCategory= params => {
  return axios.get(`${crm}/api/v1/Goods/delSupplierCategory`, {
    params: params
  }).then(res => res.data);
};
//基础数据-供应商档案-供应商分类-供应商列表
export const getAllSupplier = params => {
  return axios.get(`${crm}/api/v1/Goods/getSupplier`, {
    params: params
  }).then(res => res.data);
};
//基础数据-供应商档案-供应商分类-供应商列表详情-新增供应商
export const addSupplier = params => {
  return axios.get(`${crm}/api/v1/Goods/editSupplier`, {
    params: params
  }).then(res => res.data);
};
//基础数据-供应商档案-供应商分类-供应商列表详情-删除供应商
export const deleteSupplier = params => {
  return axios.get(`${crm}/api/v1/Goods/delSupplier`, {
    params: params
  }).then(res => res.data);
};
//报表-销售日报表-日报表(商品)-汇总数据
export const getDayGoodsReport = params => {
  return axios.get(`${crm}/api/v1/saleDayByGoodsSummaryQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-销售日报表-日报表(商品)-查询数据
export const searchGoodsDayReport = params => {
  return axios.get(`${crm}/api/v1/getSaleDaySearchDataByGoods`, {
    params: params
  }).then(res => res.data);
};
//报表-销售日报表-日报表(用户)-汇总数据
export const getDayUsersReport = params => {
  return axios.get(`${crm}/api/v1/saleDayByCustomerSummaryQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-销售日报表-日报表(用户)-查询数据
export const searchDayUserReport = params => {
  return axios.get(`${crm}/api/v1/getSaleDayDataByCustomer`, {
    params: params
  }).then(res => res.data);
};
//报表-销售日报表-日报表(仓库)-汇总数据
export const getDayStoresReport = params => {
  return axios.get(`${crm}/api/v1/saleDayByWarehouseSummaryQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-销售日报表-日报表(仓库)-查询数据
export const searchDayStoreReport = params => {
  return axios.get(`${crm}/api/v1/getSaleDayDataByWareHouse`, {
    params: params
  }).then(res => res.data);
};
//报表-销售日报表-日报表(业务员)-汇总数据
export const getDayBizuserReport = params => {
  return axios.get(`${crm}/api/v1/saleDayByBizuserSummaryQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-销售日报表-日报表(业务员)-查询数据
export const searchDayBizuserReport = params => {
  return axios.get(`${crm}/api/v1/getSaleDayDataByBizUser`, {
    params: params
  }).then(res => res.data);
};
//报表-销售月报表-月报表(商品)-汇总数据
export const getMonthGoodsReport = params => {
  return axios.get(`${crm}/api/v1/saleMonthByGoodsSummaryQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-销售月报表-月报表(商品)-查询数据
export const searchMonthGoodsReport = params => {
  return axios.get(`${crm}/api/v1/saleMonthByGoodsQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-销售月报表-月报表(客户)-汇总数据
export const getMonthUsersReport = params => {
  return axios.get(`${crm}/api/v1/saleMonthByCustomerSummaryQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-销售月报表-月报表(客户)-查询数据
export const searchMonthUsersReport = params => {
  return axios.get(`${crm}/api/v1/saleMonthByCustomerQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-销售月报表-月报表(仓库)-汇总数据
export const getMonthStoresReport = params => {
  return axios.get(`${crm}/api/v1/saleMonthByWarehouseSummaryQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-销售月报表-月报表(仓库)-查询数据
export const searchMonthStoresReport = params => {
  return axios.get(`${crm}/api/v1/saleMonthByWarehouseQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-销售月报表-月报表(业务员)-汇总数据
export const getMonthBizuserReport = params => {
  return axios.get(`${crm}/api/v1/saleMonthByBizuserSummaryQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-销售月报表-月报表(业务员)-查询数据
export const searchMonthBizuserReport = params => {
  return axios.get(`${crm}/api/v1/saleMonthByBizuserQueryData`, {
    params: params
  }).then(res => res.data);
};

//报表-资金报表-应收账款分析-查询数据
export const searchAccountMoneyReport = params => {
  return axios.get(`${crm}/api/v1/receivablesAgeQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-资金报表-应收账款分析-汇总数据
export const getAccountMoneyReport = params => {
  return axios.get(`${crm}/api/v1/receivablesSummaryQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-资金报表-应付账款分析-查询数据
export const searchAccountPayReport = params => {
  return axios.get(`${crm}/api/v1/payablesAgeQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-资金报表-应付账款分析-汇总数据
export const getAccountPayReport = params => {
	return axios.get(`${crm}/api/v1/payablesSummaryQueryData`, {
    params: params
  }).then(res => res.data);
};

//登录功能https://crm.jianong.com.cn/api/v1/login
/*export const loginTo = params => {
  let param = new FormData(); //创建form对象
  param.append('username', params.username);
  param.append('userpass', params.userpass);
  return axios.post(`${crm}/api/v1/login`, param).then(res => res.data);
};*/

//登录功能https://crm.jianong.com.cn/api/v1/users/userLogin
export const loginTo = params => {
  let param = new FormData(); //创建form对象
  param.append('username', params.username);
  param.append('password', params.password);
  return axios.post(`${crm}/api/v1/users/userLogin`, param).then(res => res.data);
};

//采购-采购订单-采购订单列表
export const getPurchaseOrderList = params => {
  let param = new FormData(); //创建form对象
  param.append('ref', params.ref);
  param.append('ticket', params.ticket);
  param.append('bill_status', params.bill_status);
  param.append('supplier_id', params.supplier_id);
  param.append('page', params.page);
  param.append('start_time', params.start_time);
  param.append('end_time', params.end_time);
  param.append('payment_type', params.payment_type);
  param.append('page', params.page);
  return axios.post(`${crm}/api/v1/PurchaseStorage/purchaseOrderList`, param).then(res => res.data);
};
//采购-采购订单-删除订单
export const deletePurchaseOrder  = params => {
  let param = new FormData(); //创建form对象
  param.append('id', params.id);
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/PurchaseStorage/delOrder`, param).then(res => res.data);
};
//采购-采购订单-关闭采购订单
/*export const closePurchaseOrder  = params => {
  let param = new FormData(); //创建form对象
  param.append('id', params.id);
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/PurchaseStorage/closeOrder`, param).then(res => res.data);
};*/
export const closePurchaseOrder  = params => {
  return axios.get(`${crm}/api/v1/PurchaseStorage/closeOrder`, {
    params: params
  }).then(res => res.data);
};
//采购-采购订单-取消采购订单关闭状态
/*export const closeESCPurchaseOrder  = params => {
  let param = new FormData(); //创建form对象
  param.append('id', params.id);
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/PurchaseStorage/cancelCloseOrder`, param).then(res => res.data);
};*/
export const closeESCPurchaseOrder  = params => {
  return axios.get(`${crm}/api/v1/PurchaseStorage/cancelCloseOrder`, {
    params: params
  }).then(res => res.data);
};
//采购-采购订单-取消审核
export const checkESCPurchaseOrder  = params => {
  let param = new FormData(); //创建form对象
  param.append('id', params.id);
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/PurchaseStorage/cancelAuth`, param).then(res => res.data);
};
//采购-采购订单-审核
export const checkPurchaseOrder  = params => {
  let param = new FormData(); //创建form对象
  param.append('id', params.id);
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/PurchaseStorage/OrderAuth`, param).then(res => res.data);
};
//采购-采购入库-采购入库列表
export const getPurchaseStoreList  = params => {
  let param = new FormData(); //创建form对象
  param.append('page', params.page);
  param.append('ref', params.ref);
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/PurchaseStorage/StoreList`, param).then(res => res.data);
};
//采购-采购入库-采购入库列表
export const searchPurchaseStoreList  = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);
  param.append('page', params.page);
  param.append('ref', params.ref);
  param.append('bill_status', params.bill_status);
  param.append('supplier_id', params.supplier_id);
  param.append('payment_type', params.payment_type);
  param.append('start_time', params.start_time);
  param.append('end_time', params.end_time);
  return axios.post(`${crm}/api/v1/PurchaseStorage/StoreList`, param).then(res => res.data);
};
/*//采购-采购入库-删除采购入库
export const deletePurchaseStore = params => {
  let param = new FormData(); //创建form对象
  param.append('id', params.id);
  return axios.post(`${crm}/api/v1/PurchaseStorage/DelStore`, param).then(res => res.data);
};*/
//采购-采购入库-删除采购入库
export const deletePurchaseStore = params => {
  /*let param = new FormData(); //创建form对象
  param.append('id', params.id);*/
  return axios.get(`${crm}/api/v1/PurchaseStorage/DelStore`, {params:params}).then(res => res.data);
};


//库存-库存帐查询-仓库列表
export const getAllStock  = params => {
  return axios.get(`${crm}/api/v1/PurchaseStorage/getAllWarehouse`, {
    params: params
  }).then(res => res.data);
};
//库存-库存帐查询-仓库列表详情-仓库总账
export const getStockBillList  = params => {
  let param = new FormData(); //创建form对象
  param.append('warehouse_id', params.warehouse_id);
  param.append('ticket', params.ticket);
  param.append('code', params.code);
  param.append('name', params.name);
  param.append('spec', params.spec);
  param.append('page', params.page);
  return axios.post(`${crm}/api/v1/PurchaseStorage/StoreBillList`, param).then(res => res.data);
};
//库存-库存帐查询-仓库列表详情-仓库明细列表
export const getStockBillListDetail  = params => {
  let param = new FormData(); //创建form对象
  param.append('warehouse_id', params.warehouse_id);
  param.append('ticket', params.ticket);
  param.append('goods_id', params.goods_id);
  param.append('start_time', params.start_time);
  param.append('end_time', params.end_time);
  param.append('page', params.page);
  return axios.post(`${crm}/api/v1/PurchaseStorage/StoreBillListTotal`, param).then(res => res.data);
};
//库存-库存建账-标记建账完毕
export const TabCreateAccount  = params => {
  let param = new FormData(); //创建form对象
  param.append('warehouse_id', params.warehouse_id);
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/PurchaseStorage/FinalStoreFlag`, param).then(res => res.data);
};
//库存-库存建账-取消建账完毕标记
export const ESCTabCreateAccount  = params => {
  let param = new FormData(); //创建form对象
  param.append('warehouse_id', params.warehouse_id);
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/PurchaseStorage/cancelStoreFlag`, param).then(res => res.data);
};

//采购订单-新增采购订单-获取人员列表
export const getAllUsers  = params => {
  return axios.get(`${crm}/api/v1/Goods/getAllUser`, params).then(res => res.data);
};
//采购订单-新增采购订单-组织机构列表
export const getAllOrgs  = params => {
  return axios.get(`${crm}/api/v1/Goods/getOrg`, params).then(res => res.data);
};


//客户关系-客户分类
export const getAllUserList  = params => {
  return axios.get(`${crm}/api/v1/customer/categoryList`, {
    params: params
  }).then(res => res.data);
};
//客户关系-客户分类-详情(客户资料)
export const getAllUsersDetial  = params => {
  return axios.get(`${crm}/api/v1/customer/customerList`, {
    params: params
  }).then(res => res.data);
};
//客户关系-客户分类-新增客户分类-获取价格体系信息
export const getAllPriceInfo  = params => {
  return axios.get(`${crm}/api/v1/customer/priceSystemList`, {
    params: params
  }).then(res => res.data);
};
//客户关系-客户分类-新增客户分类
export const addUserCategorys  = params => {
  return axios.get(`${crm}/api/v1/customer/addCustomerCategory`, {
    params: params
  }).then(res => res.data);
};
//客户关系-客户分类-编辑客户分类
export const updateUserCategorys  = params => {
  return axios.get(`${crm}/api/v1/customer/updateCustomerCategory`, {
    params: params
  }).then(res => res.data);
};
//客户关系-客户分类-删除客户分类
export const deleteUserCategorys  = params => {
  return axios.get(`${crm}/api/v1/customer/deleteCustomerCategory`, {
    params: params
  }).then(res => res.data);
};
//客户关系-客户分类-新增编辑客户
export const addCustomer  = params => {
  return axios.get(`${crm}/api/v1/customer/editCustomer`, {
    params: params
  }).then(res => res.data);
};
//客户关系-客户分类-删除客户
export const delCustomer  = params => {
  return axios.get(`${crm}/api/v1/customer/deleteCustomer`, {
    params: params
  }).then(res => res.data);
};


/*add2*/
//销售->销售订单->获取销售订单列表以及查询接口
export const sobillList = params => {
  return axios.get(`${crm}/api/v1/sale/sobillList`,{
    params: params
  }).then(res => res.data);
};
//销售->销售订单->删除指定的订单
export const deleteSOBill = params => {
  return axios.get(`${crm}/api/v1/sale/deleteSOBill`,{
    params: params
  }).then(res => res.data);
};
/*//销售->销售订单->新增销售订单
export const addSOBill = params => {
  return axios.get(`${crm}/api/v1/sale/editSOBill`,{
    params: params
  }).then(res => res.data);
};*/
//销售->销售订单->查询指定的销售订单时3个下拉列表的值
export const getSoSelect = params => {
  return axios.get(`${crm}/api/v1/sale/getSoSelect`,{
    params: params
  }).then(res => res.data);
};
//销售->销售订单->审核指定的销售订单
export const commitSOBill = params => {
  return axios.get(`${crm}/api/v1/sale/commitSOBill`,{
    params: params
  }).then(res => res.data);
};
//销售->销售订单->取消审核指定的销售订单
export const cancelConfirmSOBill = params => {
  return axios.get(`${crm}/api/v1/sale/cancelConfirmSOBill`,{
    params: params
  }).then(res => res.data);
};
//销售->销售订单->点击订单详情跳转页面后获取对应数据
export const soBillDetailList = params => {
  return axios.get(`${crm}/api/v1/sale/soBillDetailList`,{
    params: params
  }).then(res => res.data);
};
//销售->销售订单->点击出库详情跳转页面后获取对应数据
export const soBillWSBillList = params => {
  return axios.get(`${crm}/api/v1/sale/soBillWSBillList`,{
    params: params
  }).then(res => res.data);
};
//销售->销售订单->销售出库列表
export const wsbillList = params => {
  return axios.get(`${crm}/api/v1/sale/wsbillList`,{
    params: params
  }).then(res => res.data);
};
/*add2 end*/

/*add3*/
//销售->销售出库->销售出库删除
export const deleteWSBill = params => {
  return axios.get(`${crm}/api/v1/sale/deleteWSBill`, {
    params: params
  }).then(res => res.data);
};
//销售->销售出库_>点击某一行跳到对应详情页
export const wsBillDetailList = params => {
  return axios.get(`${crm}/api/v1/sale/wsBillDetailList`, {
    params: params
  }).then(res => res.data);
};
//销售->销售出库->查询时状态,收款方式,客户3个下拉列表数据
export const wsSelect = params => {
  return axios.get(`${crm}/api/v1/sale/wsSelect`, {
    params: params
  }).then(res => res.data);
};
//销售->销售出库->查询时仓库下拉列表
export const getWarehouse = params => {
  return axios.get(`${crm}/api/v1/Goods/getWarehouse`, {
    params: params
  }).then(res => res.data);
};
//销售->销售退货入库->首页列表
export const srbillList = params => {
  return axios.get(`${crm}/api/v1/sale/srbillList`, {
    params: params
  }).then(res => res.data);
};
//销售->销售退货入库->点击某一行上的详情跳转详情页面
export const srBillDetailList = params => {
  return axios.get(`${crm}/api/v1/sale/srBillDetailList`, {
    params: params
  }).then(res => res.data);
};
//销售->销售退货入库->选择列表某一行的时候执行删除操作
export const deleteSRBill = params => {
  return axios.get(`${crm}/api/v1/sale/deleteSRBill`, {
    params: params
  }).then(res => res.data);
};
//销售->销售退货入库->列表查询时状态,收款方式,客户3个下拉列表数据
export const getSRSellect = params => {
  return axios.get(`${crm}/api/v1/sale/getSRSellect`, {
    params: params
  }).then(res => res.data);
};
//资金->应收账款管理-查询分类查询列表   往来单位:type=supplier 分类type=customer
export const payCategoryList = params => {
  return axios.get(`${crm}/api/v1/payCategoryList`, {
    params: params
  }).then(res => res.data);
};
//资金->应收账款管理-列表数据
export const payList = params => {
  return axios.get(`${crm}/api/v1/rvList`, {
    params: params
  }).then(res => res.data);
};
//资金->应收账款管理=>点击详情跳转详情页
export const payDetailList = params => {
  return axios.get(`${crm}/api/v1/rvDetailList`, {
    params: params
  }).then(res => res.data);
};
//资金->应收账款管理->点击详情页之后的列表再点击详情页
export const payRecordList = params => {
  return axios.get(`${crm}/api/v1/rvRecordList`, {
    params: params
  }).then(res => res.data);
};

//资金->应付账款管理-列表数据
export const rvList = params => {
  return axios.get(`${crm}/api/v1/payList`, {
    params: params
  }).then(res => res.data);
};
//资金->应付账款管理=>点击详情跳转详情页
export const rvDetailList = params => {
  return axios.get(`${crm}/api/v1/payDetailList`, {
    params: params
  }).then(res => res.data);
};
//资金->应付账款管理->点击详情页之后的列表再点击详情页
export const rvRecordList = params => {
  return axios.get(`${crm}/api/v1/payRecordList`, {
    params: params
  }).then(res => res.data);
};
//文件->首页的销售看板
export const salePortal = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);
  return axios.get(`http://localhost:7777/abc/emp/all`,param).then(res => res.data);
};
//文件->首页的库存看板
export const inventoryPortal = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/inventoryPortal`,param).then(res => res.data);
};
//文件->首页的采购看板
export const purchasePortal = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/purchasePortal`,param).then(res => res.data);
};
//文件->首页的资金看板
//export const moneyPortal = params => {
//  return axios.post(`${crm}/api/v1/moneyPortal`, {
//    params: params
//  }).then(res => res.data);
//};
export const moneyPortal = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/moneyPortal`, param).then(res => res.data);
};
//系统管理->业务设置->业务设置列表
export const getConfig = params => {
  return axios.get(`${crm}/api/v1/Goods/getConfig`, {
    params: params
  }).then(res => res.data);
};
//系统管理->业务设置->业务设置列表中的公司下拉列表数据
export const getCompany = params => {
  return axios.get(`${crm}/api/v1/Goods/getCompany`, {
    params: params
  }).then(res => res.data);
};
//系统管理->业务设置->提交修改业务设置
export const configTotal = params => {
  let param = new FormData(); //创建form对象
  param.append('info',JSON.stringify(params.info));
  param.append('company_id', params.company_id);
  param.append('ticket', params.ticket);
  return axios.post(`${crm}/api/v1/Goods/config`, param).then(res => res.data);
};
/*add3 end*/

/*add 1.27*/
//资金->预付款管理->首页列表
export const prepaymentList = params => {
  return axios.get(`${crm}/api/v1/prepaymentList`, {
    params: params
  }).then(res => res.data);
};
//资金->预付款管理->.详情页
export const prepaymentDetailList = params => {
  return axios.get(`${crm}/api/v1/prepaymentDetailList`, {
    params: params
  }).then(res => res.data);
};
//资金->点击预付供应商采购货款
export const addPrePayment = params => {
  return axios.get(`${crm}/api/v1/addPrePayment`, {
    params: params
  }).then(res => res.data);
};
//资金->点击退还供应商采购货款
export const returnPrePayment = params => {
  return axios.get(`${crm}/api/v1/returnPrePayment`, {
    params: params
  }).then(res => res.data);
};
/*//采购订单-新增采购订单-获取人员列表
export const getAllUsers  = params => {
  return axios.get(`${crm}/api/v1/Goods/getAllUser`, params).then(res => res.data);
};*/
/*add 1.27 end*/

//资金-现金收支查询-总账(外页列表)
export const totalAccount = params => {
  return axios.get(`${crm}/api/v1/cashList`, {
    params: params
  }).then(res => res.data);
};
//资金-现金收支查询-明细(内页)
export const DetailAccount = params => {
  return axios.get(`${crm}/api/v1/cashDetailList`, {
    params: params
  }).then(res => res.data);
};
//资金-预收款管理-总账(外页)
export const perInMoney = params => {
  return axios.get(`${crm}/api/v1/prereceivingList`, {
    params: params
  }).then(res => res.data);
};
//资金-预收款管理-明细(内页)
export const perInMoneyDetial = params => {
  return axios.get(`${crm}/api/v1/prereceivingDetailList`, {
    params: params
  }).then(res => res.data);
};
//资金-预收款管理-收取/退还预收款-客户列表
export const allCustomer = params => {
  return axios.get(`${crm}/api/v1/Customer/getCustomer`, {
    params: params
  }).then(res => res.data);
};
//资金-预收款管理-收取预收款
export const getPreInmoney = params => {
  return axios.get(`${crm}/api/v1/addPreReceiving`, {
    params: params
  }).then(res => res.data);
};
//资金-预收款管理-收取/退还预收款-客户列表
export const outPreInmoney = params => {
  return axios.get(`${crm}/api/v1/returnPreReceiving`, {
    params: params
  }).then(res => res.data);
};

//采购-采购订单-新增采购订单
/*export const addPurchaseOrder = params => {
  let param = new FormData(); //创建form对象
  param.append('deal_date',params.deal_date);
  param.append('supplier_id', params.supplier_id);
  param.append('deal_address', params.deal_address);
  param.append('contact', params.contact);
  param.append('tel', params.tel);
  param.append('fax', params.fax);
  param.append('org_id', params.org_id);
  param.append('biz_user_id', params.biz_user_id);
  param.append('payment_type', params.payment_type);
  param.append('bill_memo', params.bill_memo);
  param.append('goods_list', params.goods_list);
  return axios.post(`${crm}/api/v1/PurchaseStorage/CreateBuyOrder`, param).then(res => res.data);
};*/

//采购-采购订单-新增采购订单
export const addPurchaseOrder = params => {
  return axios.get(`${crm}/api/v1/PurchaseStorage/CreateBuyOrder`, {
    params: params
  }).then(res => res.data);
};
//采购-采购订单-新增入库订单
/*export const addStore = params => {
  let param = new FormData(); //创建form对象
  param.append('biz_dt',params.biz_dt);
  param.append('po_id',params.po_id);
  param.append('supplier_id', params.supplier_id);
  param.append('warehouse_id', params.warehouse_id);
  param.append('biz_user_id', params.biz_user_id);
  param.append('payment_type', params.payment_type);
  param.append('bill_memo', params.bill_memo);
  param.append('store_list', params.store_list);
  return axios.post(`${crm}/api/v1/PurchaseStorage/CreateStore`, param).then(res => res.data);
};*/
//采购-采购订单-新增入库订单
export const addStore = params => {
  return axios.get(`${crm}/api/v1/PurchaseStorage/CreateStore`, {
    params: params
  }).then(res => res.data);
};

/*add128*/
//销售-新建销售订单  https://crm.jianong.com.cn/api/v1/sale/editSOBill
export const addSOBill = params => {
  let param = new FormData(); //创建form对象
  param.append('jsonStr',JSON.stringify(params.jsonStr));
  param.append('loginUserId',params.loginUserId);
  return axios.post(`${crm}/api/v1/sale/editSOBill`, param).then(res => res.data);
};
//销售-点击编辑销售订单时传一个值到编辑订单页面
export const soBillInfo = params => {
  return axios.get(`${crm}/api/v1/sale/soBillInfo`, {
    params: params
  }).then(res => res.data);
};
//销售-新建,查看,编辑销售出库单
export const editWSBill = params => {
  let param = new FormData(); //创建form对象
  param.append('jsonStr',JSON.stringify(params.jsonStr));
  param.append('loginUserId',params.loginUserId);
  return axios.post(`${crm}/api/v1/sale/editWSBill`, param).then(res => res.data);
};
//销售-点击编辑销售出库单时传一个值到编辑出库单页面
export const wsBillInfo = params => {
  return axios.get(`${crm}/api/v1/sale/wsBillInfo`, {
    params: params
  }).then(res => res.data);
};
//销售->点击新增销售退货单会弹出一个选择销售出库单的弹窗里面的数据
export const selectWSBillList = params => {
  return axios.get(`${crm}/api/v1/sale/selectWSBillList`, {
    params: params
  }).then(res => res.data);
};
//销售->点击新增销售退货单会弹出一个选择销售出库单的弹窗里面的数据,点击某一行的时候获取对应的id,传到本接口,获取到对应的数据
export const getWSBillInfoForSRBill = params => {
  return axios.get(`${crm}/api/v1/sale/getWSBillInfoForSRBill`, {
    params: params
  }).then(res => res.data);
};
//销售-新建,查看,编辑销售退货入库单
export const editSRBill = params => {
  let param = new FormData(); //创建form对象
  param.append('jsonStr',JSON.stringify(params.jsonStr));
  param.append('loginUserId',params.loginUserId);
  return axios.post(`${crm}/api/v1/sale/editSRBill`, param).then(res => res.data);
};


/*add128end*/

/*new  报表*/
//报表-库存报表-安全库存明细表 - 查询数据
export const safetyInventoryData = params => {
  return axios.get(`${crm}/api/v1/safetyInventoryQueryData`, {
    params: params
  }).then(res => res.data);
};
//报表-库存报表-安全库存明细表 - 查询数据
export const inventoryUpperData = params => {
  return axios.get(`${crm}/api/v1/inventoryUpperQueryData`, {
    params: params
  }).then(res => res.data);
};
/*new  报表 end*/

/*扫码获取商品数据*/
/*条形码*/
export const getOneGoods = params => {
  return axios.get(`${crm}/api/v1/Goods/getOneGoods`, {
    params: params
  }).then(res => res.data);
};
/*二维码*/
export const getZsmInfo = params => {
  return axios.get(`${crm}/api/v1/Goods/getGoodsInfo`, {
    params: params
  }).then(res => res.data);
};
/*扫码获取商品数据 end*/

/*   销售  add*/
//销售出库页面-提交出库
export const commitWSBill = params => {
  return axios.get(`https://crm.jianong.com.cn/api/v1/sale/commitWSBill`, {
    params: params
  }).then(res => res.data);
};
//销售退货入库按照id获取编辑时的填充页面数据
export const srBillInfo = params => {
  return axios.get(`https://crm.jianong.com.cn/api/v1/sale/srBillInfo`, {
    params: params
  }).then(res => res.data);
};
//销售退货入库 提交入库
export const commitSRBill = params => {
  return axios.get(`https://crm.jianong.com.cn/api/v1/sale/commitSRBill`, {
    params: params
  }).then(res => res.data);
};

/*   销售  add end*/

/*add 采购提交入库*/
//销售-新建,查看,编辑销售退货入库单
export const commitStore = params => {
  let param = new FormData(); //创建form对象
  param.append('ticket',params.ticket);
  param.append('id',params.id);
  return axios.post(`${crm}/api/v1/PurchaseStorage/commitStore`, param).then(res => res.data);
};
/*add 采购提交入库end*/

/*获取溯源码贴码级别信息*/
export const gettmjb = params => {
  return axios.get(`https://crm.jianong.com.cn/api/v1/Goods/getTmjbInfo`, {
    params: params
  }).then(res => res.data);
};
/*获取溯源码贴码级别信息end*/


