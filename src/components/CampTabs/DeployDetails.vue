<template>
  <div>
    <el-tabs
        class="pad-tp-10"
        v-model="activeTabName"
        type="card"
        @tab-click="handleClick"
    >
      <el-tab-pane
          label="指挥所"
          name="first"
      >
        <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
        >
          <div class="title pad-lt-10">指挥所位置</div>
          <div class="ta-c">
            <div class="pad-bt-10">
              <el-form-item label="">
                <el-radio-group v-model="formInline.radio">
                  <el-radio
                      :label="1"
                      style="margin-right: 250px"
                  >设施
                  </el-radio>
                  <el-radio :label="2">力量</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="place place-mar pad-tp-10 pad-bt-10">
              <div
                  style="padding: 10% 0"
                  v-show="formInline.radio == 1"
              >
                <el-form-item label=" 指挥所:">
                  <el-select
                      size="small"
                      v-model="formInline.location"
                      placeholder="请选择"
                  >
                    <el-option
                        z-index="0"
                        v-for="item in locationOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div
                  class="tree-iframe flex-center scroll-bar-style"
                  v-show="formInline.radio == 2"
              >
                <el-tree
                    :data="treeData"
                    :props="defaultProps"
                    :expand-on-click-node="false"
                    default-expand-all
                    class="tree-line"
                    :indent="0"
                >
                </el-tree>
              </div>
            </div>
          </div>
          <div class="title pad-lt-10 rim">详情介绍</div>
          <div class="place-mar flex-between">
            <div>{{ formInline.sketch }}</div>
            <img
                :src="formInline.deImg"
                width="200"
                height="250"
            />
          </div>
          <div class="title pad-lt-10 rim">属性编辑</div>
          <div class="place-mar flex-column">
            <div>
              <el-form-item label="指挥者:">
                <el-input
                    v-model="formInline.user"
                    size="small"
                    placeholder="审批人"
                ></el-input>
              </el-form-item>
              <el-form-item label="船长度:">
                <div class="flex-start form-pad">
                  <el-input
                      v-model="formInline.shipLength"
                      size="small"
                      placeholder="审批人"
                  ></el-input>
                  <span>米</span>
                </div>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="高度:">
                <div class="flex-start form-pad">
                  <el-input
                      v-model="formInline.height"
                      size="small"
                      placeholder="审批人"
                  ></el-input>
                  <span>米</span>
                </div>
              </el-form-item>
              <el-form-item label="速度:">
                <div class="flex-start form-pad">
                  <el-input
                      v-model="formInline.spend"
                      size="small"
                      placeholder="审批人"
                  ></el-input>
                  <span>千米/h</span>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="title pad-lt-10 rim">经纬度</div>
          <div class="place-mar">
            <el-form-item label="经度:">
              <el-input
                  v-model="formInline.longitude"
                  size="small"
                  placeholder="审批人"
              ></el-input>
            </el-form-item>
            <el-form-item label="纬度:">
              <el-input
                  v-model="formInline.latitude"
                  size="small"
                  placeholder="审批人"
              ></el-input>
            </el-form-item>
          </div>
          <!--          <div class="title pad-lt-10 rim">指挥所人员</div>-->
          <!--          <div-->
          <!--              class="place-mar tree-iframe flex-center scroll-bar-style flex-column"-->
          <!--              style="flex-wrap: nowrap; align-items: center"-->
          <!--          >-->
          <!--            <el-input-->
          <!--                placeholder="请输入搜索内容"-->
          <!--                suffix-icon="el-icon-search"-->
          <!--                v-model="people"-->
          <!--                size="small"-->
          <!--                style="width: 27%"-->
          <!--            >-->
          <!--            </el-input>-->
          <!--            <div style="margin-right: 8%">-->
          <!--              <el-tooltip-->
          <!--                  class="pad-tp-10"-->
          <!--                  effect="dark"-->
          <!--                  content="添加力量"-->
          <!--                  placement="top"-->
          <!--              >-->
          <!--                <i-->
          <!--                    class="pointer add-btn el-icon-circle-plus-outline"-->
          <!--                    @click="handleAddMarshal(1)"-->
          <!--                    style="font-size: 18px; padding-left: 16px"-->
          <!--                ></i>-->
          <!--              </el-tooltip>-->
          <!--              <el-tree-->
          <!--                  :data="treeData"-->
          <!--                  :props="defaultProps"-->
          <!--                  :expand-on-click-node="false"-->
          <!--                  default-expand-all-->
          <!--                  class="tree-line"-->
          <!--                  :indent="0"-->
          <!--              >-->
          <!--              </el-tree>-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="title pad-lt-10 rim">组织席位</div>
          <div
              class="place-mar tree-iframe flex-center scroll-bar-style flex-column"
              style="flex-wrap: nowrap; align-items: center"
          >
            <el-input
                placeholder="请输入搜索内容"
                suffix-icon="el-icon-search"
                v-model="people"
                size="small"
                style="width: 27%"
            >
            </el-input>
            <div>
              <el-tooltip
                  class="pad-tp-10"
                  effect="dark"
                  content="添加力量"
                  placement="top"
              >
                <i
                    class="pointer add-btn el-icon-circle-plus-outline"
                    @click="handleAddMarshal(1)"
                    style="font-size: 18px; padding-left: 16px"
                ></i>
              </el-tooltip>
              <el-tree
                  ref="tree"
                  :data="treeData"
                  :props="defaultProps"
                  :expand-on-click-node="false"
                  default-expand-all
                  :filter-node-method="filterNode"
                  :indent="0"
                  class="tree-line"
                  draggable
              >
        <span
            class="custom-tree-node"
            style="justify-content: flex-start"
            slot-scope="{ node, data }"
        >
          <span>{{ node.label }}</span>
          <span style="margin-left: 10px;">
            <el-button type="text"
                       class="el-icon-circle-plus-outline tree-icon"
                       style="font-size: 12px;"
                       @click="() => handleNodeClick(data, 2)"
            >
              分配力量
            </el-button>
            <el-dialog
                title="分配力量"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <div
                    class="place-mar tree-iframe flex-center scroll-bar-style flex-column"
                    style="flex-wrap: nowrap; align-items: center"
                >
                      <el-input
                          placeholder="请输入搜索内容"
                          suffix-icon="el-icon-search"
                          v-model="people"
                          size="small"
                          style="width: 55%"
                      >
                      </el-input>
                      <div style="margin-right: 8%">
                        <el-tooltip
                            class="pad-tp-10"
                            effect="dark"
                            content="添加力量"
                            placement="top"
                        >
                          <i
                              class="pointer add-btn el-icon-circle-plus-outline"
                              @click="handleAddMarshal(1)"
                              style="font-size: 18px; padding-left: 16px"
                          ></i>
                        </el-tooltip>
                        <el-tree
                            :data="treeData"
                            :props="defaultProps"
                            :expand-on-click-node="false"
                            default-expand-all
                            class="tree-line"
                            :indent="0"
                        >
                        </el-tree>
                      </div>
                    </div>
                <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
               </span>
           </el-dialog>
          </span>
         </span>
              </el-tree>
            </div>
          </div>
          <div class="ta-c pad-tp-10 rim">
            <el-button
                type="primary"
                size="small"
            >保存
            </el-button>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane
          label="下辖力量"
          name="second"
      >
        <div class="pad-bt-10 flex-end">
          <div>
            <el-button
                type="primary"
                size="small"
                @click="() => handleAddPower(1)"
            >
              添加
            </el-button>
          </div>
        </div>
        <el-table
            :data="tableData"
            :header-cell-style="{ background: '#f5f7fa', color: '#94969A' }"
            size="mini"
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
          <el-table-column
              prop="name"
              label="力量名称"
              min-width="60"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="address"
              label="力量描述"
              min-width="80"
          >
          </el-table-column>
          <el-table-column
              label="操作"
              min-width="50"
          >
            <template slot-scope="scope">
              <el-button
                  type="text"
                  size="small"
                  @click="handleAddPower(2, scope.row)"
              >编辑
              </el-button>
              <el-button
                  type="text"
                  size="small"
                  @click="handleDel(scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            style="text-align: center;margin:15px 0;"
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="cp"
            :page-size="rows"
            layout="prev, pager, next"
            :total="1000"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!-- :height="tableHeight" -->
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
import {commandStaffFindAll, communicationFindById} from "@/api/api";
import {scenarioPowerRemove} from "@/api/scenario.js";

const PowerAdd = () => import("@/components/CampTabs/PowerAdd.vue");
const GroupAdd = () => import("@/components/CampTabs/GroupAdd.vue");
const AuthAdd = () => import("@/components/CampTabs/AuthAdd.vue");
const UserAdd = () => import("@/components/CampTabs/UserAdd.vue");
export default {
  name: "DeployDetails",
  components: {PowerAdd, GroupAdd, AuthAdd, UserAdd},
  props: {
    activeName: {
      type: [String, Number],
    },
  },
  data() {
    return {
      people: "",
      userDialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
      },
      treeData: [
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
      activeTabName: "first",
      formInline: {
        radio: 1,
        location: "",
        physical: "", //力量
        sketch: "dsfsfsfs", //简述
        deImg: "", //图片
        user: "",
        shipLength: "",
        height: "",
        spend: "",
        longitude: "",
        latitude: "",
        personnel: "", //人员
        conference: "", //席位
      },
      cp: 1,
      rows: 20,
      dialogVisible: false,
    };
  },
  created() {
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data, type) {
      // if (type == 1) {
      //   this.groupDialogData.dialogVisible = true;
      //   this.groupDialogData.dialogType = 2;
      //   this.groupDialogData.id = data.label;
      // } else if (type == 2) {
      //   this.handleDel(data);
      // }
      this.dialogVisible = true;
    },
    handleClose() {

    },
    // 点击添加下辖力量
    handleAdd() {
      // this.tableData2.push({
      //   name: this.form.name,
      //   message: this.form.message,
      //   file: this.form.file,
      //   accept: this.form.accept,
      // });
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
            scenarioPowerRemove({id: data.id}).then((res) => {
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

<style scoped lang="scss">
.title {
  font-size: 16px;
  line-height: 32px;
  background-color: rgb(191, 191, 191);
  margin-bottom: 12px;
}

.rim {
  margin: 15px 0;
}

.form-pad {
  span {
    padding-left: 5px;
    width: 26%;
    font-size: 14px;
  }
}

.place {
  border: 1px solid #bfbfbf;
  min-height: 260px;
}

.place-mar {
  margin: 0 5%;
}

.el-form-item {
  margin-bottom: 15px;
}
</style>
