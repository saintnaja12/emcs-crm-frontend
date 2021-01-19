<script>
import { Doughnut } from 'vue-chartjs'
export default {
    name: 'ChartJsDoughnut',
    extends: Doughnut,
    props: {
        data: {
            type: Object,
            default () { return {} }
        },
        options: {
            type: Object,
            default () { return {} }
        }
    },
    mounted () {
		this._renderChart()
    },
	methods: {
    	_renderChart() {
			this.renderChart(this.data, this.options)
		}
	}
}
</script>
