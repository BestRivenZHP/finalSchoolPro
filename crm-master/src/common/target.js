/**
 * created by cxx on 2018-3-13
 */
var objGroup = {
  purchaseOrderObj: {
    editid: "",  //编辑使用的id
    exchangedate: '', //交货日期
    suppliervalue: '', //供应商
    exchangearea: '', //交货地址
    contactman: '', //联系人
    tel: '', //电话
    fax: '', //传真
    orgsvalue: '', //组织机构
    allusersvalue: '', //业务员
    paymentvalue: 1, //付款方式
    nodetxt: '', //备注
    supplierlist: [],  //供应商列表
    orgslist: [],  //组织列表
    // 付款方式列表
    paymentlist: [
    /*{
      value: 0,
      label: '记应付账款'
    },*/{
      value: 1,
      label: '现金付款'
    }/*,{
      value: 2,
      label: '预付款'
    },*/
    ],
    alluserslist: [],  //业务员列表
    odd_number: '保存后自动生成',
    totalPrice:0,   //总金额
    taxalPrice:0,   //税金
    taxtTotalMoney:0,  //价税合计
    /*商品列表*/
    goodsTitle: [{
        title: '商品编码',
        key: 'code',
        align: "center",
      },
      {
        title: '商品',
        key: 'name',
        align: "center",
      },
      {
        title: '规格型号',
        key: 'spec',
        align: "center",
      },
      {
        title: '单位',
        key: 'unit_name',
        align: "center",
      },
      {
        title: '建议采购价',
        key: 'purchase_price',
        align: "center",
      },
      {
        title: '备注',
        key: 'memo',
        align: "center",
      }
    ],
    /*采购订单单个商品数据*/
    goods_obj:{
        goods_id: '',
        code: "",
        name: "",
        spec: "",
        goods_count: 0, //采购数量
        unit_id: "",
        goods_price: 0, //采购单价
        goods_money: 0, //采购总额
        tax_rate: 0.17, //税率
        tax: 0, //税金
        money_with_tax: 0, //价税合计
        memo: '', //备注
      },
    /*采购入库订单单个商品数据*/
    storage_goods_obj:{
        goods_id: '',
        code: "",
        name: "",
        spec: "",
        goods_count: 0, //采购数量
        unit_id: "",
        goods_price: 0, //采购单价
        goods_money: 0, //采购总额
        memo: '', //备注
    },
    goods_list: [],  //总商品列表数据
    taxation:0,
    scanmodal: false,   //扫码模态框状态
    scancode: "",   //扫码数据
    allstockslist: [],
  },
  saleOrderObj: {
    odd_number: '保存后自动添加',
    hrow: true,
    checkVriable: 0,
    totalPrice: 0,
    accountPriceTotal: 0, //结算价格合计
    removeZero: 0, //抹零
    receivableMoney: 0, //应收账款
    taxalPrice: 0,
    taxtTotalMoney: 0,
    goodsTitle: [{
        title: '商品编码',
        key: 'code',
        align: "center",
      },
      {
        title: '商品',
        key: 'name',
        align: "center",
      },
      {
        title: '规格型号',
        key: 'spec',
        align: "center",
      },
      {
        title: '单位',
        align: "center",
        key: 'unit_name'
      },
      {
        title: '建议采购价',
        align: "center",
        key: 'goodsPrice'
      },
      {
        title: '备注',
        align: "center",
        key: 'memo'
      }
    ],
    sale_obj: {
      goodsId: '',
      code: '',
      name: "",
      spec: "",
      goodsCount: 0, //采购数量
      unit_name: "",
      goodsPrice: 0, //采购单价
      goodsMoney: 0, //采购总额
      discount: "0.00", //折扣
      accountPrice: 0, //结算价格
      isGiveaway: 0, //是否赠品
      surplusInventory: 0, //剩余库存
      taxRate: 0.17, //税率
      tax: 0, //税金
      moneyWithTax: 0, //价税合计
      memo: '', //描述
    },
    outstock_sale_obj: {
      goodsId: '',
      code: '',
      name: "",
      spec: "",
      goodsCount: 0, //采购数量
      unit_name: "",
      goodsPrice: 0, //采购单价
      goodsMoney: 0, //采购总额
      soBillDetailId: '', //序列号
      sn: '',
      memo: '', //描述
    },
    goods_list: [],
    tab_key: 0,
    tax: 0,
    customerslist: [], //客户列表
    dealDate: '', //绑定的业务时间
    bizDT: '', //绑定的业务时间
    customerId: '', //绑定客户id
    dealAddress: '', //交货的地址
    contact: '', //联系人
    tel: '', //电话
    fax: '', //传真
    orgId: '', //组织机构id
    bizUserId: '', //业务员id
    receivingType: '', //付款传的的id
    billMemo: "", //备注
    warehouseId: '', //仓库的id
    sobillRef: '',
    orgslist: [], //组织机构列表
    alluserslist: [], //业务员列表
    saleNumList:[],
    paymentlist: [/*{
      value: 0,
      label: '记应收账款'
    }, */{
      value: 1,
      label: '现金付款'
    }],
    scanmodal: false,
    scancode: "",
    stock_list: [], //仓库列表
    giveawaySelectList: [{
        value: 0,
        label: "否",
      },
      {
        value: 1,
        label: "是",
      }
    ],
  },
}

export default objGroup
