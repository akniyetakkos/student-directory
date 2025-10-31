<template>
  <div style="display:flex; gap:8px; align-items:center;">
    <input class="input" placeholder="Search by name..." v-model="q" @input="emitSearch" />
    <select class="select" v-model="group" @change="emitSearch"> <!--сох кылад жазган затты--> 
      <option value="">All groups</option>
      <option v-for="g in groups" :key="g" :value="g">{{ g }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: { groups: { type: Array, default: () => [] } },
  data() { return { q: '', group: '' } },
  methods: {
    emitSearch() { this.$emit('search', { q: this.q.trim(), group: this.group }) }
  }
}
</script>
