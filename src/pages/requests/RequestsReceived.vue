<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>

      <ul v-if="hasRequests">
        <request-item
          v-for="request in requests"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        ></request-item>
      </ul>

      <h3 v-else>You haven't received any requests yet.</h3>
    </base-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RequestItem from '../../components/RequestItem.vue';

export default {
  computed: {
    ...mapGetters('requests', ['requests', 'hasRequests']),
  },
  methods: {
    ...mapActions('requests', ['getCoachRequests']),
    async loadRequests() {
      try {
        await this.getCoachRequests();
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.loadRequests();
  },
  components: {
    RequestItem,
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
