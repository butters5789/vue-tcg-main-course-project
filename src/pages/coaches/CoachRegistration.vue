<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>

      <coach-form @save-data="saveNewRegistration"></coach-form>
    </base-card>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import CoachForm from '../../components/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  methods: {
    ...mapActions('coaches', ['registerNewCoach']),
    saveNewRegistration(newCoach) {
      this.registerNewCoach(newCoach);

      this.$router.replace('/coaches');
    },
  },
};
</script>

<style></style>
