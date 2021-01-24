import StaticStore from './staticStore'
import { notification } from 'ant-design-vue'
import { SmileOutlined } from '@ant-design/icons-vue'
// 封装通知方法
export default function (message: keyof typeof StaticStore.messageMap) {
  notification.open({
    message: `${StaticStore.messageMap[message]}`,
    icon: <SmileOutlined style="color: #108ee9" />,
    duration: 2,
  })
}
