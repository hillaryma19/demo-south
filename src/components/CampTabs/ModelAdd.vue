<template>
  <el-dialog
    title="添加力量"
    width="50%"
    :visible="dialogData.dialogVisible"
    :before-close="handleDialogClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title">
      {{ dialogData.dialogType == 1 ? "创建" : "编辑" }}力量编程
    </div>
    <div class="dialog-content">
      <ul class="scroll-bar-style">
        <li
          class="move"
          v-for="(item, index) in dialogData.data"
          :key="item.id"
        >
          <div v-if="item.selected" class="flex-between">
            <div>{{ item.label }}</div>
            <div>
              <el-input-number
                size="small"
                :min="1"
                v-model="item.num"
              ></el-input-number>
            </div>
          </div>
        </li>
      </ul>
      <!-- <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="130px"
        size="small"
      >
        <el-form-item label="力量编程名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="力量编程描述" prop="desc">
          <el-input-number
            size="small"
            :min="1"
            v-model="form.desc"
          ></el-input-number>
        </el-form-item>
      </el-form> -->
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
  name: "ModelAddDialog",
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
          label: "力量 1",
          id: 1,
          children: [
            {
              id: 3,
              label: "力量 1-1",
              children: [
                {
                  id: 5,
                  label: "力量 1-1-1",
                },
                {
                  id: 7,
                  label: "力量 1-1-1",
                },
                {
                  id: 8,
                  label: "力量 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "力量 2",
          id: 2,
          children: [
            {
              id: 4,
              label: "力量 2-1",
              children: [
                {
                  id: 6,
                  label: "力量 2-1-1",
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
      },
      rules: {
        name: [
          { required: true, message: "请输入力量编程名称", trigger: "blur" },
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
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleDialogClose() {
      this.$emit("handleDialogInfo", false);
    },
    onSubmit(formName) {
      let params = {
        scenarioProgrammingId: this.$route.query.id,
        name: this.form.name,
      };
      if (this.dialogData.dialogType == 1) {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.handleDialogClose();
        return;
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
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     let params = {
      //       scenarioProgrammingId: this.$route.query.id,
      //       name: this.form.name,
      //     };
      //     if (this.dialogData.dialogType == 1) {
      //       scenarioPowerSave(params).then((res) => {
      //         this.$message({
      //           type: "success",
      //           message: "添加成功!",
      //         });
      //         this.handleDialogClose();
      //       });
      //     } else if (this.dialogData.dialogType == 2) {
      //       params.id = this.dialogData.id;
      //       scenarioPowerUpdate(params).then((res) => {
      //         this.$message({
      //           type: "success",
      //           message: "编辑成功!",
      //         });
      //         this.handleDialogClose();
      //       });
      //     }
      //     // alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
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
.dialog-content {
  ul > li {
    line-height: 28px;
    transition: all 0.2s ease-in-out;
    margin-bottom: 6px;
    border-radius: 2px;
    padding-left: 4px;
    &:hover {
      background-color: #ebeef5;
    }
  }
}
</style>
