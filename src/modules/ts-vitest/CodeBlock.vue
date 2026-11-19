<script setup>
import { computed } from 'vue'

const props = defineProps({
  code: { type: String, required: true },
  lang: { type: String, default: 'typescript' },
})

const emit = defineEmits(['copy'])

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const highlightedHtml = computed(() => {
  const escaped = escapeHtml(props.code)
  if (props.lang === 'text' || props.lang === 'bash') {
    return escaped
  }

  // Tokenizador de una sola pasada idéntico al del manual original
  const tokenRegex =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(import|export|from|type|interface|const|let|var|function|return|if|else|switch|case|default|for|of|in|while|try|catch|throw|new|class|constructor|private|public|readonly|async|await|extends|implements|satisfies|asserts|is|typeof|keyof|infer|as|void|never|unknown|any|boolean|string|number|true|false|null|undefined)\b|\b(describe|it|expect|vi|beforeEach|afterEach|Promise|Date|Error|Record|Partial|Omit|Pick|Readonly|Math|console|Map)\b|\b(\d+(?:\.\d+)?)\b/g

  return escaped.replace(tokenRegex, (match, comment, str, kw, builtin, num) => {
    if (comment) return `<span class="tok-comment">${comment}</span>`
    if (str) return `<span class="tok-string">${str}</span>`
    if (kw) return `<span class="tok-keyword">${kw}</span>`
    if (builtin) return `<span class="tok-type">${builtin}</span>`
    if (num) return `<span class="tok-number">${num}</span>`
    return match
  })
})
</script>

<template>
  <div class="tw:group tw:relative" :data-lang="lang">
    <pre
      class="tw:overflow-x-auto tw:rounded-xl tw:border tw:border-slate-800 tw:bg-slate-950 tw:p-4 tw:pr-20 tw:font-cm-mono tw:text-xs tw:leading-relaxed tw:text-slate-100 tw:sm:text-[13px]"
    ><code v-html="highlightedHtml" /></pre>
    <button
      type="button"
      class="tw:absolute tw:top-2.5 tw:right-2.5 tw:cursor-pointer tw:rounded-lg tw:border tw:border-slate-700 tw:bg-slate-800/90 tw:px-2.5 tw:py-1.5 tw:font-sans tw:text-[11px] tw:font-semibold tw:text-slate-200 tw:opacity-90 tw:transition tw:hover:bg-indigo-600 tw:hover:text-white tw:focus:opacity-100 tw:sm:opacity-0 tw:sm:group-hover:opacity-100"
      @click="emit('copy', code)"
    >
      Copiar
    </button>
  </div>
</template>
