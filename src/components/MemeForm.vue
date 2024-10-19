<script setup lang="ts">
import { ref } from 'vue'
import { Meme } from '../types'

const emit = defineEmits<{
  (e: 'add-meme', meme: Meme): void
}>()

const title = ref('')
const imageUrl = ref('')
const imageFile = ref<File | null>(null)
const imagePreview = ref('')

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    imageFile.value = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(imageFile.value)
  }
}

function submitMeme() {
  if (!title.value || (!imageUrl.value && !imageFile.value)) {
    alert('Please provide a title and either an image URL or file.')
    return
  }

  const newMeme: Meme = {
    id: Date.now(),
    title: title.value,
    imageUrl: imageFile.value ? URL.createObjectURL(imageFile.value) : imageUrl.value,
    likes: 0,
    dislikes: 0
  }

  emit('add-meme', newMeme)

  title.value = ''
  imageUrl.value = ''
  imageFile.value = null
  imagePreview.value = ''
}
</script>

<template>
  <div class="meme-form">
    <form @submit.prevent="submitMeme">
      <input v-model="title" type="text" placeholder="Meme Title" required>
      <input v-model="imageUrl" type="url" placeholder="Meme Image URL">
      <input type="file" accept="image/*" @change="handleFileChange">
      <button type="submit">Add Meme</button>
    </form>
    <div v-if="imagePreview" class="image-preview">
      <img :src="imagePreview" alt="Preview">
    </div>
  </div>
</template>