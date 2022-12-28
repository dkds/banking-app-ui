<template>
  <MDBContainer sm>
    <h2>
      Add Transaction
    </h2>

    <MDBRow ref="form" tag="form" class="mt-4 g-3 needs-validation" novalidate @submit.prevent="checkForm">

      <MDBRow class="mb-4">
        <MDBCol>
          <MDBInput type="text" label="From Account Number" id="form6FirstName"
            v-model="transaction.accountNumberFrom" />
        </MDBCol>
        <MDBCol>
        </MDBCol>
        <MDBCol />
      </MDBRow>

      <MDBRow class="mb-4">
        <MDBCol>
          <MDBInput type="text" label="To Account Number" id="form6FirstName" v-model="transaction.accountNumberTo" />
        </MDBCol>
        <MDBCol />
        <MDBCol />
      </MDBRow>

      <MDBRow class="mb-4">
        <MDBCol>
          <MDBInput type="number" label="Amount" id="form6FirstName" v-model="transaction.amount" required />
        </MDBCol>
        <MDBCol />
        <MDBCol />
      </MDBRow>

      <MDBRow class="mb-4">
        <MDBCol>
          <MDBInput type="text" label="Notes" id="form6LastName" v-model="transaction.notes" />
        </MDBCol>
        <MDBCol />
        <MDBCol />
      </MDBRow>

      <MDBRow class="mb-4 mt-3">
        <MDBCol>
          <MDBBtn color="primary" class="float-end" type="submit">
            Save
          </MDBBtn>
          <MDBBtn class="float-end"
            @click="router.push({ name: accountNumber ? 'account-transactions-list' : 'transactions-list', params: { accountNumber } })">
            Cancel
          </MDBBtn>
        </MDBCol>
        <MDBCol />
        <MDBCol />
      </MDBRow>
    </MDBRow>
  </MDBContainer>
</template>

<script setup>
import {
  MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { APIM_SUBSCRIPTION_KEY, API_PATH_TRANSACTION_CREATE, API_PATH_TRANSACTION_GET, API_PATH_TRANSACTION_UPDATE } from '../config';

const route = useRoute()
const router = useRouter()

const transactionId = ref(route.params.id)
const accountNumber = ref(route.params.accountNumber)
const edit = ref(!!route.params.id)
const transaction = ref({
  accountNumberFrom: accountNumber.value,
  accountNumberTo: "",
  amount: "",
  notes: "",
})

if (edit.value) {
  loadTransaction(transactionId.value)
}

const checkForm = (event) => {
  event.target.classList.add("was-validated");
  save()
};

async function loadTransaction(id) {
  const response = await fetch(API_PATH_TRANSACTION_GET + id, { headers: { 'Ocp-Apim-Subscription-Key': APIM_SUBSCRIPTION_KEY } })
  const transactionResponse = await response.json();
  transaction.value = {
    ...transactionResponse,
  }
  console.log(transaction.value);
}

async function save() {
  const payload = {
    ...transaction.value,
  }
  if (!transaction.value.accountNumberFrom) {
    delete payload.accountNumberFrom;
  }
  if (!transaction.value.accountNumberTo) {
    delete payload.accountNumberTo;
  }
  if (!transaction.value.notes) {
    delete payload.notes;
  }
  delete payload.fullName;
  delete payload.address;

  console.log(payload);
  const response = await fetch(edit.value ? API_PATH_TRANSACTION_UPDATE + transactionId.value : API_PATH_TRANSACTION_CREATE, {
    method: edit.value ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': APIM_SUBSCRIPTION_KEY
    },
    body: JSON.stringify(payload),
  })
  if (response.ok) {
    router.push({ name: accountNumber.value ? 'account-transactions-list' : 'transactions-list', params: { accountNumber: accountNumber.value } })
  } else {
    const body = await response.text();
    alert(body)
  }
}

</script>
