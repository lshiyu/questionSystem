<template>
  <Row>
        <Col span="24">
            <Table v-show="questionList.length>0" border :columns="columns1" :data="questionList"></Table>
        </Col>
        <!-- 问题查看 -->
        <question-check v-show="isCheck" :detail="questionDetails" :showmodal="isCheck" @close="close"></question-check>
        <!-- 问题修改 -->
        <question-update v-show="isUpdate" :detail="questionDetails" :showmodal="isUpdate" @close="close" @update="update"></question-update>
        <!-- 问题选项添加 -->
        <question-options v-show="showModal1" :detail="questionDetails" :showmodal="showModal1" @close="close"></question-options>
  </Row>
</template>
<script>
import moment from "moment";
import QuestionOptions from "@/components/QuestionOptions";
import QuestionCheck from "@/components/QuestionCheck";
import QuestionUpdate from "@/components/QuestionUpdate";
export default {
  props: ["questionList"],
  data() {
    return {
      showModal1: false,
      isCheck: false,
      isUpdate:false,
      questionDetails: {},
      columns1: [
        {
          title: "序号",
          width: 65,
          key: "question_id",
          align: "center"
        },
        {
          title: "内容",
          width: 300,
          key: "question_content"
        },
        {
          title: "创建时间",
          key: "question_create_time",
          align: "center",
          width: 150,
          render: (h, params) => {
            return moment(params.row.question_create_time).format(
              "YYYY-MM-DD,HH:MM:SS"
            );
          }
        },
        {
          title: "更新时间",
          width: 150,
          align: "center",
          key: "question_update_time",
          render: (h, params) => {
            if (params.row.question_update_time) {
              return moment(params.row.question_update_time).format(
                "YYYY-MM-DD,HH:MM:SS"
              );
            }
          }
        },
        {
          title: "类型",
          key: "question_type",
          width: 65,
          align: "center",
          render: (h, params) => {
            if (params.row.question_type == 1) {
              return "单选";
            } else if (params.row.question_type == 2) {
              return "多选";
            }
          }
        },
        {
          title: "答案",
          key: "question_answer",
          width: 300,
          align: "center"
        },
        {
          title: "分值",
          width: 65,
          key: "question_score",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.isCheck = true;
                      this.questionDetails = params.row;
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                        this.isUpdate=true;
                        this.questionDetails=params.row;
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showModal1 = true;
                      this.questionDetails = params.row;
                    }
                  }
                },
                "添加选项"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on:{
                      click:()=>{
                          this.$http.post(`/question/delete/${params.row.question_id}`).then(res=>{
                              if(res.data.success){
                                  this.$Message.success('删除成功');
                                  this.$emit('deleteQuestion')
                              }
                          })
                      }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  components: {
    QuestionOptions,
    QuestionCheck,
    QuestionUpdate
  },
  watch: {},
  methods: {
    close() {
      this.showModal1 = false;
      this.isCheck=false;
      this.isUpdate=false;
    },
    update(){
        this.$emit('update')
    }
  }
};
</script>
<style scoped>
.margin-bottom {
  margin-bottom: 15px;
}
</style>
