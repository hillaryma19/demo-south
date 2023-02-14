<template>
  <el-dialog
    title="添加"
    width="40%"
    :visible="dialogData.dialogVisible"
    :before-close="handleDialogClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="dialog-content">
      <el-form ref="form" :model="form" label-width="100px" size="small">
        <el-form-item label="体系名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="体系说明">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleDialogClose">取 消</el-button>
      <el-button size="small" type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { marshalSave, marshalUpdate } from "@/api/marshal";

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
      },
      scenarioPowerList: [
        {
          altitude: "", //高度
          // createUser: '', //创建人
          // dateTime: '', //创建时间
          dimensionality: "", //维度
          id: "",
          latitude: "", //经度
          name: "", //名称
          property: "", //属性
          scenarioProgrammingId: "", //想定编程id(必填)
          state: "", //数据状态
        },
      ],
    };
  },
  created() {},
  methods: {
    handleDialogClose() {
      // this.$emit("handleDialogInfo", false);
      this.$emit("handleDialogInfo", this.form);
    },
    onSubmit() {
      let params = {
        name: "", //名称
        scenarioId: "", //想定id
        scenarioPowerId: "", //所属力量
        scenarioPowerIds: "", //下辖力量
        state: "", //数据状态
      };
      params.scenarioPowerList = this.scenarioPowerList;
      if (this.dialogData.id) {
        params.id = this.dialogData.id; //编组id
        marshalUpdate(params).then((res) => {
          console.log(res, "==099");
        });
      } else {
        marshalSave(params).then((res) => {
          console.log(res, "==099");
        });
      }
      this.handleDialogClose();
    },
  },
};
</script>

<style lang="scss" scoped></style>
