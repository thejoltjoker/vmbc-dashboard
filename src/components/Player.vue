<script lang="ts">
const User = {
  template: "...",
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // react to route changes...
      },
    );
  },
};
</script>
