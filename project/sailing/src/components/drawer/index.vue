<template>
  <a-drawer
    title="Basic Drawer"
    placement="right"
    :closable="false"
    v-model:visible="isShowModel"
    :after-visible-change="afterVisibleChange"
  >
    <div class="drawer-container">
      <div class="className">
        class：<SailInput @getData="setClass" ref="classRef" />
      </div>
      <div class="proto-line">proto</div>
      <div class="css-proto">
        <div v-for="(proto, index) in Object.keys(data)" :key="index">
          {{ proto }}：<SailInput
            :model="data[proto]"
            @getData="
              (e) => {
                setData(proto, e)
              }
            " 
          />
        </div>
      </div>

      <div class="proto-line">css-code</div>

      <div class="code">
        <textarea v-model="textareaValue" @blur="resetCssProto"></textarea>
      </div>
    </div>
  </a-drawer>
</template>
<script >
import { toRefs, reactive, watch, ref } from 'vue'
import Store from '../../common/store'
import SailInput from '../sailInput'
import { message } from 'ant-design-vue'
import Menu from '../../common/menuConfig'
export default {
  components: {
    SailInput,
  },
  setup () {
    const methods = {
      setClass (e) {
        className.value = e.value
      },
      afterVisibleChange (val) {
        if (val) {
          reset = true

          Object.keys(data).forEach(key => {
            data[key] = ''
          })
          classRef.value.$el.value = Store.contextmenuElement.getAttribute('data-class')
          className.value = classRef.value.$el.value
          reset = false
          Object.keys(cssProto).forEach(key => {
            cssProto[key] = ''
          })
          textareaValue.value = Store.contextmenuElement.style.cssText
          methods.resetCssProto()
          return
        } else {
          if (!className.value) {
            message.error('必须先添加一个css类名')
            Store.isShowModel = true
            return
          }
          Store.contextmenuElement?.setAttribute('data-class', className.value)
          Store.contextmenuElement.style.cssText = textareaValue.value
          Store.isShowModel = false
        }
      },
      showDrawer () {
        Store.isShowModel = true
      },
      cssProto2String () {
        Object.keys(data).forEach((proto) => {
          if (data[proto]) {
            textareaValue.value += `${proto}: ${data[proto]};\n`
          }
        })
        Object.keys(cssProto).forEach((proto) => {
          if (cssProto[proto]) {
            textareaValue.value += `${proto}: ${cssProto[proto]};\n`
          }
        })
      },
      setData (proto, e) {
        data[proto] = e.value
      },
      resetCssProto () {

        textareaValue.value.split(';').forEach((css) => {
          const [key, value] = css.split(':')
          key &&
            value &&
            (data[key.trim()] !== undefined
              ? (data[key.trim()] = value.trim())
              : (cssProto[key.trim()] = value.trim()))
        })
      },
    }
    let data = reactive(Menu)
    let className = ref('')
    let cssProto = reactive({})
    let textareaValue = ref('')
    let classRef = ref('')
    let reset = false
    watch([data], () => {
      if (reset) return
      textareaValue.value = ''
      methods.cssProto2String()
      // 
    })
    return {
      ...methods,
      ...toRefs(Store),
      data,
      textareaValue,
      cssProto,
      className,
      classRef
    }
  }
}
</script>
<style lang="less">
.ant-drawer-content {
  background: #001529;
  color: #fff;
}

.ant-drawer-header {
  background: #001529;
  color: #fff;
  border: 0px solid #000;
}
.ant-drawer-title {
  color: #fff;
}
.ant-drawer-body {
  padding: 0;
}
.drawer-container {
  padding-top: 8px;
  // box-sizing: border-box;
  // padding: 20px;
  .className {
    padding-left: 8px;
  }
  .proto-line {
    font-size: 12px;
    line-height: 30px;
    background: #262626;
    padding-left: 8px;
    box-sizing: border-box;

  }
  .css-proto {
    padding: 8px;
    padding-right: 0;
    box-sizing: border-box;
  }
  .code {
    padding: 24px;
    padding-right: 0;
    textarea {
      outline: none;
      height: 120px;
      background-color: #1f1f1f;
      width: 200px;
      // font-family: none;
      margin: 0;
      // font-family: ;
      &:focus {
        border-color: #40a9ff;
        border-right: 1px solid #40a9ff;
      }
      &:hover {
        border-color: #40a9ff;
        border-right: 1px solid #40a9ff;
      }
    }
  }
}
</style>