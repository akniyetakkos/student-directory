<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <slot />   <!-- это место для вставки содержимого -->
      <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:12px;">
        <button class="btn btn-ghost" @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close'],
  methods: {
    close() { this.$emit('close') }
  }
}
</script>
