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
import Vue from 'vue'
import { getFirestore, getDocs, collection, query, where, onSnapshot } from 'firebase/firestore'
export default Vue.extend({
  data () {
    return {
      db: getFirestore(),
      items: [],
      itemsLatest: [],
      isNewUpdate: false,
      isFirstFetch: true,
    }
  },
  async created () {
    const q = query(collection(this.db, 'waik/website/fanarts'), where('status', '==', 'PENDING'))
    const queryres = await getDocs(q)
    let a = []
    a = queryres.docs
    this.items = a
    onSnapshot(q, (snap) => {
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
})
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
