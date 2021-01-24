import { defineComponent, DefineComponent } from 'vue'
import Menu from '../../components/Menu.vue'
import Sail from '../body'
import './index.less'
import { PlayCircleOutlined } from '@ant-design/icons-vue'
import Proper from '../../components/proper'
// import AdjustInput from '../../components/adjustInput'
import SailModel from '../../components/Model/index.vue'
import getComponent from '../../complier/VNode2Component'
import Drawer from '../../components/drawer/index.vue'
import { message } from 'ant-design-vue'
import Store from '@/common/store'
export default defineComponent({
  components: { Menu, SailModel, Sail },

  setup(props, { slots }) {
    return () => (
      <>
        <div
          class="main"
          onClick={() => {
            Store.isContextmenu = false
          }}
        >
          <div class="header">
            扬帆
           
            <PlayCircleOutlined
              class="icon"
              onClick={() => {
                getComponent()
                message.info('代码生成成功,前往控制台查看')
              }}
            />
          </div>
          <div class="container">
            <Menu class="menu"></Menu>
            <Sail class="body"></Sail>
          </div>
        </div>
        <Drawer />
        <Proper />
        {/* <SailModel></SailModel> */}
      </>
    )
  },
})
