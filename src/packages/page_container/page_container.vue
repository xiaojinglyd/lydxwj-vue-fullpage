<template>
  <div class="fullpage" id="fullpage" :style="sty">
    <div class="full_contain" ref="$full">
      <slot></slot>
    </div>
    <div v-show="isArrow && currentIndex !== pagesAll" class="full_pages_down" @click="nextPage">&#xeb0a;</div>
    <ul class="fullpage_nav" v-if="isNav">
      <li v-for="idx in pagesAll" :key="idx" :class="{ fullpage_nav_item: true, nav_active: currentIndex === idx }"></li>
    </ul>
  </div>
</template>

<script>
import './base.styl';
const mouseData = {
  startY: 0,
  distanceY: 0,
  moveY: 0,
  isMove: false,
  isChange: false,
  pageMoving: false,
};
export default {
  name: 'PageContainer',
  data() {
    return {
      pagesAll: this.$children.length,
      currentIndex: 1,
    }
  },
  props: {
    isArrow: {
      type: Boolean,
      default: true,
    },
    isNav: {
      type: Boolean,
      default: true,
    },
    sty: Object,
    onChange: Function,
    onChangeEnd: Function,
  },
  computed: {
  },
  methods: {
    bindTouchEvent($full) {
      $full.addEventListener('touchstart', this.touchstartEvent);
      $full.addEventListener('touchmove', this.touchmoveEvent);
      $full.addEventListener('touchend', this.touchendEvent);
    },
    unbindTouchEvent($full) {
      $full.removeEventListener('touchstart', this.touchstartEvent);
      $full.removeEventListener('touchmove', this.touchmoveEvent);
      $full.removeEventListener('touchend', this.touchendEvent);
    },
    touchstartEvent(e) {
      mouseData.startY = e.touches[0].clientY;
    },
    touchmoveEvent(e) {
      e.preventDefault();
      mouseData.isMove = true;
      mouseData.moveY = e.touches[0].clientY;
      mouseData.distanceY = mouseData.moveY - mouseData.startY;
    },
    touchendEvent() {
      const $full = this.$refs.$full;
      const pages = this.$children.length;
      if (Math.abs(mouseData.distanceY) > 10 && mouseData.isMove && !mouseData.pageMoving) {
        if (mouseData.distanceY > 0) {
          if (this.currentIndex > 1) {
            this.$emit('onChange', this.currentIndex, this.currentIndex - 1);
            this.currentIndex = --this.currentIndex;
            mouseData.isChange = true;
          }
        } else {
          if (this.currentIndex < pages) {
            this.$emit('onChange', this.currentIndex, this.currentIndex + 1);
            this.currentIndex = ++this.currentIndex;
            mouseData.isChange = true;
          }
        }
        if (mouseData.isChange) {
          mouseData.pageMoving = true;
          $full.style.transform = 'translate3d(0, ' + (-100 / pages * (this.currentIndex - 1)) + '%, 0)';
          this.removeClass('#fullpage .full_pages', 'full_pages_active');
          this.addClass('#fullpage .full_pages', 'full_pages_active', this.currentIndex - 1);
          setTimeout(() => {
            mouseData.pageMoving = false;
            mouseData.isChange = false;
            this.$emit('onChangeEnd', this.currentIndex);
          }, 300);
        }
        mouseData.startY = 0;
        mouseData.moveY = 0;
        mouseData.distanceY = 0;
        mouseData.isMove = false;
      } else {
        mouseData.startY = 0;
        mouseData.moveY = 0;
        mouseData.distanceY = 0;
        mouseData.isMove = false;
      }
    },
    removeClass(el, className) {
      const nodeLists = document.querySelectorAll(el);
      if (nodeLists.length > 0) {
        nodeLists.forEach(nodes => {
          nodes.classList.remove(className);
        });
      }
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
    again() {
      const $full = this.$refs.$full;
      $full.style.transitionDuration = '0s';
      $full.style.transform = 'translateY(0%)';
      this.removeClass('#fullpage .full_pages', 'full_pages_active');
      this.addClass('#fullpage .full_pages', 'full_pages_active', 0);
      mouseData.startY = 0;
      mouseData.moveY = 0;
      mouseData.distanceY = 0;
      mouseData.isMove = false;
      setTimeout(() => {
        this.currentIndex = 1;
        $full.style.transitionDuration = '0.3s';
      }, 10);
    },
    nextPage() {
      const pages = this.pagesAll;
      const $full = this.$refs.$full;
      if (this.currentIndex < pages && !mouseData.pageMoving) {
        this.$emit('onChange', this.currentIndex, this.currentIndex + 1);
        this.currentIndex = ++this.currentIndex;
        mouseData.isChange = true;
      }
      if (mouseData.isChange && !mouseData.pageMoving) {
        mouseData.pageMoving = true;
        $full.style.transform = 'translate3d(0, ' + (-100 / pages * (this.currentIndex - 1)) + '%, 0)';
        this.removeClass('#fullpage .full_pages', 'full_pages_active');
        this.addClass('#fullpage .full_pages', 'full_pages_active', this.currentIndex - 1);
        setTimeout(() => {
          mouseData.pageMoving = false;
          mouseData.isChange = false;
          this.$emit('onChangeEnd', this.currentIndex);
        }, 300);
      }
      mouseData.startY = 0;
      mouseData.moveY = 0;
      mouseData.distanceY = 0;
      mouseData.isMove = false;
    },
  },
  created() {
  },
  mounted() {
    const pages = this.pagesAll =  this.$children.length;
    const $full = this.$refs.$full;
    $full.style.height = 100 * pages + '%';
    this.bindTouchEvent($full);
  },
  beforeDestroy() {
    const $full = this.$refs.$full;
    this.unbindTouchEvent($full); 
  }
}
</script>

<style lang="stylus">
.fullpage {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translate3d(0,0,0)
  overflow: hidden
}
.fullpage_nav{
  position fixed
  right 0
  top: 50%
  transform: translate(0, -50%)
  overflow: hidden
  .fullpage_nav_item{
    margin: 6px
    width: 6px
    height 6px
    border-radius: 50%
    background-color: #999999
    &.nav_active{
      background-color: #ff4400
    }
  }
}

.full_pages_down{
  font-family: 'iconfont'
  font-size: 28px
  text-align center
  position fixed
  width 40px
  height 40px
  line-height 40px
  color #ff4400
  left: 50%
  bottom: 0
  margin-left: -10px
  animation bounce 1s infinite
}
.full_contain{
  width 100%
  overflow: hidden
  transition all 0.3s
  perspective: 1000px;
  backface-visibility: hidden;
}
@font-face {
  font-family: 'iconfont';  /* project id 975228 */
  src: url('//at.alicdn.com/t/font_975228_05x0spxgzq4c.eot');
  src: url('//at.alicdn.com/t/font_975228_05x0spxgzq4c.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_975228_05x0spxgzq4c.woff') format('woff'),
  url('//at.alicdn.com/t/font_975228_05x0spxgzq4c.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_975228_05x0spxgzq4c.svg#iconfont') format('svg');
}

@-webkit-keyframes bounce{
  from, 20%, 53%, 80%, to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
  }
  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
  }
  90% {
    -webkit-transform: translate3d(0,-4px,0);
    transform: translate3d(0,-4px,0);
  }
}
</style>


