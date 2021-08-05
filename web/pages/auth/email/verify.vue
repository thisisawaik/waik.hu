<i18n lang="yaml">
hu:
  verification_in_progress: "Hitelesítés folyamatban! Kérem várjon!"
en:
  verification_in_progress: "Verification in progress! Please wait!"
</i18n>

<template>
  <div class="background">
    <div class="split left">
      <div class="centered">
        <v-card :loading="loading" width="500">
          <template slot="progress">
            <v-progress-linear
              color="primary"
              height="10"
              indeterminate
            />
          </template>
          <v-card-title class="text-h5 lighten-2">
            {{ $t('verification_in_progress') }}
          </v-card-title>

          <v-divider />
          <v-card-text v-if="error" style="color: var(--red);">
            Hiba történt: {{ error }}. Próbálja újra később! Ha a probléma továbbra is fent áll, keresse fel zal1000#0497-t discordon!
          </v-card-text>
          <v-card-text v-else-if="state === 'started' || state === 'in_progress'">
            Link hitelesítése...
          </v-card-text>
          <v-card-text v-else style="color: var(--green);">
            <p>Sikeres hitelesítés! Átirányítás...</p>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      error: null,
      state: 'started',
    }
  },
  // eslint-disable-next-line require-await
  async created () {
    setTimeout(() => {
      this.state = 'success'
      this.$store.commit('setAuthEmailStatus', this.state)
      this.$router.push('/auth')
    }, 5000)
  },
}
</script>

<style lang="scss" scoped>
.background {
  background-image: url(https://media.discordapp.net/attachments/603942574054440961/855965324637110292/1.png?width=1193&height=671);
  background-position: center;
  background-size: cover;
  height: calc(100vh - 100px);
}

.split {
  height: calc(100vh - 100px);
  width: 50%;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  padding-top: 20px;
}

/* Control the left side */
.left {
  left: 0;
}

/* Control the right side */
.right {
  right: 0;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
