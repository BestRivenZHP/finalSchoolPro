<template>
	<div class="purchase_order">
		<div class="basic_indicators">
			查询条件
		</div>
		<Row style="margin: 20px 0;">
			<Col span="5">
			<Row>
        <Col span="6" class="from-text">客户编码</Col>
        <Col span="18">
        <Input v-model="searchdata.usercode"></Input>
        </Col>
      </Row>
			</Col>
			<Col span="5">
			<Row>
				<Col span="6" class="from-text">客户名称</Col>
				<Col span="18">
				<Input v-model="searchdata.username"></Input>
				</Col>
			</Row>
			</Col>
			<Col span="5">
			<Row>
        <Col span="6" class="from-text">地址</Col>
        <Col span="18">
        <Input v-model="searchdata.useraddress"></Input>
        </Col>
      </Row>
			</Col>
			<Col span="5">
			<Row>
        <Col span="6" class="from-text">联系人</Col>
        <Col span="18">
        <Input v-model="searchdata.usercontact"></Input>
        </Col>
      </Row>
			</Col>
		</Row>
		<Row>
			<Col span="5">
			<Row>
        <Col span="6" class="from-text">手机</Col>
        <Col span="18">
        <Input v-model="searchdata.usermobile"></Input>
        </Col>
      </Row>
			</Col>
			<Col span="5">
			<Row>
        <Col span="6" class="from-text">固话</Col>
        <Col span="18">
        <Input v-model="searchdata.usertel"></Input>
        </Col>
      </Row>
			</Col>
      <Col span="5">
      <Row>
        <Col span="6" class="from-text">QQ</Col>
        <Col span="18">
        <Input v-model="searchdata.userqq"></Input>
        </Col>
      </Row>
      </Col>
			<Col span="2" style="text-align: center;">
			<Button type="primary" @click="search">查询</Button>
			</Col>
			<Col span="2" style="text-align: center;">
			<Button type="primary" @click="reset">重置</Button>
			</Col>
		</Row>
		<div class="basic_indicators" style="margin-bottom: 30px;">
			属于[{{ ps_id }}]的客户
      <Button type="primary" style="margin-left: 50px;" @click='addUserState'>新增客户</Button>
      <!-- <Button type="primary" style="margin-left: 50px;" @click='addUserState'>导入客户</Button> -->
      <Button type="primary" style="margin-left: 50px;" @click='editUserState'>编辑客户</Button>
			<Button type="primary" style="margin-left: 50px;" @click='delUserState'>删除客户</Button>
      <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
		</div>
		<Table :row-class-name="rowClassName" @on-row-click="rowClick" :columns="userinfolist" :data="userinfodata"></Table>
		<div class="page_unit">
			<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
		</div>
		<Modal v-model="add_user_state" width="800">
			<p slot="header" style="color:#2D8CF0;text-align:center">
				<span>新增客户</span>
			</p>
			<div style="line-height: 32px;text-align:left;">
				<Row style='margin: 10px 15px;'>
          <Col span="10">
          <Row>
            <Col span="8">
            <span><span style="color:red;font-size:16px;">*</span>分 类</span>
            </Col>
            <Col span="16">
              <Select v-model="categorySelectValue" style="width:230px;" disabled>
              <Option v-for="item in editpricelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
           <span><span style="color:red;font-size:16px;">*</span>编 码</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="addObj.addusercode"></Input>
            </Col>
            </Row>
          </Col>
				</Row>
				<Row style='margin: 10px 15px;'>
          <Row>
            <Col span="3">
              <span style="margin-right:20px;"><span style="color:red;font-size:16px;">*</span>客户名称</span>
            </Col>
            <Col span="21">
               <Input style="" v-model="addObj.addusername"></Input>
            </Col>
          </Row>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Row>
            <Col span="3">
              <span style="margin-right:45px;">地址</span>
            </Col>
            <Col span="21">
              <Input style="" v-model="addObj.adduseraddress"></Input>
            </Col>
          </Row>
        </Row>
				<Row style='margin: 10px 15px;'>
           <Col span="10">
          <Row>
            <Col span="8">
           <span>联系人</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="addObj.addcontact01"></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
           <span>手 机</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="addObj.addmobile01"></Input>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <Row>
            <Col span="8">
            <span>固&nbsp;&nbsp;&nbsp;&nbsp;话</span>
            </Col>
            <Col span="16">
             <Input style="" v-model="addObj.addtel01" ></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
           <span>Q  &nbsp;&nbsp;Q</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="addObj.addqq01"></Input>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
           <Col span="10">
          <Row>
            <Col span="8">
            <span>备用联系人</span>
            </Col>
            <Col span="16">
             <Input style="" v-model="addObj.addcontact02"></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
            <span>备用联系人手机</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="addObj.addmobile02"></Input>
            </Col>
            </Row>
          </Col>
        </Row>
         <Row style='margin: 10px 15px;'>
          <Col span="10">
          <Row>
            <Col span="8">
            <span>备用联系人固话</span>
            </Col>
            <Col span="16">
             <Input style="" v-model="addObj.addtel02"></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
            <span>备用联系人手QQ</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="addObj.addqq02"></Input>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Row>
            <Col span="3">
              <span style="margin-right:20px;" >收货地址</span>
            </Col>
            <Col span="21">
              <Input style="" v-model="addObj.addaddressreceipt01"></Input>
            </Col>
          </Row>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <Row>
            <Col span="8">
            <span>开户行</span>
            </Col>
            <Col span="16">
             <Input style="" v-model="addObj.addbankname"></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
            <span>开户行账号</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="addObj.addbankaccount"></Input>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <Row>
            <Col span="8">
             <span>税&nbsp;&nbsp;&nbsp;&nbsp;号</span>
            </Col>
            <Col span="16">
             <Input style="" v-model="addObj.addtaxnumber"></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
            <span>传&nbsp;&nbsp;&nbsp;&nbsp;真</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="addObj.addfax"></Input>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <Row>
            <Col span="8">
             <span>应收初期余额</span>
            </Col>
            <Col span="16">
             <Input style="" v-model="addObj.addinit_receivables"></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
            <span>余额日期</span>
            </Col>
            <Col span="16">
              <DatePicker v-model="addObj.addinit_receivables_dt" type="date" placeholder="请选择时间" style="" :options="options"></DatePicker>
            </Col>
            </Row>
          </Col>
        </Row>
         <Row style='margin: 10px 15px;'>
           <Row>
            <Col span="3">
              <span style="margin-right:20px;">销售出库仓库</span>
            </Col>
            <Col span="21">
              <Select style="" v-model="addObj.addsales_warehouse_id">
           <Option v-for="item in outstocklist" :value="item.value" :key="item.value">{{ item.label }}</Option>
           </Select>
            </Col>
          </Row>
        </Row>
         <Row style='margin: 10px 15px;'>
           <Row>
            <Col span="3">
               <span style="margin-right:20px;">备注</span>
            </Col>
            <Col span="21">
             <Input style="" v-model="addObj.addnote"></Input>
            </Col>
          </Row>
        </Row>
			</div>
			<div slot="footer">
				<Button type="primary" @click="addusers">新增</Button>
				<Button type="primary" @click="closeaddUserState">取消</Button>
			</div>
		</Modal>


<Modal v-model="edit_user_state" width="800">
      <p slot="header" style="color:#2D8CF0;text-align:center">
        <span>编辑客户</span>
      </p>
      <div style="line-height: 32px;text-align:left;">
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <Row>
            <Col span="8">
            <span><span style="color:red;font-size:16px;">*</span>分 类</span>
            </Col>
            <Col span="16">
              <Select v-model="categorySelectValue" style="width:230px;" disabled>
              <Option v-for="item in editpricelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
           <span><span style="color:red;font-size:16px;">*</span>编 码</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="editObj.editusercode"></Input>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Row>
            <Col span="3">
              <span style="margin-right:20px;"><span style="color:red;font-size:16px;">*</span>客户名称</span>
            </Col>
            <Col span="21">
               <Input style="" v-model="editObj.editusername"></Input>
            </Col>
          </Row>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Row>
            <Col span="3">
              <span style="margin-right:45px;">地址</span>
            </Col>
            <Col span="21">
              <Input style="" v-model="editObj.edituseraddress"></Input>
            </Col>
          </Row>
        </Row>
        <Row style='margin: 10px 15px;'>
           <Col span="10">
          <Row>
            <Col span="8">
           <span>联系人</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="editObj.editcontact01"></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
           <span>手 机</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="editObj.editmobile01"></Input>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <Row>
            <Col span="8">
            <span>固&nbsp;&nbsp;&nbsp;&nbsp;话</span>
            </Col>
            <Col span="16">
             <Input style="" v-model="editObj.edittel01"></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
           <span>Q  &nbsp;&nbsp;Q</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="editObj.editqq01"></Input>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
           <Col span="10">
          <Row>
            <Col span="8">
            <span>备用联系人</span>
            </Col>
            <Col span="16">
             <Input style="" v-model="editObj.editcontact02"></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
            <span>备用联系人手机</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="editObj.editmobile02" @on-blur="regtel"></Input>
            </Col>
            </Row>
          </Col>
        </Row>
         <Row style='margin: 10px 15px;'>
          <Col span="10">
          <Row>
            <Col span="8">
            <span>备用联系人固话</span>
            </Col>
            <Col span="16">
             <Input style="" v-model="editObj.edittel02"></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
            <span>备用联系人手QQ</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="editObj.editqq02"></Input>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Row>
            <Col span="3">
              <span style="margin-right:20px;" >收货地址</span>
            </Col>
            <Col span="21">
              <Input style="" v-model="editObj.editaddressreceipt01"></Input>
            </Col>
          </Row>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <Row>
            <Col span="8">
            <span>开户行</span>
            </Col>
            <Col span="16">
             <Input style="" v-model="editObj.editbankname"></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
            <span>开户行账号</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="editObj.editbankaccount"></Input>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <Row>
            <Col span="8">
             <span>税&nbsp;&nbsp;&nbsp;&nbsp;号</span>
            </Col>
            <Col span="16">
             <Input style="" v-model="editObj.edittaxnumber"></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
            <span>传&nbsp;&nbsp;&nbsp;&nbsp;真</span>
            </Col>
            <Col span="16">
              <Input style="" v-model="editObj.editfax"></Input>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <Row>
            <Col span="8">
             <span>应收初期余额</span>
            </Col>
            <Col span="16">
             <Input style="" v-model="editObj.editinit_receivables"></Input>
            </Col>
            </Row>
          </Col>

          <Col span="10" offset="4">
           <Row>
            <Col span="8">
            <span>余额日期</span>
            </Col>
            <Col span="16">
              <DatePicker v-model="editObj.editinit_receivables_dt" type="date" placeholder="请选择时间" style="" :options="options"></DatePicker>
            </Col>
            </Row>
          </Col>
        </Row>
         <Row style='margin: 10px 15px;'>
           <Row>
            <Col span="3">
              <span style="margin-right:20px;">销售出库仓库</span>
            </Col>
            <Col span="21">
              <Select style="" v-model="editObj.editsales_warehouse_id">
           <Option v-for="item in outstocklist" :value="item.value" :key="item.value">{{ item.label }}</Option>
           </Select>
            </Col>
          </Row>
        </Row>
         <Row style='margin: 10px 15px;'>
           <Row>
            <Col span="3">
               <span style="margin-right:20px;">备注</span>
            </Col>
            <Col span="21">
             <Input style="" v-model="editObj.editnote"></Input>
            </Col>
          </Row>
        </Row>
      </div>
      <div slot="footer">
        <Button type="primary" @click="editusers">保存</Button>
        <Button type="primary" @click="closeeditUserState">取消</Button>
      </div>
    </Modal>
    <!-- <Modal v-model="edit_user_state" width="800">
      <p slot="header" style="color:#2D8CF0;text-align:center">
        <span>编辑客户</span>
      </p>
      <div style="line-height: 32px;text-align:left;">
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <span>分 类</span>
          <Select v-model="editObj.editpriceid" style="width:230px;" disabled>
          <Option v-for="item in editpricelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="10" offset="4">
          <span>编 码</span>
          <Input style="width:230px;" v-model="editObj.editusercode"></Input>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <span style="margin-right:20px;">客户名称</span>
          <Input style="width:650px;" v-model="editObj.editusername"></Input>
        </Row>
        <Row style='margin: 10px 15px;'>
          <span style="margin-right:45px;">地址</span>
          <Input style="width:650px;" v-model="editObj.edituseraddress"></Input>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <span>联系人</span>
          <Input style="width:230px;" v-model="editObj.editcontact01"></Input>
          </Col>
          <Col span="10" offset="4">
          <span>手 机</span>
          <Input style="width:230px;" v-model="editObj.editmobile01"  @on-blur="regtel"></Input>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <span>固&nbsp;&nbsp;&nbsp;&nbsp;话</span>
          <Input style="width:230px;" v-model="editObj.edittel01"></Input>
          </Col>
          <Col span="10" offset="4">
          <span>Q  &nbsp;&nbsp;Q</span>
          <Input style="width:230px;" v-model="editObj.editqq01"></Input>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <span>备用联系人</span>
          <Input style="width:210px;" v-model="editObj.editcontact02"></Input>
          </Col>
          <Col span="10" offset="4">
          <span>备用联系人手机</span>
          <Input style="width:175px;" v-model="editObj.editmobile02"  @on-blur="regtel"></Input>
          </Col>
        </Row>
         <Row style='margin: 10px 15px;'>
          <Col span="10">
          <span>备用联系人固话</span>
          <Input style="width:185px;" v-model="editObj.edittel02"></Input>
          </Col>
          <Col span="10" offset="4">
          <span>备用联系人手QQ</span>
          <Input style="width:170px;" v-model="editObj.editqq02"></Input>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <span style="margin-right:20px;">收货地址</span>
          <Input style="width:650px;" v-model="editObj.editaddressreceipt01"></Input>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <span>开户行</span>
          <Input style="width:230px;" v-model="editObj.editbankname"></Input>
          </Col>
          <Col span="10" offset="4">
          <span>开户行账号</span>
          <Input style="width:200px;" v-model="editObj.editbankaccount"></Input>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <span>税&nbsp;&nbsp;&nbsp;&nbsp;号</span>
          <Input style="width:230px;" v-model="editObj.edittaxnumber"></Input>
          </Col>
          <Col span="10" offset="4">
          <span>传&nbsp;&nbsp;&nbsp;&nbsp;真</span>
          <Input style="width:230px;" v-model="editObj.editfax"></Input>
          </Col>
        </Row>
        <Row style='margin: 10px 15px;'>
          <Col span="10">
          <span>应收初期余额</span>
          <Input style="width:195px;" v-model="editObj.editinit_receivables"></Input>
          </Col>
          <Col span="10" offset="4">
          <span>余额日期</span>
          <DatePicker v-model="editObj.editinit_receivables_dt" type="date" placeholder="请选择时间" style="width: 220px"></DatePicker>
          </Col>
        </Row>
         <Row style='margin: 10px 15px;'>
          <span style="margin-right:20px;">销售出库仓库</span>
          <Select style="width:600px" v-model="editObj.editsales_warehouse_id">
          <Option v-for="item in outstocklist" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Row>
         <Row style='margin: 10px 15px;'>
          <span style="margin-right:20px;">备注</span>
          <Input style="width:650px;" v-model="editObj.editnote"></Input>
        </Row>
      </div>
      <div slot="footer">
        <Button type="primary" @click="editusers">保存</Button>
        <Button type="primary" @click="closeeditUserState">取消</Button>
      </div>
    </Modal> -->
      <Modal v-model="del_modal" width="360">
      <p slot="header" style="color:#2D8CF0;text-align:center">
        <span>您确认删除此客户吗?</span>
      </p>
      <p>您正在执行删除操作!</p>
      <div slot="footer">
        <Button type="primary" @click="delTrue">确认</Button>
        <Button type="primary" @click="delESC">取消</Button>
      </div>
    </Modal>
	</div>
</template>

<script>
  import { getAllPriceInfo,getStockinfos,getAllUsersDetial,addCustomer,getAllUserList,delCustomer } from '../../../api/api'
	export default {
		data() {
			return {
         options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
        del_modal: false,
        /*查询*/
        searchdata: {
        usercode: '',
        username: '',
        useraddress: '',
        usercontact: '',
        usermobile: '',
        usertel: '',
        userqq: '',
        },

        categorySelectValue: this.$route.params.categoryId,
        editpricelist: [],
        outstocklist: [],  //出库仓库
        /*新增客户*/
        addObj: {
        addusercode: '', /*编码*/
        addusername: '', /*客户名称*/
        adduseraddress: '', /*地址*/
        addcontact01: '', /*联系人*/
        addmobile01: '', /*联系人手机*/
        addtel01: '', /*固话*/
        addqq01: '', /*qq*/
        addcontact02: '',   /*备用联系人*/
        addmobile02: '', /*手机*/
        addtel02: '', /*固话*/
        addqq02: '', /*qq*/
        addaddressreceipt01: '',  /*收货地址*/
        addbankname: '', /*开户行*/
        addbankaccount: '', /*开户行账号*/
        addtaxnumber: '', /*税号*/
        addfax: '', /*传真*/
        addinit_receivables: '',  /*应收期初余额*/
        addinit_receivables_dt: '',  /*余额日期*/
        addsales_warehouse_id: '', /*销售出库仓库*/
        addnote: '',  /*备注*/
        },

        editObj:{
        editusercode: '',
        editusername: '',
        edituseraddress: '',
        editcontact01: '',
        editmobile01: '',
        edittel01: '',
        editqq01: '',
        editcontact02: '',
        editmobile02: '',
        edittel02: '',
        editqq02: '',
        editaddressreceipt01: '',
        editbankname: '',
        editbankaccount: '',
        edittaxnumber: '',
        editfax: '',
        editinit_receivables: '',
        editinit_receivables_dt: '',
        editsales_warehouse_id: '',
        editnote: '',
        },

        add_user_state: false,
				edit_user_state: false,
				userinfolist: [{
					title: '序号',
          width: 60,
          align: "center",
					key: 'numid',
				},{
					title: '客户编码',
          width: 100,
          align: "center",
					key: 'code',
				}, {
					title: '客户名称',
          width: 150,
          align: "center",
					key: 'name',
				}, {
					title: '地址',
          width: 150,
          align: "center",
					key: 'address',
				}, {
					title: '联系人',
          width: 130,
          align: "center",
					key: 'contact01',
				}, {
					title: '手机',
          width: 130,
          align: "center",
					key: 'mobile01',
				}, {
					title: '固话',
          width: 130,
          align: "center",
					key: 'tel01',
				}, {
					title: 'QQ',
          width: 110,
          align: "center",
					key: 'qq01',
				}, {
					title: '备用联系人',
          width: 120,
          align: "center",
					key: 'contact02',
				}, {
					title: '备用联系人手机',
          width: 130,
          align: "center",
					key: 'mobile02',
				}, {
					title: '备用联系人固话',
          width: 130,
          align: "center",
					key: 'tel02',
				}, {
					title: '备用联系人QQ',
          width: 120,
          align: "center",
					key: 'qq02',
				}, {
					title: '收货地址',
          width: 150,
          align: "center",
					key: 'address_receipt',
				}, {
					title: '开户行',
          width: 110,
          align: "center",
					key: 'bank_name',
				}, {
					title: '开户行账号',
          width: 130,
          align: "center",
					key: 'bank_account',
				}, {
					title: '税号',
          width: 100,
          align: "center",
					key: 'tax_number',
				}, {
					title: '传真',
          width: 100,
          align: "center",
					key: 'fax',
				}, /*{
					title: '应收期初余额',
          width: 130,
					key: 'init_receivables',
				}, {
					title: '应收期初余额日期',
          width: 180,
					key: 'init_receivables_dt',
				}, {
					title: '销售出库仓库',
          width: 150,
					key: 'sales_warehouse_id',
				},*/ {
					title: '备注',
          width: 150,
          align: "center",
					key: 'note',
				}, {
					title: '数据域',
          width: 130,
          align: "center",
					key: 'data_org',
				}],
				userinfodata: [],
				pageSize: 20,
				dataCount: 0,
        cityList: [],
        ps_id: '',
        categoryID: "",
        currentTableObj: '',
        CurrenTableindex: '',
        del_modal: false,
			}
		},
		methods: {
       /*验证手机号*/
        regtel(){
          var telreg = /^1[3|4|5|7|8][0-9]{9}$/;
          if(this.addObj.addmobile01 == "" || this.addObj.addmobile01 == null){
          this.$Message.info("请填写电话")
          return
          }
          if(!telreg.test(this.addObj.addmobile01)) {
          this.$Message.info('请输入正确的手机号码')
          return;
        }
        },
      /*重置*/
      reset(){
        this.searchdata.usercode = ''
        this.searchdata.username = ''
        this.searchdata.useraddress = ''
        this.searchdata.usercontact = ''
        this.searchdata.usermobile = ''
        this.searchdata.usertel = ''
        this.searchdata.userqq = ''
        this.getUsersInfo()
      },
      /*查询*/
      search(){
        this.userinfodata = []
        this.dataCount = 0
        this.ps_id = this.$route.params.ps_id
        getAllUsersDetial({
          loginUserId: this.$route.params.loginUserId,
          categoryId: this.$route.params.categoryId,
          code: this.searchdata.usercode,
          name: this.searchdata.username,
          address: this.searchdata.useraddress,
          contact01: this.searchdata.usercontact,
          mobile01: this.searchdata.usermobile,
          tel01: this.searchdata.usertel,
          qq01: this.searchdata.userqq,
          limit: 10,
        }).then(res => {
          var num = 1
          res.data.res.forEach((item,index) => {
            item['numid'] = num++
          })
          this.userinfodata = res.data.res
          this.dataCount = res.data.total
        })
      },

       /*获取当前行的按钮状态和数据*/
      rowClick(currentRow,index){
        this.currentTableObj = currentRow
        this.CurrenTableindex = index
        this.editcode = this.currentTableObj.code
        this.editcategoryname = this.currentTableObj.name
        this.editprice = this.currentTableObj.ps_id
      },
      rowClassName (row, index) {
          if (index === this.CurrenTableindex) {
              return 'selectedtd';
          }
          return '';
      },
      delTrue(){
        this.delusers()
      },
      delESC(){
        this.del_modal = false
      },
      delUserState() {
        if(!this.currentTableObj){
          this.$Message.info("请在表格中选择要编辑的客户分类项")
          return
        }
        this.del_modal = true
      },
      closedelModal(){
        this.del_modal = false;
      },
      /*删除用户*/
      delusers(){
        if(!this.currentTableObj){
          this.$Message.info('请在表格中选择要删除的客户项')
          return
        }
        this.del_modal = true
        delCustomer({
          loginUserId: sessionStorage.getItem("ticket"),
          id: this.currentTableObj.id
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success("删除成功")
            this.getUsersInfo()
            this.del_modal = false
          }else if(res.retcode == 4000){
            this.$Message.info(res.msg)
            this.del_modal = false
            this.getUsersInfo()
          }
        })
      },
      delTrue(){
        this.delusers()
      },
      delFalse(){
        this.closedelModal()
      },
      /*添加用户*/
      addusers(){
        if(this.addObj.addusercode == ""){
          this.$Message.info("请填写客户编码")
          return
        }
        if(this.addObj.addusername == ""){
          this.$Message.info("请填写客户名称")
          return
        }
        if(this.addObj.addmobile01 == "" || this.addObj.addmobile01 == null){
          this.$Message.info("请填写电话")
          return
        }else if(!(/^1[3|4|5|7|8][0-9]{9}$/).test(this.addObj.addmobile01)){
          this.$Message.info('请输入正确的手机号码')
          return;
        }
        if(this.addObj.addinit_receivables_dt){
          var time = new Date(this.addObj.addinit_receivables_dt)
          var month = (time.getMonth()+1)>=10?(time.getMonth()+1):'0'+(time.getMonth()+1)
          var day = time.getDate()>=10?time.getDate():'0'+time.getDate()
          this.addObj.addinit_receivables_dt = time.getFullYear() + '-' + month + '-' + day
          if(this.addObj.addinit_receivables_dt == 'NaN-NaN-NaN'){
            this.addObj.addinit_receivables_dt = ''
          }
        }else{
          this.addObj.addinit_receivables_dt = ''
        }
        addCustomer({
          loginUserId: sessionStorage.getItem("ticket"),
          categoryId: this.categorySelectValue,
          code: this.addObj.addusercode,
          name: this.addObj.addusername,
          address: this.addObj.adduseraddress,
          contact01: this.addObj.addcontact01,
          mobile01: this.addObj.addmobile01,
          tel01: this.addObj.addtel01,
          qq01: this.addObj.addqq01,
          contact02: this.addObj.addcontact02,
          mobile02: this.addObj.addmobile02,
          tel02: this.addObj.addtel02,
          qq02: this.addObj.addqq02,
          addressReceipt: this.addObj.addaddressreceipt01,
          bankName: this.addObj.addbankname,
          bankAccount: this.addObj.addbankaccount,
          tax: this.addObj.addtaxnumber,
          fax: this.addObj.addfax,
          init_receivables: this.addObj.addinit_receivables,
          init_receivables_dt: this.addObj.addinit_receivables_dt,
          sales_warehouse_id: this.addObj.addsales_warehouse_id,
          note: this.addObj.addnote,
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('添加成功')
            this.addObj = {}
            this.getUsersInfo()
            this.closeaddUserState()
          }
        })
      },
      /*编辑用户*/
      editusers(){
        if(this.editObj.editusercode == ""){
          this.$Message.info("请填写用户编码")
          return
        }
        if(this.editObj.editusername == ""){
          this.$Message.info("请填写用户名称")
          return
        }
         if(this.editObj.editmobile01 == "" || this.editObj.editmobile01 == null){
          this.$Message.info("请填写电话")
          return
        }else if(!(/^1[3|4|5|7|8][0-9]{9}$/).test(this.editObj.editmobile01)){
          this.$Message.info('请输入正确的手机号码')
          return;
        }
        if(this.editObj.editinit_receivables_dt){
          var time = new Date(this.editObj.editinit_receivables_dt)
          var month = (time.getMonth()+1)>=10?(time.getMonth()+1):'0'+(time.getMonth()+1)
          var day = time.getDate()>=10?time.getDate():'0'+time.getDate()
          this.editObj.editinit_receivables_dt = time.getFullYear() + '-' + month + '-' + day
          if(this.editObj.editinit_receivables_dt == 'NaN-NaN-NaN'){
            this.editObj.editinit_receivables_dt = ''
          }
        }else{
          this.editObj.editinit_receivables_dt = ''
        }
        /*console.log(this.currentTableObj.id)*/
        addCustomer({
          loginUserId: sessionStorage.getItem("ticket"),
          id: this.currentTableObj.id,
          categoryId: this.categorySelectValue,
          code: this.editObj.editusercode,
          name: this.editObj.editusername,
          address: this.editObj.edituseraddress,
          contact01: this.editObj.editcontact01,
          mobile01: this.editObj.editmobile01,
          tel01: this.editObj.edittel01,
          qq01: this.editObj.editqq01,
          contact02: this.editObj.editcontact02,
          mobile02: this.editObj.editmobile02,
          tel02: this.editObj.edittel02,
          qq02: this.editObj.editqq02,
          addressReceipt: this.editObj.editaddressreceipt01,
          bankName: this.editObj.editbankname,
          bankAccount: this.editObj.editbankaccount,
          tax: this.editObj.edittaxnumber,
          fax: this.editObj.editfax,
          init_receivables: this.editObj.editinit_receivables,
          init_receivables_dt: this.editObj.editinit_receivables_dt,
          sales_warehouse_id: this.editObj.editsales_warehouse_id,
          note: this.editObj.editnote,
        }).then(res => {
          if(res.retcode == 2000){
            this.$Message.success('修改成功')
            this.editObj = {}
            this.closeeditUserState()
            this.getUsersInfo()
          }
        })
      },
      /*获取所有的用户分类*/
      getAllUserCategorys(){
        getAllUserList({
          loginUserId: this.categoryID,
          page: 1,
          limit: 20
        }).then(res => {
          res.data.data.forEach((item,index) => {
           if(item.name){
           let temp = {}
           temp.value = item.id
           temp.label = item.name
           this.editpricelist.push(temp)
           }
          })
        })
      },
       /*获取所有的仓库*/
      getAllstocks(){
        getStockinfos({
          ticket: this.$store.state.ticket
        }).then(res => {
          var num = 1
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.name
            this.outstocklist.push(temp)
          })
        })
      },
      /*返回*/
      goBack(){
        window.history.back()
      },
       /*获取供应商列表*/
      getSupplierList(){
        getAllSupplier({
          ticket: this.$store.state.ticket
        }).then(res => {
          res.data.forEach((item,index) => {
            var temp = {}
            temp.value = item.id
            temp.label = item.name
            this.supplierlist.push(temp)
          })
        })
      },
      /*分页*/
      changepage(index){
        this.userinfodata = []
        this.ps_id = this.$route.params.ps_id
        getAllUsersDetial({
          loginUserId: this.$route.params.loginUserId,
          categoryId: this.$route.params.categoryId,
          limit: 20,
          page: index,
        }).then(res => {
          var num = 1
          res.data.res.forEach((item,index) => {
            item['numid'] = num++
          })
          this.userinfodata = res.data.res
          this.dataCount = res.data.total
        })
      },
      /*获取用户信息*/
      getUsersInfo(){
        this.ps_id = this.$route.params.ps_id
        getAllUsersDetial({
          loginUserId: this.$route.params.loginUserId,
          categoryId: this.$route.params.categoryId,
          limit: 20,
          page: 1,
        }).then(res => {
          var num = 1
          res.data.res.forEach((item,index) => {
            item['numid'] = num++
          })
          this.userinfodata = res.data.res
          this.dataCount = res.data.total
        })
      },
			addUserState() {
        this.add_user_state = true
      },
      closeaddUserState() {
        this.add_user_state = false
      },
      /*编辑用户*/
      editUserState() {
        if(!this.currentTableObj){
          this.$Message.info('请在表格中选择要编辑的客户项')
          return
        }
        this.edit_user_state = true
        this.editObj.editusercode = this.currentTableObj.code
        this.editObj.editusername = this.currentTableObj.name
        this.editObj.edituseraddress = this.currentTableObj.address
        this.editObj.editcontact01 = this.currentTableObj.contact01
        this.editObj.editmobile01 = this.currentTableObj.mobile01
        this.editObj.edittel01 = this.currentTableObj.tel01
        this.editObj.editqq01 = this.currentTableObj.qq01
        this.editObj.editcontact02 = this.currentTableObj.contact02
        this.editObj.editmobile02 = this.currentTableObj.mobile02
        this.editObj.edittel02 = this.currentTableObj.tel02
        this.editObj.editqq02 = this.currentTableObj.qq02
        this.editObj.editaddressreceipt01 = this.currentTableObj.address_receipt
        this.editObj.editbankname = this.currentTableObj.bank_name
        this.editObj.editbankaccount = this.currentTableObj.bank_account
        this.editObj.edittaxnumber = this.currentTableObj.tax_number
        this.editObj.editfax = this.currentTableObj.fax
        this.editObj.editinit_receivables = this.currentTableObj.init_receivables
        this.editObj.editinit_receivables_dt = this.currentTableObj.init_receivables_dt
        this.editObj.editsales_warehouse_id = this.currentTableObj.sales_warehouse_id
        this.editObj.editnote = this.currentTableObj.note
      },
      closeeditUserState() {
        this.edit_user_state = false
      },
      closedelModal() {
				this.del_modal = true
			},
		},
    mounted(){
      this.$store.state.ticket = sessionStorage.getItem("ticket")
      this.getUsersInfo()
      this.getAllUserCategorys()
      this.getAllstocks()
    }
	}
</script>

<style>

  .ivu-modal-wrap .ivu-modal {
    top: 15%;
    }
  .ivu-table .selectedtd td{
    background-color: #ebf7ff;
  }
</style>
