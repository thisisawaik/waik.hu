<template>
  <div>
    <v-card :loading="massrole.loading" class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        />
      </template>
      <v-card-title>
        <v-avatar v-if="autorole.status === 'pending'" size="56">
          <img
            alt="Pending"
            src="https://firebasestorage.googleapis.com/v0/b/zal1000.appspot.com/o/LinkImages%2Fpending-clock.png?alt=media&token=110fd11e-23fa-4ffc-9533-b8078e23bea9"
          >
        </v-avatar>
        <v-avatar v-else-if="autorole.status === 'success'" size="56">
          <img
            alt="Success"
            src="https://firebasestorage.googleapis.com/v0/b/zal1000.appspot.com/o/LinkImages%2F1200px-Flat_tick_icon.svg.png?alt=media&token=c8aae673-0454-45bd-bdae-9cf1051d6ada"
          >
        </v-avatar>
        <v-avatar v-else size="56">
          <img
            alt="Error"
            src="https://firebasestorage.googleapis.com/v0/b/zal1000.appspot.com/o/LinkImages%2F1200px-Flat_cross_icon.svg.png?alt=media&token=066c44c3-c03c-4fee-b6c6-16ce1e8e5f73"
          >
        </v-avatar>
        <p class="ml-2">
          Auto role
        </p>
      </v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0" />

        <div />
      </v-card-text>

      <v-card-text>
        <v-progress-linear
          :value="(autorole.done / autorole.all) * 100"
          :color="autorole.red"
        />
        <p style="margin-top: 10px">
          {{ autorole.done }} out of {{ autorole.all }} done
        </p>
        <p>Started at: {{ autorole.startedAt }}</p>
        <p>
          Finished at:
          {{
            autorole.status === 'pending' ? 'Running...' : autorole.finishedAt
          }}
        </p>
        <p>
          Changes: {{ autorole.memberchanges ? autorole.memberchanges : '0' }}
        </p>
        <div v-if="autorole.memberchanges > 0">
          <v-checkbox v-model="autorole.showchanges" label="Show changes" />
          <div v-if="autorole.showchanges">
            <div v-for="u in autorole.changes" :key="u">
              <admin-role-change-card :id="u.id" :added_roles="u.added_roles" :removed_roles="u.removed_roles" :roles="roles" />
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text>
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card :loading="autorole.loading" class="mx-auto my-12" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        />
      </template>
      <v-card-title>
        <v-avatar v-if="massrole.status === 'pending'" size="56">
          <img
            alt="Pending"
            src="https://firebasestorage.googleapis.com/v0/b/zal1000.appspot.com/o/LinkImages%2Fpending-clock.png?alt=media&token=110fd11e-23fa-4ffc-9533-b8078e23bea9"
          >
        </v-avatar>
        <v-avatar v-if="massrole.status === 'success'" size="56">
          <img
            alt="Success"
            src="https://firebasestorage.googleapis.com/v0/b/zal1000.appspot.com/o/LinkImages%2F1200px-Flat_tick_icon.svg.png?alt=media&token=c8aae673-0454-45bd-bdae-9cf1051d6ada"
          >
        </v-avatar>
        <v-avatar v-if="massrole.status === 'error'" size="56">
          <img
            alt="Error"
            src="https://firebasestorage.googleapis.com/v0/b/zal1000.appspot.com/o/LinkImages%2F1200px-Flat_cross_icon.svg.png?alt=media&token=066c44c3-c03c-4fee-b6c6-16ce1e8e5f73"
          >
        </v-avatar>
        <p class="ml-2">
          Mass role
        </p>
      </v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0" />

        <div />
      </v-card-text>

      <v-card-text>
        <v-progress-linear
          :value="(massrole.done / massrole.all) * 100"
          :color="massrole.red"
        />
        <p style="margin-top: 10px">
          {{ massrole.done }} out of {{ massrole.all }} done
        </p>
        <p>Started at: {{ massrole.startedAt }}</p>
        <p>
          Finished at:
          {{
            massrole.status === 'pending' ? 'Running...' : massrole.finishedAt
          }}
        </p>
        <p>
          Started by:
          {{
            massrole.startedBy ? massrole.startedBy : 'Unknown'
          }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="deep-purple lighten-2" text>
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import AdminRoleChangeCard from '../components/AdminRoleChangeCard.vue'
export default {
  components: { AdminRoleChangeCard },
  data: () => ({
    roles: {},
    massrole: {
      loading: false,
      selection: 1,
      status: 'pending',
      all: 0,
      done: 0,
      startedAt: 0,
      finishedAt: 0,
      changes: {},
      memberchanges: 0,
      showchanges: false,
      color: 'blue',
      startedBy: null
    },
    autorole: {
      loading: false,
      selection: 1,
      status: 'pending',
      all: 0,
      done: 0,
      startedAt: 0,
      finishedAt: 0,
      changes: {},
      memberchanges: 0,
      color: 'blue'
    }
  }),

  async created () {
    this.loadMassStatus()
    this.loadSyncStatus()
    const db = this.$fire.firestore
    const ref = db.collection('waik').doc('discord')
    const doc = await ref.get()
    this.roles = doc.data().autoroles
  },
  methods: {
    loadMassStatus () {
      const rdb = this.$fire.database
      const ref = rdb.ref('admin/massadd')
      this.massrole.loading = true
      ref.child('changes').on('value', (snapshot) => {
        this.massrole.memberchanges = snapshot.numChildren() || 0
      })
      ref.on('value', (snap) => {
        this.massrole.loading = false
        this.massrole.all = snap.val().all
        this.massrole.done = snap.val().done
        this.massrole.startedAt = snap.val().startedAt
          ? new Date(snap.val().startedAt).toLocaleString()
          : 'Not yet started'
        this.massrole.finishedAt = snap.val().finishedAt
          ? new Date(snap.val().finishedAt).toLocaleString()
          : 'Not yet finished'
        if (snap.val().running === true) {
          this.massrole.status = 'pending'
        } else if (snap.val().error) {
          this.massrole.status = 'error'
        } else {
          this.massrole.status = 'success'
        }

        this.massrole.startedBy = snap.val().startedBy

        if (this.massrole.changes !== snap.val().changes) {
          this.massrole.changes = snap.val().changes
        }
        // console.log(snap.val())
      })
    },
    loadSyncStatus () {
      const rdb = this.$fire.database
      const ref = rdb.ref('admin/sync')
      this.autorole.loading = true
      ref.child('changes').on('value', (snapshot) => {
        this.autorole.memberchanges = snapshot.numChildren() || 0
      })
      ref.on('value', (snap) => {
        this.autorole.loading = false
        this.autorole.all = snap.val().all
        this.autorole.done = snap.val().done
        this.autorole.changes = snap.val().changes
        this.autorole.startedAt = snap.val().startedAt
          ? new Date(snap.val().startedAt).toLocaleString()
          : 'Not yet started'
        this.autorole.finishedAt = snap.val().finishedAt
          ? new Date(snap.val().finishedAt).toLocaleString()
          : 'Not yet finished'
        if (snap.val().running === true) {
          this.autorole.status = 'pending'
        } else if (snap.val().error) {
          this.autorole.status = 'error'
        } else {
          this.autorole.status = 'success'
        }
        // console.log(snap.val())
      })
    },
    reserve () {
      this.massrole.loading = true

      setTimeout(() => (this.massrole.loading = false), 2000)
    }
  }
}
</script>
