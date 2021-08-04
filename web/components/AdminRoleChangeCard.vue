
<template>
  <div>
    <span><v-avatar style="margin-right: 5px;"><img :src="avatarURL"></v-avatar> {{ name }}</span>
    <div :v-if="added_roles && added_roles.length > 0">
      <p>Added Roles:</p>
      <div v-for="role in added_roles" :key="role">
        <p :style="`color: ${roles[role].color}`">
          {{ roles[role].name }}
        </p>
      </div>
    </div>
    <div :v-if="removed_roles && removed_roles.length > 0">
      <p>Removed Roles:</p>
      <div v-for="role in removed_roles" :key="role">
        <p :style="`color: ${roles[role].color}`">
          {{ roles[role].name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/prop-name-casing */
export default {
  props: ['added_roles', 'removed_roles', 'id', 'roles'],
  data () {
    return {
      avatarURL: 'https://vue-tenant.github.io/images/default-avatar.png',
      name: 'Loading...',
    };
  },
  async created () {
    const db = this.$fire.firestore;
    const userref = db.doc('dcusers/' + this.id);
    const userdoc = await userref.get();

    this.name = userdoc.data().tag;
    this.avatarURL = userdoc.data().pp;
  },
};
</script>
