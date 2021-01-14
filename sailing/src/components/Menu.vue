<template>
  <div>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-sub-menu v-for="(item, key) in Object.keys(UI.antdForVue3)" :key="key">
        <template #title>
          <span>{{ item }}</span>
        </template>
        <a-menu-item
          v-for="(UIComponent, index) in UI.antdForVue3[item]"
          :key="key + index"
          :style="{ 'padding-left': '0px' }"
        >
          <Drag :componentType="item" :ids="UIComponent.id">
            {{ UIComponent.name }}
          </Drag>
        </a-menu-item>
      </a-sub-menu>
      <div class="header-button">
        <a-button
          type="primary"
          @click="toggleCollapsed"
          style="margin-bottom: 16px"
        >
          <MenuUnfoldOutlined v-if="collapsed" />
          <MenuFoldOutlined v-else />
        </a-button>
      </div>
    </a-menu>
  </div>
</template>

<script >
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue'
import Drag from '../components/drag/drag'
import Row from '../components/row'
import getVNode from '../complier/dom2VNode'
import UI from '../UI'
export default {
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
    Drag,
    Row,
  },
  data () {
    return {
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1'],
      UI
    }
  },
  watch: {
    openKeys (val, oldVal) {
      this.preOpenKeys = oldVal
    },
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
      this.openKeys = this.collapsed ? [] : this.preOpenKeys
    },
    getVNode
  },
}
</script>

<style lang="less" scoped>
.ant-menu-dark {
  height: 100%;
}
.header-button {
  text-align: right;
  padding-right: 30px;
  padding-top: 20px;
}
</style>
