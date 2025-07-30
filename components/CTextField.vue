<script setup lang="ts">
interface Props {
  showPrefixIcon?: boolean
  showSuffixIcon?: boolean
  placeholder?: string
  state?: 'default' | 'error'
}

interface Emits {
  (e: 'focus'): void
  (e: 'blur'): void
}

withDefaults(defineProps<Props>(), {
  showPrefixIcon: true,
  showSuffixIcon: true,
  placeholder: 'Search event',
  state: 'default',
})

const emit = defineEmits<Emits>()

const model = defineModel<string>({ default: '' })

function handleFocus() {
  emit('focus')
}

function handleBlur() {
  emit('blur')
}
</script>

<template>
  <div
    class="text-field"
    :class="`text-field-${state}`"
  >
    <div class="text-field-container">
      <div class="text-field-input-wrapper">
        <div
          v-if="showPrefixIcon"
          class="text-field-icon text-field-prefix-icon"
        >
          <IconPhMagnifyingGlass />
        </div>

        <input
          v-model="model"
          class="text-field-input"
          :placeholder="placeholder"
          @blur="handleBlur"
          @focus="handleFocus"
        >

        <div
          v-if="showSuffixIcon"
          class="text-field-icon text-field-suffix-icon"
        >
          <IconPhX />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  .text-field-container {
    position: relative;
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

        &::placeholder {
          color: var(--color-gray-700);
        }
      }
    }
  }

  .text-field-input-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px 8px;
    gap: 4px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: var(--color-gray-400);
  }
}

.text-field-error {
  .text-field-container {
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
  }

  .text-field-input {
    color: var(--color-gray-600);

    &::placeholder {
      color: var(--color-gray-600);
    }
  }
}

.text-field-default {
  .text-field-container {
    border-color: var(--color-gray-300);
  }

  .text-field-input {
    color: var(--color-gray-400);

    &::placeholder {
      color: var(--color-gray-400);
    }
  }
}
</style>
