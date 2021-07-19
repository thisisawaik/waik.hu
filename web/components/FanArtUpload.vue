<template>
  <div>
    <v-form v-model="valid">
        <v-container style="max-width: 400px">
          <v-text-field
            v-model="firstname"
            :rules="titleRules"
            :counter="title.maxLength"
            :label="title.default"
            required
          ></v-text-field>

          <v-text-field
            v-model="lastname"
            :rules="descRules"
            :counter="desc.maxLength"
            :label="desc.default"
            required
          ></v-text-field>

          <v-file-input truncate-length="15"></v-file-input>
        </v-container>
    </v-form>
    <v-dialog v-model="rulesDialog" width="500">
      <template #activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template>

      <v-card>
				<v-card-title>{{ rulesLoading ? 'Loading...' : rules.title }}</v-card-title>
        <nuxt-content v-if="!rulesLoading" class="document" :document="rules" />
        <v-card-actions>
					<p class="updated">Frissítve: {{ rulesLoading ? 'Loading...' : formatDate(rules.updatedAt) }}</p>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="rulesDialog = false">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'FanArtUpload',
  data() {
    const title = {
      maxLength: 30,
      default: 'Cím',
    }
    const desc = {
      maxLength: 300,
      default: 'Leírás',
    }
    return {
      rulesDialog: false,
      rulesLoading: true,
			rules: null,
      title,
      desc,
      valid: false,
      firstname: '',
      lastname: '',
      titleRules: [
        (v) => !!v || 'Cím megadása kotelezo',
        (v) =>
          v.length <= title.maxLength ||
          `Nem lehet tobb mint ${title.maxLength} karakter`,
      ],
      descRules: [
        (v) =>
          v.length <= desc.maxLength ||
          `Nem lehet tobb mint ${desc.maxLength} karakter`,
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  async created() {
    const article = await this.$content('rules', 'fanart').fetch()
    console.log(article)
    this.rules = article
    this.rulesLoading = false
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('hu', options)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>