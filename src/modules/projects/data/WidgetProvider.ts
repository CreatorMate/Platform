import type {Widget} from "~/src/utils/SupabaseTypes";
import {type Metric, MetricKind} from "~/src/api/modules/projects/types/MetricTypesList"

export type ComponentType = {
    name: string,
    component: any,
    types?: MetricKind[],
    grouped?: boolean | null,
    icon: string|null,
    metric?: string,
}

export class WidgetProvider {
    public static defaultComponents: ComponentType[] = [
        {
            name: 'Header 1',
            component: defineAsyncComponent(() => import("~/src/modules/projects/components/widgets/default/Header1Widget.vue")),
            icon: 'material-symbols:title',
            metric: 'titles',
        },
        {
            name: 'Header 2',
            component: defineAsyncComponent(() => import("~/src/modules/projects/components/widgets/default/Header2Widget.vue")),
            icon: 'material-symbols:title',
            metric: 'titles',
        },
        {
            name: 'Header 3',
            component: defineAsyncComponent(() => import("~/src/modules/projects/components/widgets/default/Header3Widget.vue")),
            icon: 'material-symbols:title',
            metric: 'titles',
        },
        {
            name: 'Text block',
            component: defineAsyncComponent(() => import("~/src/modules/projects/components/widgets/default/TextBlockWidget.vue")),
            icon: 'material-symbols:text-ad-outline',
            metric: 'text',
        },
        {
            name: 'Markdown',
            component: defineAsyncComponent(() => import("~/src/modules/projects/components/widgets/default/MarkdownWidget.vue")),
            icon: 'material-symbols:markdown',
            metric: 'custom',
        }
    ];
    private static components: ComponentType[] = [
        {
            name: 'stat card',
            component: defineAsyncComponent(() => import("~/src/modules/projects/components/widgets/SingleStatCard.vue")),
            types: [MetricKind.SINGLE],
            grouped: true,
            icon: null,
        },
        {
            name: 'pie chart',
            component: defineAsyncComponent(() => import("~/src/modules/projects/components/widgets/PieChartCard.vue")),
            types: [MetricKind.SINGLE],
            grouped: true,
            icon: null,
        },
        {
            name: 'pie chart',
            component: defineAsyncComponent(() => import("~/src/modules/projects/components/widgets/PieChartCard.vue")),
            types: [MetricKind.PERCENTAGE_LIST],
            grouped: null,
            icon: null,
        },
        {
            name: 'bar-graph',
            component: defineAsyncComponent(() => import("~/src/modules/analytics/components/cards/PostFieldAverageCard.vue")),
            types: [MetricKind.PERCENTAGE_LIST, MetricKind.COUNTRIES, MetricKind.SINGLE, MetricKind.ARRAY],
            grouped: false,
            icon: null,
        }
    ]

    public static getComponent(name: string, base: boolean = false): ComponentType | undefined {
        if(base) {
            return this.defaultComponents.find((component) => component.name == name);
        }
        return this.components.find((component) => component.name == name);
    }

    public static getComponents(metric: Metric, widget: Widget): ComponentType[] {
        return this.components.filter((component) => {
            return component.types?.includes(metric.kind) && (widget.grouped == component.grouped || component.grouped == null);
        })
    }
}