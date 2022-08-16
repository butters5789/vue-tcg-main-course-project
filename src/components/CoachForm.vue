<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Firstname</label>

      <input
        type="text"
        id="firstname"
        name="firstname"
        v-model.trim="firstName.value"
        @blur="clearValidity('firstName')"
      />

      <p v-if="!firstName.isValid">Firstname must not be empty.</p>
    </div>

    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Lastname</label>

      <input
        type="text"
        id="lastname"
        name="lastname"
        v-model.trim="lastName.value"
        @blur="clearValidity('lastName')"
      />

      <p v-if="!lastName.isValid">Lastname must not be empty.</p>
    </div>

    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>

      <textarea
        id="description"
        name="description"
        rows="5"
        v-model.trim="description.value"
        @blur="clearValidity('description')"
      ></textarea>

      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>

    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>

      <input
        type="number"
        id="rate"
        name="rate"
        v-model.number="rate.value"
        @blur="clearValidity('rate')"
      />

      <p v-if="!rate.isValid">Rate must be 0 or greater.</p>
    </div>

    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>

      <label for="frontend">
        <input
          type="checkbox"
          id="frontend"
          name="frontend"
          value="frontend"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        Frontend Development
      </label>

      <label for="backend">
        <input
          type="checkbox"
          id="backend"
          name="backend"
          value="backend"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        Backend Development
      </label>

      <label for="career">
        <input
          type="checkbox"
          id="career"
          name="career"
          value="career"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        Career Development
      </label>

      <p v-if="!areas.isValid">Must select at least 1 area of expertise.</p>
    </div>

    <p v-if="!isFormValid">Please fix the errors above and submit again.</p>

    <base-button type="submit">Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        value: '',
        isValid: true,
      },
      lastName: {
        value: '',
        isValid: true,
      },
      description: {
        value: '',
        isValid: true,
      },
      rate: {
        value: null,
        isValid: true,
      },
      areas: {
        value: [],
        isValid: true,
      },
      isFormValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.isFormValid = true;

      if (this.firstName.value === '') {
        this.firstName.isValid = false;
        this.isFormValid = false;
      }

      if (this.lastName.value === '') {
        this.lastName.isValid = false;
        this.isFormValid = false;
      }

      if (this.description.value === '') {
        this.description.isValid = false;
        this.isFormValid = false;
      }

      if (!this.rate.value || this.rate.value < 0) {
        this.rate.isValid = false;
        this.isFormValid = false;
      }

      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.isFormValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.isFormValid) {
        return false;
      }

      const formData = {
        first: this.firstName.value,
        last: this.lastName.value,
        desc: this.description.value,
        rate: this.rate.value,
        areas: this.areas.value,
      };

      console.log(formData);
      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
