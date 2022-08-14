<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>

  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>

        <base-button route :to="contactLink">Contact</base-button>
      </header>

      <router-view></router-view>
    </base-card>
  </section>

  <section>
    <base-card>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>

      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      coach: null,
    };
  },
  computed: {
    ...mapGetters('coaches', ['coaches']),
    areas() {
      return this.coach.areas;
    },
    contactLink() {
      return `${this.$route.path}/${this.id}/contact`;
    },
    description() {
      return this.coach.description;
    },
    fullName() {
      return `${this.coach.firstName} ${this.coach.lastName}`;
    },
    rate() {
      return this.coach.hourlyRate;
    },
  },
  created() {
    this.coach = this.coaches.find((coach) => {
      return coach.id === this.id;
    });
  },
};
</script>
