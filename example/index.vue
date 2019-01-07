<template>
  <PageContainer @onChange="onChange" @onChangeEnd="onChangeEnd">
    <Pages :sty="{
      backgroundColor: '#51eabe',
    }">
      <div>第一</div>
    </Pages>
    <Pages :sty="{
      backgroundColor: '#f4ea2a',
    }">
      <div>第二</div>
    </Pages>
    <Pages :sty="{
      backgroundColor: '#1afa29',
    }">
      <div>第三</div>
    </Pages>
    <Pages :sty="{
      backgroundColor: '#1296db',
    }" :againCof="{
      isShow: true,
      text: '重播'
    }" @again="again">
      <div>第四</div>
    </Pages>
  </PageContainer>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onChange: (nowIdx, newIdx) => {
      console.log(nowIdx);
      console.log(newIdx);
    },
    onChangeEnd: (nowIdx) => {
      console.log(nowIdx);
    },
    again: () => {
      console.log('重播');
    },
  },
  computed: {
  }
};
</script>


<style lang="stylus" scoped>
.app_content{
  width 100%  
}
</style>
