<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handelError"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>

    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >

          <base-button
            v-if="!isAuthenticated"
            route
            to="/auth?redirect=register"
          >
            Login to Register as a Coach
          </base-button>

          <base-button
            v-if="isAuthenticated && !isLoading && !isCoach"
            route
            to="/register"
          >
            Register as a Coach
          </base-button>
        </div>

        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>

        <ul v-else-if="hasCoaches">
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '../../components/ui/BaseButton.vue';
import BaseCard from '../../components/ui/BaseCard.vue';
import CoachFilter from '../../components/CoachFilter.vue';
import CoachItem from '../../components/CoachItem.vue';

export default {
  data() {
    return {
      areasFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
      error: null,
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapGetters('coaches', ['coaches', 'hasCoaches', 'isCoach', 'isLoading']),
    filteredCoaches() {
      return this.coaches.filter((coach) => {
        if (this.areasFilter.frontend && coach.areas.includes('frontend')) {
          return true;
        }

        if (this.areasFilter.backend && coach.areas.includes('backend')) {
          return true;
        }

        if (this.areasFilter.career && coach.areas.includes('career')) {
          return true;
        }

        return false;
      });
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    ...mapActions('coaches', ['getAllCoaches']),
    setFilters(filters) {
      this.areasFilter = filters;
    },
    async loadCoaches(forceUpdate = false) {
      try {
        await this.getAllCoaches({ forceUpdate });
      } catch (error) {
        this.error = error || 'Something went wrong!';
      }
    },
    handelError() {
      this.error = null;
    },
  },
  components: {
    BaseButton,
    BaseCard,
    CoachFilter,
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
