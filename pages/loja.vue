<template>
  <section>
    <h1 class="text-3xl font-bold mb-2">Loja</h1>
    <p class="text-gray-600 mb-6">
      Produtos do tenant
      <span class="font-mono text-sm bg-gray-100 px-1 rounded">{{ tenantSlug }}</span>
      (via API).
    </p>

    <p v-if="pending" class="text-gray-500">Carregando catálogo…</p>
    <p v-else-if="error" class="text-red-600">{{ error }}</p>

    <ul v-else class="space-y-3">
      <li
        v-for="product in products"
        :key="product.id"
        class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      >
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="text-lg font-semibold text-gray-900">{{ product.name }}</h2>
          <span class="text-base font-medium text-emerald-700">
            {{ formatPrice(product.price) }}
          </span>
        </div>
        <p v-if="product.description" class="mt-1 text-sm text-gray-600">
          {{ product.description }}
        </p>
        <p class="mt-2 text-xs text-gray-500">
          Estoque: {{ product.stock }} · slug: {{ product.slug }}
        </p>
      </li>
    </ul>

    <p v-if="!pending && !error && products.length === 0" class="text-gray-500">
      Nenhum produto. Rode no backend:
      <code class="rounded bg-gray-100 px-1 text-sm">php artisan migrate --force && php artisan db:seed</code>
    </p>
  </section>
</template>

<script setup lang="ts">
type CatalogProduct = {
  id: number
  name: string
  slug: string
  description: string | null
  price: string | number
  stock: number
}

const config = useRuntimeConfig()
const tenantSlug = computed(() => String(config.public.tenantSlug))

const products = ref<CatalogProduct[]>([])
const pending = ref(true)
const error = ref<string | null>(null)
const { get } = useApi()

function formatPrice(value: string | number): string {
  const n = typeof value === 'string' ? Number.parseFloat(value) : value
  if (Number.isNaN(n)) return String(value)
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

onMounted(async () => {
  pending.value = true
  error.value = null
  try {
    const result = await get('/products') as { data?: CatalogProduct[]; message?: string }
    products.value = Array.isArray(result?.data) ? result.data : []
    if (products.value.length === 0 && result?.message) {
      error.value = result.message
    }
  } catch (e: unknown) {
    const msg = e && typeof e === 'object' && 'data' in e && e.data && typeof e.data === 'object' && 'message' in e.data
      ? String((e.data as { message: unknown }).message)
      : 'Não foi possível carregar o catálogo. Verifique se o backend está no ar e se as migrations/seed foram executadas.'
    error.value = msg
    products.value = []
  } finally {
    pending.value = false
  }
})
</script>
