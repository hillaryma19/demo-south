<template>
  <div style="width: 100%; height: 100%">
    <div class="container" id="gantt" ref="gantt"></div>
    <task-add
      :dialog-data="taskDialogData"
      @handleDialogInfo="getTaskDialogInfo"
    ></task-add>
  </div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_meadow.css";
const TaskAdd = () => import("@/components/CampTabs/TaskAdd.vue");
export default {
  name: "DhtmlxGantt",
  components: { TaskAdd },
  data() {
    return {
      taskDialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
      },
      data: [
        {
          id: 11,
          text: "Project #1",
          type: "project",
          progress: 0.6,
          open: true,
          user: "小离",
          content: "酷酷酷酷酷酷",
        },

        // {
        //   id: 12,
        //   text: "Task #1",
        //   start_date: "03-04-2023",
        //   duration: "5",
        //   parent: "11",
        //   progress: 1,
        //   open: true,
        //   user: "小离",
        //   content: "酷酷酷酷酷酷",
        // },
        {
          id: 13,
          text: "方案 #2",
          start_date: "03-04-2023",
          type: "project",
          parent: "11",
          progress: 0.5,
          open: true,
          user: "小离",
          content: "嘎嘎嘎嘎嘎嘎嘎酷酷酷酷酷酷",
        },
        // {
        //   id: 14,
        //   text: "Task #3",
        //   start_date: "02-04-2023",
        //   duration: "6",
        //   parent: "11",
        //   progress: 0.8,
        //   open: true,
        //   user: "小离",
        //   content: "酷酷酷酷酷酷",
        // },
        {
          id: 15,
          text: "方案 #4",
          type: "project",
          parent: "11",
          progress: 0.2,
          open: true,
          user: "小离",
          content: "酷酷酷酷啦啦啦啦啦了酷酷",
        },
        // {
        //   id: 16,
        //   text: "Final milestone",
        //   start_date: "15-04-2023",
        //   type: "milestone",
        //   parent: "11",
        //   progress: 0,
        //   open: true,
        //   user: "小离",
        //   content: "酷酷酷酷酷酷",
        // },

        {
          id: 17,
          text: "Task #2.1",
          start_date: "03-04-2023",
          duration: "2",
          parent: "13",
          progress: 1,
          open: true,
          user: "小离111",
          content: "Task #2.1 酷酷酷酷酷酷",
        },
        {
          id: 18,
          text: "Task #2.2",
          start_date: "06-04-2023",
          duration: "3",
          parent: "13",
          progress: 0.8,
          open: true,
          user: "小离222",
          content: "Task #2.2 酷酷酷酷酷酷",
        },
        {
          id: 19,
          text: "Task #2.3",
          start_date: "10-04-2023",
          duration: "4",
          parent: "13",
          progress: 0.2,
          open: true,
          user: "小离333",
          content: "Task #2.3 酷酷酷酷酷酷",
        },
        {
          id: 20,
          text: "Task #2.4",
          start_date: "10-04-2023",
          duration: "4",
          parent: "13",
          progress: 0,
          open: true,
          user: "小离444",
          content: "Task #2.4 酷酷酷酷酷酷",
        },
        {
          id: 21,
          text: "Task #4.1",
          start_date: "03-04-2023",
          duration: "4",
          parent: "15",
          progress: 0.5,
          open: true,
          user: "小离555",
          content: "Task #4.1 酷酷酷酷酷酷",
        },
        {
          id: 22,
          text: "Task #4.2",
          start_date: "03-04-2023",
          duration: "4",
          parent: "15",
          progress: 0.1,
          open: true,
          user: "小离666",
          content: "Task #4.2 酷酷酷酷酷酷",
        },
        // {
        //   id: 23,
        //   text: "Mediate milestone",
        //   start_date: "14-04-2023",
        //   type: "milestone",
        //   parent: "15",
        //   progress: 0,
        //   open: true,
        //   user: "小离",
        //   content: "酷酷酷酷酷酷",
        // },
      ],
      links: [],
    };
  },
  methods: {
    getTaskDialogInfo() {
      this.taskDialogData.dialogVisible = false;
    },
    clearAll() {
      gantt.clearAll();
    },
    ganttInit() {
      const ganttContainer = this.$refs.gantt;
      const _this = this;
      //设置汉化
      gantt.i18n.setLocale("cn");
      gantt.plugins({
        tooltip: true,
      });
      gantt.plugins({
        marker: true,
      }); //标记当前日期
      var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
      var markerId = gantt.addMarker({
        start_date: new Date(),
        css: "today", //标记样式，style中对应
        text: "Today",
        title: dateToStr(new Date()),
      });
      gantt.getMarker(markerId);
      gantt.attachEvent("onTaskClick", function (id, e) {
        console.log(id, e, "==id, e");
        if (e.target.className == "gantt_tree_content") {
          _this.taskDialogData.dialogVisible = true;
        }
        //any custom logic here
        return true;
      });
      gantt.config.columns = [
        { name: "text", label: "任务名称", tree: true, width: "150" },
        { name: "user", label: "执行编组", align: "center", width: "80" },
        {
          name: "content",
          label: "方案 / 任务内容",
          align: "center",
          width: "120",
        },
        { name: "start_date", label: "开始时间", align: "center", width: "80" },
        { name: "end_date", label: "结束时间", align: "center", width: "80" },
        { name: "duration", label: "任务天数", align: "center", width: "60" },
      ];
      gantt.init(ganttContainer);
      gantt.parse({ data: this.data, links: this.links });
    },
  },
  mounted() {
    this.clearAll();
    this.ganttInit();
  },
};
</script>

<style lang="scss" scoped>
.container {
}
</style>
