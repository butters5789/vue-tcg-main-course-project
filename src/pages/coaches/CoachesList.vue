<template>
  <section>FILTER</section>

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>

        <base-button route to="/register">
          Register as a Coach
        </base-button>
      </div>

      <ul v-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>

      <p v-else>
        No coaches found. Register
        <router-link to="/register">NOW</router-link> to be a coach!
      </p>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '../../components/ui/BaseButton.vue';
import BaseCard from '../../components/ui/BaseCard.vue';
import CoachItem from '../../components/CoachItem.vue';

export default {
  computed: {
    ...mapGetters('coaches', ['coaches', 'hasCoaches']),
    filteredCoaches() {
      return this.coaches;
    },
  },
  components: {
    BaseButton,
    BaseCard,
    CoachItem,
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
