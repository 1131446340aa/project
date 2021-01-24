//暂时本地配置，往后从后端获取

import { defineComponent, DefineComponent } from 'vue'
import SailTable from '../sailComponent/table.vue'
import Pagination from '../sailComponent/pagination.vue'
import Row from '../components/row'
import flexRow from '../components/row/flexRow'
import Steps from '../sailComponent/steps.vue'
import PageHeader from '../sailComponent/pageHeader.vue'
import Menu from '../sailComponent/sailMenu.vue'
import FormModel from '../sailComponent/FormModel.vue'
import Text from '../sailComponent/Text.vue'
// interface SailComponent {
//   name: string
//   componentString: string
//   component: DefineComponent<{}, {}, any>
//   id: string
//   outFile: string
// }
// interface SailUI<T extends string> {
//   antdForVue3: Record<T, SailComponent[]>
//   antd: Record<string, SailComponent[]>
//   Element: Record<string, SailComponent[]>
//   vant: Record<string, SailComponent[]>
//   user: Record<string, SailComponent[]>
// }
const UI = {
  antdForVue3: {
    容器: [
      {
        name: '盒子',
        componentString: `<div></div>`,
        component: Row,
        id: 'sailContainer',
        outFile: '',
      },
      {
        name: '弹性盒子',
        componentString: `<div></div>`,
        component: flexRow,
        id: 'sailContainer',
        outFile: '',
      },
    ],
    Button: [
      {
        //或许加一个icon属性代替name
        name: 'primaryButton',
        componentString: ` <a-button type="primary">Primary</a-button>`,
        component: defineComponent({
          setup() {
            return () => <a-button type="primary">Primary</a-button>
          },
        }) as DefineComponent<{}, {}, any>,
        id: 'primaryButton',
        outFile: '',
      },
      {
        name: 'dashedButton',
        componentString: ` <a-button type="dashed">Dashed</a-button>`,
        component: defineComponent({
          setup() {
            return () => <a-button type="dashed">Dashed</a-button>
          },
        }),
        id: 'dashedButton',
        outFile: '',
      },
      {
        name: 'defaultButton',
        componentString: `<a-button>Default</a-button>`,
        component: defineComponent({
          setup() {
            return () => <a-button>Default</a-button>
          },
        }),
        id: 'defaultButton',
        outFile: '',
      },
      {
        name: 'dangerButton',
        componentString: `<a-button type="danger">Danger</a-button>`,
        component: defineComponent({
          setup() {
            return () => <a-button type="danger">Danger</a-button>
          },
        }),
        id: 'dangerButton',
        outFile: '',
      },
    ],
    Table: [
      {
        name: '普通表格',
        componentString: `<SailTable></SailTable>`,
        component: SailTable,
        id: 'sailTable',
        outFile: '@sailComponent/table.vue',
      },
    ],
    Pagination: [
      {
        name: '分页',
        componentString: `<SailPagination></SailPagination>`,
        component: Pagination,
        id: 'sailPagination',
        outFile: '@sailComponent/pagination.vue',
      },
    ],
    Steps: [
      {
        name: '步骤条',
        componentString: `<SailSteps></SailSteps>`,
        component: Steps,
        id: 'sailSteps',
        outFile: '@sailComponent/steps.vue',
      },
    ],
    PageHeader: [
      {
        name: '页头',
        componentString: `<SailPageHeader></SailPageHeader>`,
        component: PageHeader,
        id: 'sailPageHeader',
        outFile: '@sailComponent/pageHeader.vue',
      },
    ],
    Menu: [
      {
        name: '导航菜单',
        componentString: `<SailMenu></SailMenu>`,
        component: Menu,
        id: 'sailMenu',
        outFile: '@sailComponent/sailMenu.vue',
      },
    ],
    FormModel: [
      {
        name: '表单',
        componentString: `<SailFormModel></SailFormModel>`,
        component: FormModel,
        id: 'sailFormModel',
        outFile: '@sailComponent/sailFormModel.vue',
      },
    ],
    Text: [
      {
        name: '文字',
        componentString: `<span>$Text</span>`,
        component: defineComponent({
          setup() {
            return () => <span>Text</span>
          },
        }) as DefineComponent<{}, {}, any>,
        id: 'sailText',
        outFile: '',
      },
    ]
  },
  antd: {},
  Element: {},
  vant: {},
  user: {},
}

export default UI
