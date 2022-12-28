
<template>
  <MDBBtn color="primary" @click="router.push({ name: 'transaction-add', params: { accountNumber } })">
    Add Transaction
  </MDBBtn>
  <MDBTable class="align-middle mb-0 bg-white mt-3">
    <thead class="bg-light">
      <tr>
        <th>Id</th>
        <th>Reference Number</th>
        <th>Account Number From</th>
        <th>Account Number To</th>
        <th>Type</th>
        <th>Amount</th>
        <th>Notes</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in transactionsList">
        <td>
          <p class="fw-bold mb-1">{{ transaction.id }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ transaction.referenceNumber }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ transaction.accountNumberFrom }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ transaction.accountNumberTo }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ transaction.type }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ transaction.amount }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ transaction.notes }}</p>
        </td>
        <td>
          <p class="fw-bold mb-1">{{ DateTime.fromISO(transaction.time).toLocaleString(DateTime.DATETIME_FULL) }}
          </p>
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
import { APIM_SUBSCRIPTION_KEY, API_PATH_TRANSACTION_LIST } from '../config';

const router = useRouter()
const route = useRoute()

const accountNumber = ref(route.params.accountNumber)

const transactionsList = ref([])
loadAccounts()

async function loadAccounts() {
  let apiPath;
  if (accountNumber.value) {
    apiPath = API_PATH_TRANSACTION_LIST + "?" + new URLSearchParams({
      accountNo: accountNumber.value,
    })
  } else {
    apiPath = API_PATH_TRANSACTION_LIST
  }

  const response = await fetch(apiPath, { headers: { 'Ocp-Apim-Subscription-Key': APIM_SUBSCRIPTION_KEY } })
  const transactionsResponse = await response.json();

  transactionsList.value = transactionsResponse.map((transaction => ({
    ...transaction,
    type: getTypeText(transaction.type)
  })))
  console.log(transactionsList.value);
}

function getTypeText(typeCode) {
  switch (typeCode) {
    case 0:
      return 'Credit';
    case 1:
      return 'Debit';
    default:
      return typeCode;
  }
}
</script>
