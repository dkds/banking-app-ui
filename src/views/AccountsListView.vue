
<template>
  <MDBBtn color="primary"
    @click="router.push({ name: customerId ? 'customer-account-add' : 'account-add', params: { customerId } })">
    Add Account
  </MDBBtn>
  <MDBTable class="align-middle mb-0 bg-white mt-3">
    <thead class="bg-light">
      <tr>
        <th>Number</th>
        <th>Customer Id</th>
        <th>Balance</th>
        <th>Currency</th>
        <th>Status</th>
        <th>Start Time</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="account in accountsList">
        <td>
          <p class="fw-bold mb-1">{{ account.number }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ account.customerId }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ account.balance }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ account.currency }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ account.status }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ DateTime.fromISO(account.startTime).toLocaleString(DateTime.DATETIME_FULL) }}
          </p>
        </td>
        <td>
          <MDBBtn color="link" size="sm" rounded
            @click="router.push({ name: customerId ? 'customer-account-edit' : 'account-edit', params: { id: account.id, customerId } })">
            Edit
          </MDBBtn>
          <MDBBtn color="link" size="sm" rounded
            @click="router.push({ name: 'account-transactions-list', params: { accountNumber: account.number } })">
            Transactions
          </MDBBtn>
        </td>
      </tr>
    </tbody>
  </MDBTable>
</template>

<script setup >
import { DateTime } from 'luxon';
import {
  MDBBtn, MDBTable
} from 'mdb-vue-ui-kit';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { APIM_SUBSCRIPTION_KEY_HEADER, APIM_SUBSCRIPTION_KEY, API_PATH_ACCOUNT_LIST, API_PATH_ACCOUNT_LIST_BY_CUSTOMER } from '../config';

const router = useRouter()
const route = useRoute()

const customerId = ref(route.params.customerId)

const accountsList = ref([])
loadAccounts()

async function loadAccounts() {
  let apiPath;
  if (customerId.value) {
    apiPath = API_PATH_ACCOUNT_LIST_BY_CUSTOMER + customerId.value + '/Accounts'
  } else {
    apiPath = API_PATH_ACCOUNT_LIST
  }

  const response = await fetch(apiPath, { headers: { [APIM_SUBSCRIPTION_KEY_HEADER]: APIM_SUBSCRIPTION_KEY } })
  const accountsResponse = await response.json();

  accountsList.value = accountsResponse.map((account => ({
    ...account,
    status: getStatusText(account.status)
  })))
  console.log(accountsList.value);
}

function getStatusText(statusCode) {
  switch (statusCode) {
    case 0:
      return 'Active';
    case 1:
      return 'Suspended';
    case 2:
      return 'Deleted';
    default:
      return statusCode;
  }
}
</script>
