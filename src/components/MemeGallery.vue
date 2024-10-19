<script setup lang="ts">
import { Meme } from '../types'

const props = defineProps<{
  memes: Meme[]
}>()

function updateMeme(id: number, action: 'like' | 'dislike') {
  const meme = props.memes.find(m => m.id === id)
  if (meme) {
    if (action === 'like') {
      meme.likes++
    } else {
      meme.dislikes++
    }
  }
}
</script>

<template>
  <div class="meme-gallery">
    <h2>Meme Gallery</h2>
    <div class="meme-grid">
      <div v-for="meme in memes" :key="meme.id" class="meme-card">
        <h3>{{ meme.title }}</h3>
        <img :src="meme.imageUrl" :alt="meme.title">
        <div class="meme-actions">
          <button @click="updateMeme(meme.id, 'like')" class="like-btn">👍 {{ meme.likes }}</button>
          <button @click="updateMeme(meme.id, 'dislike')" class="dislike-btn">👎 {{ meme.dislikes }}</button>
        </div>
      </div>
    </div>
  </div>
</template>