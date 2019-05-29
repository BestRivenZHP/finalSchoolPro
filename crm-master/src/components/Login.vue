<template>
  <div class="login">
    <div style="height: 15%;color: #FFFFFF;text-align: center;"></div>
    <div
      style="height: 50px;line-height:50px;color: #FFFFFF;text-align: center;width: 380px;margin: 0 auto;position: relative;margin-bottom: 30px;"
    >
      <img
        style="display: inline-block;width: 35px;height: 45px;float:left;margin-left: 13px;;padding-top: 5px;"
        src="../assets/jianong_friend.png"
        alt
      >
      <span style="font-size: 28px;float:left;margin-left: 20px;">流通企业进销存管理系统</span>
    </div>
    <div class="login_main">
      <div>
        <div class="login_img">
          <img src="../assets/rr.png" alt>
        </div>
        <Form ref="loginForm" :model="loginForm" :rules="ruleInline" class="login-form">
          <FormItem prop="user">
            <Input
              type="text"
              v-model="loginForm.user"
              placeholder="请输入用户名"
              style="text-align:left;padding:0;"
            >
              <Icon type="android-person" slot="prepend" size="20"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input
              type="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
              style="text-align:left;padding:0;"
            >
              <Icon type="android-lock" slot="prepend" size="20"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('loginForm')" long>登录</Button>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleRgeist()" long>注册</Button>
          </FormItem>
        </Form>
        <div class="aa">
          <el-radio-group v-model="is_admin">
            <el-radio label="1">商家</el-radio>
            <el-radio label="0">厂家</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginTo } from "../api/api";
export default {
  data() {
    return {
      is_admin: 0,
      ticket: "",
      loginForm: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
          //					,
          //						{
          //							type: 'string',
          //							min: 6,
          //							message: '密码最少6位数字或字母组成!',
          //							trigger: 'blur'
          //						}
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleRgeist() {
      this.$router.push("/register");
    },
    handleSubmit(name) {
      var params = new URLSearchParams();
      params.append("userName", this.loginForm.user);
      params.append("password", this.loginForm.password);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$ajax.post("/api/BusinessLogin/login", params).then(res => {
            if (res.data.code == 200) {
              this.$store.state.loginStatus = true;
              this.$store.state.ticket = res.data.ticket;
              sessionStorage.setItem("ticket", res.data.ticket);
              sessionStorage.setItem("is_admin", this.is_admin);
              if (this.is_admin === "1") {
                this.$router.push("/p/index");
              }
              if (this.is_admin === "0") {
                this.$router.push("m/manage-list");
              }
              this.$Message.success("登录成功");
              this.ticket = sessionStorage.getItem("ticket");
            } else {
              this.$Message.error("用户名或者密码错误");
            }
          });
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  mounted() {
    var that = this;
    document.onkeydown = function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13) {
        that.handleSubmit("loginForm");
      }
    };
    this.ticket = sessionStorage.getItem("ticket");
    if (this.ticket != null) {
      this.$store.state.loginStatus = true;
      this.$router.push("/p/index");
    } else {
      this.$store.state.loginStatus = false;
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.aa {
  margin-left: 85px;
}
.login {
  width: 100%;
  height: 100vh;
  background: url(../assets/crm_bg.jpg) no-repeat;
  background-size: cover;
}

.login_main {
  width: 320px;
  margin: 0 auto;
  /*		margin-top: 10%;*/
  height: 420px;
  background: #ffffff;
}

.login-form {
  padding: 0 30px;
}

.login_img {
  text-align: center;
  padding: 50px 0;
}

.login_img img {
}
</style>
