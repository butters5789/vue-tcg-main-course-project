<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your e-mail</label>

      <input type="email" id="email" name="email" v-model.trim="email.value" />
    </div>

    <div class="form-control">
      <label for="message">Your message</label>

      <textarea
        id="message"
        name="message"
        rows="5"
        v-model.trim="message.value"
      ></textarea>
    </div>

    <p class="errors" v-if="!isFormValid">
      Please enter a valid email and make sure the message is not empty.
    </p>

    <div class="actions">
      <base-button type="submit">Send Message</base-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: {
        value: '',
        isValid: true,
      },
      message: {
        value: '',
        isValid: true,
      },
      isFormValid: true,
    };
  },
  methods: {
    ...mapActions('requests', ['contactCoach']),
    submitForm() {
      this.validateForm();

      if (!this.isFormValid) {
        return false;
      }

      this.contactCoach({
        coachId: this.$route.params.id,
        email: this.email.value,
        message: this.message.value,
      });

      this.$router.replace('/coaches');
    },
    validateForm() {
      this.isFormValid = true;

      if (this.email.value === '') {
        this.email.isValid = false;
        this.isFormValid = false;
      }

      if (this.message.value === '') {
        this.message.isValid = false;
        this.isFormValid = false;
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
