<template>
  <div class="container">
    <div class="pad-bt-10">
      指挥所：<el-select size="small" v-model="location" placeholder="请选择">
        <el-option
          v-for="item in locationOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="pad-bt-10 flex-between">
      <div>下辖力量</div>
      <div>
        <el-button type="primary" size="small" @click="() => handleAddPower(1)">
          添加
        </el-button>
      </div>
    </div>
    <!-- :height="tableHeight" -->
    <el-table
      :data="tableData"
      :header-cell-style="{ background: '#f5f7fa', color: '#94969A' }"
      size="small"
      border
      align="center"
      highlight-current-row
      tooltip-effect="dark"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width: 100%"
    >
      <el-table-column prop="name" label="力量名称" min-width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="力量描述" min-width="80">
      </el-table-column>
      <el-table-column label="操作" min-width="50">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleAddPower(2, scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="handleDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
import { commandStaffFindAll, communicationFindById } from "@/api/api";
import { scenarioPowerRemove } from "@/api/scenario.js";
const PowerAdd = () => import("@/components/CampTabs/PowerAdd.vue");
const GroupAdd = () => import("@/components/CampTabs/GroupAdd.vue");
const AuthAdd = () => import("@/components/CampTabs/AuthAdd.vue");
const UserAdd = () => import("@/components/CampTabs/UserAdd.vue");

export default {
  name: "GroupPower",
  components: { PowerAdd, GroupAdd, AuthAdd, UserAdd },
  props: {
    activeName: {
      type: [String, Number],
    },
  },
  data() {
    return {
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
      tableHeight: 260,
    };
  },
  created() {},
  mounted() {},
  methods: {
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
    // 点击添加下辖力量
    handleAdd() {
      this.tableData2.push({
        name: this.form.name,
        message: this.form.message,
        file: this.form.file,
        accept: this.form.accept,
      });
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
  .people {
    width: 220px;
    padding-right: 12px;
  }
  .power {
    flex: 1;
  }
}
</style>
