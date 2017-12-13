<template>
    <div>
        <Row>
            <Col span="4">
                 起：<DatePicker v-model="beginTime" type="date" placeholder="日期选择"></DatePicker>
            </Col>
            <Col span="4">
                止：<DatePicker v-model="endTime" type="date"  placeholder="日期选择"></DatePicker>  
            </Col>
            <Col span="4">
                <Input v-model="keyword" icon="search" placeholder="请输入关键字" @on-click="handleSearch" @on-keyup.enter="handleSearch"></Input>
            </Col>
            <Col span="4">
                <Button type="success" @click="showModal=true">添加问题</Button>
            </Col>
        </Row>
        <!-- 问题列表 -->
        <question-list :questionList="questionList" @update="update" @deleteQuestion="deleteQuestion"></question-list>
        <!-- 问题详情添加 -->
        <question-detail v-show="showModal" :showmodal="showModal" @close="close"></question-detail>
    </div>
</template>
<script>
import moment from "moment";
import QuestionDetail from "@/components/QuestionDetail"
import QuestionList from "@/components/QuestionList"

export default {
  data() {
    return {
      keyword: "",
      beginTime: "",
      endTime: "",
      showModal: false,
      questionList: []
    };
  },
  components:{
      QuestionDetail,
      QuestionList,
  },
  watch: {
    beginTime(val) {
      val = moment(val).format("YYYY-MM-DD");
      console.log(val);
    },
    endTime(val) {
      val = moment(val).format("YYYY-MM-DD");
      console.log(val);
    },
    choice(val) {
      console.log(val);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let that = this;
      this.$http.get("/question/list").then(res => {
        if (res.data.success) {
          that.questionList = res.data.data;
        }
      });
    },
    handleSearch() {
      console.log(123456);
    },
    close(){
        this.showModal=false;
        this.init();
    },
    update(){
        this.init();
    },
    deleteQuestion(){
        this.init();
    }
  },
};
</script>
<style scoped>

.margin-bottom {
  margin-bottom: 15px;
}
</style>
