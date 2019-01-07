<template>
  <div class="full_pages" ref="$pages" :style="sty">
    <slot></slot>
    <div v-if="againCof.isShow" @click="goBack" class="full_pages_again">{{againCof.text}}</div>
  </div>
</template>

<script>
export default {
  name: 'Pages',
  data() {
    return {
    }
  },
  props: {
    sty: Object,
    againCof: {
      type: Object,
      default: () => {
        return {
          isShow: false,
          text: '',
        };
      }
    },
    again: Function,
  },
  methods: {
    init() {
      const pages = this.$parent.$children.length;
      const $pages = this.$refs.$pages;
      $pages.style.height = 100 / pages + '%';
      this.addClass('#fullpage .full_pages', 'full_pages_active', 0);
    },
    addClass(el, className, num) {
      const nodeLists = document.querySelectorAll(el);
      if (nodeLists.length > 0) {
        if (num <= nodeLists.length) {
          nodeLists[num].classList.add(className);
        } else if (num === undefined) {
          nodeLists.forEach(nodes => {
            nodes.classList.add(className);
          });
        }
      }
    },
    goBack() {
      this.$parent.again();
      this.$emit('again');
    }
  },
  created() {
  },
  mounted() {
    this.init();
  },
}
</script>

<style lang="stylus">
.full_pages{
  position relative
  width 100% 
  box-sizing: border-box
  .full_pages_again{
    width 100px
    height 40px
    line-height 40px
    text-align center
    position absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)  
    color: #ffffff
    background-color: #ff4400
    border-radius: 6px
  }
}
</style>


