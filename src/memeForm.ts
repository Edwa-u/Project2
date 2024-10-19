import { Meme } from './types'

export function setupMemeForm(element: HTMLDivElement, memes: Meme[]) {
  element.innerHTML = `
    <form id="meme-form">
      <input type="text" id="meme-title" placeholder="Meme Title" required>
      <input type="url" id="meme-url" placeholder="Meme Image URL">
      <input type="file" id="meme-file" accept="image/*">
      <button type="submit">Add Meme</button>
    </form>
    <div id="image-preview"></div>
  `

  const form = document.querySelector<HTMLFormElement>('#meme-form')!
  const titleInput = document.querySelector<HTMLInputElement>('#meme-title')!
  const urlInput = document.querySelector<HTMLInputElement>('#meme-url')!
  const fileInput = document.querySelector<HTMLInputElement>('#meme-file')!
  const imagePreview = document.querySelector<HTMLDivElement>('#image-preview')!

  fileInput.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.innerHTML = `<img src="${e.target?.result}" alt="Preview">`
      }
      reader.readAsDataURL(file)
    }
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    let imageUrl: string

    if (fileInput.files && fileInput.files[0]) {
      imageUrl = URL.createObjectURL(fileInput.files[0])
    } else if (urlInput.value) {
      imageUrl = urlInput.value
    } else {
      alert('Please provide either an image URL or upload a file.')
      return
    }

    const newMeme: Meme = {
      id: Date.now(),
      title: titleInput.value,
      imageUrl: imageUrl,
      likes: 0,
      dislikes: 0
    }
    memes.push(newMeme)
    titleInput.value = ''
    urlInput.value = ''
    fileInput.value = ''
    imagePreview.innerHTML = ''
    document.dispatchEvent(new CustomEvent('memesUpdated'))
  })
}