<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep image URL mapping centralized in `src/lib/project-assets.ts`, with deployable media committed under `public/assets`, so every host serves identical artwork.
- Keep cinematic motion CSS-first with reduced-motion fallbacks, so the portfolio stays lightweight and accessible.
