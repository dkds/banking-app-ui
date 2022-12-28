

<template>
  <MDBNavbar expand="lg" light bg="light" container>
    <MDBNavbarBrand href="/">ABC Bank</MDBNavbarBrand>
    <MDBNavbarToggler @click="collapse1 = !collapse1" target="#navbarSupportedContent"></MDBNavbarToggler>
    <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
      <MDBNavbarNav class="mb-2 mb-lg-0">

        <router-link to="/customers" custom v-slot="{ href, isActive }">
          <MDBNavbarItem :active="isActive" :href="href">
            Customers
          </MDBNavbarItem>
        </router-link>

        <router-link to="/accounts" custom v-slot="{ href, isActive }">
          <MDBNavbarItem :active="isActive" :href="href">
            Accounts
          </MDBNavbarItem>
        </router-link>

        <router-link to="/transactions" custom v-slot="{ href, isActive }">
          <MDBNavbarItem :active="isActive" :href="href">
            Transactions
          </MDBNavbarItem>
        </router-link>

      </MDBNavbarNav>

    </MDBCollapse>
  </MDBNavbar>
  <main>
    <MDBContainer class="mt-4">
      <RouterView />
    </MDBContainer>
  </main>
</template>

<script setup >
import {
  MDBCollapse, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarNav, MDBNavbarToggler, MDBContainer
} from 'mdb-vue-ui-kit';
import { ref } from 'vue';

const collapse1 = ref(false);
</script>

<style scoped>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
