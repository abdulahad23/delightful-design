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

## LedgerDesk architecture
- Keep the uploaded bookkeeping UI on TanStack file routes with a shared workspace shell, because each screen needs direct navigation.
- Keep the redesign frontend-only with in-memory sample data until the original service is connected; never represent preview changes as database persistence.
- Define visual styles and semantic colors centrally in src/styles.css and use the shared LedgerDesk Button for controls, so screens remain consistent across sizes.
