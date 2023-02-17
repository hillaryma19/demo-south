<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <div class="title pad-lt-10">研发背景</div>
    <div class="place-mar flex-between">
      <el-form-item label="">
        <div>hhdhfj</div>
      </el-form-item>
      <el-form-item label="">
        <img width="200" height="250" />
      </el-form-item>
    </div>
    <div class="title pad-lt-10">属性编辑</div>
    <div class="place-mar flex-column">
      <div>
        <el-form-item label="长度:">
          <div class="flex-start form-pad">
            <el-input
              v-model="formInline.Length"
              size="small"
              placeholder="审批人"
            ></el-input>
            <span>米</span>
          </div>
        </el-form-item>
        <el-form-item label="翼展:">
          <div class="flex-start form-pad">
            <el-input
              v-model="formInline.spanWise"
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
        <el-form-item label="机翼面积:">
          <div class="flex-start form-pad">
            <el-input
              v-model="formInline.area"
              size="small"
              placeholder="审批人"
            ></el-input>
            <span>平方米</span>
          </div>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="空重:">
          <div class="flex-start form-pad">
            <el-input
              v-model="formInline.bareWeight"
              size="small"
              placeholder="审批人"
            ></el-input>
            <span>千克</span>
          </div>
        </el-form-item>
        <el-form-item label="飞行速度:">
          <div class="flex-start form-pad">
            <el-input
              v-model="formInline.spend"
              size="small"
              placeholder="审批人"
            ></el-input>
            <span>马赫</span>
          </div>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="实用升限:">
          <div class="flex-start form-pad">
            <el-input
              v-model="formInline.ceilLing"
              size="small"
              placeholder="审批人"
            ></el-input>
            <span>米</span>
          </div>
        </el-form-item>
        <el-form-item label="航程:">
          <div class="flex-start form-pad">
            <el-input
              v-model="formInline.voyage"
              size="small"
              placeholder="审批人"
            ></el-input>
            <span>千米</span>
          </div>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="作战半径:">
          <div class="flex-start form-pad">
            <el-input
              v-model="formInline.radius"
              size="small"
              placeholder="审批人"
            ></el-input>
            <span>千米</span>
          </div>
        </el-form-item>
        <el-form-item label="翼载荷:">
          <div class="flex-start form-pad">
            <el-input
              v-model="formInline.load"
              size="small"
              placeholder="审批人"
            ></el-input>
            <span>千克/m</span>
          </div>
        </el-form-item>
      </div>
    </div>
    <div class="title pad-lt-10">部署经纬度</div>
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
    <div class="ta-c pad-tp-10">
      <el-button type="primary" size="small">保存</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  name: "EnvironmentDetails",
  data() {
    return {
      formInline: {
        Length: "",
        spanWise: "",
        height: "",
        area: "",
        bareWeight: "",
        spend: "",
        ceilLing: "",
        voyage: "",
        radius: "",
        load: "",
        longitude: "",
        latitude: "",
      },
    };
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
.form-pad {
  span {
    padding-left: 5px;
    width: 26%;
    font-size: 14px;
  }
}
.el-form-item {
  margin-bottom: 15px;
  margin-right: 20px;
}
.place-mar {
  margin: 0 5%;
}
</style>
