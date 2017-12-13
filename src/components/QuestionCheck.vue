<template>
  <Modal v-model="showModal" title="问题详情" :mask-closable="false" @on-cancel="handleClose">
      <Row v-for="(val,index) in questionDetails" :key="index">
          <Col span="2">
            内容：
          </Col>
          <Col span="22" class="margin-bottom">
            <Input :value="val.question_content" type="textarea" :rows="3" :disabled="true"></Input>
          </Col>
          <Col span="24" class="margin-bottom">
            类型：
            <span>{{val.question_type==1?"单选":'多选'}}</span>
          </Col>
          <Col span="2">
            答案：
          </Col>
          <Col span="22" class="margin-bottom">
            <Input type="textarea" :value="val.question_answer" :rows="2" :disabled="true"></Input>
          </Col>
          <Col span="24" >
            分值：
            <span>{{val.question_score}}</span>
          </Col>
      </Row>
      <div slot="footer"></div>
  </Modal>
</template>
<script>
export default {
  props: ["detail", "showmodal"],
  data() {
    return {
      showModal: false,
      questionDetails:[]
    };
  },
  watch: {
    showmodal(val) {
      if (val) {
        this.showModal = true;
        this.init();
      }
    }
  },
  methods: {
    init() {
      let that=this;
      this.$http.get(`/question/list/${this.detail.question_id}`).then(res=>{
          if(res.data.success){
              this.questionDetails=res.data.data;
              console.log(res.data.data)
          }
      })
    },
    handleClose() {
      this.$emit("close");
    }
  }
};
</script>
<style scoped>
.margin-bottom {
  margin-bottom: 15px;
}
</style>
