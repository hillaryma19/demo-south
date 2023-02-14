<template>
  <el-dialog
    title="部署"
    width="50%"
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
        <el-form-item label="经度" prop="lng">
          <el-input v-model="form.lng"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="lat">
          <el-input v-model="form.lat"></el-input>
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
import { scenarioPowerSave, scenarioPowerUpdate } from "@/api/scenario.js";
export default {
  name: "DeploymentAddDialog",
  props: {
    dialogData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        lng: "",
        lat: "",
      },
      rules: {
        lng: [{ required: true, message: "请输入经度", trigger: "blur" }],
        lat: [{ required: true, message: "请输入纬度", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleDialogClose() {
      this.$emit("handleDialogInfo", false);
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            scenarioProgrammingId: this.$route.query.id,
            lng: this.form.lng,
            lat: this.form.lat,
          };
          scenarioPowerSave(params).then((res) => {
            this.$message({
              type: "success",
              message: "部署成功!",
            });
            this.handleDialogClose();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
