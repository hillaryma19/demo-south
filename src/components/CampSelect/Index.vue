<template>
  <el-select
    v-model="value"
    filterable
    placeholder="请选择阵营"
    size="small"
    style="width: 100%"
  >
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>
<script>
import { campFindAll } from "@/api/api";
export default {
  name: "CampSelect",
  data() {
    return {
      options: [
        { id: 1, name: "红方", color: "red" },
        { id: 2, name: "蓝方", color: "lightblue" },
        { id: 3, name: "白方", color: "white" },
        { id: 4, name: "绿方", color: "lightgreen" },
        { id: 5, name: "黑方", color: "black" },
      ],
      value: 1,
      loading: false,
    };
  },
  created() {
    // this.getCapData();
  },
  methods: {
    //查询所有阵营
    getCapData() {
      let params = {
        scenarioId: "",
      };
      campFindAll(params).then((res) => {
        console.log(res, "==099");
      });
    },
  },
};
</script>
