
import Vue from 'vue'
import Component from 'vue-class-component'

// Define the component in class-style
@Component({
  head: {
    title: 'Waik | Letoltesek',
    meta: [
      {
        name: 'og:title',
        content: 'Waik | Letoltesek',
      },
      {
        name: 'og:description',
        content:
              'Itt találhatod meg a waik csapattal kapcsolatos letoltheto dolgokat',
      },
      {
        name: 'og:image',
        content:
              'https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/waik%2Fpublic%2Fwaik_cup.jpg?alt=media&token=5c3a6c28-644a-492a-ba4d-74d9e52470e2',
      },
      {
        name: 'theme-color',
        content: '#ffffff',
      },
    ],
  },
})
export default class Counter extends Vue {
  count = 0
  items = []

  // Methods will be component methods
  async created () {
    const request = await this.$axios.$get('/downloads')
    this.items = request
  }
}
