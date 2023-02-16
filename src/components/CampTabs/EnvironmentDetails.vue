<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <div class="title pad-lt-10">研发背景</div>
    <div>
      <el-form-item label="经度"></el-form-item>
      <el-form-item label="经度"></el-form-item>
    </div>
    <div class="title pad-lt-10">属性编辑</div>
    <div>
      <el-form-item label="长度：">
        <el-input v-model="formInline.Length" size="small" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="翼展：">
        <el-input v-model="formInline.spanWise" size="small" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="高度：">
        <el-input v-model="formInline.height" size="small" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="面积：">
        <el-input v-model="formInline.area" size="small" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="空重：">
        <el-input v-model="formInline.bareWeight" size="small" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="速度：">
        <el-input v-model="formInline.spend" size="small" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="实用升限：">
        <el-input v-model="formInline.ceilLing" size="small" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="航程：">
        <el-input v-model="formInline.voyage" size="small" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="半径:">
        <el-input v-model="formInline.radius" size="small" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="载荷:">
        <el-input v-model="formInline.load" size="small" placeholder="审批人"></el-input>
      </el-form-item>
    </div>
    <div class="title pad-lt-10">经纬度</div>
    <div>
      <el-form-item label="经度:">
        <el-input v-model="formInline.longitude" size="small" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="纬度:">
        <el-input v-model="formInline.latitude" size="small" placeholder="审批人"></el-input>
      </el-form-item>
    </div>
    <div class="ta-c pad-tp-10">
      <el-button type="primary" >保存</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  name: "EnvironmentDetails",
  data(){
    return {
      formInline: {
        Length:'',
        spanWise:'',
        height: '',
        area:'',
        bareWeight:'',
        spend:'',
        ceilLing:'',
        voyage:'',
        radius:'',
        load:'',
        longitude:'',
        latitude:'',
      },
    }
  },
}
</script>

<style scoped lang="scss">
.title {
  font-size: 16px;
  line-height: 32px;
  background-color: rgb(191, 191, 191);
  margin-bottom: 12px;
}
</style>
