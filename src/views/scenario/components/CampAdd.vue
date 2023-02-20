<template>
  <el-dialog
    title="添加阵营"
    width="40%"
    :visible="dialogData.dialogVisible"
    :before-close="handleDialogClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="dialog-content">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        size="small"
      >
        <el-form-item label="阵营名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="阵营主题颜色" prop="color">
          <el-color-picker v-model="form.color" size="small"></el-color-picker>
        </el-form-item>
        <el-form-item label="推演目的" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleDialogClose">取 消</el-button>
      <el-button size="small" type="primary" @click="onSubmit('form')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "CampAddDialog",
  props: {
    dialogData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        name: "",
        color: "#409EFF",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入阵营名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        // color: [{ required: true, message: "请选择主题颜色", trigger: "change" }],
      },
    };
  },
  methods: {
    handleDialogClose() {
      // this.$emit("handleDialogInfo", false);
      this.$emit("handleDialogInfo", this.form);
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // this.$refs["form"].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
        this.handleDialogClose();
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
