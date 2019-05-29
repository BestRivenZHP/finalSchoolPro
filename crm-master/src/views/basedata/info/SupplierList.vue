<template>
	<div class="purchase_order pad">
		<div class="basic_indicators">
			查询条件
		</div>
		<Row style="margin: 20px 0;">
			<Col span="5">
			<Row>
				<Col span="6" class="from-text">供应商编码</Col>
				<Col span="18">
				<Input v-model="supplierCode"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5" style="margin-left:20px;">
			<Row>
				<Col span="6" class="from-text">供应商名称</Col>
				<Col span="18">
				<Input v-model="supplierName"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5" style="margin-left:20px;">
			<Row>
				<Col span="6" class="from-text">地址</Col>
				<Col span="18">
				<Input v-model="supplierAddress"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5" style="margin-left:20px;">
			<Row>
				<Col span="6" class="from-text">联系人</Col>
				<Col span="18">
				<Input v-model="relation"></Input>
				</Col>
			</Row>
			</Col>
		</Row>
		<Row>
			<Col span="5">
			<Row>
				<Col span="6" class="from-text">手机</Col>
				<Col span="18">
				<Input v-model="tel"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5" style="margin-left:20px;">
			<Row>
				<Col span="6" class="from-text">固话</Col>
				<Col span="18">
				<Input v-model="fixedTel"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5" style="margin-left:20px;">
			<Row>
				<Col span="6" class="from-text">QQ</Col>
				<Col span="18">
				<Input v-model="qq"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="2" style="text-align: center;">
			<Button type="primary" @click="searchSupplierlist">查询</Button>
			</Col>
			<Col span="2" style="text-align: center;">
			<Button type="primary" @click="rester">重置</Button>
			</Col>
		</Row>
		<div class="basic_indicators" style="margin-bottom: 30px;">
			属于分类[ {{ suppliername }} ]的供应商
			<Button type="primary" style="margin-left:50px;" @click="OpenAddSupplier">新增供应商</Button>
		</div>
		<Table stripe :columns="supplierdata" :data="supplierlists"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
		<!--新增供应商弹窗-->
		<Modal v-model="add_supplier" width="800" class="ivu-modal-specil">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>新增供应商</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;"><span style="color:red;">*</span>分类</Col>
					<Col span="9" style="text-align:center;">
					<Select v-model="addsupplierobj.addsuppliercategoryid" disabled>
						<Option v-for="(item,index) in supplierlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					</Col>
					<Col span="3" style="text-align:center;"><span style="color:red;">*</span>编码</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addsupplierCode"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;"><span style="color:red;">*</span>供应商</Col>
					<Col span="21">
					<Input v-model="addsupplierobj.addsupplierName"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">地址</Col>
					<Col span="21">
					<Input v-model="addsupplierobj.addsupplierAddress"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">联系人</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addsupplierContact1"></Input>
					</Col>
					<Col span="3" style="text-align:center;">手机</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addsupplierMobile1"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">固话</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addsupplierTel1"></Input>
					</Col>
					<Col span="3" style="text-align:center;">qq</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addsupplierQQ1"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">备用联系人</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addsupplierContact2"></Input>
					</Col>
					<Col span="3" style="text-align:center;">备用联系人手机</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addsupplierMobile2"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">备用联系人固话</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addsupplierTel2"></Input>
					</Col>
					<Col span="3" style="text-align:center;">备用联系人qq</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addsupplierQQ2"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">发货地址</Col>
					<Col span="21">
					<Input v-model="addsupplierobj.addsupplierFHAddress"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">开户行</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addsupplierBankName"></Input>
					</Col>
					<Col span="3" style="text-align:center;">开户行账号</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addsupplierBankAccount"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">税号</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addTaxNumber"></Input>
					</Col>
					<Col span="3" style="text-align:center;">传真</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addFax"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">税率</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addTaxRate"></Input>
					</Col>
					<Col span="1">%</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">应付期初余额</Col>
					<Col span="9">
					<Input v-model="addsupplierobj.addInitPayables"></Input>
					</Col>
					<Col span="3" style="text-align:center;">余额日期</Col>
					<Col span="9">
					<DatePicker v-model="addsupplierobj.addInitPayablesDT" type="date" placeholder="选择日期" style="width: 285px" :options="options"></DatePicker>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">备注</Col>
					<Col span="21">
					<Input v-model="addsupplierobj.addNote"></Input>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="addNewSuppliers">保存</Button>
				<Button type="primary" @click="closeAddModal">取消</Button>
			</div>
		</Modal>
		<!--编辑供应商-->
		<Modal v-model="edit_supplier" width="800" class="ivu-modal-specil">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>编辑供应商</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;"><span style="color:red;">*</span>分类</Col>
					<Col span="9" style="text-align:center;">
					<Select v-model="editsupplierobj.editsuppliercategoryid" @on-change="getOption1">
						<Option v-for="(item,index) in supplierlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					</Col>
					<Col span="3" style="text-align:center;"><span style="color:red;">*</span>编码</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editsupplierCode"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;"><span style="color:red;">*</span>供应商</Col>
					<Col span="21">
					<Input v-model="editsupplierobj.editsupplierName"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">地址</Col>
					<Col span="21">
					<Input v-model="editsupplierobj.editsupplierAddress"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">联系人</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editsupplierContact1"></Input>
					</Col>
					<Col span="3" style="text-align:center;">手机</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editsupplierMobile1"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">固话</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editsupplierTel1"></Input>
					</Col>
					<Col span="3" style="text-align:center;">qq</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editsupplierQQ1"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">备用联系人</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editsupplierContact2"></Input>
					</Col>
					<Col span="3" style="text-align:center;">备用联系人手机</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editsupplierMobile2"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">备用联系人固话</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editsupplierTel2"></Input>
					</Col>
					<Col span="3" style="text-align:center;">备用联系人qq</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editsupplierQQ2"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">发货地址</Col>
					<Col span="21">
					<Input v-model="editsupplierobj.editsupplierFHAddress"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">开户行</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editsupplierBankName"></Input>
					</Col>
					<Col span="3" style="text-align:center;">开户行账号</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editsupplierBankAccount"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">税号</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editTaxNumber"></Input>
					</Col>
					<Col span="3" style="text-align:center;">传真</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editFax"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">税率</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editTaxRate"></Input>
					</Col>
					<Col span="1">%</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">应付期初余额</Col>
					<Col span="9">
					<Input v-model="editsupplierobj.editInitPayables"></Input>
					</Col>
					<Col span="3" style="text-align:center;">余额日期</Col>
					<Col span="9">
					<DatePicker v-model="editsupplierobj.editInitPayablesDT" type="date" placeholder="选择日期" style="width: 285px" :options="options"></DatePicker>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">备注</Col>
					<Col span="21">
					<Input v-model="addsupplierobj.addNote"></Input>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="editSupplier">保存</Button>
				<Button type="primary" @click="closeEditModal">取消</Button>
			</div>
		</Modal>
		<Modal v-model="del_modal" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>您确认删除此商品品牌吗?</span>
			</p>
			<p>您正在执行删除操作!</p>
			<div slot="footer">
				<Button type="primary" @click="delTrue">确认</Button>
				<Button type="primary" @click="delFalse">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { getAllSupplier, addSupplier, getSupplierCategoryList, deleteSupplier } from '../../../api/api'
	export default {
    mounted() {
      /*获取供应商列表数据*/
      this.getAllSupplierinfo()
      /*获取供应商分类数据*/
      this.getcategoryname()
      /*获取用户编号*/
      this.$store.state.ticket = sessionStorage.getItem("ticket")
    },
		methods: {
      /*获取下拉菜单当前供应商分类*/
			getOption1(value) {
				this.selectValue1 = value
			},
      /*获取供应商列表*/
			getAllSupplierinfo() {
				this.suppliername = this.$route.params.name
				getAllSupplier({
					ticket: this.$store.state.ticket,
					category_id: this.$route.params.categoryId,
					limit: this.pageSize,
					page: 1
				}).then(res => {
					/*console.log(res)*/
					this.supplierlists = res.data
					if(this.supplierlists == undefined) {
						this.dataCount = 0
					} else {
						this.dataCount = this.supplierlists[0].count
					}
					var num = 1
					this.supplierlists.forEach((item, index) => {
						item['numid'] = num++
					})
				})
			},
      /*分页*/
			changepage(index) {
				this.suppliername = this.$route.params.name
				getAllSupplier({
					ticket: this.$store.state.ticket,
					category_id: this.$route.params.categoryId,
					code: this.supplierCode,
					name: this.supplierName,
					address: this.supplierAddress,
					contact01: this.relation,
					mobile01: this.tel,
					tel01: this.fixedTel,
					qq01: this.qq,
					limit: this.pageSize,
					page: index
				}).then(res => {
					this.supplierlists = res.data
					if(this.supplierlists == undefined) {
						this.dataCount = 0
					} else {
						this.dataCount = this.supplierlists[0].count
					}
					var num = 1
					this.supplierlists.forEach((item, index) => {
						item['numid'] = num++
					})
				})
			},
      /*供应商列表数据查询*/
			searchSupplierlist() {
				this.suppliername = this.$route.params.name
				getAllSupplier({
					ticket: this.$store.state.ticket,
					category_id: this.$route.params.categoryId,
					code: this.supplierCode,
					name: this.supplierName,
					address: this.supplierAddress,
					contact01: this.relation,
					mobile01: this.tel,
					tel01: this.fixedTel,
					qq01: this.qq,
					limit: this.pageSize,
					page: 1
				}).then(res => {
					this.supplierlists = res.data
					if(this.supplierlists == undefined) {
						this.dataCount = 0
					} else {
						this.dataCount = this.supplierlists[0].count
					}
					var num = 1
					this.supplierlists.forEach((item, index) => {
						item['numid'] = num++
					})
				})
			},
			/*编辑供应商*/
			editSupplier() {
				addSupplier({
					ticket: this.$store.state.ticket,
					category_id: this.editsupplierobj.editsuppliercategoryid,
					id: this.editsupplierobj.editid,
					name: this.editsupplierobj.editsupplierName,
					code: this.editsupplierobj.editsupplierCode,
					address: this.editsupplierobj.editsupplierAddress,
					contact01: this.editsupplierobj.editsupplierContact1,
					mobile01: this.editsupplierobj.editsupplierMobile1,
					tel01: this.editsupplierobj.editsupplierTel1,
					qq01: this.editsupplierobj.editsupplierQQ1,
					contact02: this.editsupplierobj.editsupplierContact2,
					mobile02: this.editsupplierobj.editsupplierMobile2,
					tel02: this.editsupplierobj.editsupplierTel2,
					qq02: this.editsupplierobj.editsupplierQQ2,
					address_shipping: this.editsupplierobj.editsupplierContact2,
					bank_name: this.editsupplierobj.editsupplierBankName,
					bank_account: this.editsupplierobj.editsupplierBankAccount,
					tax_number: this.editsupplierobj.editTaxNumber,
					fax: this.editsupplierobj.editFax,
					tax_rate: this.editsupplierobj.editTaxRate,
					init_payables: this.editsupplierobj.editInitPayables,
					init_payables_dt: this.editsupplierobj.editInitPayablesDT,
					note: this.editsupplierobj.editNote,
				}).then(res => {
					if(res.retcode == 2000) {
						this.$Message.success('修改成功')
						this.closeEditModal()
						this.getAllSupplierinfo()
					}else if(res.retcode == 2002){
             this.$Message.info(res.msg);
              this.editsupplierobj = {}
             this.closeEditModal()
            this.getAllSupplierinfo()
          }
				})
			},
      /*添加供应商*/
			addNewSuppliers() {
				if(this.addsupplierobj.addsupplierName == "") {
					this.$Message.info('请输入供应商名称')
				}
				if(this.addsupplierobj.addsupplierCode == "") {
					this.$Message.info('请输入供应商编码')
				}

				this.addsupplierobj.addsuppliercategoryid = this.$route.params.categoryId
				addSupplier({
					ticket: this.$store.state.ticket,
					category_id: this.addsupplierobj.addsuppliercategoryid,
					name: this.addsupplierobj.addsupplierName,
					code: this.addsupplierobj.addsupplierCode,
					address: this.addsupplierobj.addsupplierAddress,
					contact01: this.addsupplierobj.addsupplierContact1,
					mobile01: this.addsupplierobj.addsupplierMobile1,
					tel01: this.addsupplierobj.addsupplierTel1,
					qq01: this.addsupplierobj.addsupplierQQ1,
					contact02: this.addsupplierobj.addsupplierContact2,
					mobile02: this.addsupplierobj.addsupplierMobile2,
					tel02: this.addsupplierobj.addsupplierTel2,
					qq02: this.addsupplierobj.addsupplierQQ2,
					address_shipping: this.addsupplierobj.addsupplierFHAddress,
					bank_name: this.addsupplierobj.addsupplierBankName,
					bank_account: this.addsupplierobj.addsupplierBankAccount,
					tax_number: this.addsupplierobj.addTaxNumber,
					fax: this.addsupplierobj.addFax,
					tax_rate: this.addsupplierobj.addTaxRate,
					init_payables: this.addsupplierobj.addInitPayables,
					init_payables_dt: this.addsupplierobj.addInitPayablesDT,
					note: this.addsupplierobj.addNote,
					data_org: '',
				}).then(res => {
					if(res.retcode == 2000) {
						this.$Message.success('添加成功')
						this.closeAddModal()
						this.getAllSupplierinfo()
					}else if(res.retcode == 2002){
             this.$Message.info(res.msg);
              this.addsupplierobj = {}
             this.closeEditModal()
            this.getAllSupplierinfo()
          }
				})
			},
      /*删除供应商*/
			deleteSuppliers() {
				deleteSupplier({
          ticket: sessionStorage.getItem("ticket"),
					id: this.delSupplierid
				}).then(res => {
					this.$Message.success('删除成功')
					this.getAllSupplierinfo()
					this.del_modal = false
				})
			},
      /*确认删除*/
			delTrue() {
				this.deleteSuppliers()
			},
      /*取消删除*/
			delFalse() {
				this.del_modal = false
			},
      /*打开添加供应商模态框*/
			OpenAddSupplier() {
        this.addsupplierobj = {}
				this.addsupplierobj.addsuppliercategoryid = this.$route.params.categoryId
        this.addsupplierobj.addInitPayablesDT = new Date()
				this.add_supplier = true;

			},
      /*关闭添加供应商模态框*/
			closeAddModal() {
				this.add_supplier = false;
			},
      /*关闭编辑供应商模态框*/
			closeEditModal() {
				this.edit_supplier = false;
			},
      /*获取供应商下拉菜单数据*/
			getcategoryname() {
				getSupplierCategoryList({
					ticket: this.$store.state.ticket,
				}).then(res => {
					res.data.forEach((item, index) => {
						var temparr = {}
						temparr.value = item.id
						temparr.label = item.name
						this.supplierlist.push(temparr)
					})
				})
			},
      /*重置查询*/
			rester() {
				this.supplierCode = ''
				this.supplierName = ''
				this.supplierAddress = ''
				this.relation = ''
				this.tel = ''
				this.fixedTel = ''
				this.qq = ''
			}
		},
		data() {
			return {
        options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
				del_modal: false,
				delSupplierid: '',
				addsupplierobj: {
					addsuppliercategoryid: '', //添加供应商分类id
					addsupplierCode: '',   //添加供应商编码
					addsupplierName: '',   //添加供应商名称
					addsupplierAddress: '', //添加供应商地址
					addsupplierContact1: '', //添加供应商联系人
					addsupplierMobile1: '',  //添加供应商联系人手机
					addsupplierTel1: '',  //添加供应商联系人固话
					addsupplierQQ1: '',  //添加供应商联系人qq
					addsupplierContact2: '',  //添加供应商备用联系人
					addsupplierMobile2: '',   //添加供应商备用联系人手机
					addsupplierTel2: '',  //添加供应商备用联系人固话
					addsupplierQQ2: '',  //添加供应商备用联系人qq
					addsupplierFHAddress: '', //添加供应商备用联系人
					addsupplierBankName: '',  //开户行
					addsupplierBankAccount: '',   //开户行账号
					addTaxNumber: '',  //税号
					addFax: '',  //传真
					addTaxRate: '',  //税率
					addInitPayables: '',  //应付期初余额
					addInitPayablesDT: '',   //余额日期
					addNote: '',
				},
				model1: '',
				model2: '',
				editsupplierobj: {
					editid: '',
					editsuppliercategoryid: '',
					editsupplierCode: '',
					editsupplierName: '',
					editsupplierAddress: '',
					editsupplierContact1: '',
					editsupplierMobile1: '',
					editsupplierTel1: '',
					editsupplierQQ1: '',
					editsupplierContact2: '',
					editsupplierMobile2: '',
					editsupplierTel2: '',
					editsupplierQQ2: '',
					editsupplierFHAddress: '',
					editsupplierBankName: '',
					editsupplierBankAccount: '',
					editTaxNumber: '',
					editFax: '',
					editTaxRate: '',
					editInitPayables: '',
					editInitPayablesDT: '',
					editNote: '',
				},
				selectValue1: '',  //供应商分类id
				selectValue2: '',
				supplierlist: [],   //供应商列表
				supplierCode: '',  //供应商编码
				supplierName: '',  //供应商名称
				supplierAddress: '',   //供应商地址
				relation: '',  //联系人
				tel: '',  //手机
				fixedTel: '',  //固话
				qq: '',   //qq
				suppliername: '',  //
				add_supplier: false,
				edit_supplier: false,
				value: '',
				supplierdata: [{
						title: '序号',
						width: 60,
						fixed: 'left',
						align: "center",
						key: 'numid',
					},
					{
						title: '供应商编码',
						fixed: 'left',
						align: "center",
						width: 110,
						key: 'code'
					}, {
						title: '供应商名称',
						fixed: 'left',
						align: "center",
						width: 180,
						key: 'name'
					}, {
						title: '地址',
						align: "center",
						key: 'address',
						width: 135,
					}, {
						title: '联系人',
						align: "center",
						key: 'contact01',
						width: 110,
					}, {
						title: '手机',
						align: "center",
						key: 'contact01',
						width: 130,
					}, {
						title: '固话',
						key: 'tel01',
						align: "center",
						width: 130,
					}, {
						title: 'QQ',
						key: 'qq01',
						align: "center",
						width: 120,
					}, {
						title: '备用联系人',
						key: 'contact02',
						align: "center",
						width: 110,
					}, {
						title: '备用联系人手机',
						key: 'mobile02',
						align: "center",
						width: 130,
					}, {
						title: '备用联系人固话',
						key: 'tel02',
						align: "center",
						width: 130,
					}, {
						title: '备用联系人QQ',
						key: 'qq02',
						align: "center",
						width: 120,
					}, {
						title: '发货地址',
						align: "center",
						key: 'address_shipping',
						width: 135,
					}, {
						title: '开户行',
						align: "center",
						key: 'bank_name',
						width: 135,
					}, {
						title: '开户行账户',
						align: "center",
						key: 'bank_account',
						width: 135,
					}, {
						title: '税号',
						align: "center",
						key: 'tax_number',
						width: 110,
					}, {
						title: '传真',
						key: 'fax',
						align: "center",
						width: 135,
					}, {
						title: '税率(%)',
						align: "center",
						key: 'tax_rate',
						width: 100,
					}, {
						title: '应付期初余额',
						key: 'init_payables',
						width: 120,
						align: "center",
					}, {
						title: '应付期初余额日期',
						key: 'init_payables_dt',
						width: 180,
						align: "center",
					}, {
						title: '备注',
						key: 'note',
						align: "center",
						width: 120,
					}, {
						title: '数据域',
						align: "center",
						key: 'data_org',
						width: 110,
					},
					{
						title: '操作',
						key: 'action',
						fixed: 'right',
						width: 185,
						align: 'center',
						render: (h, params) => {
							return h('p', [
								/*h('Button', {
								    props: {
								      type: 'primary',
								      size: 'default'
								    },
								    style: {
								    marginRight: '8px'
								    },
								    on: {
								      click: ()=> {
								        this.$router.push('/b/supplier-list')
								      }
								    }
								  }, '查看'),*/
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
											this.edit_supplier = true;
											this.editsupplierobj.editid = params.row.id
											this.editsupplierobj.editsuppliercategoryid = params.row.category_id
											this.editsupplierobj.editsupplierName = params.row.name
											this.editsupplierobj.editsupplierCode = params.row.code
											this.editsupplierobj.editsupplierAddress = params.row.address
											this.editsupplierobj.editsupplierContact1 = params.row.contact01
											this.editsupplierobj.editsupplierMobile1 = params.row.mobile01
											this.editsupplierobj.editsupplierTel1 = params.row.tel01
											this.editsupplierobj.editsupplierQQ1 = params.row.qq01
											this.editsupplierobj.editsupplierContact2 = params.row.contact02
											this.editsupplierobj.editsupplierMobile2 = params.row.mobile02
											this.editsupplierobj.editsupplierTel2 = params.row.tel02
											this.editsupplierobj.editsupplierQQ2 = params.row.qq02
											this.editsupplierobj.editsupplierContact2 = params.row.address_shipping
											this.editsupplierobj.editsupplierBankName = params.row.bank_name
											this.editsupplierobj.editsupplierBankAccount = params.row.bank_account
											this.editsupplierobj.editTaxNumber = params.row.tax_number
											this.editsupplierobj.editFax = params.row.fax
											this.editsupplierobj.editTaxRate = params.row.tax_rate
											this.editsupplierobj.editInitPayables = params.row.init_payables
											this.editsupplierobj.editInitPayablesDT = params.row.init_payables_dt
											this.editsupplierobj.editNote = params.row.note
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
											this.delSupplierid = params.row.id
											this.del_modal = true
										}
									}
								}, '删除')
							]);
						}
					}
				],
				supplierlists: [],
				pageSize: 20,
				dataCount: 0
			}
		}
	}
</script>

<style>
	/*.purchase_order {*/
	/* padding: 0 20px; */
	/*  padding-bottom: 500px; */
	/*}*/

	.ivu-modal-specil .ivu-modal {
		top: 12%;
	}
</style>
