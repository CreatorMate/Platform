<template>
    <div class="vue-world-map">
        <Map
            @hoverCountry="onHoverCountry"
            @hoverLeaveCountry="onHoverLeaveCountry" />

        <div v-if="legend.name" class="vue-map-legend" :style="`left: ${position.left}px; top: ${position.top}px`">
            <div class="vue-map-legend-header">
                <span>{{ legend.name }}</span>
            </div>
            <div class="vue-map-legend-content">
                <span>{{ countryData[legend.code] || 0 }}%</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { reactive, watch, onMounted } from 'vue';
    import chroma from 'chroma-js';
    import { getBaseCss, getCombinedCssString, getDynamicMapCss } from "~/src/CountryMappper";
    import Map from "~/src/modules/analytics/components/base/Map.vue";

    // Props
    const {lowColor, highColor, countryData, defaultCountryFillColor, countryStrokeColor} = defineProps({
        lowColor: {
            type: String,
            default: '#fde2e2',
        },
        highColor: {
            type: String,
            default: '#d83737',
        },
        countryData: {
            type: Object,
            required: true,
        },
        defaultCountryFillColor: {
            type: String,
            default: '#dadada',
        },
        countryStrokeColor: {
            type: String,
            default: '#909090',
        },
    });

    // Reactive state
    const legend = reactive({
        data: null,
        code: null,
        name: null,
    });

    const position = reactive({
        left: 0,
        top: 0,
    });

    const styleNode = document.createElement('style');

    // Computed chroma scale
    const chromaScale = chroma.scale([lowColor, highColor]);

    // Methods
    function onHoverCountry(country: { name: string; code: string; position: { left: number; top: number } }) {
        //@ts-ignore
        legend.data = country;
        //@ts-ignore
        legend.code = country.code;
        //@ts-ignore
        legend.name = country.name;
        position.left = country.position.left;
        position.top = country.position.top;
    }

    function onHoverLeaveCountry() {
        legend.data = null;
        legend.code = null;
        legend.name = null;
    }

    function renderMapCSS() {
        //@ts-ignore
        const baseCss = getBaseCss({ lowColor, highColor, defaultCountryFillColor, countryStrokeColor });
        const dynamicMapCss = getDynamicMapCss(countryData, chromaScale);
        styleNode.innerHTML = getCombinedCssString(baseCss, dynamicMapCss);
    }

    // Watchers
    watch(() => countryData, renderMapCSS, { deep: true });

    // Lifecycle hooks
    onMounted(() => {
        document.body.appendChild(styleNode);
        renderMapCSS();
    });
</script>

<style scoped>
.vue-world-map,
#map-svg {
    height: 100%;
}

.vue-world-map {
    position: relative;
}

.vue-map-legend {
    width: 185px;
    background: #fff;
    border: 1px solid;
    border-color: #acacad;
    position: absolute;
}

.vue-map-legend-header {
    padding: 10px 15px;
}

.vue-map-legend-content {
    padding: 10px 15px;
    background: #dadbda8f;
    border-top: 1px solid #acacad;
}
</style>