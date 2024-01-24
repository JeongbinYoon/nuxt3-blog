<template>
  <div class="flex">
    <Sidebar />
    <div class="content-area">
      <Header />

      <slot />
    </div>
  </div>
  <ClientOnly>
    <FloatingButton />
  </ClientOnly>
</template>
