<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			查询条件
		</div>
		<Row style="margin: 20px 0;">
			<Col span="5">
			<Row>
				<Col span="6" class="from-text">商品编码</Col>
				<Col span="18">
				<Input v-model='search_code'></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5">
			<Row>
				<Col span="6" class="from-text">品名</Col>
				<Col span="18">
				<Input v-model='search_name'></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5">
			<Row>
				<Col span="8" class="from-text">规格型号</Col>
				<Col span="16">
				<Input v-model="search_spec"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5">
			<Row>
				<Col span="8" class="from-text">条形码</Col>
				<Col span="16">
				<Input v-model="search_number"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="1" style="margin-left: 30px;">
			<Button type="primary" @click="searchGoodList">查询</Button>
			</Col>
		</Row>
		<div class="basic_indicators" style="margin-bottom: 30px;">
			商品分类
			<Button type="primary" style="margin-left:50px;" @click="addUnit">新增商品</Button>
		</div>
		<Table stripe :columns="goods_info" :data="goods_list"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>

		<Modal v-model="add_goods" width="800">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>新增商品</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin-bottom: 10px;'>
					<Col span="12">
					<Row>
						<Col span="6" style="text-align:center;">商品分类</Col>
						<Col span="18">
						<Select v-model="goods.category_id" disabled>
							<Option v-for="(item,index) in category_list" :value="item.id" :key="item.id">
								{{ item.name }}
							</Option>
						</Select>
						</Col>
					</Row>
					</Col>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">商品编码</Col>
						<Col span="18">
						<Input v-model="goods.code"></Input>
						</Col>
					</Row>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
          <Col span="3" style="text-align:center;">品名</Col>
          <Col span="21">
          <Input v-model="goods.name"></Input>
          </Col>
        </Row>
        <Row style='margin: 10px 0;'>
          <Col span="3" style="text-align:center;">生产企业</Col>
          <Col span="21">
          <Input v-model="goods.qyname"></Input>
          </Col>
        </Row>
        <Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">批准文号</Col>
					<Col span="21">
					<Input v-model="goods.pzwh"></Input>
					</Col>
				</Row>
        <Row style='margin: 10px 0;'>
          <Col span="3" style="text-align:center;">贴码级别</Col>
          <Col span="21">
          <Input v-model="goods.tmjb"></Input>
          </Col>
        </Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">规格型号</Col>
					<Col span="21">
					<Input v-model="goods.spec"></Input>
					</Col>
				</Row>
				<Row style='margin-bottom: 10px;'>
					<Col span="12">
					<Row>
						<Col span="6" style="text-align:center;">计量单位</Col>
						<Col span="18">
						<Select v-model="goods.unit_id">
							<Option v-for="(item,index) in unit_list" :value="item.id" :key="item.id">{{item.name}}</Option>
						</Select>
						</Col>
					</Row>
					</Col>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">条形码</Col>
						<Col span="18">
						<Input v-model="goods.bar_code" @on-focus="getBarCode"></Input>
						</Col>
					</Row>
					</Col>
				</Row>
				<Row>
					<Col span="3" style="text-align:center;">品牌</Col>
					<Col span="21">
					<Select v-model="goods.brand_id">
						<Option v-for="(item,index) in brand_list" :value="item.id" :key="item.id">{{item.name}}</Option>
					</Select>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">标准销售价</Col>
						<Col span="18">
						<Input v-model="goods.sale_price" :disabled="selfPriceState"></Input>
						</Col>
					</Row>
					</Col>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">建议采购价</Col>
						<Col span="18">
						<Input v-model="goods.purchase_price" :disabled="basePriceState"></Input>
						</Col>
					</Row>
					</Col>
				</Row>
				<Row style='margin-top: 10px;'>
					<Col span="3" style="text-align:center;">备注</Col>
					<Col span="21">
					<Input v-model="goods.memo"></Input>
					</Col>
				</Row>
			</div>
			<div slot="footer">
        <Button type="primary" @click="scanAddGoods" style="float:left;">点击扫码添加商品</Button>
				<Button type="primary" @click="keepAddGoods">保存</Button>
				<Button type="primary" @click="closeAddModal">取消</Button>
			</div>
		</Modal>
		<Modal v-model="edit_goods" width="800">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>编辑商品</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin-bottom: 10px;'>
					<Col span="12">
					<Row>
						<Col span="6" style="text-align:center;">商品分类</Col>
						<Col span="18">
						<Select v-model="goods.category_id" disabled>
							<Option v-for="(item,index) in category_list" :value="item.id" :key="item.id">
								{{ item.name }}
							</Option>
						</Select>
						</Col>
					</Row>
					</Col>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">商品编码</Col>
						<Col span="18">
						<Input v-model="goods.code"></Input>
						</Col>
					</Row>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">品名</Col>
					<Col span="21">
					<Input v-model="goods.name"></Input>
					</Col>
				</Row>
         <Row style='margin: 10px 0;'>
          <Col span="3" style="text-align:center;">生产企业</Col>
          <Col span="21">
          <Input v-model="goods.qyname"></Input>
          </Col>
        </Row>
        <Row style='margin: 10px 0;'>
          <Col span="3" style="text-align:center;">批准文号</Col>
          <Col span="21">
          <Input v-model="goods.pzwh"></Input>
          </Col>
        </Row>
         <Row style='margin: 10px 0;'>
          <Col span="3" style="text-align:center;">贴码级别</Col>
          <Col span="21">
          <Input v-model="goods.tmjb"></Input>
          </Col>
        </Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">规格型号</Col>
					<Col span="21">
					<Input v-model="goods.spec"></Input>
					</Col>
				</Row>
				<Row style='margin-bottom: 10px;'>
					<Col span="12">
					<Row>
						<Col span="6" style="text-align:center;">计量单位</Col>
						<Col span="18">
						<Select v-model="goods.unit_id">
							<Option v-for="(item,index) in unit_list" :value="item.id" :key="item.id">{{item.name}}</Option>
						</Select>
						</Col>
					</Row>
					</Col>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">条形码</Col>
						<Col span="18">
						<Input v-model="goods.bar_code"></Input>
						</Col>
					</Row>
					</Col>
				</Row>
				<Row>
					<Col span="3" style="text-align:center;">品牌</Col>
					<Col span="21">
					<Select v-model="goods.brand_id">
						<Option v-for="(item,index) in brand_list" :value="item.id" :key="item.id">{{item.name}}</Option>
					</Select>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">标准销售价</Col>
						<Col span="18">
						<Input v-model="goods.sale_price"></Input>
						</Col>
					</Row>
					</Col>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">建议采购价</Col>
						<Col span="18">
						<Input v-model="goods.purchase_price"></Input>
						</Col>
					</Row>
					</Col>
				</Row>
				<Row style='margin-top: 10px;'>
					<Col span="3" style="text-align:center;">备注</Col>
					<Col span="21">
					<Input v-model="goods.memo"></Input>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="keepEditGoods">保存</Button>
				<Button type="primary" @click="closeEditModal">取消</Button>
			</div>
		</Modal>
		<Modal v-model="del_goods" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>您确认删除此商品吗?</span>
			</p>
			<div slot="footer">
				<Button type="primary" @click="delTrue">确认</Button>
				<Button type="primary" @click="delFalse">取消</Button>
			</div>
		</Modal>
    <Modal v-model="scanmodal" width="700">
      <p slot="header" style="color:#2D8CF0;text-align:left;font-size:20px;">
        <span>扫描商品码</span>
      </p>
      <input @change="getGoodsInfo" style="width: 100%;height: 30px;line-height: 30px;border-radius: 5px;border: 1px solid #CCCCCC;" v-model="scancode" type="" name="getfoucs" id="getfoucs" value=""  placeholder="请扫描商品码" autofocus/>
      <div slot="footer">
       <!--          <Button type="text" size="large" @click="escScan">取消</Button>
       <Button type="primary" size="large" @click="getGoodsInfo">确定</Button> -->
      </div>
    </Modal>
	</div>
</template>

<script>
	import { getGoods, addGoodsCategory, editGoodsCategory, delGoodsCategory, addGoods, getGoodsCategory, getGoodsUnit, getGoodsBrand, delGoods,getZsmInfo,gettmjb } from '../../../api/api'
	export default {
		mounted() {
      /*获取用户编码*/
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      /*获取商品列表*/
			this.getGoodsList();
      /*获取商品分类数据*/
			getGoodsCategory({
				ticket: this.$store.state.ticket
			}).then(res => {
				this.category_list = res.data
			})
      /*获取计量单位数据*/
			getGoodsUnit({
				ticket: this.$store.state.ticket
			}).then(res => {
				this.unit_list = res.data
			})
      /*获取商品品牌数据*/
			getGoodsBrand({
				ticket: this.$store.state.ticket
			}).then(res => {
				this.brand_list = res.data.data
			})
			/*if(this.curr_good_id == "") {

			}*/
		},
		data() {
			return {
				goods_list: [], //商品列表
				category_list: [], //商品分类列表
				unit_list: [], //计量单位列表
				brand_list: [], //品牌列表数据
				add_goods: false, //添加商品弹窗
				edit_goods: false, //修改商品弹窗
				del_goods: false, //删除商品弹窗
				curr_good_id: "", //当前点击编辑的商品
				goods_title: '', //弹窗名为添加还是修改
				goods: {
					category_id: '', //商品分类id
          code: '', //商品编码
					name: '', //品名
					spec: '', //规格型号
          qyname: '', //生产企业
          pzwh: '', //批准文号
          tmjb: 0, //贴码级别
					unit_id: '', //计量单位单位
					bar_code: '', //条形码
					brand_id: '', //品牌id
					sale_price: '', //标准销售价
					purchase_price: "", //建议采购价
					memo: '', //备注
				},
				del_id: '', //删除时传的id
				search_code: '', //查询时传的编码
				search_name: '', //查询时传的name
				search_spec: '', //查询时传的型号
				search_number: '', //查询时传的条形码
        /*商品列表*/
				goods_info: [{
						title: '序号',
						align: "center",
            width: 60,
						key: 'unmid',
					},
					{
						title: '商品编码',
						align: "center",
            width: 100,
						key: 'code',
					},
					{
						title: '品名',
						align: "center",
            width:170,
						key: 'name',
					},
					{
						title: '规格型号',
						align: "center",
            width: 250,
						key: 'spec',
					},
					{
						title: '计量单位',
						align: "center",
            width: 110,
						key: 'unit_name',
					},
					{
						title: '品牌',
            width: 150,
						align: "center",
						key: 'brand_name',
					},
					{
						title: '标准销售价',
						align: "center",
            width: 120,
						key: 'sale_price',
					},
					{
						title: '建议采购价',
						align: "center",
            width: 110,
						key: 'purchase_price',
					},
					{
						title: '条形码',
            width: 130,
						align: "center",
						key: 'bar_code',
					},
					{
						title: '备注',
						align: "center",
            width: 130,
						key: 'memo',
					},
					{
						title: '数据域',
						align: "center",
            width: 110,
						key: 'data_org',
					},
					{
						title: '操作',
						key: 'action',
            fixed: "right",
						width: 180,
						align: 'center',
						render: (h, params) => {
							return h('p', [
								h('Button', {
									props: {
										type: 'warning',
										size: 'default'
									},
									style: {
										marginRight: '8px'
									},
									on: {
										click: () => {
                      /*编辑赋值*/
											this.edit_goods = true;
											this.curr_good_id = params.row.id
											this.goods.category_id = params.row.category_id
											this.goods.code = params.row.code
											this.goods.name = params.row.name
											this.goods.spec = params.row.spec
                      this.goods.qyname = params.row.qyname
                      this.goods.pzwh = params.row.pzwh
                      this.goods.tmjb = params.row.tmjb
											this.goods.unit_id = params.row.unit_id
											this.goods.bar_code = params.row.bar_code
											this.goods.brand_id = params.row.brand_id
											this.goods.sale_price = params.row.sale_price
											this.goods.purchase_price = params.row.purchase_price
											this.goods.memo = params.row.memo //备注
										}
									}
								}, '编辑'),
								h('Button', {
									props: {
										type: 'error',
										size: 'default'
									},
									style: {
										marginRight: '8px'
									},
									on: {
										click: () => {
											this.del_id = params.row.id
											this.del_goods = true;
										}
									}
								}, '删除')
							]);
						}
					}
				],
				pageSize: 20,
				dataCount: 0,
        scanmodal: false, //扫码模态框状态
        scancode: "",  //扫码信息
        basePriceState: false,   //建议采购价输入框状态
        selfPriceState: false,   //销售标准价输入框状态
			}
		},
		methods: {
      /*根据条形码内容是否为空获取条形码数据*/
      getBarCode(){
       /* console.log(this.bar_code)*/
        if(this.goods.bar_code == undefined || this.goods.bar_code == ""){
          this.$Message.info({
            content: "请扫描商品条形码或输入条形码编号",
            duration: 3,
          })
        }
      },
      /*点击弹出扫码框*/
      scanAddGoods(){
        this.scanmodal = true
        this.scancode = ""
        this.getFoucs()
      },
      /*扫码框自动获取焦点*/
      getFoucs() {
      setTimeout(function(){document.querySelector('#getfoucs').focus();}, 30);
      },
      /*根据溯源码查询商品信息*/
      getGoodsInfo(){
        gettmjb({
               ticket: sessionStorage.getItem("ticket"),
               zsm: this.scancode.split('，')[0],
             }).then(res => {
                this.goods.category_id = this.$route.params.goods_id
                /*this.goods.code = res.data.code*/
                this.goods.name = this.scancode.split('，')[1]
                if(!res.data){
                  this.goods.spec = ""
                }else{
                  this.goods.spec = res.data.specification
                }
                if(!res.data){
                this.goods.tmjb = ""
                }else{
                  this.goods.tmjb = res.data.tmjb
                }
                this.goods.qyname = this.scancode.split('，')[3]
                this.goods.pzwh = this.scancode.split('，')[2]
                /*this.goods.unit_id = res.data.unit_id
                this.goods.bar_code = res.data.bar_code
                this.goods.brand_id = res.data.brand_id
                this.goods.sale_price = res.data.sale_price
                this.goods.purchase_price = res.data.purchase_price
                this.goods.memo = res.data.memo*/
                this.scancode = ""
                this.scanmodal = false
             })
      },
      /*分页*/
			changepage(index) {
				getGoods({
					ticket: this.$store.state.ticket,
					category_id: this.$route.params.goods_id,
					code: this.search_code,
					name: this.search_name,
					spec: this.search_spec,
					bar_code: this.search_number,
					limit: this.pageSize,
					page: index
				}).then(res => {
					this.goods_list = res.data
					if(this.goods_list == undefined) {
						this.dataCount = 0
					} else {
						this.dataCount = this.goods_list[0].count
					}
					var num = 1
					this.goods_list.forEach((item, index) => {
						item.unmid = num++
					})
				})
			},
      /*清空表单*/
      clearForm(){
        this.goods.category_id = this.$route.params.goods_id
        this.curr_good_id = ""
        this.goods.code = ""
        this.goods.name = ""
        this.goods.qyname = ""
        this.goods.pzwh = ""
        this.goods.tmjb = 0
        this.goods.spec = ""
        this.goods.unit_id = ""
        this.goods.bar_code = ""
        this.goods.brand_id = ""
        this.goods.sale_price = ""
        this.goods.purchase_price = ""
        this.goods.memo = ""
        this.scancode = ""
      },
      /*打开添加商品模态框*/
			addUnit() {
        if(sessionStorage.getItem("is_admin") == "1"){
          this.basePriceState = false
          this.selfPriceState = true
        }else{
          this.basePriceState = true
          this.selfPriceState = false
        }
        this.clearForm()
				this.add_goods = true;
			},
      /*关闭添加商品模态框*/
			closeAddModal() {
				this.add_goods = false;
			},
      /*关闭添加商品模态框*/
			closeEditModal() {
				this.edit_goods = false;
			},
			//查询指定商品列表并填充表格
			searchGoodList() {
				this.goods_list = []
				getGoods({
					ticket: this.$store.state.ticket,
					category_id: this.$route.params.goods_id,
					code: this.search_code,
					name: this.search_name,
					spec: this.search_spec,
					bar_code: this.search_number,
					limit: this.pageSize,
					page: 1
				}).then(res => {
					this.goods_list = res.data
					if(this.goods_list == undefined) {
						this.dataCount = 0
					} else {
						this.dataCount = this.goods_list[0].count
					}
					var num = 1
					this.goods_list.forEach((item, index) => {
						item.unmid = num++
					})
				})
			},
			//获取商品列表数据,自循环序号
			getGoodsList() {
				getGoods({
					ticket: this.$store.state.ticket,
					category_id: this.$route.params.goods_id,
					limit: this.pageSize,
					page: 1
				}).then(res => {
					this.goods_list = res.data
					if(this.goods_list == undefined) {
						this.dataCount = 0
					} else {
						this.dataCount = this.goods_list[0].count
					}
					var num = 1
					this.goods_list.forEach((item, index) => {
						item.unmid = num++
					})
				})
			},
			//保存新增商品
			keepAddGoods() {
				if(this.goods.category_id == '') {
					this.$Message.info('请输入商品分类');
					return;
				}
				if(this.goods.code.trim() == '') {
					this.$Message.info('请输入商品编码');
					return;
				}
				if(this.goods.name.trim() == '') {
					this.$Message.info('请输入品名');
					return;
				}
				addGoods({
					ticket: this.$store.state.ticket,
					category_id: this.goods.category_id, //商品分类id
					code: this.goods.code, //商品编码
          name: this.goods.name, //品名
          qyname: this.goods.qyname, //品名
          pzwh: this.goods.pzwh, //品名
					tmjb: this.goods.tmjb, //品名
					spec: this.goods.spec, //规格型号
					unit_id: this.goods.unit_id, //计量单位单位
					bar_code: this.goods.bar_code, //条形码
					brand_id: this.goods.brand_id, //品牌id
					sale_price: this.goods.sale_price, //标准销售价
					purchase_price: this.goods.purchase_price, //建议采购价
					memo: this.goods.memo, //备注
				}).then(res => {
					if(res.retcode == '2000') {
						this.$Message.info(res.msg);
						this.add_goods = false;
						this.getGoodsList();
						this.goods = {}
					} else {
						this.$Message.info(res.msg);
					}
				})
			},
			//保存修改商品
			keepEditGoods() {
				/*if(this.goods.category_id == '') {
					this.$Message.info('请输入商品分类');
					return;
				}*/
				if(this.goods.code.trim() == '') {
					this.$Message.info('请输入商品编码');
					return;
				}
				if(this.goods.name.trim() == '') {
					this.$Message.info('请输入品名');
					return;
				}
				addGoods({
					ticket: this.$store.state.ticket,
					category_id: this.goods.category_id, //商品分类id
					code: this.goods.code, //商品编码
					name: this.goods.name, //品名
					spec: this.goods.spec, //规格型号
          qyname: this.goods.qyname,  //生产企业
          pzwh: this.goods.pzwh, //批准文号
          tmjb: this.goods.tmjb, //贴码级别
					unit_id: this.goods.unit_id, //计量单位单位
					bar_code: this.goods.bar_code, //条形码
					brand_id: this.goods.brand_id, //品牌id
					sale_price: this.goods.sale_price, //标准销售价
					purchase_price: this.goods.purchase_price, //建议采购价
					memo: this.goods.memo, //备注
					id: this.curr_good_id
				}).then(res => {
					if(res.retcode == '2000') {
						this.$Message.info(res.msg);
						this.edit_goods = false;
						this.getGoodsList();
            this.clearForm()
					} else {
						this.$Message.info(res.msg);
					}
				})
			},
			//确认删除商品分类
			delTrue() {
				delGoods({
					ticket: this.$store.state.ticket,
					id: this.del_id
				}).then(res => {
					if(res.retcode == '2000') {
						this.$Message.info(res.msg);
						this.getGoodsList();
						this.del_goods = false;
					} else {
						this.$Message.info(res.msg);
					}
				})
			},
      /*取消删除*/
			delFalse() {
				this.del_goods = false;
			}
		}
	}
</script>
<style>
	/*.purchase_order {
		padding: 0 20px;
		padding-bottom: 1200px;
	}*/
</style>
