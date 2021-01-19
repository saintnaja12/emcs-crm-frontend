<template>

</template>

<script>
    import Swal from 'sweetalert2';
    export default {
        name: "session",
        // mounted() {
        //     this.IntervalCheck()
        // },
        // methods: {
        //     IntervalCheck(){
        //         let timer = null
        //         const toFunction  = () => {
        //             this.$userAdapter.checkResp().then(resp => {
        //                 if (!resp.success){
        //                     clearTimeout(timer)
        //                     Swal.fire({
        //                         type: 'warning',
        //                         title: 'Warning!',
        //                         text: 'Your account has been logged in from another machine.',
        //                         showConfirmButton: true,
        //                     }).then(() => {
        //                         localStorage.clear()
        //                         this.$router.push(`/login`)
		//
        //                     })
        //                 } else {
        //                     timer = setTimeout(toFunction, 5000)
        //                 }
        //             })
        //         }
        //         timer = setTimeout( toFunction , 5000)
        //     },
        // }
    }
</script>

<style scoped>

</style>
