<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink
    :to="card.to"
    :style="{
      '--card-color': card.color,
      '--card-color-soft': card.colorSoft,
    }"
    class="tw:group tw:relative tw:flex tw:cursor-pointer tw:flex-col tw:gap-0 tw:overflow-hidden tw:rounded-[16px] tw:border tw:border-cm-border-soft tw:bg-cm-card tw:p-[28px_26px_24px] tw:no-underline tw:[box-shadow:var(--cm-shadow)] tw:[transition:transform_.18s_ease,border-color_.18s_ease,box-shadow_.18s_ease] tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:opacity-0 tw:before:content-[''] tw:before:[background:linear-gradient(135deg,var(--card-color-soft,transparent)_0%,transparent_60%)] tw:before:[transition:opacity_.2s_ease] tw:hover:-translate-y-1 tw:hover:[border-color:var(--card-color,var(--cm-accent))] tw:hover:[box-shadow:0_24px_56px_-18px_rgba(0,0,0,0.5)] tw:hover:before:opacity-100"
  >
    <span class="tw:mb-[14px] tw:block tw:text-[32px]">{{ card.icon }}</span>
    <div
      class="tw:mb-1.5 tw:font-cm-mono tw:text-[11px] tw:font-semibold tw:tracking-[0.06em] tw:uppercase tw:[color:var(--card-color,var(--cm-accent))]"
    >
      {{ card.num }}
    </div>
    <h3
      class="tw:m-0 tw:mb-2 tw:font-cm-display tw:text-[21px] tw:font-bold tw:tracking-[-0.01em] tw:text-cm-text"
    >
      {{ card.title }}
    </h3>
    <p
      v-if="card.descriptionHtml"
      class="tw:m-0 tw:mb-[18px] tw:flex-1 tw:text-[13.5px] tw:leading-[1.55] tw:text-cm-dim"
      v-html="card.descriptionHtml"
    />
    <p
      v-else
      class="tw:m-0 tw:mb-[18px] tw:flex-1 tw:text-[13.5px] tw:leading-[1.55] tw:text-cm-dim"
    >
      {{ card.description }}
    </p>
    <div class="tw:mb-5 tw:flex tw:flex-wrap tw:gap-1.5">
      <span
        v-for="tag in card.tags"
        :key="tag"
        class="tw:rounded-[6px] tw:border tw:border-cm-border-soft tw:bg-cm-elev tw:px-2 tw:py-[3px] tw:font-cm-mono tw:text-[11px] tw:text-cm-faint"
      >
        {{ tag }}
      </span>
    </div>
    <span
      class="tw:inline-flex tw:items-center tw:gap-[7px] tw:self-start tw:rounded-[99px] tw:border tw:border-current tw:px-[14px] tw:py-2 tw:font-cm-mono tw:text-[12.5px] tw:font-semibold tw:[color:var(--card-color,var(--cm-accent))] tw:[transition:background_.15s,color_.15s] tw:group-hover:text-cm-bg tw:group-hover:[background:var(--card-color,var(--cm-accent))]"
    >
      Abrir guía →
    </span>
    <div
      v-if="card.bloques"
      class="tw:mt-auto tw:border-t tw:border-cm-border-soft tw:pt-[14px] tw:font-cm-mono tw:text-[10.5px] tw:text-cm-faint"
    >
      {{ card.bloques }}
    </div>
  </RouterLink>
</template>
