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
    class="tw:group tw:relative tw:flex tw:cursor-pointer tw:flex-col tw:overflow-hidden tw:rounded-2xl tw:border tw:border-cm-border-soft tw:bg-cm-card tw:backdrop-blur-md tw:p-5 sm:tw:p-6 tw:no-underline tw:shadow-sm tw:transition-all tw:duration-300 tw:hover:-translate-y-1.5 tw:hover:shadow-xl tw:hover:[border-color:var(--card-color)] before:tw:pointer-events-none before:tw:absolute before:tw:inset-0 before:tw:opacity-0 before:tw:transition-opacity before:tw:duration-300 before:tw:[background:radial-gradient(500px_circle_at_top_right,var(--card-color-soft,transparent)_0%,transparent_75%)] tw:hover:before:opacity-100"
  >
    <!-- Top badge bar -->
    <div class="tw:flex tw:items-center tw:justify-between tw:gap-2">
      <!-- Icon with glowing soft accent container -->
      <div
        class="tw:flex tw:h-11 tw:w-11 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-xl tw:border tw:border-cm-border-soft tw:text-[22px] tw:transition-transform tw:duration-300 tw:group-hover:scale-110 tw:[background:var(--card-color-soft)] tw:group-hover:[border-color:var(--card-color)]"
      >
        <span aria-hidden="true">{{ card.icon }}</span>
      </div>

      <!-- Guide Number & Badge -->
      <div class="tw:flex tw:items-center tw:gap-1.5">
        <span
          v-if="card.badge"
          class="tw:rounded-md tw:border tw:border-cm-border-soft tw:bg-cm-elev tw:px-2 tw:py-0.5 tw:font-cm-mono tw:text-[10.5px] tw:font-medium tw:text-cm-faint tw:group-hover:text-cm-dim"
        >
          {{ card.badge }}
        </span>
        <span
          class="tw:rounded-md tw:border tw:border-cm-border-soft tw:bg-cm-elev tw:px-2 tw:py-0.5 tw:font-cm-mono tw:text-[11px] tw:font-semibold tw:tracking-wider tw:text-cm-dim tw:group-hover:[border-color:var(--card-color)] tw:group-hover:text-cm-text tw:transition-colors"
        >
          {{ card.num }}
        </span>
      </div>
    </div>

    <!-- Title & Description -->
    <div class="tw:mt-4 tw:mb-3">
      <div class="tw:mb-1 tw:font-cm-mono tw:text-[11px] tw:font-medium tw:tracking-wider tw:uppercase tw:text-cm-faint tw:group-hover:[color:var(--card-color)] tw:transition-colors">
        {{ card.categoryLabel }}
      </div>
      <h3
        class="tw:m-0 tw:font-cm-display tw:text-[19px] tw:font-bold tw:leading-snug tw:tracking-tight tw:text-cm-text tw:group-hover:[color:var(--card-color)] tw:transition-colors tw:duration-200"
      >
        {{ card.title }}
      </h3>
      <p
        class="tw:mt-2 tw:mb-0 tw:text-[13px] tw:leading-relaxed tw:text-cm-dim tw:line-clamp-2 tw:min-h-[38px]"
      >
        {{ card.description }}
      </p>
    </div>

    <!-- Tags Row -->
    <div class="tw:mb-4 tw:flex tw:flex-wrap tw:gap-1.5">
      <span
        v-for="tag in card.tags"
        :key="tag"
        class="tw:rounded-md tw:border tw:border-cm-border-soft tw:bg-cm-elev/70 tw:px-2 tw:py-0.5 tw:font-cm-mono tw:text-[10.5px] tw:text-cm-faint tw:group-hover:text-cm-dim tw:transition-colors"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Footer Bar -->
    <div
      class="tw:mt-auto tw:flex tw:items-center tw:justify-between tw:gap-2 tw:border-t tw:border-cm-border-soft tw:pt-3.5"
    >
      <div
        v-if="card.bloques"
        class="tw:flex tw:items-center tw:gap-1.5 tw:truncate tw:font-cm-mono tw:text-[11px] tw:text-cm-faint"
      >
        <span
          class="tw:inline-block tw:h-1.5 tw:w-1.5 tw:shrink-0 tw:rounded-full"
          :style="{ backgroundColor: card.color }"
        />
        <span class="tw:truncate">{{ card.bloques }}</span>
      </div>
      <div v-else class="tw:flex-1" />

      <span
        class="tw:inline-flex tw:shrink-0 tw:items-center tw:gap-1 tw:font-cm-mono tw:text-[11.5px] tw:font-semibold tw:[color:var(--card-color)] tw:transition-transform tw:group-hover:translate-x-1"
      >
        Abrir →
      </span>
    </div>
  </RouterLink>
</template>
