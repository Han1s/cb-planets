## Links
- url: https://cb-planets.vercel.app/
- repo: https://github.com/Han1s/cb-planets

## Used technologies:
- Daisyui
- Nextjs
- TS
- TailwindCSS

## Problematic places
- The api does not support pagination so the pagination is static. I found a dev api that does support pagination, but it does not make sense to store the data in the context when paginating, so I left it static. In case of implementing a proper pagination, I would probably not store the state in the context, but just fetch it SSR on request with server params.
- The errors should be more or less handled (Error.tsx handling the Rendering errors, not-found handling the wrong page, and manual catch of the api call), but especially with the api call, there probably might be a better way of handling this.

## Ideas to improve
- modal could show details of movies and residents
- UI is very minimalistic