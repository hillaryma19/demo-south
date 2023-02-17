<template>
  <div class="container">
    <div class="pad-bt-10">
      <div class="title pad-bt-10">阵营管理</div>
      <div class="list" style="display: flex">
        <div
          class="tag"
          :key="tag.id"
          v-for="(tag, index) in dynamicTags"
          :style="{ backgroundColor: tag.color }"
        >
          {{ tag.name }}
          <i class="el-icon-close" @click="handleTagClose(tag, index)"></i>
        </div>
        <el-button class="button-new-tag" size="small" @click="showInput"
          >+</el-button
        >
        <!-- <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          type="success"
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >+</el-button
        > -->
      </div>
    </div>
    <div>
      <div class="title pad-bt-10 flex-between">
        <div>阵营关系</div>
        <div>
          <i
            class="icon-camp el-icon-s-grid"
            :class="{ active: listType == 1 }"
            @click="handleIconCampClick(1)"
          ></i
          ><i
            class="icon-camp el-icon-date"
            :class="{ active: listType == 2 }"
            @click="handleIconCampClick(2)"
          ></i>
        </div>
      </div>
      <div class="list">
        <div class="list-1" v-show="listType == 1">
          <ul class="metrix-ul metrix-ul-horizon flex-row">
            <li
              v-for="item in dynamicTags"
              :key="item.id"
              :style="{ backgroundColor: item.color }"
            >
              {{ item.name }}
            </li>
          </ul>
          <ul class="metrix-ul-vertical flex-column">
            <li
              v-for="(item, pindex) in dynamicTagsVertical"
              :key="item.id"
              class="flex-start"
            >
              <div
                class="vertical-item"
                :style="{ backgroundColor: item.color }"
              >
                {{ item.name }}
              </div>
              <div class="metrix-relationship0 metrix-relationship flex-row">
                <div
                  v-for="(child, index) in item.children"
                  :key="child.id"
                  :style="{ backgroundColor: child.color }"
                >
                  <span v-if="index == pindex">{{
                    index == pindex ? "--" : child.relationship
                  }}</span>
                  <span v-else-if="index == 0">{{
                    index == 0 ? "--" : child.relationship
                  }}</span>
                  <span v-else-if="pindex == 2">{{
                    index < 2 ? "--" : child.relationship
                  }}</span>
                  <span v-else-if="pindex == 3">{{
                    index < 3 ? "--" : child.relationship
                  }}</span>
                  <span v-else-if="pindex == 4">{{
                    index < 4 ? "--" : child.relationship
                  }}</span>
                  <span v-else>{{ child.relationship }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <el-table
          v-show="listType == 2"
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
          <el-table-column prop="name1" label="方别1" min-width="180">
          </el-table-column>
          <el-table-column prop="name2" label="方别1" min-width="180">
          </el-table-column>
          <el-table-column prop="relationship" label="关系" min-width="180"
            ><template slot-scope="scope">
              <el-select
                v-model="scope.row.relationship"
                size="small"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--              <el-button type="text" size="small" @click="editCampRelation(scope.row)">编辑</el-button>-->
              <el-button
                type="text"
                size="small"
                @click="removeCampRelation(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <camp-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></camp-add>
  </div>
</template>

<script>
import {
  campFindAll,
  campRelationShipFindAll,
  campRelationShipRemove,
  campRemove,
  campSave,
} from "@/api/api";

const CampAdd = () => import("./CampAdd.vue");
export default {
  name: "CampPage",
  components: { CampAdd },
  data() {
    return {
      listType: 1,
      loading: false,
      dialogData: {
        dialogVisible: false,
      },
      // "红方", "蓝方", "白方", "绿方", "黑方"
      dynamicTags: [
        { id: 1, name: "红方", color: "red", children: [] },
        { id: 2, name: "蓝方", color: "lightblue", children: [] },
        { id: 3, name: "白方", color: "white", children: [] },
        { id: 4, name: "绿方", color: "lightgreen", children: [] },
        { id: 5, name: "黑方", color: "black", children: [] },
      ],
      dynamicTagsVertical: [
        {
          id: 1,
          name: "红方",
          color: "red",
          children: [
            {
              name1: "红方",
              name2: "蓝方",
              relationship: "敌对",
            },
            {
              name1: "红方",
              name2: "白方",
              relationship: "敌对",
            },
            {
              name1: "红方",
              name2: "绿方",
              relationship: "友好",
            },
            {
              name1: "红方",
              name2: "黑方",
              relationship: "中立",
            },
            {
              name1: "蓝方",
              name2: "白方",
              relationship: "中立",
            },
          ],
        },
        {
          id: 2,
          name: "蓝方",
          color: "lightblue",
          children: [
            {
              name1: "红方",
              name2: "蓝方",
              relationship: "敌对",
            },
            {
              name1: "红方",
              name2: "白方",
              relationship: "敌对",
            },
            {
              name1: "红方",
              name2: "绿方",
              relationship: "友好",
            },
            {
              name1: "红方",
              name2: "黑方",
              relationship: "中立",
            },
            {
              name1: "蓝方",
              name2: "白方",
              relationship: "中立",
            },
          ],
        },
        {
          id: 3,
          name: "白方",
          color: "white",
          children: [
            {
              name1: "红方",
              name2: "蓝方",
              relationship: "敌对",
            },
            {
              name1: "红方",
              name2: "白方",
              relationship: "敌对",
            },
            {
              name1: "红方",
              name2: "绿方",
              relationship: "友好",
            },
            {
              name1: "红方",
              name2: "黑方",
              relationship: "中立",
            },
            {
              name1: "蓝方",
              name2: "白方",
              relationship: "中立",
            },
          ],
        },
        {
          id: 4,
          name: "绿方",
          color: "lightgreen",
          children: [
            {
              name1: "红方",
              name2: "蓝方",
              relationship: "敌对",
            },
            {
              name1: "红方",
              name2: "白方",
              relationship: "敌对",
            },
            {
              name1: "红方",
              name2: "绿方",
              relationship: "友好",
            },
            {
              name1: "红方",
              name2: "黑方",
              relationship: "中立",
            },
            {
              name1: "蓝方",
              name2: "白方",
              relationship: "中立",
            },
          ],
        },
        {
          id: 5,
          name: "黑方",
          color: "black",
          children: [
            {
              name1: "红方",
              name2: "蓝方",
              relationship: "敌对",
            },
            {
              name1: "红方",
              name2: "白方",
              relationship: "敌对",
            },
            {
              name1: "红方",
              name2: "绿方",
              relationship: "友好",
            },
            {
              name1: "红方",
              name2: "黑方",
              relationship: "中立",
            },
            {
              name1: "蓝方",
              name2: "白方",
              relationship: "中立",
            },
          ],
        },
      ],
      inputVisible: false,
      inputValue: "",
      tableData: [
        {
          name1: "红方",
          name2: "蓝方",
          relationship: "敌对",
        },
        {
          name1: "红方",
          name2: "白方",
          relationship: "敌对",
        },
        {
          name1: "红方",
          name2: "绿方",
          relationship: "友好",
        },
        {
          name1: "红方",
          name2: "黑方",
          relationship: "中立",
        },
        {
          name1: "蓝方",
          name2: "白方",
          relationship: "中立",
        },
      ],
      options: [
        {
          value: "1",
          label: "友好",
        },
        {
          value: "2",
          label: "敌对",
        },
        {
          value: "3",
          label: "中立",
        },
        {
          value: "4",
          label: "无关",
        },
      ],
      relationshipVal: "1",
    };
  },
  created() {
    let array = this.dynamicTags;

    for (var i = 0, len1 = array.length; i < len1; i++) {
      let a2 = array.concat();
      /*
        排除之前已经组合过的数据
        比如：第一次的时候，i[0] = 1, 这个时候2层循环, 只循环 2~5,
        第二次的时候, i[1] = 2, 这个时候2层循环, 只循环 3~5
        同理：3层循环也是相比于2层循环来
        */
      a2.splice(0, i + 1);
      console.log(a2, "--a2");
      for (var j = 0, len2 = a2.length; j < len2; j++) {
        console.log(array[i].name + " " + a2[j].name);
      }
    }
    let arr = [],
      arr2 = this.dynamicTags;
    let n = this.dynamicTags.length,
      m = 2;

    this.dynamicTags.forEach((item, index) => {});
    console.log(this.dynamicTags, "==this.dynamicTags");
  },
  methods: {
    matrixArray(arr) {
      let len = arr.length;
      let res = []; // 所有排列结果
      /**
       * 【全排列算法】
       * 说明：arrange用来对arr中的元素进行排列组合，将排列好的各个结果存在新数组中
       * @param tempArr：排列好的元素
       * @param leftArr：待排列元素
       */
      let arrange = (tempArr, leftArr) => {
        if (tempArr.length === len) {
          // 这里就是递归结束的地方
          // res.push(tempArr) // 得到全排列的每个元素都是数组
          res.push(tempArr.join("")); // 得到全排列的每个元素都是字符串
        } else {
          leftArr.forEach((item, index) => {
            let temp = [].concat(leftArr);
            temp.splice(index, 1);
            // 此时，第一个参数是当前分离出的元素所在数组；第二个参数temp是传入的leftArr去掉第一个后的结果
            arrange(tempArr.concat(item), temp); // 这里使用了递归
          });
        }
      };
      arrange([], arr);
      return res;
    },
    handleIconCampClick(type) {
      this.listType = type;
    },
    getDialogInfo(params) {
      this.dialogData.dialogVisible = false;
      if (params.name) {
        this.dynamicTags.push(params);
        this.addCamp();
        this.getCapData();
      }
    },
    //新增阵营信息
    addCamp() {
      let params = {
        colorCode: "", //颜色代码
        createUser: "", //创建人
        dateTime: "", //创建时间
        name: "", //阵营名称
        scenarioId: "", //想定id
        state: "", //数据状态
      };
      campSave(params).then((res) => {
        console.log(res, "#0099");
      });
    },
    //根据id删除阵营关系
    removeCampRelation() {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: "",
          };
          campRelationShipRemove(params).then((res) => {
            console.log(res, "==res");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getCampRelationShipData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    onSubmit() {},
    handleTagClose(tag, index) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          campRemove({ id: tag.id }).then((res) => {
            console.log(res, "==res");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.dynamicTags.splice(index, 1);
            this.getCapData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除阵营
    removeCamp() {
      let params = {
        id: "",
      };
      campRemove(params).then((res) => {
        console.log(res, "#0099");
      });
      this.getCapData();
    },
    showInput() {
      this.dialogData.dialogVisible = true;
      // this.inputVisible = true;
      // this.$nextTick((_) => {
      //   this.$refs.saveTagInput.$refs.input.focus();
      // });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //查询所有阵营
    getCapData() {
      let params = {
        scenarioId: "",
      };
      campFindAll(params).then((res) => {
        console.log(res, "==099");
      });
    },
    //查询所有阵营关系
    getCampRelationShipData() {
      let params = {
        scenarioId: "",
      };
      campRelationShipFindAll(params).then((res) => {
        console.log(res, "==099");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .icon-camp {
    margin-left: 10px;
    font-size: 20px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &.active {
      color: #409eff;
    }
    &:hover {
      opacity: 0.8;
      color: #409eff;
    }
  }
  .list-1 {
    position: relative;
    .metrix-relationship0 {
      // padding: 34px 0 0 54px;
    }
    .metrix-relationship {
      > div {
        // display: inline-block;
        // padding: 6px 12px;
        // border-radius: 4px;
        // margin-right: 12px;
        width: 54px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border: 1px solid #d9ecff;
      }
    }
    .metrix-ul {
      position: absolute;
      color: #409eff;
      > li {
        // display: inline-block;
        width: 54px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        // border-radius: 4px;
        // margin-right: 12px;
        border: 1px solid #d9ecff;
      }
    }
    .metrix-ul-horizon {
      left: 54px;
    }
    .metrix-ul-vertical {
      position: absolute;
      color: #409eff;
      top: 34px;
      .vertical-item {
        width: 54px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border: 1px solid #d9ecff;
      }
    }
  }
  .el-tag + .el-tag {
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .tag {
    display: inline-block;
    background-color: #ecf5ff;
    border-color: #d9ecff;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 14px;
    color: #409eff;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    .el-icon-close {
      border-radius: 50%;
      text-align: center;
      position: relative;
      cursor: pointer;
      font-size: 14px;
      height: 16px;
      width: 16px;
      line-height: 16px;
      vertical-align: middle;
      top: -1px;
      right: -5px;
      &:hover {
        // opacity: 0.5;
        color: #fff;
        background-color: #409eff;
      }
    }
  }
  .tag + .tag {
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    font-size: 20px;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
    margin-bottom: 10px;
  }
}
</style>
