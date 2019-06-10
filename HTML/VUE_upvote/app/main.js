new Vue({
    el: "#app",
    data: {
        submissions: Seed.submissions
    },

    components: {
        'submission-component': submissionComponent
    },

    computed: {
        sortedSubmissions() {
            return this.submissions.sort((a,b) => b.votes - a.votes);
        }
    }
});