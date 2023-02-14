<template>
  <div class="wrapper">
    <div class="inner" ref="wrapperInner">
      <el-tabs
        v-model="activeName"
        type="border-card"
        @tab-click="handleTabClick"
      >
        <el-tab-pane label="阵营1" name="1">
          <el-container style="height: 100%">
            <div class="left scroll-bar-style" ref="leftBox">
              <el-tree
                :data="treeData"
                :props="defaultProps"
                :expand-on-click-node="false"
                default-expand-all
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
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
            <div class="middle">
              <el-tree
                :data="treeUserData"
                :props="defaultProps"
                :expand-on-click-node="false"
                default-expand-all
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span v-if="pageType == 2">
                    <el-button
                      type="text"
                      size="small"
                      @click="() => handleNodeClick(data)"
                    >
                      编辑权限
                    </el-button>
                  </span>
                  <span v-if="pageType == 3">
                    <el-button
                      type="text"
                      size="small"
                      @click="() => handleNodeClick(data)"
                    >
                      编辑通讯
                    </el-button>
                  </span>
                </span></el-tree
              >
            </div>
            <div class="right" v-if="pageType != 1">
              <!-- 指挥信息 -->
              <div v-if="pageType == 2">指挥信息</div>
              <el-table
                v-if="pageType == 2"
                :data="tableData1"
                :height="tableHeight"
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
                <el-table-column prop="date" label="时间" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="地址" min-width="120">
                </el-table-column>
              </el-table>
              <!-- 部门通讯关系 -->
              <div v-if="pageType == 3">部门通讯关系</div>
              <el-button
                v-if="pageType == 3"
                type="primary"
                size="small"
                @click="dialogVisibleAdd = true"
                style="margin: 10px 0"
              >
                添加
              </el-button>
              <el-dialog
                title="添加部门通讯关系"
                width="50%"
                :visible.sync="dialogVisibleAdd"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
              >
                <div>
                  <el-form :model="form">
                    <el-form-item label="发送方" :label-width="formLabelWidth">
                      <el-input
                        v-model="form.name"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="类型" :label-width="formLabelWidth">
                      <el-select
                        v-model="form.region"
                        placeholder="请选择活动区域"
                      >
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="方式" :label-width="formLabelWidth">
                      <el-input
                        v-model="form.name"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="类型" :label-width="formLabelWidth">
                      <el-select
                        v-model="form.region"
                        placeholder="请选择活动区域"
                      >
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="接收方" :label-width="formLabelWidth">
                      <el-input
                        v-model="form.name"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                      <el-select
                        v-model="form.region"
                        placeholder="请选择活动区域"
                      >
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button size="small" @click="dialogVisibleAdd = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" size="small" @click="handleAdd()"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
              <div>
                <el-table
                  v-if="pageType == 3"
                  :data="tableData2"
                  :height="tableHeight"
                  :header-cell-style="{
                    background: '#f5f7fa',
                    color: '#94969A',
                  }"
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
                  <el-table-column prop="date" label="发送方" min-width="120">
                    <template slot-scope="scope">
                      <span>{{ scope.row.date }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="类型" min-width="120">
                    <template slot-scope="scope">
                      <span>{{ scope.row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address" label="方式" min-width="120">
                  </el-table-column>
                  <el-table-column prop="name" label="类型" min-width="120">
                  </el-table-column>
                  <el-table-column prop="name" label="接收方" min-width="120">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" min-width="120">
                  </el-table-column>
                  <el-table-column label="操作" min-width="120">
                    <template>
                      <el-button type="text">编辑</el-button>
                      <el-button type="text">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="阵营2" name="2">阵营2</el-tab-pane>
        <el-tab-pane label="阵营3" name="3">阵营3</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupSeats",
  components: {},
  data() {
    return {
      loading: false,
      tableData1: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      tableData2: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      dialogData: {
        dialogVisible: false,
      },
      activeName: "1",
      treeData: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
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
      pageType: 1,
      dialogVisibleAdd: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "80px",
      tableHeight: 500,
    };
  },
  created() {
    let params = this.$route.params;
    if (params.id) {
      this.pageType = params.id;
    }
    console.log(params, "=params");
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.onWindowResize();
    //   window.onresize = () => {
    //     this.onWindowResize();
    //   };
    // });
  },
  methods: {
    onWindowResize() {
      this.$nextTick(() => {
        let leftBox = this.$refs.leftBox;
        if (leftBox) {
          this.drawerData.drawerHeight = leftBox.offsetHeight;
        }
      });
    },
    getDialogInfo() {
      this.dialogData.dialogVisible = false;
    },
    handleNodeClick(data) {},
    handleTabClick(tab) {
      this.activeName = tab.name;
      console.log(tab);
    },
    handleAdd() {
      this.tableData2.push({
        date: this.form.name,
        name: this.form.name,
        address: this.form.region,
      });
      this.dialogVisibleAdd = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  .inner {
    height: 100%;
    width: 100%;
  }
  ::v-deep .el-tabs--border-card {
    // height: 100%;
    // .el-tabs__content {
    //   height: calc(100% - 40px);
    //   .el-tab-pane {
    //     height: 100%;
    //   }
    // }
    .left,
    .right {
      width: 30%;
      height: 100%;
    }
    .left {
      width: 20%;
    }
    .right {
      width: 40%;
      border-left: 1px solid #dcdfe6;
      padding: 0 12px;
      .font {
        font-size: 12px;
      }
    }
    .middle {
      flex: 1;
      height: 100%;
      border-left: 1px solid #dcdfe6;
      > ul {
        padding: 0 12px;
        li {
          line-height: 28px;
          padding-left: 4px;
          transition: all 0.2s ease-in-out;
          &:hover {
            background-color: #ebeef5;
          }
        }
      }
    }
  }
}
</style>
