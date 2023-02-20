<template>
  <el-dialog
    title="新增"
    width="60%"
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
        <el-form-item label="执行" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio :label="1">动作</el-radio>
            <el-radio :label="2">条件</el-radio>
          </el-radio-group>
          <div class="pad-tp-10">
            <el-form-item v-show="form.resource == 1" label="" prop="region1">
              <el-select v-model="form.region1" placeholder="请选择执行动作">
                <el-option
                  v-for="item in implementOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="form.resource == 2" label="" prop="region1">
              <el-select v-model="form.region2" placeholder="请选择执行条件">
                <el-option
                  v-for="item in conditionOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="路线" prop="route">
          <el-select v-model="form.route" placeholder="请选择路线">
            <el-option
              v-for="item in routeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="flex-between">
          <el-form-item label="经度" prop="lng">
            <el-input v-model="form.lng"></el-input>
          </el-form-item>
          <el-form-item label="纬度" prop="lat">
            <el-input v-model="form.lat"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="时间值" prop="timeType">
          <el-radio-group v-model="form.timeType">
            <el-radio :label="1">固定时间</el-radio>
            <el-radio :label="2">时间范围</el-radio>
          </el-radio-group>
          <div class="pad-tp-10">
            <el-form-item label="" prop="time1" v-show="form.timeType == 1">
              <el-time-picker v-model="form.time1" placeholder="请选择固定时间">
                <!-- :picker-options="{
                selectableRange: '18:30:00 - 20:30:00',
              }" -->
              </el-time-picker>
            </el-form-item>
            <el-form-item label="" prop="time2" v-show="form.timeType == 2">
              <el-time-picker
                is-range
                v-model="form.time2"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="请选择时间范围"
              >
              </el-time-picker>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="form.desc" :rows="4"></el-input>
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
  name: "ActionAddDialog",
  props: {
    dialogData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      implementOptions: [
        { id: 1, name: "打击" },
        { id: 2, name: "巡逻" },
      ],
      conditionOptions: [
        { id: 1, name: "条件1" },
        { id: 2, name: "条件2" },
      ],
      routeOptions: [
        { id: 1, name: "航线1" },
        { id: 2, name: "航线2" },
      ],
      form: {
        resource: 1,
        region1: "",
        region2: "",
        name: "",
        color: "#409EFF",
        desc: "",
        route: "",
        lng: "",
        lat: "",
        timeType: 1,
        time1: "",
        time2: "",
      },
      rules: {
        // name: [
        //   { required: true, message: "请输入阵营名称", trigger: "blur" },
        //   {
        //     min: 1,
        //     max: 100,
        //     message: "长度在 1 到 100 个字符",
        //     trigger: "blur",
        //   },
        // ],
        resource: [
          { required: true, message: "请选择执行动作/条件", trigger: "change" },
        ],
        lng: [{ required: true, message: "请选择经度", trigger: "change" }],
        lat: [{ required: true, message: "请选择纬度", trigger: "change" }],
        timeType: [
          { required: true, message: "请选择时间值", trigger: "change" },
        ],
        time1: [
          { required: true, message: "请选择固定时间", trigger: "change" },
        ],
        time2: [
          { required: true, message: "请选择时间范围", trigger: "change" },
        ],
        region1: [
          { required: true, message: "请选择执行动作", trigger: "change" },
        ],
        region2: [
          { required: true, message: "请选择执行条件", trigger: "change" },
        ],
        route: [{ required: true, message: "请选择路线", trigger: "change" }],
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

<style lang="scss" scoped>
.dialog-content {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner,
  .el-select {
    width: 100%;
  }
}
</style>
