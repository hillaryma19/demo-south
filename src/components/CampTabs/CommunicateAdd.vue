<template>
  <el-dialog
    title="通讯关系"
    width="50%"
    :visible="dialogData.dialogVisible"
    :before-close="handleDialogClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title">
      {{ dialogData.dialogType == 1 ? "添加" : "编辑" }}通讯关系
    </div>
    <div class="dialog-content">
      <el-form :model="form" ref="form" size="small" label-width="100px">
        <el-form-item label="发送方" prop="name">
          <el-input v-model="form.name" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="通讯类型" prop="ctype">
          <el-select
            style="width: 100%"
            v-model="form.ctype"
            placeholder="请选择通讯类型"
          >
            <el-option
              v-for="item in optionsTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通讯方式" prop="cway">
          <el-select
            style="width: 100%"
            v-model="form.cway"
            placeholder="请选择通讯方式"
          >
            <el-option
              v-for="item in optionsWays"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息类型" prop="ntype">
          <el-select
            style="width: 100%"
            v-model="form.ntype"
            placeholder="请选择消息类型"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接收部门" prop="depart">
          <el-cascader
            style="width: 100%"
            v-model="form.depart"
            :options="optionsDepart"
            :props="propsDepart"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="接收方" prop="accept">
          <el-select
            style="width: 100%"
            v-model="form.accept"
            placeholder="请选接收方"
          >
            <el-option
              v-for="item in userList"
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
      <el-button size="small" type="primary" @click="onSubmit('form')">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { scenarioPowerSave, scenarioPowerUpdate } from "@/api/scenario.js";
export default {
  name: "CommunicateAddDialog",
  props: {
    dialogData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      propsDepart: { multiple: false },
      optionsDepart: [
        {
          value: 1,
          label: "东南",
          children: [
            {
              value: 2,
              label: "上海",
              children: [
                { value: 3, label: "普陀" },
                { value: 4, label: "黄埔" },
                { value: 5, label: "徐汇" },
              ],
            },
            {
              value: 7,
              label: "江苏",
              children: [
                { value: 8, label: "南京" },
                { value: 9, label: "苏州" },
                { value: 10, label: "无锡" },
              ],
            },
            {
              value: 12,
              label: "浙江",
              children: [
                { value: 13, label: "杭州" },
                { value: 14, label: "宁波" },
                { value: 15, label: "嘉兴" },
              ],
            },
          ],
        },
        {
          value: 17,
          label: "西北",
          children: [
            {
              value: 18,
              label: "陕西",
              children: [
                { value: 19, label: "西安" },
                { value: 20, label: "延安" },
              ],
            },
            {
              value: 21,
              label: "新疆维吾尔族自治区",
              children: [
                { value: 22, label: "乌鲁木齐" },
                { value: 23, label: "克拉玛依" },
              ],
            },
          ],
        },
      ],
      optionsTypes: [
        {
          value: "选项1",
          label: "同级通讯",
        },
        {
          value: "选项2",
          label: "向上通讯",
        },
        {
          value: "选项3",
          label: "向下通讯",
        },
        {
          value: "选项4",
          label: "所内通讯",
        },
      ],
      optionsWays: [
        {
          value: "选项1",
          label: "邮件",
        },
        {
          value: "选项2",
          label: "短信",
        },
        {
          value: "选项3",
          label: "电话",
        },
        {
          value: "选项4",
          label: "微信",
        },
      ],
      userList: [
        {
          value: "选项1",
          label: "用户1",
        },
        {
          value: "选项2",
          label: "用户2",
        },
        {
          value: "选项3",
          label: "用户3",
        },
        {
          value: "选项4",
          label: "用户4",
        },
      ],
      options: [
        {
          value: "选项1",
          label: "同级通讯",
        },
        {
          value: "选项2",
          label: "向上通讯",
        },
        {
          value: "选项3",
          label: "向下通讯",
        },
        {
          value: "选项4",
          label: "所内通讯",
        },
      ],
      // 传值时，label和value的值相同
      options1: [
        {
          value: "选项1",
          label: "消息类型1",
        },
        {
          value: "选项2",
          label: "消息类型2",
        },
        {
          value: "选项3",
          label: "消息类型3",
        },
        {
          value: "选项4",
          label: "消息类型4",
        },
      ],
      form: {
        name: "",
        desc: "",
        users: "",
        cway: "",
        ctype: "",
        ntype: "",
        depart: "",
        accept: "",
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
  created() {
    this.form.name = this.dialogData.userName;
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
