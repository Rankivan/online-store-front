<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b bg-white">
      <div class="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="font-bold text-xl">online-store-view</NuxtLink>
        <nav class="flex gap-4 text-sm">
          <NuxtLink to="/loja">Loja</NuxtLink>
          <NuxtLink to="/carrinho">Carrinho</NuxtLink>
          <NuxtLink to="/login">Login</NuxtLink>
          <NuxtLink to="/admin">Admin</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 mx-auto w-full max-w-6xl px-4 py-6">
      <slot />
    </main>

    <footer class="border-t bg-white py-4 text-center text-sm text-gray-500">
      online-store-view · vitrine Nuxt
    </footer>
  </div>
</template>
