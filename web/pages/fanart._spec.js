import { mount } from '@vue/test-utils'
import FanartPage from '@/pages/fanart.vue'

describe('FanartPage', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(FanartPage)
    expect(wrapper.vm).toBeTruthy()
  })

  test('renders correct contents', () => {
    const wrapper = mount(FanartPage)
    expect(wrapper.vm.$data.items.length).notToBe(0)
  })
})
