import { Meme } from './types'

export function setupMemeGallery(element: HTMLDivElement, memes: Meme[]) {
  function renderMemes() {
    element.innerHTML = `
      <h2>Meme Gallery</h2>
      <div class="meme-grid">
        ${memes.map(meme => `
          <div class="meme-card" data-meme-id="${meme.id}">
            <h3>${meme.title}</h3>
            <img src="${meme.imageUrl}" alt="${meme.title}" style="max-width: 100%; height: auto;" />
            <div class="meme-actions">
              <button class="like-btn">👍 ${meme.likes}</button>
              <button class="dislike-btn">👎 ${meme.dislikes}</button>
            </div>
          </div>
        `).join('')}
      </div>
    `

    // Add event listeners for like and dislike buttons
    element.querySelectorAll('.meme-card').forEach(card => {
      const memeId = parseInt(card.getAttribute('data-meme-id')!, 10)
      const likeBtn = card.querySelector('.like-btn') as HTMLButtonElement
      const dislikeBtn = card.querySelector('.dislike-btn') as HTMLButtonElement

      likeBtn.addEventListener('click', () => updateMeme(memeId, 'like'))
      dislikeBtn.addEventListener('click', () => updateMeme(memeId, 'dislike'))
    })
  }

  function updateMeme(id: number, action: 'like' | 'dislike') {
    const meme = memes.find(m => m.id === id)
    if (meme) {
      if (action === 'like') {
        meme.likes++
      } else {
        meme.dislikes++
      }
      renderMemes()
    }
  }

  renderMemes()

  document.addEventListener('memesUpdated', renderMemes)
}