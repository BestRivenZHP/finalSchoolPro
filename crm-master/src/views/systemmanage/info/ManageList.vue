<template>
	<div class="purchase_order">
		<div class="basic_indicators" style="margin-bottom: 30px;">
			人员列表
			<Button type="primary" style="margin-left:50px;" @click="addUnit">新增用户</Button>
						<Button type="primary" style="margin-left:50px;" @click="back">退出系统</Button>

		</div>
		

		 <div class="main-style">
    <el-table
      :data="msg"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="用户名"
        width="180">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="密码"
        width="180">
        <template slot-scope="scope">{{ scope.row.password }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="姓名">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="email">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>

			<el-table-column label="操作" width="140" class="tablecolumn">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onDeleteBtnClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
 



		<Modal v-model="add_goods" width="800">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>新增用户</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin-bottom: 10px;'>
					<Col span="12">
					<Row>
						<Col span="6" style="text-align:center;">登录名</Col>
						<Col span="18">
						<Input v-model="params.userName"></Input>
						</Col>
					</Row>
					</Col>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">姓名</Col>
						<Col span="18">
						<Input v-model="params.name"></Input>
						</Col>
					</Row>
					</Col>
				</Row>
						<Row style='margin-bottom: 10px;'>
					<Col span="12">
					<Row>
						<Col span="6" style="text-align:center;">密码</Col>
						<Col span="18">
						<Input v-model="params.password"></Input>
						</Col>
					</Row>
					</Col>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">email</Col>
						<Col span="18">
						<Input v-model="params.email"></Input>
						</Col>
					</Row>
					</Col>
				</Row>
				
			</div>
			<div slot="footer">
				<Button type="primary" @click="keepAddGoodsOn">保存</Button>
				<Button type="primary" @click="closeAddModal">取消</Button>
			</div>
		</Modal>


		<Modal v-model="edit_goods" width="800">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>编辑用户</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin-bottom: 10px;'>
					<Col span="12">
					<Row>
						<Col span="6" style="text-align:center;">登录名</Col>
						<Col span="18">
						<Input v-model="edit_user.login_name" disabled="disabled"></Input>
						</Col>
					</Row>
					</Col>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">姓名</Col>
						<Col span="18">
						<Input v-model="edit_user.name"></Input>
						</Col>
					</Row>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">密码</Col>
						<!--<span style="color:red;font-size:16px;">*</span>-->
						<Col span="18">
						<Input type="password" v-model="edit_user.password"></Input>
						</Col>
					</Row>
					</Col>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">联系电话</Col>
						<Col span="18">
						<Input v-model="edit_user.tel"></Input>
						</Col>
					</Row>
					</Col>
				</Row>
				<Row style='margin-bottom: 10px;'>
					<Col span="12">
					<Row>
						<Col span="6" style="text-align:center;">生日</Col>
						<Col span="18">
						<DatePicker type="date" style='width: 100%;' v-model='edit_user.birthday' placement="bottom-end" placeholder="请选择出生日期"></DatePicker>
						</Col>
					</Row>
					</Col>
					<Col span="12" style="text-align:center;">
					<Row>
						<Col span="6" style="text-align:center;">身份证号</Col>
						<Col span="18">
						<Input v-model="edit_user.id_card_number"></Input>
						</Col>
					</Row>
					</Col>
				</Row>
				<Row style='margin-bottom: 10px;'>
					<Col span="3" style="text-align:center;">电子邮件</Col>
					<Col span="21">
					<Input v-model="edit_user.email"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="3" style="text-align:center;">家庭住址</Col>
					<Col span="21">
					<Input v-model="edit_user.address"></Input>
					</Col>
				</Row>
				<Row style='margin-top: 10px;'>
					<Col span="12">
					<Row>
						<Col span="6" style="text-align:center;">性别</Col>
						<Col span="18">
						<!--<RadioGroup v-model="edit_user.gender" @on-change='sexChange(edit_user.gender)'>
							<Radio label="0">
								<span>男</span>
							</Radio>
							<Radio label="1">
								<span>女</span>
							</Radio>
						</RadioGroup>-->
						<Select v-model="edit_user.gender" style="width:100%">
							<Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.name }}</Option>
						</Select>
						</Col>
					</Row>
					</Col>
					<Col span="12">
					<Row>
						<Col span="6" style="text-align:center;">能否登录</Col>
						<Col span="18">
						<!--<RadioGroup v-model="edit_user.enabled" @on-change='statusChange(edit_user.enabled)'>
							<Radio label="1">
								<span>允许登录</span>
							</Radio>
							<Radio label="0">
								<span style="color: red;">禁止登录</span>
							</Radio>
						</RadioGroup>-->
						<Select v-model="edit_user.enabled" style="width:100%">
							<Option v-for="item in loginStatus" :value="item.value" :key="item.value">{{ item.name }}</Option>
						</Select>
						</Col>
					</Row>
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
				<span>您确认删除此用户吗?</span>
			</p>
			<div slot="footer">
				<Button type="primary" @click="delTrue">确认</Button>
				<Button type="primary" @click="delFalse">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { getGoods, addGoodsCategory, editGoodsCategory, delGoodsCategory, addGoods, getGoodsCategory, getGoodsUnit, getGoodsBrand, delUser, getUser, addUser, getOrg, userEdit } from '../../../api/api'
	export default {
		 inject:['reload'],
		mounted() {



    this.$ajax
        .get('/api/BusinessLogin/findAll')
				.then(response => (this.msg = response.data.data));

		},
		data() {
			return {

      msg:'',

      params:{
				userName:'',
				password:'',
				name:'',
				email:'',
			},


   





        empstatus: false,
				man: '0',
				goods_list: [], //用户列表
				category_list: [], //用户分类列表
				org_list: [], //计量单位列表
				brand_list: [], //品牌列表数据
				add_goods: false, //添加用户弹窗
				edit_goods: false, //修改用户弹窗
				del_goods: false, //删除用户弹窗
				curr_good_id: "", //当前点击编辑的用户
				goods_title: '', //弹窗名为添加还是修改
				user: {
					login_name: '', //登录名
					name: '', //姓名
					password: "", //密码
					birthday: '', //生日
					id_card_number: '', //身份证号
					tel: '', //联系电话
					address: "", //家庭住址
					gender: '0', //性别
					enabled: '1', //能否登录
					email: '', //电子邮箱
				},
				edit_user: {
					login_name: '', //登录名
					name: '', //姓名
					password: "", //密码
					birthday: '', //生日
					id_card_number: '', //身份证号
					tel: '', //联系电话
					address: "", //家庭住址
					gender: '0', //性别
					enabled: '1', //能否登录
					email: '', //电子邮箱
				},
				sex: '',
				edit_sex: '',
				del_id: '', //删除时传的id
				search_code: '', //查询时传的编码
				search_name: '', //查询时传的name
				search_spec: '', //查询时传的型号
				search_number: '', //查询时传的条形码
				columns5: [{
						title: '序号',
						align: "center",
						key: 'unmid',
						width: 60
					},
					{
						title: '登录名',
						align: "center",
						key: 'username',
					},
					{
						title: '姓名',
						align: "center",
						key: 'nickname',
					}, {
						title: '邮箱',
						key: 'email',
						align: "center",
						width: 200
					},
					{
						title: '是否允许登录',
						key: 'status',
						align: "center",
					},
					{
						title: '性别',
						align: "center",
						key: 'sex',
					},
					{
						title: '生日',
						align: "center",
						key: 'birthday',
					},
					{
						title: '身份证号',
						align: "center",
						key: 'ID_card',
						width: 200
					},
					{
						title: '联系电话',
						align: "center",
						key: 'mobile',
					},
					{
						title: '家庭住址',
						align: "center",
						key: 'family_address',
					},
					{
						title: '操作',
						key: 'action',
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
											this.edit_goods = true;
											this.edit_user.login_name = params.row.username
											this.edit_user.name = params.row.nickname
											this.edit_user.birthday = params.row.birthday
											this.edit_user.id_card_number = params.row.ID_card
											this.edit_user.tel = params.row.mobile
											this.edit_user.address = params.row.family_address
											this.edit_user.email = params.row.email
											this.edit_user.gender = params.row.sex
											this.edit_user.enabled = params.row.status
											if(this.edit_user.gender == '男') {
												this.edit_user.gender = '0'
											} else {
												this.edit_user.gender = '1'
											}
											if(this.edit_user.enabled == '允许登录') {
												this.edit_user.enabled = '1'
											} else {
												this.edit_user.enabled = '0'
											}
										}
									}
								}, '编辑'),
							]);
						}
					}
				],
				pageSize: 10,
				dataCount: 100,
				sexList: [{ //使用select代替单选按钮选择性别
						name: '男',
						value: '0'
					},
					{
						name: '女',
						value: '1'
					}
				],
				loginStatus:[{
					name:'允许登录',
					value:'1'
				},{
					name:'禁止登录',
					value:'0'
				}]
			}
		},
		methods: {
			back(){
			this.$router.push('/login')
			},
			keepAddGoodsOn(){
       this.$ajax
				 .get('/api/BusinessLogin/insert',{params : this.params});

				 this.add_goods=false
				   this.$ajax
        .get('/api/BusinessLogin/findAll')
				.then(response => (this.msg = response.data.data));
				 this.onRefreshBtnClick;
				 this.params={
				userName:'',
				password:'',
				name:'',
				email:'',
			}
			},
			 onRefreshBtnClick() {
     this.reload();
    },
        onDeleteBtnClick(val){

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax
          .get('/api/BusinessLogin/delete',{params : val});
        this.$ajax
        .get('/api/BusinessLogin/findAll')
				.then(response => (this.msg = response.data.data));
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
           
           this.onRefreshBtnClick();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
           },








			//编辑时改变性别
			sexChange(info1) {
				this.user.gender = info1
			},
			//编辑时改变登录状态
			statusChange(info2) {
				this.user.enabled = info2
			},
			//增加的时候改变性别
			addSexChange(info3) {
				this.edit_user.gender = info3
			},
			//添加的时候改变登录状态
			addStatusChange(info4) {
				this.edit_user.enabled = info4
			},
			changepage() {},
			addUnit() {
				this.add_goods = true;
				this.user = {}
				this.user.gender = 0
				this.user.enabled = 1
			},
			closeAddModal() {
				this.add_goods = false;
				this.user = {}
			},
			closeEditModal() {
				this.edit_goods = false;
			},
			//获取用户列表数据,自循环序号
			getUsersList() {
				getUser({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
					this.goods_list = res.data
					var num = 1
					this.goods_list.forEach((item, index) => {
						item.unmid = num++
							if(item.status == '1') {
								item.status = '允许登录'
							} else {
								item.status = '禁止登录'
							}
					})
				})
			},
			//保存新增用户
			keepAddGoods() {
				if(this.user.login_name == '' || this.user.login_name == undefined) {
					this.$Message.info('请输入登录名');
					return;
				}
				if(this.user.name == '' || this.user.name == undefined) {
					this.$Message.info('请输入姓名');
					return;
				}
				if(this.user.password == '' || this.user.password == undefined) {
					this.$Message.info('请输入密码');
					return;
				}
				if(this.user.birthday == '' || this.user.birthday == undefined) {
					this.$Message.info('请输入生日');
					return;
				}
				if(this.user.id_card_number == '' || this.user.id_card_number == undefined) {
					this.$Message.info('请输入身份证号');
					return;
				}
				if(this.user.tel == '' || this.user.tel == undefined) {
					this.$Message.info('请输入电话');
					return;
				}
				if(this.user.address == '' || this.user.address == undefined) {
					this.$Message.info('请输入家庭住址');
					return;
				}
				if(this.user.gender == '0') {
					this.sex = '男'
				} else {
					this.sex = '女'
				}
				//格式化日期
				var time = new Date(this.user.birthday)
				this.user.birthday = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
				//正则验证正确的手机号
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!myreg.test(this.user.tel)) {
					this.$Message.info('请输入正确的手机号!');
					return;
				}
				//验证所选日期是否大于当前日期
				var now_date = new Date()
				if(time > now_date) {
					this.$Message.info('所选日期不能大于当前日期!');
					return;
				}
				//正则检验是够为身份证号
				var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if(!regIdNo.test(this.user.id_card_number)) {
					this.$Message.info('请输入正确的身份证号!');
					return;
				}
				addUser({
          ticket: sessionStorage.getItem("ticket"),
					username: this.user.login_name,
					nickname: this.user.name,
					password: this.user.password,
					birthday: this.user.birthday,
					ID_card: this.user.id_card_number,
					mobile: this.user.tel,
					family_address: this.user.address,
					sex: this.sex,
					status: this.user.enabled,
					email: this.user.email
				}).then(res => {
					if(res.retcode == '2000') {
						this.$Message.info(res.msg);
						this.add_goods = false;
						this.getUsersList();
						this.user = {}
					} else {
						this.$Message.info(res.msg);
						this.add_goods = false;
					}
				})
			},
			//保存修改用户
			keepEditGoods() {
				console.log(this.edit_user.password)
				if(this.edit_user.login_name == '' || this.edit_user.login_name == undefined) {
					this.$Message.info('请输入登录名');
					return;
				}
				if(this.edit_user.name == '' || this.edit_user.name == undefined) {
					this.$Message.info('请输入姓名');
					return;
				}
				if(this.edit_user.password == '' || this.edit_user.password == undefined) {
					this.$Message.info('请输入密码');
					return;
				}
				if(this.edit_user.birthday == '' || this.edit_user.birthday == undefined) {
					this.$Message.info('请输入生日');
					return;
				}
				if(this.edit_user.id_card_number == '' || this.edit_user.id_card_number == undefined) {
					this.$Message.info('请输入身份证号');
					return;
				}
				if(this.edit_user.tel == '' || this.edit_user.tel == undefined) {
					this.$Message.info('请输入电话');
					return;
				}
				if(this.edit_user.address == '' || this.edit_user.address == undefined) {
					this.$Message.info('请输入家庭住址');
					return;
				}

				if(this.edit_user.gender == '0') {
					this.edit_sex = '男'
				} else {
					this.edit_sex = '女'
				}
				//格式化日期
				var time = new Date(this.edit_user.birthday)
				this.edit_user.birthday = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
				//正则验证正确的手机号
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!myreg.test(this.edit_user.tel)) {
					this.$Message.info('请输入正确的手机号!');
					return;
				}
				//验证所选日期是否大于当前日期
				var now_date = new Date()
				if(time > now_date) {
					this.$Message.info('所选日期不能大于当前日期!');
					return;
				}
				//正则检验是否为身份证号
				var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if(!regIdNo.test(this.edit_user.id_card_number)) {
					this.$Message.info('请输入正确的身份证号!');
					return;
				}
				userEdit({
					ticket: sessionStorage.getItem("ticket"),
					username: this.edit_user.login_name,
					nickname: this.edit_user.name,
					birthday: this.edit_user.birthday,
					ID_card: this.edit_user.id_card_number,
					mobile: this.edit_user.tel,
					family_address: this.edit_user.address,
					email: this.edit_user.email,
					sex: this.edit_sex,
					status: this.edit_user.enabled,
					password: this.edit_user.password
				}).then(res => {
					if(res.retcode == '2000') {
						this.$Message.info(res.msg);
						this.edit_goods = false;
						this.getUsersList();
						this.edit_user = {}
					} else {
						this.$Message.info(res.msg);
						this.edit_user = {}
					}
				})
				this.edit_user = {}
			},
			//确认删除用户分类
			delTrue() {
				delUser({
          ticket: sessionStorage.getItem("ticket"),
					id: this.del_id
				}).then(res => {
					if(res.retcode == '2000') {
						this.$Message.info(res.msg);
						this.getUsersList();
						this.del_goods = false;
					} else {
						this.$Message.info(res.msg);
					}
				})
			},
			delFalse() {
				this.del_goods = false;
			}
		}
	}
</script>
<style>

</style>
