# Theme Sync Without GitHub — Team Guide

How to work on stores with Theme Sync, using the platform's revision history and dated backup snapshots instead of Git and GitHub.

> **TL;DR for every job**
>
> 1. Start Theme Sync and click **Sync Locally** so your folder matches the live theme.
> 2. **Make a "before" snapshot**: zip the theme folder into the team backup folder, named with the date and the job.
> 3. Edit in the synced folder. Every save goes live.
> 4. When the job is approved, **make an "after" snapshot**.
> 5. To undo, use the admin's revision history for small fixes. Restore from a snapshot if the theme or store was deleted.

---

## 1. Why we still need backups without GitHub

The platform keeps a revision history for every file (Design > Code Files). For day-to-day undo, that's enough. But that history lives **inside the theme, inside the store**:

| If a client deletes... | Revision history |
|---|---|
| One file | That file's history is gone. |
| A theme | Every file's history in that theme is gone. |
| The store | Everything is gone. |

Theme Sync doesn't protect us either. It only mirrors one live theme, and the local folder is overwritten by the next **Sync Locally** and changed by every save.

So without GitHub, we keep our own copies: **dated snapshots (zip files) stored outside the platform**, where clients can't delete them.

---

## 2. Folder setup (one time)

Keep working folders and backups apart:

```text
D:\Company-Stores\                     ← working folders (Theme Sync)
├── ts.exe
├── 16372 - Plasmidsaurus Pack Perks\
│   └── 36026-merch-loyalty-program\
│       ├── assets\  config\  layout\  snippets\  templates\
└── ...

[Team backup folder]\                   ← snapshots only, never edited
├── 16372 - Plasmidsaurus Pack Perks\
│   ├── 2026-10-06_1015_before_address-book.zip
│   └── 2026-10-08_1630_after_address-book.zip
└── ...
```

- **Put the team backup folder on a shared drive** (Google Drive, OneDrive or a team network share) so a snapshot survives a lost laptop and teammates can use it. If that isn't possible yet, use `D:\Company-Stores-Backups\` and copy it to the shared drive regularly.
- **Never keep backups inside `D:\Company-Stores\`.** A copy folder next to the live theme gets edited by mistake, and searches and AI assistants find duplicate files.
- **Use zip files, not copied folders.** A zip can't be edited by accident and is clearly a backup.
- **Snapshot names:** `YYYY-MM-DD_HHMM_before|after_[short-task].zip`

Installation, the Theme Sync commands and troubleshooting are the same as in the main guide (*Theme Sync + Git — Team Guide*, sections 2, 12 and 13).

---

## 3. Starting work on a store

The steps are the same for a new store and for one you've worked on before.

### Step 1: Sync the live theme down

```powershell
cd D:\Company-Stores
.\ts serve --dir "16372 - Plasmidsaurus Pack Perks"
```

Leave this terminal open. Then, in the store admin:

1. Go to **Design > Store Design**.
2. Click **Allow** on the browser popup. Tick "Remember my choice".
3. On the theme thumbnail, open the date/time dropdown and click **Sync Locally**.

> **Always sync first, even for a store you already have.** Clients and teammates may have edited the theme in the admin since your last sync, and **Sync Locally** is the only way those changes reach your folder. If you skip it and save an old local file, you overwrite their live change.

### Step 2: Make the "before" snapshot

Run this in a second terminal. Change the three values at the top.

```powershell
$store  = "16372 - Plasmidsaurus Pack Perks"
$theme  = "36026-merch-loyalty-program"
$task   = "address-book"
$backup = "D:\Company-Stores-Backups"       # or your shared drive folder

$dest = Join-Path $backup $store
New-Item -ItemType Directory -Force $dest | Out-Null
$stamp = Get-Date -Format "yyyy-MM-dd_HHmm"
Compress-Archive -Path "D:\Company-Stores\$store\$theme\*" -DestinationPath "$dest\${stamp}_before_$task.zip"
```

Open the backup folder and confirm the zip is there before you edit anything.

### Step 3: Work

Open the theme folder in VS Code. **Every save goes live immediately.** Check the storefront after each meaningful save.

> **Take an extra snapshot before risky changes,** such as large redesigns, bulk edits or `config/settings.html` changes. Use the same command with a task name like `before_header-rebuild`.

---

## 4. Finishing the job

When the work is done, tested and approved:

1. Run **Sync Locally** once more in case anything changed in the admin while you worked.
2. Make the "after" snapshot. It's the same command with `after` in the file name:

   ```powershell
   Compress-Archive -Path "D:\Company-Stores\$store\$theme\*" -DestinationPath "$dest\$(Get-Date -Format 'yyyy-MM-dd_HHmm')_after_$task.zip"
   ```

3. Stop Theme Sync (Ctrl+C in its terminal) when you're done with the store.

The "after" snapshot becomes the starting point if this store ever needs to be rebuilt.

---

## 5. Undo and recovery

Pick the lightest option that works.

| Situation | What to do |
|---|---|
| Undo a recent change to one file | Admin: **Design > Code Files**, open the file, restore an earlier revision. Then **Sync Locally**, or your next local save will overwrite it. |
| Undo your own unsaved edits | In VS Code, close the file without saving, or press Ctrl+Z. |
| A client **deleted a file** | Open the newest snapshot zip, copy that file into the matching folder in the synced theme, and save it. Theme Sync uploads it. |
| A client **deleted the theme** | Create or choose a theme in the admin, **Sync Locally** it into a new folder, then copy the newest snapshot's folders over it and save. Check the theme in the admin, then make it live. |
| The **store was deleted** | The store has to be recreated by the platform team first. Then restore the theme as in the row above. |
| Need to see what changed between two dates | Unzip two snapshots to a temporary folder outside `D:\Company-Stores\` and compare them in VS Code: select both files and right-click **Compare Selected**. |

> After any restore, check the storefront. Then confirm in **Design > Code Files** that the restored files arrived, especially if you copied many files at once.

---

## 6. Safety checklist

Before starting work on any store:

- [ ] Did I click **Sync Locally** first, so my folder matches what's live?
- [ ] Is my "before" snapshot in the backup folder?
- [ ] Is Theme Sync connected to the store I *think* it is? Check the `ts` terminal and run `.\ts status`.
- [ ] Is anyone else working on this theme right now? Theme Sync gives no warning about this, so check with the team.

Before finishing:

- [ ] Did I make the "after" snapshot?
- [ ] Is the backup folder copied to the shared drive?

---

## 7. Using Claude (or another AI assistant)

Open VS Code on `D:\Company-Stores` so the assistant can see the theme files and the docs in `_docs/themes`.

**Before snapshot:**

> Make a "before" snapshot of `[16372 - Plasmidsaurus Pack Perks/36026-merch-loyalty-program]` for the task `[address-book]`. Zip it to `[D:\Company-Stores-Backups]\[store folder]` with today's date and time in the name, then confirm the zip exists. Don't change any theme files.

**Make a change:**

> In theme folder `[16372 - Plasmidsaurus Pack Perks/36026-merch-loyalty-program]`: `[describe the change]`. Read the page doc in `_docs/themes` first. Theme Sync is connected, so tell me which files you'll change before you edit.

**Restore a deleted file:**

> A client deleted `[snippets/header.liquid]`. Find the newest snapshot in `[backup folder]\[store folder]` that contains it, show me its contents, and once I confirm, put it back in the synced theme folder.

**Compare two snapshots:**

> Compare `[snapshot A]` and `[snapshot B]` in `[backup folder]\[store folder]` and list which files changed and what changed in them. Unzip them outside `D:\Company-Stores`.

**After snapshot:**

> The `[address-book]` job is approved. Make the "after" snapshot of `[theme folder]` and confirm it exists.

---

## 8. GitHub vs. no GitHub, for the team decision

| | Platform history only | **This guide** (snapshots) | Git + GitHub (main guide) |
|---|---|---|---|
| Undo a recent change | ✔ | ✔ (via platform) | ✔ |
| Survives a client deleting a file | ✘ | ✔ up to the last snapshot | ✔ up to the last commit |
| Survives a deleted theme or store | ✘ | ✔ up to the last snapshot | ✔ up to the last commit |
| Survives a lost laptop | n/a | ✔ only if on a shared drive | ✔ (GitHub) |
| See exactly what changed, and when | Per file, in the admin | Compare two zips by hand | ✔ Full history, every line |
| Recovery granularity | Every save | Only when someone took a snapshot | Every commit |
| Daily effort | None | Two snapshots per job | Commits and branches per job |
| Learning curve | None | Low | Medium |
| Main risk | History lost with the theme | Someone forgets a snapshot | Switching branches by mistake changes the live store |

**In short:** without GitHub, the team stays protected against deletions *as long as snapshots are taken and kept on a shared drive*. GitHub does the same job with commits instead of zips: it's still a manual step, but it's always off-site and gives a full, searchable change history. The cost is learning Git and being careful when switching branches.

---

*Documentation version: October 2026.*
