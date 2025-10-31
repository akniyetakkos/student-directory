<template>
  <form @submit.prevent="onSubmit">
    <div class="form-row">
      <input v-model="form.name" class="input" placeholder="Имя" />
      <input v-model.number="form.age" class="input" placeholder="Возраст" type="number" />
    </div>

    <div class="form-row">
      <input v-model="form.group" class="input" placeholder="Группа" />
      <input v-model="form.email" class="input" placeholder="Email" />
    </div>

    <div class="form-row">
      <input v-model="form.avatar" class="input" placeholder="Avatar URL" />
    </div>

    <div v-if="errors.length">
      <p v-for="(e, i) in errors" :key="i" class="error">{{ e }}</p>
    </div>

    <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:8px;">
      <button type="button" class="btn btn-ghost" @click="$emit('cancel')">Cancel</button>
      <button class="btn btn-primary" type="submit">{{ submitLabel }}</button>
    </div>
  </form>
</template>

<script>
import { isEmail } from '../utils/validators.js'

export default {
  props: {
    initial: { type: Object, default: () => ({ name:'', age:null, group:'', email:'', avatar:'' }) },
    submitLabel: { type: String, default: 'Save' }
  },
  data() {
    return { form: { ...this.initial }, errors: [] }
  },
  watch: {
    initial(newVal) { this.form = { ...newVal } }
  },
  methods: {
    validate() {
      this.errors = []
      if (!this.form.name) this.errors.push('The name is required')
      if (!this.form.email || !isEmail(this.form.email)) this.errors.push('Write a valid email address')
      if (!this.form.age || isNaN(Number(this.form.age))) this.errors.push('Age should be a number.')
      return this.errors.length === 0
    },
    onSubmit() {
      if (!this.validate()) return
      this.$emit('submit', { ...this.form })
    }
  }
}
</script>
