<template>
  <div>
    <Header />
    <div class="flex justify-c">
      <Sidebar />
      <div class="content-container">
        <slot />
      </div>
    </div>
  </div>
</template>
