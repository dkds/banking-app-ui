<template>
  <MDBContainer sm>
    <h2>
      {{ edit ? 'Edit' : 'Add' }} Customer
    </h2>

    <MDBRow ref="form" tag="form" class="mt-4 g-3 needs-validation" novalidate @submit.prevent="checkForm">
      <MDBRow class="mb-4">
        <MDBCol>
          <MDBInput req type="text" label="NIC" id="form6CompanyName" v-model="customer.nic" required />
        </MDBCol>
        <MDBCol />
        <MDBCol />
      </MDBRow>

      <MDBRow class="mb-4">
        <MDBCol>
          <MDBInput type="text" label="First Name" id="form6FirstName" v-model="customer.firstName" required />
        </MDBCol>
        <MDBCol>
          <MDBInput type="text" label="Middle Name" id="form6LastName" v-model="customer.middleName" />
        </MDBCol>
        <MDBCol>
          <MDBInput type="text" label="Last Name" id="form6LastName" v-model="customer.lastName" required />
        </MDBCol>
      </MDBRow>

      <MDBRow class="mb-4">
        <MDBCol>
          <MDBInput type="text" label="Address Line 1" id="form6FirstName" v-model="customer.addressLine1" required />
        </MDBCol>
        <MDBCol>
          <MDBInput type="text" label="Address Line 2" id="form6LastName" v-model="customer.addressLine2" />
        </MDBCol>
        <MDBCol>
          <MDBInput type="text" label="City" id="form6LastName" v-model="customer.addressCity" required />
        </MDBCol>
      </MDBRow>

      <MDBRow class="mb-4">
        <MDBCol>
          <Datepicker v-model="customer.birthDate" format="yyyy-MM-dd" auto-apply :enable-time-picker="false"
            position="left" placeholder="Birth Date" :state="datePickerState" required />
        </MDBCol>
        <MDBCol />
        <MDBCol />
      </MDBRow>

      <MDBRow class="mb-4 mt-3">
        <MDBCol>
          <MDBBtn color="primary" class="float-end" type="submit">
            Save
          </MDBBtn>
          <MDBBtn class="float-end" @click="router.push({ name: 'customers-list' })">
            Cancel
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBRow>
  </MDBContainer>
</template>

<script setup>
import Datepicker from '@vuepic/vue-datepicker';
import { DateTime } from "luxon";
import {
  MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { API_PATH_CUSTOMER_GET, API_PATH_CUSTOMER_CREATE, API_PATH_CUSTOMER_UPDATE, APIM_SUBSCRIPTION_KEY } from '../config'

const route = useRoute()
const router = useRouter()

const customer = ref({
  nic: "",
  firstName: "",
  middleName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  addressCity: "",
  birthDate: DateTime.now().set({ year: 1990 }).toJSDate(),
})
const customerId = ref(route.params.id)
const edit = ref(!!route.params.id)
const datePickerState = ref()
const form = ref()

if (edit.value) {
  loadCustomer(customerId.value)
}

const checkForm = (event) => {
  console.log(form.value.$el);
  event.target.classList.add("was-validated");
  save()
};

async function loadCustomer(id) {
  const response = await fetch(API_PATH_CUSTOMER_GET + id, { headers: { 'Ocp-Apim-Subscription-Key': APIM_SUBSCRIPTION_KEY } })
  const customerResponse = await response.json();
  customer.value = {
    ...customerResponse,
    birthDate: DateTime.fromISO(customerResponse.birthDate).set({ year: 1990 }).toJSDate()
  }
  console.log(customer.value);
}

async function save() {
  const payload = {
    ...customer.value,
    birthDate: DateTime.fromJSDate(customer.value.birthDate).toISODate()
  }
  delete payload.fullName;
  delete payload.address;

  console.log(payload);
  const response = await fetch(edit.value ? API_PATH_CUSTOMER_UPDATE + customerId.value : API_PATH_CUSTOMER_CREATE, {
    method: edit.value ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': APIM_SUBSCRIPTION_KEY
    },
    body: JSON.stringify(payload),
  })
  if (response.ok) {
    router.push({ name: 'customers-list' })
  } else {
    const body = await response.text();
    alert(body)
  }
}

</script>
