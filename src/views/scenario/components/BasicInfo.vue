<template>
  <div class="form-box">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      size="small"
    >
      <el-form-item label="想定名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="想定说明" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <!-- <el-form-item label="发生背景" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="参考文档" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item> -->
      <!-- <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit('form')"
          >确 定</el-button
        >
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { scenarioUpdate } from "@/api/scenario.js";

export default {
  name: "BasicInfo",
  data() {
    return {
      form: {
        name: "",
        color: "#409EFF",
        type: 1,
        desc: "",
        camps: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入想定名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.$emit("changeView", "Camp");
          let params = {
            // createUser: '', //创建人
            // dateTime: '', //创建时间
            explain: "", //说明
            name: "", //名称
            state: "", //数据状态
          };
          params.id = ""; //想定id
          scenarioUpdate(params).then((res) => {
            console.log(res, "==099");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  .form-box {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
