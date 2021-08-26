import Vue from 'vue'
import DescriptionCard from '../../../components/DescriptionCard.vue'

export default Vue.extend({
  components: {
    DescriptionCard,
  },
  async asyncData ({ $content, i18n }) {
    const profile = await $content(`${i18n.localeProperties.code}/profiles`, 'geiszla').fetch()
    return {
      profile,
      desc: profile.body.children[0].children[0].value,
    }
  },
  data () {
    return {
      loading: false,
    }
  },
  head () {
    return {
      title: `Waik | ${this.$data.profile.name}`,
      meta: [
        {
          name: 'og:title',
          content: `Waik | ${this.$data.profile.name}`,
        },
        {
          name: 'description',
          content: this.$data.desc,
        },
        {
          name: 'og:description',
          content: this.$data.desc,
        },
        {
          name: 'og:image',
          content: this.$data.profile.imageurl,
        },
        {
          name: 'theme-color',
          content: `#${this.$data.profile.color}`,
        },
      ],
    }
  },
})
