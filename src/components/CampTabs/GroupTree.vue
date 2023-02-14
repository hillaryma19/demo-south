<template>
  <div class="container">
    <div class="scroll-bar-style" ref="leftBox">
      <div class="pad-bt-10" v-if="activeName == 5">
        <el-button size="small" type="primary" @click="handleAddMarshal(1)"
          >添加编组</el-button
        >
      </div>
      <el-tree
        :data="treeData"
        :props="defaultProps"
        :expand-on-click-node="false"
        default-expand-all
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-if="activeName == 5">
            <el-button
              type="text"
              size="small"
              @click="() => handleAddMarshal(1, data)"
            >
              添加
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="() => handleNodeClick(data)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="() => handleNodeClick(data)"
            >
              删除
            </el-button>
          </span>
        </span></el-tree
      >
    </div>
    <power-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></power-add>
    <group-add
      :dialog-data="groupDialogData"
      @handleDialogInfo="getGroupDialogInfo"
    ></group-add>
    <user-add
      :dialog-data="userDialogData"
      @handleDialogInfo="getUserDialogInfo"
    ></user-add>
    <auth-add
      :dialog-data="authDialogData"
      @handleDialogInfo="getAuthDialogInfo"
    ></auth-add>
  </div>
</template>

<script>
import { commandStaffFindAll, communicationFindById } from "@/api/api";
import { scenarioPowerRemove } from "@/api/scenario.js";
const PowerAdd = () => import("@/components/CampTabs/PowerAdd.vue");
const GroupAdd = () => import("@/components/CampTabs/GroupAdd.vue");
const UserAdd = () => import("@/components/CampTabs/UserAdd.vue");
const AuthAdd = () => import("@/components/CampTabs/AuthAdd.vue");
const CommunicateAdd = () => import("@/components/CampTabs/CommunicateAdd.vue");

export default {
  name: "GroupTree",
  components: { PowerAdd, GroupAdd, UserAdd, AuthAdd, CommunicateAdd },
  props: {
    activeName: {
      type: [String, Number],
    },
  },
  data() {
    return {
      cascaderProps: { multiple: true, checkStrictly: true },
      cascaderOptions: [
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
      locationOptions: [
        {
          value: "选项1",
          label: "西土城",
        },
        {
          value: "选项2",
          label: "北土城",
        },
        {
          value: "选项3",
          label: "健德门",
        },
        {
          value: "选项4",
          label: "紫竹院",
        },
      ],
      location: "",
      communicateDialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
        userName: "",
      },
      dialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
      },
      userDialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
      },
      groupDialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
      },
      authDialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
      },
      loading: false,
      tableData1: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "方式",
          authority: "选项1",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "方式",
          authority: "选项1",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "方式",
          authority: "选项1",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "方式",
          authority: "选项1",
        },
      ],
      tableData2: [
        {
          id: 1,
          name: "王小虎",
          message: "选项1",
          file: "消息类型1",
          accept: "小明",
          depart: 14,
          cway: "微信",
        },
        {
          id: 2,
          name: "王小虎",
          message: "选项1",
          file: "消息类型2",
          accept: "小草",
          depart: 20,
          cway: "qq",
        },
        {
          id: 3,
          name: "王小虎",
          message: "选项1",
          file: "消息类型3",
          accept: "小花儿",
          depart: 3,
          cway: "电话",
        },
        {
          id: 4,
          name: "王小虎",
          message: "选项1",
          file: "消息类型4",
          accept: "小里",
          depart: 4,
          cway: "邮件",
        },
      ],
      treeData: [
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
      treeUserData: [
        {
          label: "人员 1",
          children: [
            {
              label: "人员 1-1",
              children: [
                {
                  label: "人员 1-1-1",
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
      listData: [
        { id: 1, name: "康维尔240型“北京”号飞机" },
        { id: 2, name: "道格拉斯DC-3/C-47型飞机" },
        { id: 3, name: "里-2型飞机" },
        { id: 4, name: "伊尔-12型飞机" },
      ],
      dialogVisibleAdd: false,
      form: {
        name: "",
        message: "",
        file: "",
        date2: "",
        accept: "",
        type: [],
        resource: "",
        desc: "",
        depart: "部门1",
      },
      tableHeight: 500,
      propsDepart: { multiple: false },
      optionsDepart: [
        {
          value: 1,
          label: "分部1",
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
          label: "分部2",
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
      optionsNews: [
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
      // 传值时，label和value的值相同
      options1: [
        {
          value: "选项1",
          label: "email",
        },
        {
          value: "选项2",
          label: "ppt",
        },
        {
          value: "选项3",
          label: "word",
        },
        {
          value: "选项4",
          label: ".exe",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    getDialogInfo() {
      this.dialogData.dialogVisible = false;
    },
    handleNodeClick(data) {},
    handleNodeClick2(data) {
      this.dialogVisibleAdd = true;
    },
    handleChange(val, row) {
      console.log(val, row, "table");
    },
    // 点击添加通讯关系
    handleAddCommunicate(type, node, data) {
      this.communicateDialogData.dialogVisible = true;
      this.communicateDialogData.dialogType = type;
      this.communicateDialogData.userName = data.label;
    },
    getCommunicateDialogInfo() {
      this.communicateDialogData.dialogVisible = false;
    },
    // 点击添加编组
    handleAddMarshal(type) {
      this.groupDialogData.dialogVisible = true;
      this.groupDialogData.dialogType = type;
    },
    getGroupDialogInfo() {
      this.groupDialogData.dialogVisible = false;
    },
    // 点击添加人员
    handleAddUser(type, node, data) {
      this.userDialogData.dialogVisible = true;
      this.userDialogData.dialogType = type;
    },
    getUserDialogInfo() {
      this.userDialogData.dialogVisible = false;
    },
    // 点击添加权限
    handleAddAuth(type) {
      this.authDialogData.dialogVisible = true;
      this.authDialogData.dialogType = type;
    },
    getAuthDialogInfo() {
      this.authDialogData.dialogVisible = false;
    },
    // 点击添加下辖力量
    handleAdd() {
      this.tableData2.push({
        name: this.form.name,
        message: this.form.message,
        file: this.form.file,
        accept: this.form.accept,
      });
      // this.dialogVisibleAdd = false;
      // this.$refs["form"].resetFields();
    },
    // 点击添加
    handleAddPower(type) {
      this.dialogData.dialogVisible = true;
      this.dialogData.dialogType = type;
    },
    // 点击删除
    handleDel(data) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          scenarioPowerRemove({ id: data.id }).then((res) => {
            console.log(res, "==res");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //查询所有指挥人员
    getCommandStaffData() {
      let params = {
        marshalId: "", //编组id
        scenarioId: "", //想定id
      };
      commandStaffFindAll(params).then((res) => {
        console.log(res, "#0099");
      });
    },
    //查询所有通讯人员
    getCommunicationData() {
      let params = {
        scenarioId: "", //想定id
      };
      communicationFindById(params).then((res) => {
        console.log(res, "#0099");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>
