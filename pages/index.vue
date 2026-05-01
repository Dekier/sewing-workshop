<script setup lang="ts">
const title = ref(
  "Pracownia krawiecka - profesjonalne usługi krawieckie poznań - piątkowo"
);
const description = ref(
  "Pracownia Krawiecka Magdaleny Dekier(1993), oferuje profesjonalne przeróbki sukien, spodni, marynarek, koszul oraz naprawy odzieży. Zapraszamy Ul. Jaroczyńskiego 41 Poznań piątkowo"
);
useHead({
  title,
  meta: [
    {
      name: "description",
      content: description,
    },
  ],
});
</script>

<template>
  <div class="Page__main-container">
    <Navbar />
    <Intro />
    <AboutCompany />
    <Offer />
    <client-only>
      <Contact />
    </client-only>
  </div>
</template>

<style lang="scss">
@import "index";
</style>
