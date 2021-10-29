import { getFirestore, doc, getDoc } from '@firebase/firestore'
import { getDatabase, ref, child, onValue } from 'firebase/database'
import Vue from 'vue'
import AdminRoleChangeCard from '../../components/AdminRoleChangeCard.vue'

export default Vue.extend({
  components: { AdminRoleChangeCard },
  data: () => ({
    roles: {},
    db: getFirestore(),
    rdb: getDatabase(),
    massrole: {
      loading: false,
      selection: 1,
      status: 'pending',
      all: 0,
      done: 0,
      startedAt: '0',
      finishedAt: '0',
      changes: {},
      memberchanges: 0,
      showchanges: false,
      color: 'blue',
      startedBy: null,
      progress_color: 'deep-purple',
    },
    autorole: {
      loading: false,
      selection: 1,
      status: 'pending',
      all: 0,
      done: 0,
      startedAt: '0',
      finishedAt: '0',
      changes: {},
      memberchanges: 0,
      color: 'blue',
      progress_color: 'deep-purple',
    },
    testSocket: {},
  }),

  async created () {
    if (process.client) {
      this.loadMassStatus()
      this.loadSyncStatus()
      const ref = doc(this.db, 'waik/discord') // db.collection('waik').doc('discord')
      const resp = await getDoc(ref)
      this.roles = resp.data()?.autoroles
    }
  },
  methods: {
    getMessage () {
      this.$axios.get('/admin/test').then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    loadMassStatus () {
      const dbref = ref(this.rdb, 'admin/massadd')
      this.massrole.loading = true
      onValue(child(dbref, 'changes'), (snapshot) => {
        console.log(snapshot)
        // this.massrole.memberchanges = snapshot.numChildren() || 0
      })
      onValue(dbref, (snap) => {
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
          this.massrole.progress_color = 'deep-purple'
        } else if (snap.val().error) {
          this.massrole.status = 'error'
          this.massrole.progress_color = 'red'
        } else {
          this.massrole.status = 'success'
          this.massrole.progress_color = 'green'
        }

        this.massrole.startedBy = snap.val().startedBy

        if (this.massrole.changes !== snap.val().changes) {
          this.massrole.changes = snap.val().changes
        }
        // console.log(snap.val())
      })
    },
    loadSyncStatus () {
      const dbref = ref(this.rdb, 'admin/sync')
      this.autorole.loading = true
      onValue(child(dbref, 'changes'), (_snapshot) => {
        // this.autorole.memberchanges = snapshot.numChildren() || 0
      })
      onValue(dbref, (snap) => {
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
          this.autorole.progress_color = 'deep-purple'
        } else if (snap.val().error) {
          this.autorole.status = 'error'
          this.autorole.progress_color = 'red'
        } else {
          this.autorole.status = 'success'
          this.autorole.progress_color = 'green'
        }
        // console.log(snap.val())
      })
    },
    reserve () {
      this.massrole.loading = true

      setTimeout(() => (this.massrole.loading = false), 2000)
    },
  },
})
