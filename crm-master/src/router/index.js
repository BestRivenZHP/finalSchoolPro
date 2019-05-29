import Vue from 'vue'
import Router from 'vue-router'

import File from '@/components/File' //文件父页面
import Index from '@/views/file/Index' //文件首页
import RevisePassword from '@/views/file/RevisePassword' //修改密码页面
import Login from '@/components/Login' //登录页面


import Purchase from '@/components/Purchase' //采购父页面
import PurchaseOrder from '@/views/purchase/PurchaseOrder' //采购订单首页
import PurchaseStorage from '@/views/purchase/PurchaseStorage' //采购入库页面
import PurchaseReturn from '@/views/purchase/PurchaseReturn' //采购退货出货页面
import AddPurchaseOrder from '@/views/purchase/info/AddPurchaseOrder'//新建采购订单
import EditPurchaseOrder from '@/views/purchase/info/EditPurchaseOrder'//编辑采购订单
import AddStoreageOrder from '@/views/purchase/info/AddStoreageOrder'//新建采购订单
import EditStoreageOrder from '@/views/purchase/info/EditStoreageOrder'//编辑采购订单
import GetPurchaseOrder from '@/views/purchase/info/getPurchaseOrder'//生产采购入库单
import PurchaseOrderDetial from '@/views/purchase/info/PurchaseOrderdetial'//采购订单详情
import PurchaseOrderStock from '@/views/purchase/info/PurchaseOrderStock'//采购订单入库详情
import PurchaseStorageInfo from '@/views/purchase/info/purchasestorageinfo'//采购-采购入库-商品详情

/*测试*/
import MyComponent from '@/views/purchase/myComponent'//采购-采购入库-商品详情


import UserRelation from '@/components/UserRelation' //客户关系父页面
import UserInformation from '@/views/userrelation/UserInformation' //客户信息一级页面
import UserList from '@/views/userrelation/info/UserList'//客户关系-用户列表

import Capital from '@/components/Capital' //资金父页面
import AccountManager from '@/views/capital/AccountManager' //应收账款管理页面
import AccountMaInfo from '@/views/capital/info/AccountMaInfo' //应收账款管理一级详情页面
import PayManager from '@/views/capital/PayManager' //应付账款管理页面
import PayMaInfo from '@/views/capital/info/PayMaInfo' //应付账款管理一级详情页面
import ReceiptsSearch from '@/views/capital/ReceiptsSearch' //现金收支查询页面
import ReceiptsSeInfo from '@/views/capital/info/ReceiptsSeInfo' //现金收支查询一级详情页面
import ReceiptsAdvance from '@/views/capital/ReceiptsAdvance' //预收款页面总账
import ReceiptsAdvanceInfo from '@/views/capital/info/ReceiptsAdvanceinfo' //预收款页面明细账(内页)
import PayAdvance from '@/views/capital/PayAdvance' //预付款页面
import AccountMaInInfo from '@/views/capital/info/info/AccountMaInInfo' //应收款管理二级详情页面
import PayMaInInfo from '@/views/capital/info/info/PayMaInInfo' //应付款管理二级详情页面
import PayAdvanceInfo from '@/views/capital/info/PayAdvanceInfo'//应付款管理->点击每一列的查看进入详情页面

import Report from '@/components/Report' //报表父页面
import SaleDayGoods from '@/views/report/saleday/SaleDayGoods' //报表-销售日报表-销售日报表按照商品汇总
import SaleDayUser from '@/views/report/saleday/SaleDayUser' //报表-销售日报表-销售日报表按照客户汇总
import SaleDayStore from '@/views/report/saleday/SaleDayStore' //报表-销售日报表-销售日报表按照仓库汇总
import SaleDayMan from '@/views/report/saleday/SaleDayMan' //报表-销售日报表-销售日报表按照业务员汇总
import SaleMonthGoods from '@/views/report/salemonth/SaleMonthGoods' //报表-销售月报表-销售月报表按照商品汇总
import SaleMonthUser from '@/views/report/salemonth/SaleMonthUser' //报表-销售月报表-销售月报表按照用户汇总
import SaleMonthStore from '@/views/report/salemonth/SaleMonthStore' //报表-销售月报表-销售月报表按照仓库汇总
import SaleMonthMan from '@/views/report/salemonth/SaleMonthMan' //报表-销售月报表-销售月报表按照业务员汇总
import StockSafe from '@/views/report/stockreport/StockSafe' //报表-库存报表-安全库存报表
import StockUpper from '@/views/report/stockreport/StockUpper' //报表-库存报表-库存超上限报表
import AccountAnalysis from '@/views/report/capitalreport/AccountAnalysis' //报表-资金报表-应收账款账龄分析
import PayAnalysis from '@/views/report/capitalreport/PayAnalysis' //报表-资金报表-应收账款账龄分析

import Stock from '@/components/Stock' //仓库首页
import StockAccount from '@/views/stock/stockaccount' //仓库->库存账查询
import StockCreateAccount from '@/views/stock/stockcreateaccount' //仓库-库存建账
import StockAllot from '@/views/stock/stockallot' //仓库-库间调拨
import StockCheck from '@/views/stock/stockcheck' //库存盘点
import AccountInfo from '@/views/stock/info/AccountInfo' //仓库-库存账查询-一级详情页
import AccountInfoDetial from '@/views/stock/info/AccountInfoDetial' //仓库-库存账查询-二级级详情页
import CreateAccountInfo from '@/views/stock/info/CreateAccountInfo' //仓库-库存建账-一级详情页
import AddAllot from '@/views/stock/info/AddAllot' //仓库-库存调拨-新建调拨单页面
import EditAllot from '@/views/stock/info/EditAllot' //仓库-库存调拨-编辑调拨单页面
import AddCheck from '@/views/stock/info/AddCheck' //仓库-库存盘点-新建盘点单页面
import EditCheck from '@/views/stock/info/EditCheck' //仓库-库存盘点-编辑盘点单页面
import NewCreateAccount from '@/views/stock/info/NewCreateAccount' //仓库-库存建账-建账页面

import Sale from '@/components/Sale' //销售首页
import SaleOrder from '@/views/sale/saleorder' //销售首页-销售订单
import SaleOutStock from '@/views/sale/saleoutstock' //销售首页-销售出库
import SaleInStock from '@/views/sale/saleinstock' //销售首页-销售退货入库
import AddOrder from '@/views/sale/info/AddOrder' //新建销售订单
import EditOrder from '@/views/sale/info/EditOrder' //修改销售订单
import LookOrder from '@/views/sale/info/LookOrder' //查看销售订单
import AddOutStock from '@/views/sale/info/AddOutStock'//新建销售出库单
import EditOutStock from '@/views/sale/info/EditOutStock'//编辑销售出库单
import LookOutStock from '@/views/sale/info/LookOutStock' //查看销售出库单
import AddInStock from '@/views/sale/info/AddInStock' //新建销售退货入库单
import EditInStock from '@/views/sale/info/EditInStock' //编辑销售退货入库单
import LookInStock from '@/views/sale/info/LookInStock' //查看销售退货入库单

import OrderUserInfo from '@/views/sale/info/OrderUserInfo'//从销售订单首页点击查看用户详情
import OrderOrderInfo from '@/views/sale/info/OrderOrderInfo'
import OutStockInfo from '@/views/sale/info/OutStockInfo' //销售->销售出库->点击订单详情跳转
import InSaleInfo from '@/views/sale/info/InSaleInfo'//销售->销售退货入库->点击详情页跳转

import AddOrderPrint from '@/views/sale/info/AddOrderPrint'//打印页面

import BaseData from '@/components/BaseData' //基础数据首页
import Goods from '@/views/basedata/goods' //基础数据首页-商品-商品
import GoodsUnit from '@/views/basedata/goodsunit' //基础数据首页-商品-商品计量单位
import GoodsBrand from '@/views/basedata/goodsbrand' //基础数据首页-商品-商品品牌
import PriceSystem from '@/views/basedata/pricesystem' //基础数据首页-商品-价格体系
import BaseDataStock from '@/views/basedata/stock' //基础数据首页-仓库
import SupplierFile from '@/views/basedata/supplierfile' //基础数据首页-供应商档案
import SupplierList from "@/views/basedata/info/SupplierList" //基础数据-供应商档案-供应商列表
import GoodsList from '@/views/basedata/info/GoodsList' //基础数据-商品-商品分类下的商品列表

import SystemManage from '@/components/SystemManage' //系统管理首页
import UserManage from '@/views/systemmanage/usermanage' //系统管理-用户管理
import PowerManage from '@/views/systemmanage/powermanage' //系统管理-权限管理
import BusinessLog from '@/views/systemmanage/businesslog' //系统管理-业务日志
import BusinessSet from '@/views/systemmanage/businessset' //系统管理-业务设置
import ManageList from '@/views/systemmanage/info/ManageList'//系统管理-用户管理-组织机构下的子页面
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		{
		path: '/index',
		redirect: '/p/index',
		name: 'File',
		component: File
	}, {
		path: '/userdata',
		name: 'Purchase',
		redirect: '/d/purchase-order',
		component: Purchase
	}, {
		path: '/login',
		name: 'Login',
		component: Login
	}, {
		path: '/stock',
		name: 'Stock',
		redirect: '/s/stockaccount',
		component: Stock
	}, {
		path: '/userrelation',
		name: 'UserRelation',
		redirect: '/user/user-information',
		component: UserRelation
	}, {
		path: '/capital',
		name: 'Capital',
		redirect: '/c/account-manager',
		component: Capital
	}, {
		path: '/report',
		name: 'Report',
		redirect: '/r/saleday-goods',
		component: Report
	}, {
		path: '/sale',
		name: 'Sale',
		redirect: '/x/saleorder',
		component: Sale
	}, {
		path: '/basedata',
		name: 'BaseData',
		redirect: '/b/goods',
		component: BaseData
	}, {
		path: '/systemmanage',
		name: 'SystemManage',
		redirect: '/m/manage-list',
		component: SystemManage
	}, {
		path: '/p',
		component: File,
		children: [{
			path: 'index',
			name: 'Index',
			component: Index
		}, {
			path: 'revisepassword',
			name: 'RevisePassword',
			component: RevisePassword
		}]
	}, {
		path: '/d',
		component: Purchase,
		children: [{
			path: 'purchase-order',
			name: 'PurchaseOrder',
			component: PurchaseOrder
		}, {
			path: 'purchase-storage',
			name: 'PurchaseStorage',
			component: PurchaseStorage
		}, {
			path: 'purchase-return',
			name: 'PurchaseReturn',
			component: PurchaseReturn
		}, {
      path: 'add-purchase-order',
      name: 'AddPurchaseOrder',
      component: AddPurchaseOrder
    }, {
			path: 'edit-purchase-order/:ref',
			name: 'EditPurchaseOrder',
			component: EditPurchaseOrder
		},{
      path: 'add-Storeage-order',
      name: 'AddStoreageOrder',
      component: AddStoreageOrder
    },{
      path: 'edit-Storeage-order/:ref',
      name: 'EditStoreageOrder',
      component: EditStoreageOrder
    },{
      path: 'getPurchaseOrder/:ref',
      name: 'GetPurchaseOrder',
      component: GetPurchaseOrder
    },{
      path: 'purchaseorderdetial/:ref/:supplier',
      name: 'PurchaseOrderDetial',
      component: PurchaseOrderDetial
    },{
      path: 'purchaseorderstock/:ref',
      name: 'PurchaseOrderStock',
      component: PurchaseOrderStock
    },{
      path: 'purchasestorageinfo/:ref/:supplier/:warehouse',
      name: 'PurchaseStorageInfo',
      component: PurchaseStorageInfo
    },{
			path: 'add',
			name: 'MyComponent',
			component: MyComponent
		}]
	}, {
		path: '/user',
		component: UserRelation,
		children: [{
			path: 'user-information',
			name: 'UserInformation',
			component: UserInformation
		},{
			path: 'user-list/:loginUserId/:categoryId/:ps_id',
			name: 'UserList',
			component: UserList
		}]
	}, {
		path: '/c',
		component: Capital,
		children: [{
			path: 'account-manager',
			name: 'AccountManager',
			component: AccountManager
		}, {
			path: 'pay-manager',
			name: 'PayManager',
			component: PayManager
		}, {
			path: 'receipts-search',
			name: 'ReceiptsSearch',
			component: ReceiptsSearch
		}, {
      path: 'receipts-advance',
      name: 'ReceiptsAdvance',
      component: ReceiptsAdvance
    }, {
			path: 'ReceiptsAdvanceinfo/:customerId',
			name: 'ReceiptsAdvanceInfo',
			component: ReceiptsAdvanceInfo
		}, {
			path: 'pay-advance',
			name: 'PayAdvance',
			component: PayAdvance
		}, {
      path: 'account-mainfo/:account_type/:account_id',
      name: 'AccountMaInfo',
      component: AccountMaInfo
    }, {
      path: 'account-mainfoinfo/:ref_type/:ref_number',
      name: 'AccountMaInInfo',
      component: AccountMaInInfo
    },{
      path: 'pay-mainfo/:pay_type/:pay_id',
      name: 'PayMaInfo',
      component: PayMaInfo
    },{
      path: 'pay-mainfoinfo/:pay_type/:pay_number',
      name: 'PayMaInInfo',
      component: PayMaInInfo
    }, {
			path: 'receipts-seinfo/:date',
			name: 'ReceiptsSeInfo',
			component: ReceiptsSeInfo
		},{
      path: 'payadvance-info/:pay_advance_id',
      name: 'PayAdvanceInfo',
      component: PayAdvanceInfo
    }]
	}, {
		path: '/r',
		component: Report,
		children: [{
			path: 'saleday-goods',
			name: 'SaleDayGoods',
			component: SaleDayGoods
		}, {
			path: 'saleday-user',
			name: 'SaleDayUser',
			component: SaleDayUser
		}, {
			path: 'saleday-store',
			name: 'SaleDayStore',
			component: SaleDayStore
		}, {
			path: 'saleday-man',
			name: 'SaleDayMan',
			component: SaleDayMan
		}, {
			path: 'salemonth-goods',
			name: 'SaleMonthGoods',
			component: SaleMonthGoods
		}, {
			path: 'salemonth-user',
			name: 'SaleMonthUser',
			component: SaleMonthUser
		}, {
			path: 'salemonth-store',
			name: 'SaleMonthStore',
			component: SaleMonthStore
		}, {
			path: 'salemonth-man',
			name: 'SaleMonthMan',
			component: SaleMonthMan
		}, {
			path: 'stocksafe',
			name: 'StockSafe',
			component: StockSafe
		}, {
			path: 'stockupper',
			name: 'StockUpper',
			component: StockUpper
		}, {
			path: 'account-analysis',
			name: 'AccountAnalysis',
			component: AccountAnalysis
		}, {
			path: 'pay-analysis',
			name: 'PayAnalysis',
			component: PayAnalysis
		}]
	}, {
		path: '/s',
		component: Stock,
		children: [{
			path: 'stockaccount',
			name: 'StockAccount',
			component: StockAccount
		}, {
			path: 'stockcreateaccount',
			name: 'StockCreateAccount',
			component: StockCreateAccount
		}, {
			path: 'stockallot',
			name: 'StockAllot',
			component: StockAllot
		}, {
			path: 'stockcheck',
			name: 'StockCheck',
			component: StockCheck
		}, {
      path: 'account-info/:id/:name',
      name: 'AccountInfo',
      component: AccountInfo
    }, {
			path: 'accountinfodetial/:warehouse_id/:goods_id',
			name: 'AccountInfoDetial',
			component: AccountInfoDetial
		}, {
			path: 'create-info',
			name: 'CreateAccountInfo',
			component: CreateAccountInfo
		}, {
			path: 'add-allot',
			name: 'AddAllot',
			component: AddAllot
		}, {
			path: 'edit-allot',
			name: 'EditAllot',
			component: EditAllot
		}, {
			path: 'add-check',
			name: 'AddCheck',
			component: AddCheck
		}, {
      path: 'edit-check',
      name: 'EditCheck',
      component: EditCheck
    }, {
			path: 'newcreateaccount/:name',
			name: 'NewCreateAccount',
			component: NewCreateAccount
		}]
	}, {
		path: '/x',
		component: Sale,
		children: [{
			path: 'saleorder',
			name: 'SaleOrder',
			component: SaleOrder
		},{
			path: 'saleoutstock',
			name: 'SaleOutStock',
			component: SaleOutStock
		}, {
			path: 'saleinstock',
			name: 'SaleInStock',
			component: SaleInStock
		}, {
			path: 'add-order',
			name: 'AddOrder',
			component: AddOrder
		}, {
      path: 'look-order/:look_id',
      name: 'LookOrder',
      component: LookOrder
    }, {
			path: 'edit-order/:edit_id',
			name: 'EditOrder',
			component: EditOrder
		}, {
			path: 'add-outstock',
			name: 'AddOutStock',
			component: AddOutStock
		}, {
			path: 'edit-outstock/:edit_out_id',
			name: 'EditOutStock',
			component: EditOutStock
		},{
      path: 'look-outstock/:look_out_id',
      name: 'LookOutStock',
      component: LookOutStock
    }, {
      path: 'add-instock',
      name: 'AddInStock',
      component: AddInStock
    },{
      path: 'edit-instock/:edit_in_id',
      name: 'EditInStock',
      component: EditInStock
    },{
      path: 'look-instock/:look_in_id',
      name: 'LookInStock',
      component: LookInStock
    },{
      path: 'order-user-info/:sale_user_id/:sale_user_num/:sale_user_name/:receiving_type/:biz_user_name/:deal_date',
      name: 'OrderUserInfo',
      component: OrderUserInfo
    },{
      path: 'add-order-print/:add_order_print_id',
      name: 'AddOrderPrint',
      component: AddOrderPrint
    },{
      path: 'order-order-info/:sale_order_id',
      name: 'OrderOrderInfo',
      component: OrderOrderInfo
    },{
      path: 'out-stock-info/:out_id/:out_num/:out_user/:out_stock',
      name: 'OutStockInfo',
      component: OutStockInfo
    },{
      path: 'in-sale-info/:in_sale_id/:in_sale_num/:in_sale_name/:in_sale_stock',
      name: 'InSaleInfo',
      component: InSaleInfo
    }]
	}, {
		path: '/b',
		component: BaseData,
		children: [{
			path: 'goods',
			name: 'Goods',
			component: Goods
		}, {
			path: 'goodsunit',
			name: 'GoodsUnit',
			component: GoodsUnit
		}, {
			path: 'goodsbrand',
			name: 'GoodsBrand',
			component: GoodsBrand
		}, {
			path: 'pricesystem',
			name: 'PriceSystem',
			component: PriceSystem
		}, {
			path: 'supplierfile',
			name: 'SupplierFile',
			component: SupplierFile
		}, {
			path: 'stock',
			name: 'BaseDataStock',
			component: BaseDataStock
		},{
			path: 'supplier-list/:categoryId/:name',
			name: 'SupplierList',
			component: SupplierList
		},{
      path: 'goods-list/:goods_id',
      name: 'GoodsList',
      component: GoodsList
    }]
	}, {
		path: '/m',
		component: SystemManage,
		children: [/*{
			path: 'usermanage',
			name: 'UserManage',
			component: UserManage
		}, */{
			path: 'powermanage',
			name: 'PowerManage',
			component: PowerManage
		}, {
			path: 'businesslog',
			name: 'BusinessLog',
			component: BusinessLog
		}, {
			path: 'businessset',
			name: 'BusinessSet',
			component: BusinessSet
		},{
      path: 'manage-list',
      name: 'ManageList',
      component: ManageList
    }]
	}]
})
