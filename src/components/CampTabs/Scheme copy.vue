<template>
  <div class="container" id="gantt" ref="gantt">方案制定模块</div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
export default {
  name: "SchemeFormulation",
  data() {
    return {
      data: [
        {
          id: 1,
          text: "Project #1",
          start_date: "2022-12-29 00:00",
          duration: null,
          parent: 0,
          progress: 0,
          open: true,
        },
        {
          id: 2,
          text: "Task #1",
          start_date: "2022-08-01 00:00",
          duration: 5,
          parent: 1,
          progress: 1,
        },
        {
          id: 3,
          text: "Task #2",
          start_date: "2022-08-06 00:00",
          duration: 2,
          parent: 1,
          progress: 0.5,
        },
        {
          id: 4,
          text: "Task #3",
          start_date: "2022-11-06 00:00",
          duration: 10,
          parent: 1,
          progress: 0.8,
          open: true,
        },
        {
          id: 5,
          text: "Task #3.1",
          start_date: "2022-10-09 00:00",
          duration: 2,
          parent: 4,
          progress: 0.2,
        },
        {
          id: 6,
          text: "Task #3.2",
          start_date: "2022-09-11 00:00",
          duration: 1,
          parent: 4,
          progress: 0,
        },
      ],
      links: [],
    };
  },
  methods: {
    $_initGanttEvents: function () {
      if (!gantt.$_eventsInitialized) {
        gantt.attachEvent("onTaskSelected", (id) => {
          let task = gantt.getTask(id);
          this.$emit("task-selected", task);
        });

        gantt.attachEvent("onTaskIdChange", (id, new_id) => {
          if (gantt.getSelectedId() == new_id) {
            let task = gantt.getTask(new_id);
            this.$emit("task-selected", task);
          }
        });

        gantt.$_eventsInitialized = true;
      }
    },

    $_initDataProcessor: function () {},
    clearAll() {
      gantt.clearAll();
    },
    ganttInit() {
      const ganttContainer = this.$refs.gantt;
      //设置汉化
      gantt.i18n.setLocale("cn");
      gantt.init(ganttContainer);
      gantt.parse({ data: this.data, links: this.links });
    },
  },
  mounted() {
    this.clearAll();
    this.ganttInit();
    // this.$_initDataProcessor();
    // this.$_initGanttEvents();
  },
};
</script>

<style lang="scss" scoped>
.container {
}
</style>
