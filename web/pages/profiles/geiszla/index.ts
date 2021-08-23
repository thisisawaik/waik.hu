import Vue from 'vue'
import Component from 'vue-class-component'
import DescriptionCard from '../../../components/DescriptionCard.vue'

@Component({
  components: {
    DescriptionCard,
  },
  async asyncData (context) {
    const profile = await context.$content(`${context.i18n.localeProperties.code}/profiles`, 'geiszla').fetch()
    return {
      profile,
      desc: profile.body.children[0].children[0].value,
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
export default class GeiszlaPage extends Vue {
    loading = false

    mounted () {
      this.loading = false
    }
}
