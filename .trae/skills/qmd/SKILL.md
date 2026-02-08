---
name: "qmd"
description: "Local search engine for markdown docs and notes. Invoke when searching for specific information in local documentation, notes, or transcripts using keyword, vector, or hybrid search."
---

# QMD (Query Markup Documents)

QMD is an on-device search engine for markdown notes, documentation, and knowledge bases. It supports fast keyword search (BM25), semantic vector search, and hybrid search with LLM re-ranking.

## Usage Guidelines

Use this skill when the user wants to search across local files or needs information from indexed collections.

### Core Commands

- **Search**: `qmd search "query"` (Keyword search)
- **Vector Search**: `qmd vsearch "query"` (Semantic search)
- **Hybrid Search**: `qmd query "query"` (Best quality, hybrid + re-ranking)
- **Retrieve Content**: `qmd get "path/to/doc.md"` or `qmd get "#docid"`
- **Multi-get**: `qmd multi-get "pattern/*.md"`

### Managing Collections

- **Add Collection**: `qmd collection add <path> --name <name>`
- **Index/Embed**: `qmd embed` (Required for semantic search)
- **Status**: `qmd status`

## Installation (if not found)

If the `qmd` command is not available, suggest installing it via:
```bash
bun install -g https://github.com/tobi/qmd
```
Or if using npm:
```bash
npm install -g https://github.com/tobi/qmd
```

## Tips for Agents

- Use `--json` flag with search commands to get structured output.
- Use `--files` to get a list of relevant file paths.
- Use `--full` with `qmd get` to retrieve the entire document content.
