<template>
  <div style="width: 100%; height: 100%">
    <div class="gantt_container" id="gantt" ref="gantt"></div>
  </div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_meadow.css";
export default {
  name: "DhtmlxGantt",
  data() {
    return {
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
          start_date: "26-02-2023",
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
          start_date: "25-02-2023",
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
          start_date: "24-02-2023",
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
          start_date: "23-02-2023",
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
          start_date: "20-02-2023",
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
          start_date: "22-02-2023",
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
          start_date: "21-02-2023",
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
    clearAll() {
      gantt.clearAll();
    },
    ganttInit() {
      const ganttContainer = this.$refs.gantt;
      const _this = this;
      let dateToStr = gantt.date.date_to_str(gantt.config.task_date),
        markerId = null;
      const colContent = function (task) {
        const renderType = task.$rendered_type;
        if (renderType == "task") {
          return '<i data-action="set" class="pointer gantt-btn">设置动作条件</i>';
        } else {
          return (
            '<i data-action="edit1" class="pointer gantt-icon el-icon-edit"></i>' +
            '<i data-action="add1" class="pointer gantt-icon el-icon-circle-plus-outline"></i>' +
            '<i data-action="delete" class="pointer gantt-icon el-icon-remove-outline color-danger"></i>'
          );
        }
      };
      const weekScaleTemplate = function (date) {
        let dateToStr = gantt.date.date_to_str("%M-%d"),
          weekNum = gantt.date.date_to_str("(第%W周)"),
          endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
        return (
          dateToStr(date) + "日 ~ " + dateToStr(endDate) + "日 " + weekNum(date)
        );
      };

      const dayScaleTemplate = function (date) {
        let dateToMon = gantt.date.date_to_str("%M"),
          dateToDay = gantt.date.date_to_str("%d"),
          weekDay = gantt.date.date_to_str("%D");
        return (
          dateToMon(date) +
          dateToDay(date) +
          "日" +
          "/" +
          "星期" +
          weekDay(date)
        );
      };
      gantt.config.layout = {
        css: "gantt_container",
        cols: [
          {
            width: 670,
            min_width: 300,
            rows: [
              {
                view: "grid",
                scrollX: "gridScroll",
                scrollable: true,
                scrollY: "scrollVer",
              },

              // horizontal scrollbar for the grid
              { view: "scrollbar", id: "gridScroll", group: "horizontal" },
            ],
          },
          { resizer: true, width: 1 },
          {
            rows: [
              { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },

              // horizontal scrollbar for the timeline
              { view: "scrollbar", id: "scrollHor", group: "horizontal" },
            ],
          },
          { view: "scrollbar", id: "scrollVer" },
        ],
      };
      //设置汉化
      gantt.i18n.setLocale("cn");
      // gantt.plugins({
      //   // tooltip: true,
      // });
      gantt.plugins({
        marker: true,
      }); //标记当前日期
      markerId = gantt.addMarker({
        start_date: new Date(),
        css: "today", //标记样式，style中对应
        text: "Today",
        title: dateToStr(new Date()),
      });
      gantt.getMarker(markerId);
      gantt.config.start_on_monday = true;
      gantt.config.order_branch = true;
      gantt.config.fit_tasks = true;
      gantt.config.min_column_width = 18;
      gantt.config.duration_step = 1;
      // gantt.config.time_step = 15;
      gantt.config.duration_unit = "minute";
      gantt.config.details_on_dblclick = false; //open the lightbox after double clicking on a task
      gantt.config.scales = [
        // https://docs.dhtmlx.com/gantt/desktop__date_format.html
        // { unit: "year", date: " %Y年" },
        { unit: "month", step: 1, format: "%Y年%m月" },
        {
          unit: "week",
          step: 1,
          format: weekScaleTemplate,
        },
        // the day as a full name ( Sunday to Saturday );  / %l
        {
          unit: "day",
          step: 1,
          // format: "%d / %D",
          format: dayScaleTemplate,
          css: function (date) {
            if (!gantt.isWorkTime({ date: date, unit: "day" })) {
              return "weekend";
            }
          },
        },
        { unit: "hour", step: 1, format: "%H" },
      ];
      gantt.config.inherit_scale_class = true;
      gantt.config.scale_height = 50; //设置时间刻度的高度和网格的标题
      gantt.templates.scale_cell_class = function (date) {
        if (date.getDay() == 0 || date.getDay() == 6) {
          return "weekend";
        }
      };
      gantt.templates.timeline_cell_class = function (task, date) {
        if (date.getDay() == 0 || date.getDay() == 6) {
          return "weekend";
        }
      };
      // gantt.templates.task_row_class = function (start, end, task) {
      //   if (gantt.isSelectedTask(task.id)) return "gantt_selected";
      // };
      // gantt.getMarker(markerId);
      gantt.attachEvent("onTaskClick", function (id, e) {
        console.log(id, e, "==id, e");
        const target = e.target;
        const buttons = e.target.closest("[data-action]");
        if (buttons) {
          const action = buttons.getAttribute("data-action");
          switch (action) {
            case "edit1":
              _this.$emit("onGanttTreeClick", { type: 2, id: id });
              break;
            case "add1":
              _this.$emit("onGanttTreeClick", { type: 1, id: id });
              break;
            case "delete":
              _this
                .$confirm("确定要删除吗?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                })
                .then(() => {
                  console.log("确定删除");
                  _this.$emit("onGanttTreeClick", { type: 3, id: id });
                })
                .catch(() => {
                  console.log("取消删除甘特图任务");
                });
              // gantt.confirm({
              //   title: gantt.locale.labels.confirm_deleting_title,
              //   text: gantt.locale.labels.confirm_deleting,
              //   callback: function (res) {
              //     if (res) gantt.deleteTask(id);
              //   },
              // });
              break;
            case "set":
              _this.$router.push({
                path: "/scenario/action",
                query: { id: id },
              });
              break;
          }
          return false;
        }
        if (target.className == "gantt_task_content") {
          _this.$emit("onGanttTaskClick", { type: 3, id: id });
        }
        //any custom logic here
        return true;
      });
      gantt.config.columns = [
        { name: "text", label: "计划名称", tree: true, width: "140" },
        { name: "user", label: "执行单位", align: "center", width: "80" },
        {
          name: "content",
          label: "计划内容",
          align: "center",
          width: "120",
        },
        { name: "start_date", label: "开始时间", align: "center", width: "80" },
        { name: "end_date", label: "结束时间", align: "center", width: "80" },
        { name: "end_date", label: "执行时间", align: "center", width: "80" },
        {
          name: "buttons",
          label: "操作",
          align: "center",
          width: "90",
          template: colContent,
          // onrender: (item, node) => {
          //   console.log(item, node, "==item, node");
          //   return '<i class="pointer gantt-icon el-icon-edit"></i><i class="pointer gantt-icon el-icon-remove-outline"></i>';
          // },
        },
      ];

      function clickGridButton(id, action) {
        switch (action) {
          case "edit":
            gantt.showLightbox(id);
            break;
          case "add":
            gantt.createTask(null, id);
            break;
          case "delete":
            gantt.confirm({
              title: gantt.locale.labels.confirm_deleting_title,
              text: gantt.locale.labels.confirm_deleting,
              callback: function (res) {
                if (res) gantt.deleteTask(id);
              },
            });
            break;
        }
      }
      gantt.init(ganttContainer);
      gantt.parse({ data: this.data, links: this.links });
    },
  },
  mounted() {
    this.clearAll();
    this.$nextTick(() => {
      this.ganttInit();
    });
  },
};
</script>

<style lang="scss" scoped>
.gantt_container {
  height: 100%;
  width: 100%;
  ::v-deep .weekend {
    background-color: rgba(173, 216, 230, 0.2);
  }
  ::v-deep .gantt_task_row {
    .weekend {
      background-color: rgba(173, 216, 230, 0.2);
    }
  }
}
</style>
