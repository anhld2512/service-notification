<template>
  <div id="job-speed" class="w-full overflow-hidden flex-row min-h-screen relative">
    <header class="fixed top-0 z-50 w-full">
      <div class="navbar bg-base-100">
          <div class="flex-1">
            <a class="btn btn-ghost text-xl">Service Notifications</a>
          </div>
          <div class="flex-none gap-1">
            <HeaderMode />
          </div>
      </div>
    </header>
    <main>
      <div class="container-auto overflow-hidden mt-20 max-w-7xl mx-auto p-3">
        <slot />
      </div>
    </main>
    <footer class="flex-grow-1 footer p-5 mb-10 bg-base-100 text-base-content flex-row text-base-content">
      <FooterLayout></FooterLayout>
    </footer>
  </div>
</template>

<script setup>
const { $api ,$modelAPI, $_ } = useNuxtApp();
const router = useRouter();
const showScrollButton = ref(false);
const toastRef = ref(null);
const showToast = ref(false);
const currentToastType = ref('');
const toastMessage = ref('')
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 200;
};
const valid = (value) =>{
  if(value){
    triggerToast('success','Information is updated')
    window.location.reload();
  }
}
const triggerToast = (type, message) => {
  currentToastType.value = type;
  toastMessage.value = message;
  showToast.value = true;
  if (toastRef.value) {
    toastRef.value.show();
  }
};
const getProfileById = async (userId) => {
  try {
    const response = await $api.get(`/profiles/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};
onMounted(() => {
  nextTick().then(() => {
    setTimeout(async () => {
      window.addEventListener('scroll', handleScroll);
    }, 1);
  });
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
/* global.css */
html,
body,
#__nuxt,
#job-speeds {
  margin: 0;
  padding: 0;
}
</style>
