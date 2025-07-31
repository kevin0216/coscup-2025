<script setup lang="ts">
interface Props {
  placeholder?: string
  state?: 'default' | 'error'
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
  state: 'default',
})

const model = defineModel<string>({ default: '' })
</script>

<template>
  <div
    class="text-field"
    :class="`text-field-${state}`"
  >
    <slot name="prefix-icon">
      <IconPhMagnifyingGlass class="text-field-icon" />
    </slot>

    <input
      v-model="model"
      class="text-field-input"
      :placeholder="placeholder"
    >

    <slot name="suffix-icon">
      <IconPhX
        v-if="model"
        class="text-field-icon suffix-icon"
        @click="model = ''"
      />
    </slot>
  </div>
</template>

<style scoped>
.text-field {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 8px;
  gap: 4px;
  width: 100%;
  background-color: var(--color-white);
  border-radius: 6px;
  border: 1px solid var(--color-gray-300);
  transition:
    color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

  &:focus-within {
    border-color: var(--color-gray-600);

    .text-field-input {
      color: var(--color-gray-700);
    }
  }

  .text-field-input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: var(--text-sm);
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.03em;
    color: var(--color-gray-400);

    &::placeholder {
      color: var(--color-gray-400);
    }
  }

  .text-field-icon {
    flex-shrink: 0;
    color: var(--color-gray-400);

    &.suffix-icon {
      cursor: pointer;
      transition: color 0.2s ease-in-out;

      &:hover {
        color: var(--color-gray-700);
      }
    }
  }
}

.text-field-error {
  border-color: var(--color-red-400);

  &:focus-within {
    border-color: var(--color-red-400);

    .text-field-input {
      color: var(--color-gray-600);

      &::placeholder {
        color: var(--color-gray-600);
      }
    }
  }

  .text-field-input {
    color: var(--color-gray-600);

    &::placeholder {
      color: var(--color-gray-600);
    }
  }
}

.text-field-default {
  border-color: var(--color-gray-300);

  .text-field-input {
    color: var(--color-gray-400);

    &::placeholder {
      color: var(--color-gray-400);
    }
  }
}
</style>
