import type {Widget} from "~/src/utils/SupabaseTypes";
import {type Metric, MetricKind} from "~/src/api/modules/projects/types/MetricTypesList"

export type ComponentType = {
    name: string,
    component: any,
    types: MetricKind[],
    grouped: boolean|null,
}

export class WidgetProvider {
    private static components: ComponentType[] = [
        {
            name: 'stat card',
            component: defineAsyncComponent(() => import("~/src/modules/projects/components/widgets/SingleStatCard.vue")),
            types: [MetricKind.SINGLE],
            grouped: true,
        },
        {
            name: 'pie chart',
            component: defineAsyncComponent(() => import("~/src/modules/projects/components/widgets/PieChartCard.vue")),
            types: [MetricKind.SINGLE],
            grouped: true,
        },
        {
            name: 'pie chart',
            component: defineAsyncComponent(() => import("~/src/modules/projects/components/widgets/PieChartCard.vue")),
            types: [MetricKind.PERCENTAGE_LIST],
            grouped: null,
        },
        {
            name: 'bar-graph',
            component: defineAsyncComponent(() => import("~/src/modules/analytics/components/cards/PostFieldAverageCard.vue")),
            types: [MetricKind.PERCENTAGE_LIST, MetricKind.COUNTRIES, MetricKind.SINGLE, MetricKind.ARRAY],
            grouped: false
        }
    ]
    public static getComponents(metric: Metric, widget: Widget): ComponentType[] {
        return this.components.filter((component) => {
            return component.types.includes(metric.kind) && (widget.grouped == component.grouped || component.grouped == null);
        })
    }
}