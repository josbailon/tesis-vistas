<template>
  <div class="flex h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
    <Sidebar />
    <div class="flex-grow overflow-y-auto">
      <main class="p-6">
        <div class="bg-white rounded-xl shadow-lg border border-green-200/50 min-h-full p-6 backdrop-blur-sm">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
</script>
