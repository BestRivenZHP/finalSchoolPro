<template>
	<div class="purchase_order">
		<Row class="re_password_juli">
			<Col span="5" style="line-height: 35px;">
				请输入旧密码
			</Col>
			<Col span="19">
				 <Input v-model="value" placeholder=""></Input>
			</Col>
		</Row>
		<Row class="re_password_juli">
			<Col span="5" style="line-height: 35px;">
				请输入新密码
			</Col>
			<Col span="19">
				 <Input v-model="value" placeholder=""></Input>
			</Col>
		</Row>
		<Row class="re_password_juli">
			<Col span="5" style="line-height: 35px;">
				请确认新密码
			</Col>
			<Col span="19">
				 <Input v-model="value" placeholder=""></Input>
			</Col>
		</Row>
		<Row class="re_password_juli">
			<Col span="4" offset="16">
				 <Button type="primary">确认修改</Button>
			</Col>
			<Col span="4" >
				 <Button type="primary">取消修改</Button>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				value:'111'
			}
		}
	}
</script>

<style>
	.re_password{
		width: 500px;
		height: 60vh;
		margin: 0 auto;
		margin-top: 10%;
	}
	.re_password_juli{
		margin: 10px 0;
	}
</style>
