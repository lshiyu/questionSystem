<template>
    <Modal v-model="isShow" title="问题选项" :mask-closable="false" @on-cancel="handleCloseOptions">
        <Row>
            <Col span="24"  class="margin-bottom">
                <Table height="200" v-show="optionList.length>0" border :columns="columns1" :data="optionList"></Table>
            </Col>
            <Col span="24" class="margin-bottom">
                <Input v-model="optionContent" type="textarea" :rows="2" placeholder="请输入问题选项"></Input>
            </Col>
            <Col span="24" style="text-align:right;" class="margin-bottom">
                <Button type="warning" @click="handleCancel">取消</Button>
                <Button type="success" @click="handleAddOption">添加</Button>
            </Col>
        </Row>
        <div slot="footer" style="display:none;"></div>
    </Modal>
</template>
<script>
export default {
  props: ["showmodal", "detail"],
  data() {
    return {
      columns1: [
        {
          title: "选项",
          align:'center',
          key: "qo_content"
        }
      ],
      optionContent: "",
      optionList: [],
      isShow: false
    };
  },
  watch: {
    showmodal(val) {
      if (val) {
        this.isShow = true;
        this.init();
      }
    }
  },
  mounted() {},
  methods: {
    //初始化
    init() {
        let that=this;
      this.$http
        .get(`/question/option-lists/${this.detail.question_id}`)
        .then(res => {
          if(res.data.success){
              that.optionList=res.data.data;
          }
        });
    },
    //添加选项
    handleAddOption() {
      let that = this;
      if (this.optionContent) {
        this.$http
          .post("/question/add/options", {
            id: this.detail.question_id,
            content: this.optionContent
          })
          .then(res => {
            if (res.data.success) {
              that.$Message.success("添加成功！");
              that.init()
            }
          });
      }
      this.optionContent = "";
    },
    handleCloseOptions() {
      this.$emit("close");
    },
    handleCancel() {
      this.optionContent = "";
    }
  }
};
</script>
<style scoped>
.margin-bottom {
  margin-bottom: 15px;
}
</style>
