<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An Error Occurred..."
      @close="handelError"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <base-dialog :show="isLoading" fixed title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>

    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>

          <input type="email" id="email" v-model.trim="email" />
        </div>

        <div class="form-control">
          <label for="password">Password</label>

          <input type="password" id="password" v-model.trim="password" />
        </div>

        <p v-if="!formIsValid">
          Please enter a valid email address and password (must be at least 6
          characters long)
        </p>

        <base-button type="submit">{{ submitButtonText }}</base-button>

        <base-button mode="flat" type="button" @click="switchAuthMode">{{
          modeButtonText
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      error: null,
      formIsValid: true,
      isLoading: false,
      mode: 'login',
      password: '',
    };
  },
  computed: {
    submitButtonText() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Sign Up';
      }
    },
    modeButtonText() {
      if (this.mode === 'login') {
        return 'Sign Up';
      } else {
        return 'Login';
      }
    },
  },
  methods: {
    ...mapActions(['login', 'signup']),
    switchAuthMode() {
      if (this.mode === 'signup') {
        this.mode = 'login';
      } else {
        this.mode = 'signup';
      }
    },
    async submitForm() {
      this.formIsValid = true;

      if (this.email === '' || this.password.length < 6) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const authPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === 'login') {
          await this.login(authPayload);
        } else {
          await this.signup(authPayload);
        }
      } catch (error) {
        this.error = error.message || 'some default error message';
      }

      this.isLoading = false;
    },
    handelError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
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
</style>
