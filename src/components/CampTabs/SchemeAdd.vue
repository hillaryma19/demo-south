<template>
  <el-dialog
    title="添加方案"
    width="50%"
    :visible="dialogData.dialogVisible"
    :before-close="handleDialogClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title">
      {{ dialogData.dialogType == 1 ? "添加" : "编辑" }}方案
    </div>
    <div class="dialog-content">
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-form-item label="任务标题" prop="taskTitle">
          <el-input v-model="form.taskTitle"></el-input>
        </el-form-item>
        <el-form-item label="任务内容" prop="taskContent">
          <el-input
            type="textarea"
            v-model="form.taskContent"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item label="执行编组" prop="marshalId">
          <el-select
            v-model="form.marshalId"
            placeholder="请选择执行编组"
            style="width: 100%"
          >
            <el-option label="编组一" value="shanghai"></el-option>
            <el-option label="编组二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务时间" prop="daterange">
          <el-date-picker
            v-model="form.daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="目标" prop="target">
          <el-input type="textarea" v-model="form.target"></el-input>
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
import { schemeSave, schemeUpdate } from "@/api/scenario.js";
export default {
  name: "SchemeAddDialog",
  props: {
    dialogData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        taskTitle: "",
        taskContent: "",
        marshalId: "",
        daterange: "",
        startTime: "",
        endTime: "",
        target: "",
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
            taskTitle: this.form.taskTitle,
            taskContent: this.form.taskContent,
            marshalId: this.form.taskTitle,
            scenarioId: this.form.taskTitle,
          };
          if (this.form.daterange && this.form.daterange.length) {
            params.startTime = this.form.daterange[0];
            params.endTime = this.form.daterange[1];
          }
          if (this.dialogData.dialogType == 1) {
            schemeSave(params).then((res) => {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.handleDialogClose();
            });
          } else if (this.dialogData.dialogType == 2) {
            params.id = this.dialogData.id;
            schemeUpdate(params).then((res) => {
              this.$message({
                type: "success",
                message: "编辑成功!",
              });
              this.handleDialogClose();
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
