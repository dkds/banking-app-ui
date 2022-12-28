<template>
  <MDBContainer sm>
    <h2>
      {{ edit ? 'Edit' : 'Add' }} Account
    </h2>

    <MDBRow ref="form" tag="form" class="mt-4 g-3 needs-validation" novalidate @submit.prevent="checkForm">

      <MDBRow class="mb-4">
        <MDBCol>
          <MDBInput type="text" label="Customer ID" id="form6FirstName" v-model="account.customerId" required
            :readonly="!!customerId || edit" />
        </MDBCol>
        <MDBCol />
        <MDBCol />
      </MDBRow>

      <MDBRow class="mb-4">
        <MDBCol>
          <MDBInput type="number" label="Balance" id="form6FirstName" v-model="account.balance" required
            :readonly="edit" />
        </MDBCol>
        <MDBCol>
          <MDBInput type="text" label="Currency" id="form6LastName" v-model="account.currency" required
            :readonly="edit" />
        </MDBCol>
        <MDBCol />
      </MDBRow>

      <MDBRow class="mb-4">
        <MDBCol>
          <MDBCheckbox label="Active" v-model="accountStatus" />
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
            @click="router.push({ name: customerId ? 'customer-accounts-list' : 'accounts-list', params: { customerId } })">
            Cancel
          </MDBBtn>
        </MDBCol>
        <MDBCol col="4" />
      </MDBRow>
    </MDBRow>
  </MDBContainer>
</template>

<script setup>
import {
  MDBBtn, MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBRow
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { APIM_SUBSCRIPTION_KEY, API_PATH_ACCOUNT_CREATE, API_PATH_ACCOUNT_GET, API_PATH_ACCOUNT_UPDATE } from '../config';

const route = useRoute()
const router = useRouter()

const accountId = ref(route.params.id)
const customerId = ref(route.params.customerId)
const edit = ref(!!route.params.id)
const account = ref({
  customerId: customerId.value,
  number: "",
  balance: "",
  currency: "LKR",
  status: 0,
})
const accountStatus = ref(account.value.status === 0)

if (edit.value) {
  loadAccount(accountId.value)
}

const checkForm = (event) => {
  event.target.classList.add("was-validated");
  const hasErrors = Array.from(event.target.elements).some(element => element.validationMessage);
  if (!hasErrors) {
    save()
  }
};

async function loadAccount(id) {
  const response = await fetch(API_PATH_ACCOUNT_GET + id, { headers: { [APIM_SUBSCRIPTION_KEY_HEADER]: APIM_SUBSCRIPTION_KEY } })
  const accountResponse = await response.json();
  account.value = {
    ...accountResponse,
  }
  accountStatus.value = account.value.status === 0;
  console.log(account.value);
}

async function save() {
  const payload = {
    ...account.value,
    status: accountStatus.value ? 0 : 1,
  }
  delete payload.fullName;
  delete payload.address;

  console.log(payload);
  const response = await fetch(edit.value ? API_PATH_ACCOUNT_UPDATE + accountId.value : API_PATH_ACCOUNT_CREATE, {
    method: edit.value ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      [APIM_SUBSCRIPTION_KEY_HEADER]: APIM_SUBSCRIPTION_KEY
    },
    body: JSON.stringify(payload),
  })
  if (response.ok) {
    router.push({ name: customerId.value ? 'customer-accounts-list' : 'accounts-list', params: { customerId: customerId.value } })
  } else {
    const body = await response.text();
    alert(body)
  }
}

</script>
