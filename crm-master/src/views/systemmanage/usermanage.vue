<template>
	<div class="purchase_order">
		<div class="basic_indicators" style="margin-bottom: 30px;">
			组织机构
			<Button type="primary" style="margin-left:50px;" @click="addUnit">新增组织机构</Button>
		</div>
		<Table stripe :columns="columns5" :data="goods_list"></Table>
		<!-- <div class="page_unit">
      <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
    </div> -->

		<Modal v-model="add_org" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>新增组织机构</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>名称</Col>
					<Col span="18">
					<Input v-model="name"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>上级组织</Col>
					<Col span="18">
					<Select v-model="parent_id">
						<Option v-for="(item,index) in goods_list" :value="item.id	" :key="item.id">
							{{ item.name }}
						</Option>
					</Select>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;"><span style="color:red;font-size:16px;">*</span>编码</Col>
					<Col span="18">
					<Input v-model="org_code"></Input>
					</Col>
				</Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="keepAddGoods">保存</Button>
				<Button type="primary" @click="closeAddModal">取消</Button>
			</div>
		</Modal>
		<Modal v-model="edit_goods" width="360">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>编辑组织机构</span>
			</p>
			<div style="line-height: 32px;">
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">名称</Col>
					<Col span="18">
					<Input v-model="name"></Input>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">上级组织</Col>
					<Col span="18">
					<Select v-model="parent_id">
						<Option v-for="(item,index) in goods_list" :value="item.id" :key="item.id">
							{{ item.name }}
						</Option>
					</Select>
					</Col>
				</Row>
				<Row style='margin: 10px 0;'>
					<Col span="6" style="text-align:center;">编码</Col>
					<Col span="18">
					<Input v-model="org_code"></Input>
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
				<span>您确认删除此组织机构吗?</span>
			</p>
			<div slot="footer">
				<Button type="primary" @click="delTrue">确认</Button>
				<Button type="primary" @click="delFalse">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import { getOrg, addOrg, editOrg, delOrg } from '../../api/api'
	export default {
		mounted() {
			this.getOrgsList();
		},
		data() {
			return {
				goods_list: [],
				add_org: false, //添加组织机构弹窗
				edit_goods: false, //修改组织机构弹窗
				del_goods: false, //删除组织机构弹窗
				name: '', //添加窗口绑定分类编码
				org_code: '', //添加窗口绑定分类名称
				parent_id: '', //添加窗口绑定分类上级
				edit_code: '', //修改窗口绑定分类编码
				edit_name: '', //修改窗口绑定分类名称
				edit_superior: '', //修改窗口绑定分类上级
				add_ji: '', //绑定添加组织机构值
				edit_ji: '', //绑定编辑组织机构值
				edit_id: '', //编辑时传的id
				del_id: '', //删除时传的id
				columns5: [{
						title: '序号',
            align: "center",
						key: 'unmid',
					},
					{
						title: '名称',
            align: "center",
						key: 'name',
					},
					{
						title: '编码',
            align: "center",
						key: 'org_code',
					},
					{
						title: '数据域',
            align: "center",
						key: 'data_org',
					},
					{
						title: '操作',
						key: 'action',
						align: 'center',
						render: (h, params) => {
							return h('p', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'default'
									},
									style: {
										marginRight: '8px'
									},
									on: {
										click: () => {
											this.$router.push('/m/manage-list/' + params.row.id)
										}
									}
								}, '查看'),
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
											this.edit_id = params.row.id
											this.org_code = params.row.org_code
											this.name = params.row.name
											this.parent_id = params.row.parent_id
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
											console.log(this.del_id)
										}
									}
								}, '删除')
							]);
						}
					}
				],
				pageSize: 10,
				dataCount: 100
			}
		},
		methods: {
			changepage() {},
			addUnit() {
				this.name = '';
				this.org_code = '';
				this.parent_id = '';
				this.add_org = true;
			},
			closeAddModal() {
				this.add_org = false;
				this.name = '';
				this.org_code = '';
				this.parent_id = '';
			},
			closeEditModal() {
				this.edit_goods = false;
			},
			//获取组织机构列表数据,自循环序号
			getOrgsList() {
				getOrg({
          ticket: sessionStorage.getItem("ticket"),
        }).then(res => {
					this.goods_list = res.data
					var num = 1
					this.goods_list.forEach((item, index) => {
						item.unmid = num++
					})
				})
			},
			//保存新增组织机构
			keepAddGoods() {
				if(this.org_code.trim() == '') {
					this.$Message.info('请输入编码');
					return;
				}
				if(this.name.trim() == '') {
					this.$Message.info('请输入名称');
					return;
				}
				addOrg({
          ticket: sessionStorage.getItem("ticket"),
					org_code: this.org_code,
					name: this.name,
					parent_id: this.parent_id
				}).then(res => {
					if(res.retcode == '2000') {
						this.$Message.info(res.msg);
						this.add_org = false;
						this.getOrgsList();
						this.name = '';
						this.org_code = '';
						this.parent_id = '';
					} else {
						this.$Message.info(res.msg);
					}
				})
			},
			//保存修改组织机构
			keepEditGoods() {
				if(this.name.trim() == '') {
					this.$Message.info('请输入名称');
					return;
				}
				if(this.org_code.trim() == '') {
					this.$Message.info('请输入编码');
					return;
				}
				editOrg({
          ticket: sessionStorage.getItem("ticket"),
					org_code: this.org_code,
					name: this.name,
					parent_id: this.parent_id,
					id: this.edit_id
				}).then(res => {
					if(res.retcode == '2000') {
						this.$Message.info(res.msg);
						this.edit_goods = false;
						this.getOrgsList();
						this.name = '';
						this.org_code = '';
						this.parent_id = '';
					} else {
						this.$Message.info(res.msg);
					}
				})
			},
			//确认删除组织机构
			delTrue() {
				delOrg({
          ticket: sessionStorage.getItem("ticket"),
					id: this.del_id
				}).then(res => {
					if(res.retcode == '2000') {
						this.$Message.info(res.msg);
						this.getOrgsList();
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
	/* .purchase_order {
    padding: 0 20px;
  } */
</style>
