<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-card-title>
      <v-avatar v-if="status === 'pending'" size="56">
        <img
          alt="Pending"
          src="https://firebasestorage.googleapis.com/v0/b/zal1000.appspot.com/o/LinkImages%2Fpending-clock.png?alt=media&token=110fd11e-23fa-4ffc-9533-b8078e23bea9"
        />
      </v-avatar>
      <v-avatar v-if="status === 'success'" size="56">
        <img
          alt="Success"
          src="https://firebasestorage.googleapis.com/v0/b/zal1000.appspot.com/o/LinkImages%2F1200px-Flat_tick_icon.svg.png?alt=media&token=c8aae673-0454-45bd-bdae-9cf1051d6ada"
        />
      </v-avatar>
      <v-avatar v-if="status === 'error'" size="56">
        <img
          alt="Error"
          src="https://firebasestorage.googleapis.com/v0/b/zal1000.appspot.com/o/LinkImages%2F1200px-Flat_cross_icon.svg.png?alt=media&token=066c44c3-c03c-4fee-b6c6-16ce1e8e5f73"
        />
      </v-avatar>
      <p class="ml-2">Mass role</p>
    </v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0"> </v-row>

      <div></div>
    </v-card-text>

    <v-card-text>
      <v-progress-linear :value="(done / all) * 100"></v-progress-linear>
      <p style="margin-top: 10px">{{ done }} out of {{ all }} done</p>
      <p>Started at: {{ startedAt }}</p>
      <p>Finished at: {{ status === 'pending' ? 'Running...' : finishedAt }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text>
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
    status: 'pending',
    all: 0,
    done: 0,
    startedAt: 0,
    finishedAt: 0,
  }),

  created() {
    const rdb = this.$fire.database
    const ref = rdb.ref('admin/massadd')
    ref.on('value', (snap) => {
      this.all = snap.val().all
      this.done = snap.val().done
      this.startedAt = snap.val().startedAt ? new Date(snap.val().startedAt).toLocaleString() : "Not yet started"
      this.finishedAt = snap.val().finishedAt ? new Date(snap.val().finishedAt).toLocaleString() : "Not yet finished"
      if (snap.val().running) {
        this.status = 'pending'
      } else if (snap.val().error) {
        this.status = 'error'
      } else {
        this.status = 'success'
      }
      // console.log(snap.val())
    })
  },
  methods: {
    reserve() {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>