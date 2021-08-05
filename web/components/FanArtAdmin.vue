<template>
  <div>
    <v-flex class="flexContainer">
      <v-container fill-height fluid>
        <div style="margin-top: 30px; padding 10px" />
        <h1 v-if="items.length === 0">
          The queue is empty
        </h1>
        <fan-art-admin-card v-for="item, index in items" :id="item.id" :key="index" />
      </v-container>
    </v-flex>
    <v-btn
      v-if="isNewUpdate"
      elevation="2"
      fab
      class="refreshBtn"
      @click="update"
    >
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </div>
</template>

<script>
import FanArtAdminCard from './FanArtAdminCard.vue'
export default {
  components: { FanArtAdminCard },
  data () {
    return {
      items: [],
      itemsLatest: [],
      isNewUpdate: false,
      isFirstFetch: true,
    }
  },
  async created () {
    const db = this.$fire.firestore
    const query = db
      .collection('waik/website/fanarts')
      .where('status', '==', 'PENDING')
    const queryres = await query.get()
    let a = []
    a = queryres.docs
    this.items = a
    query.onSnapshot((snap) => {
      if (this.isFirstFetch) {
        this.isFirstFetch = false
      }
      if (snap.docs !== this.items && !this.isFirstFetch) {
        this.isNewUpdate = true
        this.itemsLatest = snap.docs
      }
    })
  },
  methods: {
    update () {
      if (this.items !== this.itemsLatest) {
        this.isNewUpdate = false
        this.items = this.itemsLatest
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.flexContainer {
    overflow: auto;
}

.refreshBtn {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
