<template>
  <section class="max-w-md">
    <h1 class="text-3xl font-bold mb-4">Login</h1>
    <p class="text-sm text-gray-600 mb-4">
      Use o usuário do seed:
      <span class="font-mono">admin@demo.local</span> /
      <span class="font-mono">password</span>
    </p>
    <form class="space-y-3" @submit.prevent="onSubmit">
      <input
        v-model="email"
        class="w-full rounded border px-3 py-2"
        type="email"
        name="email"
        autocomplete="email"
        placeholder="Email"
        required
      />
      <input
        v-model="password"
        class="w-full rounded border px-3 py-2"
        type="password"
        name="password"
        autocomplete="current-password"
        placeholder="Senha"
        required
      />
      <p v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</p>
      <button
        type="submit"
        class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition disabled:opacity-50"
        :disabled="pending"
      >
        {{ pending ? 'Entrando…' : 'Entrar' }}
      </button>
    </form>
    <p v-if="successMsg" class="mt-4 text-sm text-emerald-700">{{ successMsg }}</p>
  </section>
</template>

<script setup lang="ts">
const email = ref('admin@demo.local')
const password = ref('password')
const pending = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const { login } = useAuth()

async function onSubmit() {
  errorMsg.value = ''
  successMsg.value = ''
  pending.value = true
  try {
    await login(email.value, password.value)
    successMsg.value = 'Login ok. Redirecionando…'
    await navigateTo('/loja')
  } catch (e: unknown) {
    const err = e as { data?: { message?: string; errors?: { email?: string[] } } }
    const msg =
      err?.data?.errors?.email?.[0] ||
      err?.data?.message ||
      'Não foi possível entrar. Verifique email, senha e se o backend está no ar.'
    errorMsg.value = msg
  } finally {
    pending.value = false
  }
}
</script>
