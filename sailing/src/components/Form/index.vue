<template>
  <a-form
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="类名:" name="className">
      <a-input v-model:value="form.className" />
    </a-form-item>
    <a-form-item label="内边距:" name="padding">
      <a-input v-model:value="form.padding" placeholder="10px 30px" />
    </a-form-item>
    <a-form-item label="外边距:" name="margin">
      <a-input v-model:value="form.margin" placeholder="10px 30px" />
    </a-form-item>
    <a-form-item label="行宽:" name="width">
      <a-input v-model:value="form.width" placeholder="10vw" />
    </a-form-item>
    <a-form-item label="行高:" name="height">
      <a-input v-model:value="form.height" placeholder="10vw" />
    </a-form-item>
    <a-form-item label="字体大小:" name="fontSize">
      <a-input v-model:value="form.fontsize" placeholder="14" />
    </a-form-item>
    <a-form-item label="字体颜色:" name="color">
      <a-input v-model:value="form.color" placeholder="rgba(0,0,0,1)" />
    </a-form-item>
    <a-form-item label="背景色:" name="backgroundColor">
      <a-input
        v-model:value="form.backgroundColor"
        placeholder="rgba(0,0,0,1)"
      />
    </a-form-item>

    <a-form-item label="弹性布局:" name="display">
      <a-switch v-model:checked="form.display" />
    </a-form-item>
    <a-form-item label="flex:" name="flex">
      <a-input v-model:value="form.flex" placeholder="1" />
    </a-form-item>
    <a-form-item label="垂直布局:" name="flexDirection">
      <a-switch v-model:checked="form.flexDirection" />
    </a-form-item>
    <a-form-item label="其他css样式:" name="other">
      <a-textarea v-model:value="form.other" placeholder="对象形式" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="finish"> Create </a-button>
      <a-button style="margin-left: 10px"> Cancel </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import Store from '@/common/store'
import JSON5 from 'json5'
import { CSSStyleDeclarationFixed } from '@/common/interface'
export default {
  setup() {
    const data = reactive({
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        backgroundColor: '',
        padding: '',
        margin: '',
        width: '',
        height: '',
        fontSize: '',
        flex: '',
        display: false,
        other: '',
        className: '',
        color: '',
        flexDirection: false,
      },
      rules: {
        className: [
          {
            required: true,
            message: '必须输入一个类名',
            trigger: 'blur',
          },
        ],
      },
    })
    const methods = {
      finish() {
        ruleForm.value.validate().then(() => {})
        let cssProto: Record<string, string> = {}
        Object.entries(data.form).forEach((formItem) => {
          const [key, value] = formItem
          const map: Record<string, Function> = {
            className: () => {
              Store.contextmenuElement?.setAttribute(
                'data-class',
                value as string
              )
            },
            display: () => {
              value && (cssProto['display'] = 'flex')
            },
            flexDirection: () => {
              cssProto['flexDirection'] = value ? 'column' : 'row'
            },
            other: () => {},
          }
          map[key] ? map[key]() : (cssProto[key] = value as string)
        })
        try {
          data.form.other &&
            (cssProto = { ...cssProto, ...JSON5.parse(data.form.other) })
        } catch {}

        Object.entries(cssProto).forEach((proto) => {
          const [key, val] = proto
          val &&
            (Store.contextmenuElement!.style[
              key as keyof CSSStyleDeclarationFixed
            ] = val)
        })
        Store.isShowModel = false
        console.log(Store.contextmenuElement)
      },
    }
    let ruleForm = ref()
    return {
      ...toRefs(data),
      ...methods,
      ruleForm,
    }
  },
}
</script>

