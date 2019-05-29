<template>
	<div class="login">
		<div style="height: 15%;color: #FFFFFF;text-align: center;"></div>
		<div style="height: 50px;line-height:50px;color: #FFFFFF;text-align: center;width: 380px;margin: 0 auto;position: relative;margin-bottom: 30px;">
			<img style="display: inline-block;width: 35px;height: 45px;float:left;margin-left: 13px;margin-top: -25px;padding-top: 5px;" src="../assets/jianong_friend.png" alt="" />
			<span style="font-size: 28px;float:left;margin-left: 20px;margin-top: -25px;">流通企业进销存管理系统</span>
		</div>
		<div class="login_main">
			<div>
				<div class="login_img"><img src="../assets/rr.png" alt="" /></div>
				<Form ref="loginForm" :model="loginForm" :rules="ruleInline" class="login-form">
					<FormItem prop="user">
						<Input type="text" v-model="loginForm.user" placeholder="请输入用户名" style="text-align:left;padding:0;">
						<Icon type="android-lock" slot="prepend" size='20'></Icon>
						</Input>
					</FormItem>
					<FormItem prop="password">
						<Input type="password" v-model="loginForm.password" placeholder="请输入密码" style="text-align:left;padding:0;">
						<Icon type="android-lock" slot="prepend" size='20'></Icon>
					</Input>
					</FormItem>
						<FormItem prop="name">
						<Input type="name" v-model="loginForm.name" placeholder="请输入姓名" style="text-align:left;padding:0;">
						<Icon type="android-lock" slot="prepend" size='20'></Icon>
					</Input>
					</FormItem>
						<FormItem prop="email">
						<Input type="email" v-model="loginForm.email" placeholder="请输入邮箱" style="text-align:left;padding:0;">
						<Icon type="android-lock" slot="prepend" size='20'></Icon>
					</Input>
					</FormItem>
					<FormItem>
						<Button type="primary" @click="handleSubmit('loginForm')" long>注册</Button>
					</FormItem>
				</Form>
			</div>
		</div>
	</div>
</template>

<script>
  import { loginTo } from '../api/api'
	export default {
		data() {
			return {
        is_admin: 0,
        ticket: "",
				loginForm: {
					user: '',
					password: '',
					name:'',
					email:''
				},
				ruleInline: {
					user: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						}
						//					,
						//						{
						//							type: 'string',
						//							min: 6,
						//							message: '密码最少6位数字或字母组成!',
						//							trigger: 'blur'
						//						}
					],
						name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						}
						//					,
						//						{
						//							type: 'string',
						//							min: 6,
						//							message: '密码最少6位数字或字母组成!',
						//							trigger: 'blur'
						//						}
					],
						email: [{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						}
						//					,
						//						{
						//							type: 'string',
						//							min: 6,
						//							message: '密码最少6位数字或字母组成!',
						//							trigger: 'blur'
						//						}
					],
					code: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}]
				},
			}
		},
		methods: {
			handleSubmit(name) {
				var params = new URLSearchParams();
				params.append('userName', this.loginForm.user);
				params.append('password', this.loginForm.password	);
				params.append('name', this.loginForm.name	);
				params.append('email', this.loginForm.email	);
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$ajax
        .post('/api/BusinessLogin/insert',params).then(res => {
            if(res.data.code == 200) {
              this.$store.state.loginStatus = true;
              this.$router.push('/login')
					  	this.$Message.success('注册成功');
							}else {
								this.$Message.error('注册失败');
								}
							})
					}
				})

			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
		},
		mounted() {
     
      
    }
	}
</script>

<style>
	.login {
		width: 100%;
		height: 100vh;
		background: url(../assets/crm_bg.jpg) no-repeat;
		background-size: cover;
	}

	.login_main {
		margin-top: -40px;
		width: 320px;
		margin: 0 auto;
		/*		margin-top: 10%;*/
		height: 450px;
		background: #FFFFFF;
	}

	.login-form {
		padding: 0 30px;
	}

	.login_img {
		text-align: center;
		padding: 50px 0;
	}

	.login_img img {}
</style>
