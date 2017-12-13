<template>
  <Modal v-model="showModal" :mask-closable="false" title="问题更新" @on-ok="handleUpdate" @on-cancel="handleCancel">
      <Row>
          <Col span="2">内容：</Col>
          <Col span="22" class="margin-bottom">
            <Input type="textarea" :rows="3" v-model="content"></Input>
          </Col>
          <Col span="2">类型：</Col>
          <Col span="22" class="margin-bottom">
            <RadioGroup v-model="type">
                <Radio label="1">
                    <span>单选</span>
                </Radio>
                <Radio label="2">
                    <span>多选</span>
                </Radio>
            </RadioGroup>
          </Col>
          <Col span="2">答案：</Col>
          <Col span="22" class="margin-bottom">
            <Input type="textarea" :rows="3" v-model="answer"></Input>
          </Col>
          <Col span="2">分值：</Col>
          <Col span="22" class="margin-bottom">
            <InputNumber v-model="score"></InputNumber>
          </Col>
      </Row>
  </Modal>
</template>
<script>
export default {
  props: ["detail", "showmodal"],
  data() {
    return {
      content: "",
      answer: "",
      score: 0,
      showModal: false,
      type: ""
    };
  },
  watch: {
    showmodal(val) {
      if (val) {
        this.showModal = true;
        this.init();
      }
    },
    type(val){
        console.log(val);
    }
  },
  methods: {
    init() {
      let that = this;
      this.$http.get(`/question/list/${this.detail.question_id}`).then(res => {
        if (res.data.success) {
          that.content = res.data.data[0].question_content;
          that.score = res.data.data[0].question_score;
          that.answer = res.data.data[0].question_answer;
          that.type = res.data.data[0].question_type;
        }
      });
    },
    handleUpdate() {
        let that=this;
        this.$http.post('/question/update',{
            content:this.content,
            type:this.type,
            score:this.score,
            answer:this.answer,
            id:this.detail.question_id
        }).then(res=>{
            if(res.data.success){
                that.$emit("update");
            }
        })
    },
    handleCancel() {
      this.$emit("close");
    }
  }
};
</script>
<style  scoped>
.margin-bottom {
  margin-bottom: 15px;
}
</style>

