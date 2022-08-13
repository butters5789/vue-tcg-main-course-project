<template>
  <section>FILTER</section>

  <section>
    <div class="controls">
      <button>Refresh</button>

      <router-link to="/register">Register as a Coach</router-link>
    </div>

    <ul v-if="hasCoaches">
      <li v-for="coach in filteredCoaches" :key="coach.id">
        {{ `${coach.firstName} ${coach.lastName}` }}
      </li>
    </ul>

    <p v-else>
      No coaches found. Register
      <router-link to="/register">NOW</router-link> to be a coach!
    </p>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('coaches', ['coaches', 'hasCoaches']),
    filteredCoaches() {
      return this.coaches;
    }
  },
};
</script>

<style></style>
