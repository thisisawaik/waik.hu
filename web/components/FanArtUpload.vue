<template>
  <div>
    <v-form v-model="valid">
      <v-coll align="end" md="2">
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
      </v-coll>
      <v-coll md="2"> </v-coll>
    </v-form>
    <v-dialog v-model="rulesDialog" width="500">
      <template #activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template>

      <v-card>
				<v-card-title>{{ rule.title }}</v-card-title>
        <nuxt-content v-if="!rulesLoading" class="document" :document="rule" />
        <v-card-actions>
					<p class="updated">Frissítve: {{ formatDate(rule.updatedAt) }}</p>
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
			rule: this.$store.state.fanartRules,
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
}
</script>

<style lang="scss" scoped>
</style>