<script setup>
defineProps({
  node: { type: Object, required: true },
  expandedNodes: { type: Object, required: true },
  selectedId: { type: String, default: null }
})

const emit = defineEmits(['toggle', 'select'])
</script>

<template>
  <div class="flex flex-col items-center">
    <!-- Node card -->
    <div
      class="relative flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md min-w-48"
      :class="[
        selectedId === node.id
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-950 shadow-md'
          : 'border-(--ui-border) bg-(--ui-bg)'
      ]"
      @click="emit('select', node)"
    >
      <UAvatar :alt="node.name" size="sm" />
      <div class="min-w-0">
        <p class="text-sm font-semibold text-(--ui-text-highlighted) truncate">{{ node.name }}</p>
        <p class="text-xs text-(--ui-text-muted) truncate">{{ node.role }}</p>
      </div>
      <UButton
        v-if="node.children?.length"
        :icon="expandedNodes.has(node.id) ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
        variant="ghost"
        color="neutral"
        size="2xs"
        class="ml-auto shrink-0"
        @click.stop="emit('toggle', node.id)"
      />
    </div>

    <!-- Connector line down -->
    <div
      v-if="node.children?.length && expandedNodes.has(node.id)"
      class="w-px h-6 bg-(--ui-border)"
    />

    <!-- Children container -->
    <div
      v-if="node.children?.length && expandedNodes.has(node.id)"
      class="flex items-start gap-8 relative"
    >
      <!-- Horizontal connector -->
      <div
        v-if="node.children.length > 1"
        class="absolute top-0 h-px bg-(--ui-border)"
        :style="{
          left: `calc(50% / ${node.children.length})`,
          right: `calc(50% / ${node.children.length})`,
        }"
      />

      <div
        v-for="child in node.children"
        :key="child.id"
        class="flex flex-col items-center"
      >
        <!-- Vertical connector from horizontal line -->
        <div class="w-px h-6 bg-(--ui-border)" />

        <!-- Recursive child -->
        <OrgChartNode
          :node="child"
          :expanded-nodes="expandedNodes"
          :selected-id="selectedId"
          @toggle="emit('toggle', $event)"
          @select="emit('select', $event)"
        />
      </div>
    </div>
  </div>
</template>
