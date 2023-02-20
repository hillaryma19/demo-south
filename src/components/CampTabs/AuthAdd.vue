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
      {{ dialogData.dialogType == 1 ? "添加" : "编辑" }}权限
    </div>
    <div class="dialog-content">
      <el-tree
        :data="treeUserData"
        :props="defaultProps"
        default-expand-all
        show-checkbox
        :default-checked-keys="[4]"
        @check-change="handleCheckChange"
      ></el-tree>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleDialogClose">取 消</el-button>
      <el-button size="small" type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { scenarioPowerSave, scenarioPowerUpdate } from "@/api/scenario.js";
export default {
  name: "AuthAddDialog",
  props: {
    dialogData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      treeUserData: [
        {
          label: "想定力量编程 1",
          id: 1,
          children: [
            {
              id: 3,
              label: "想定力量编程 1-1",
              children: [
                {
                  id: 5,
                  label: "想定力量编程 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "想定力量编程 2",
          id: 2,
          children: [
            {
              id: 4,
              label: "想定力量编程 2-1",
              children: [
                {
                  id: 6,
                  label: "想定力量编程 2-1-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
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
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleDialogClose() {
      this.$emit("handleDialogInfo", false);
    },
    onSubmit() {
      this.$message({
        type: "success",
        message: "添加成功!",
      });
      this.handleDialogClose();
      return;
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
    },
  },
};
</script>

<style lang="scss" scoped></style>
