<template>
  <div class="container">
    <div class="pad-bt-10" v-if="activeName == 5">
      <el-button size="small" type="primary" @click="handleAddUser(1)"
        >添加人员</el-button
      >
    </div>
    <el-tree
      :data="treeUserData"
      :props="defaultProps"
      :expand-on-click-node="false"
      default-expand-all
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            v-if="activeName == 5"
            type="text"
            size="small"
            @click="() => handleAddUser(1, node, data)"
          >
            添加
          </el-button>
          <!-- <el-button
            v-if="activeName == 6"
            type="text"
            size="small"
            @click="() => handleAddAuth(1, node, data)"
          >
            编辑权限
          </el-button> -->
          <el-button
            v-if="activeName == 7"
            type="text"
            size="small"
            @click="() => handleAddCommunicate(1, node, data)"
          >
            编辑通讯
          </el-button>
          <el-button
            v-if="activeName == 5"
            type="text"
            size="small"
            @click="() => handleDel(node, data)"
          >
            删除
          </el-button>
        </span>
      </span></el-tree
    >
    <power-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></power-add>
    <group-add
      :dialog-data="groupDialogData"
      @handleDialogInfo="getGroupDialogInfo"
    ></group-add>
    <auth-add
      :dialog-data="authDialogData"
      @handleDialogInfo="getAuthDialogInfo"
    ></auth-add>
    <user-add
      :dialog-data="userDialogData"
      @handleDialogInfo="getUserDialogInfo"
    ></user-add>
    <!-- 部门通讯关系 -->
    <communicate-add
      :dialog-data="communicateDialogData"
      @handleDialogInfo="getCommunicateDialogInfo"
    ></communicate-add>
  </div>
</template>

<script>
import { commandStaffFindAll, communicationFindById } from "@/api/api";
import { scenarioPowerRemove } from "@/api/scenario.js";
const PowerAdd = () => import("@/components/CampTabs/PowerAdd.vue");
const GroupAdd = () => import("@/components/CampTabs/GroupAdd.vue");
const AuthAdd = () => import("@/components/CampTabs/AuthAdd.vue");
const UserAdd = () => import("@/components/CampTabs/UserAdd.vue");
const CommunicateAdd = () => import("@/components/CampTabs/CommunicateAdd.vue");

export default {
  name: "GroupUser",
  components: { PowerAdd, GroupAdd, AuthAdd, UserAdd, CommunicateAdd },
  props: {
    activeName: {
      type: [String, Number],
    },
  },
  data() {
    return {
      communicateDialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
        userName: "",
      },
      userDialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
      },
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
      dialogData: {
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
      tableData: [
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
      tableHeight: 300,
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 点击添加通讯关系
    handleAddCommunicate(type, node, data) {
      this.communicateDialogData.dialogVisible = true;
      this.communicateDialogData.dialogType = type;
      this.communicateDialogData.userName = data.label;
    },
    getCommunicateDialogInfo() {
      this.communicateDialogData.dialogVisible = false;
    },
    // 点击添加人员
    handleAddUser(type, node, data) {
      this.userDialogData.dialogVisible = true;
      this.userDialogData.dialogType = type;
    },
    getUserDialogInfo() {
      this.userDialogData.dialogVisible = false;
    },
    getDialogInfo() {
      this.dialogData.dialogVisible = false;
    },
    // 点击添加编组
    handleAddMarshal(type) {
      this.groupDialogData.dialogVisible = true;
      this.groupDialogData.dialogType = type;
    },
    getGroupDialogInfo() {
      this.groupDialogData.dialogVisible = false;
    },
    // 点击添加权限
    handleAddAuth(type) {
      this.authDialogData.dialogVisible = true;
      this.authDialogData.dialogType = type;
    },
    getAuthDialogInfo() {
      this.authDialogData.dialogVisible = false;
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
  width: 220px;
  padding-right: 12px;
}
</style>
