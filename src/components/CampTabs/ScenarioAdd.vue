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
      {{ dialogData.dialogType == 1 ? "添加" : "编辑" }}想定
    </div>
    <div class="dialog-content">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        size="small"
      >
        <el-form-item label="想定名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="想定说明" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="发生背景" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="参考文档" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <!-- <el-form-item label="阵营管理">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
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
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ New Tag</el-button
          >
        </el-form-item> -->
        <!-- <el-form-item label="形状">
          <el-radio-group v-model="form.type">
            <el-radio :label="item.id" v-for="item in shapeData" :key="item.id">
              {{ item.name }}<i :class="item.class"></i
            ></el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="颜色">
          <el-color-picker v-model="form.color" size="small"></el-color-picker>
        </el-form-item> -->
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
import {
  scenarioInfoById,
  scenarioSave,
  scenarioUpdate,
} from "@/api/scenario.js";

export default {
  name: "ScenarioAddDialog",
  props: {
    dialogData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      shapeData: [
        { id: 1, name: "正方形", class: "iconfont icon-xingzhuang-juxing" },
        {
          id: 2,
          name: "圆形",
          class: "iconfont icon-xingzhuang-tuoyuanxing",
        },
        {
          id: 3,
          name: "三角形",
          class: "iconfont icon-xingzhuang-sanjiaoxing",
        },
        {
          id: 4,
          name: "五角形",
          class: "iconfont icon-xingzhuang-xingxing",
        },
        {
          id: 5,
          name: "长方形",
          class: "iconfont icon-24gl-rectangle",
        },
      ],
      form: {
        name: "",
        color: "#409EFF",
        type: 1,
        desc: "",
        camps: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入想定名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
      },
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
    };
  },
  created() {
    if (this.dialogData.id) {
      this.scenarioInfoById();
    }
  },
  methods: {
    handleDialogClose() {
      this.$emit("handleDialogInfo", false);
    },
    scenarioInfoById() {
      let params = {
        id: this.dialogData.id,
      };
      scenarioInfoById(params).then((res) => {
        console.log(res, "==099");
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          let params = {
            // createUser: '', //创建人
            // dateTime: '', //创建时间
            explain: "", //说明
            name: "", //名称
            state: "", //数据状态
          };
          if (this.dialogData.id) {
            params.id = this.dialogData.id; //想定id
            scenarioUpdate(params).then((res) => {
              console.log(res, "==099");
            });
          } else {
            scenarioSave(params).then((res) => {
              console.log(res, "==099");
            });
          }
          this.handleDialogClose();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
  margin-bottom: 10px;
}
</style>
