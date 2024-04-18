# Blocknote.js Editor

Actually here I'm working on a project for block editor and it's renderer. And there is a challenge on the project which is my main focus. And I will use this editor and renderer in my future project 'fikr', a feature rich blog website with better SEO on Next.js@14

## Challenges

- block editor is a client component which is okey. Because it doesn't need to render on server. It doesn't need SEO.
- This editor output JSON or javascript Object. And this block editor doesn't have specific renderer.
- There is one solution. We can use the editor it self in readonly mode. It will do the work properly for a raw react project or a client side rendering. But it can't achieve SEO. Which is very important for a blog content. So this solution is not proper.
- So I need to create the renderer from scratch. Here is the main challenge.
- Another challenge on the client side editor. I need some necessary blocks for my editor which is missing on the raw editor. So I need to create those thing on my own. I went throughly through their documentation. Maintaining all schemas properly with typescript its a bit challenging. But the good thing is Im getting on it gradually. Here documentation is the key. There is no video tutorial out There for me. Its completely on my own.
- Working on a video component by which i can embed any video on my editor. Then also need to work on the renderer for the video render.

### Notes:

- This is in very early stage.
- File structure aren't in proper frame
- Theme isn't configured properly
- Not ready for third-party use

If you wanna use this on your project then just keep an eye one the repo. I will keep updating the repository Insha Allah.

### Links:

- [Blocknote.js - Editor](https://www.blocknotejs.org/)
- [Live Site - Not Ready Yet](https://fikr-editor-renderer.vercel.app/)
