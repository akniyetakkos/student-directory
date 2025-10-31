<template>
  <div class="card">
    <img :src="student.avatar || defaultAvatar" alt="avatar" class="avatar" />
    <div class="card-body">
      <p class="card-title">{{ student.name }}</p>
      <p class="card-sub">Group: {{ student.group }} · Age: {{ student.age }}</p>
      <p class="card-sub">{{ student.email }}</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:10px;">
      <button class="btn btn-primary" @click="$emit('edit', student)">Edit</button>
      <button class="btn btn-danger" @click="$emit('delete', student)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: { student: { type: Object, required: true } },
  data() {
    return { defaultAvatar: 'https://i.pravatar.cc/150?img=12' }
  }
}
</script>
