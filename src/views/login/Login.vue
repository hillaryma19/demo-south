<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="rule-form"
    >
      <el-form-item label="账号/用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item class="ta-c">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setCookie } from "@/utils/cookie.js";
export default {
  name: "LoginPage",
  data() {
    return {
      ruleForm: {
        name: "admin",
        password: "123465",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名称/账号", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          setCookie("token", "123456789");
          setCookie("username", this.ruleForm.name);
          setCookie("password", this.ruleForm.password);
          this.$router.push({ path: "/scenario/overview" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  padding-top: 22%;
  width: 400px;
  margin: 0 auto;
}
</style>
