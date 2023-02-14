<template>
  <el-dialog
    title="添加"
    :visible="dialogData.dialogVisible"
    width="50%"
    :before-close="handleDialogClose"
  >
    <div class="dialog-content">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        size="small"
      >
        <el-form-item label="力量" prop="region">
          <el-select
            style="width: 100%"
            v-model="form.region"
            placeholder="请选择力量"
          >
            <el-option label="力量一" value="shanghai"></el-option>
            <el-option label="力量二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="动作" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="触发条件" prop="desc">
          <el-input type="textarea" v-model="form.desc" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="任务时间" prop="daterange">
          <el-date-picker
            style="width: 100%"
            v-model="form.daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
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
  name: "TaskAddDialog",
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
        desc: "",
        region: "",
        daterange: "",
        target: "",
      },
      rules: {
        desc: [
          { required: true, message: "请输入触发条件", trigger: "blur" },
          {
            min: 1,
            max: 500,
            message: "长度在 1 到 500 个字符",
            trigger: "blur",
          },
        ],
        daterange: [
          { required: true, message: "请选择时间范围", trigger: "change" },
        ],
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
          alert("submit!");
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
