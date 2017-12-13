<template>
   <Modal  v-model="showModal"  title="添加问题" :mask-closable="false" class="center-modal" @on-ok="handleOk" @on-cancel="handleCancel">
        <Row>
            <Col span="24" class="margin-bottom">
                <Input v-model="quesContent" type="textarea" :rows="4" placeholder="请输入问题内容"></Input>
            </Col>
            <Col span="12" class="margin-bottom">
                类型：
                <Select v-model="choice" style="width:50%">
                    <Option v-for="(val ,index) in choiceList" :value="val.type" :key="index">{{val.type}}</Option>
                </Select>
            </Col>
            <Col span="12">
            分值：
                <InputNumber v-model="score" style="width:50%"></InputNumber>
            </Col>
            
        </Row>
    </Modal>
</template>
<script>
export default {
  props: ["showmodal"],
  data() {
    return {
      showModal: false,
      quesContent: "",
      score: 0,
      choiceList: [
        {
          type: "单选"
        },
        {
          type: "多选"
        }
      ],
      choice: "单选"
    };
  },
  watch: {
    showmodal(val) {
      if (val) {
        this.showModal = true;
      }
    }
  },
  methods: {
    init() {
      let that = this;
      this.$http.get("/question/list").then(res => {
        if (res.data.success) {
          // that.questionList = res.data.data;
          that.$emit("questionList", res.data.data);
        }
      });
    },
    handleOk() {
      console.log(this.quesContent, this.score, this.choice, "1111");
      let that = this;
      if (this.quesContent && this.score && this.choice) {
        this.$http
          .post("/question/add", {
            content: this.quesContent,
            type: this.choice,
            score: this.score
          })
          .then(res => {
            if (res.data.success) {
              this.$emit("close");
            }
          });
      }
      this.quesContent = "";
    },
    //弹出框点击取消或关闭按钮的回调函数
    handleCancel() {
      this.quesContent = "";
      this.$emit("close");
    }
  }
};
</script>
<style scoped>
.center-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}
.margin-bottom {
  margin-bottom: 15px;
}
</style>
