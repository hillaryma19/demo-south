<template>
  <el-dialog
    title="添加"
    width="40%"
    :visible="dialogData.dialogVisible"
    :before-close="handleDialogClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title">
      {{ dialogData.dialogType == 1 ? "添加" : "编辑" }}设施
    </div>
    <div class="dialog-content">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        size="small"
      >
        <el-form-item label="设施名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="设施说明" prop="desc">
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
import { facilityInfoById, facilitySave, facilityUpdate } from "@/api/facility";

export default {
  name: "FacilityAddDialog",
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
      rules: {
        name: [
          { required: true, message: "请输入设施名称", trigger: "blur" },
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
  created() {
    if (this.dialogData.id) {
      this.facilityInfoById();
    }
  },
  methods: {
    handleDialogClose() {
      this.$emit("handleDialogInfo", this.form);
    },
    facilityInfoById() {
      let params = {
        id: this.dialogData.id,
      };
      facilityInfoById(params).then((res) => {
        console.log(res, "==099");
      });
    },
    onSubmit() {
      let params = {
        name: this.form.name, //设施名称
        describe: this.form.desc, //设施描述
        property: "", //设施状态
        state: "", //数据状态
        latitude: "", //经度
        altitude: "", //高度
        dimensionality: "", //维度
      };
      if (this.dialogData.id) {
        //编辑
        params.id = this.dialogData.id; //设施id
        facilityUpdate(params).then((res) => {
          console.log(res, "==099");
        });
      } else {
        //新增
        facilitySave(params).then((res) => {
          console.log(res, "==099");
        });
      }
      this.$refs["form"].resetFields();
      this.handleDialogClose();
    },
  },
};
</script>

<style lang="scss" scoped></style>
