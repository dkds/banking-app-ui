
<template>
  <MDBBtn color="primary" @click="router.push({ name: 'customer-add' })">Add Customer</MDBBtn>
  <MDBTable class="align-middle mb-0 bg-white mt-3">
    <thead class="bg-light">
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>NIC</th>
        <th>Birth Date</th>
        <th>Address</th>
        <th>Register Time</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="customer in customersList">
        <td>
          <p class="fw-bold mb-1">{{ customer.id }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ customer.fullName }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ customer.nic }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ customer.birthDate }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ customer.address }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ DateTime.fromISO(customer.registerTime).toLocaleString(DateTime.DATETIME_FULL) }}
          </p>
        </td>
        <td>
          <MDBBtn color="link" size="sm" rounded
            @click="router.push({ name: 'customer-edit', params: { id: customer.id } })">
            Edit
          </MDBBtn>
          <MDBBtn color="link" size="sm" rounded
            @click="router.push({ name: 'customer-accounts-list', params: { customerId: customer.id } })">
            Accounts
          </MDBBtn>
        </td>
      </tr>
    </tbody>
  </MDBTable>
</template>

<script setup >
import {
  MDBBtn, MDBTable
} from 'mdb-vue-ui-kit';
import { ref, watch } from 'vue';
import { DateTime } from 'luxon';
import { useRouter } from 'vue-router';
import { APIM_SUBSCRIPTION_KEY_HEADER, API_PATH_CUSTOMER_LIST, APIM_SUBSCRIPTION_KEY } from '../config'

const router = useRouter()

const customersList = ref([])
loadCustomers()

async function loadCustomers() {
  const response = await fetch(API_PATH_CUSTOMER_LIST, { headers: { [APIM_SUBSCRIPTION_KEY_HEADER]: APIM_SUBSCRIPTION_KEY } })
  customersList.value = await response.json();
  console.log(customersList.value);
}
</script>
