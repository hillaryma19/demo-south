<template>
  <el-dialog
    title="添加"
    :visible="dialogData.dialogVisible"
    width="50%"
    :before-close="handleDialogClose"
  >
    <div class="dialog-content">
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入计划名称"></el-input>
        </el-form-item>
        <el-form-item label="任务内容" prop="desc">
          <el-input
            type="textarea"
            v-model="form.desc"
            placeholder="请输入任务内容"
            :rows="4"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="执行编组" prop="region">
          <el-select v-model="form.region" placeholder="请选择执行编组">
            <el-option label="编组一" value="shanghai"></el-option>
            <el-option label="编组二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
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
        <el-form-item label="执行单位" prop="unit">
          <el-radio-group v-model="form.unit">
            <el-radio :label="1">编组</el-radio>
            <el-radio :label="2">力量</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <div class="form-tree">
            <div v-show="form.unit == 1">
              <el-tree
                :data="treeData1"
                :props="defaultProps"
                :expand-on-click-node="false"
                default-expand-all
                class="tree-line"
                :indent="0"
              >
              </el-tree>
              <!-- show-checkbox
                @check-change="handleCheckChange1" -->
            </div>
            <div v-show="form.unit == 2">
              <el-tree
                :data="treeData2"
                :props="defaultProps"
                :expand-on-click-node="false"
                default-expand-all
                class="tree-line"
                :indent="0"
              >
              </el-tree>
            </div>
          </div>
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
  name: "PlanAddDialog",
  props: {
    dialogData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      treeData2: [
        {
          label: "力量一级 1",
          children: [
            {
              label: "力量二级 1-1",
              children: [
                {
                  label: "力量三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "力量一级 2",
          children: [
            {
              label: "力量二级 2-1",
              children: [
                {
                  label: "力量三级 2-1-1",
                },
              ],
            },
            {
              label: "力量二级 2-2",
              children: [
                {
                  label: "力量三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "力量一级 3",
          children: [
            {
              label: "力量二级 3-1",
              children: [
                {
                  label: "力量三级 3-1-1",
                },
              ],
            },
            {
              label: "力量二级 3-2",
              children: [
                {
                  label: "力量三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      treeData1: [
        {
          label: "编组一级 1",
          children: [
            {
              label: "编组二级 1-1",
              children: [
                {
                  label: "编组三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "编组一级 2",
          children: [
            {
              label: "编组二级 2-1",
              children: [
                {
                  label: "编组三级 2-1-1",
                },
              ],
            },
            {
              label: "编组二级 2-2",
              children: [
                {
                  label: "编组三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "编组一级 3",
          children: [
            {
              label: "编组二级 3-1",
              children: [
                {
                  label: "编组三级 3-1-1",
                },
              ],
            },
            {
              label: "编组二级 3-2",
              children: [
                {
                  label: "编组三级 3-2-1",
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
        region: "",
        daterange: "",
        target: "",
        unit: 1,
      },
    };
  },
  methods: {
    handleCheckChange1(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleCheckChange2(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
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
