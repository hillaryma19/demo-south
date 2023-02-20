<template>
  <el-dialog
    title="添加编组"
    width="50%"
    :visible="dialogData.dialogVisible"
    :before-close="handleDialogClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title">
      {{ dialogData.dialogType == 1 ? "添加" : "编辑" }}编组
    </div>
    <div class="dialog-content">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        size="small"
      >
        <el-form-item label="编组名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="编组描述" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="编组成员" prop="desc">
          <el-select v-model="form.users" multiple placeholder="请选择编组成员">
            <el-option
              v-for="item in usersOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
  name: "GroupAddDialog",
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
        users: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
      usersOptions: [
        {
          value: "1",
          label: "成员1",
        },
        {
          value: "2",
          label: "成员2",
        },
        {
          value: "3",
          label: "成员3",
        },
        {
          value: "4",
          label: "成员4",
        },
      ],
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
            name: this.form.name,
          };
          if (this.dialogData.dialogType == 1) {
            scenarioPowerSave(params).then((res) => {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.handleDialogClose();
            });
          } else if (this.dialogData.dialogType == 2) {
            params.id = this.dialogData.id;
            scenarioPowerUpdate(params).then((res) => {
              this.$message({
                type: "success",
                message: "编辑成功!",
              });
              this.handleDialogClose();
            });
          }
          // alert("submit!");
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
