<script>
export default {
  middleware ({ redirect, store }) {
    return redirect({ path: '/charts' })
  }
}
</script>
