export type MetricType = {
    name: string,
    category: MetricCategory,
    description: string,
    kind: MetricKind,
    actions: {
        [key: string]: string
    }
}

export enum MetricCategory {
    ENGAGEMENT = "engagement"
}

export enum MetricKind {
    SINGLE,
    ARRAY,
    PERCENTAGE
}

export const metricTypesList: MetricType[] = [
    {
        name: 'likes',
        category: MetricCategory.ENGAGEMENT,
        description: 'returns the likes of the creators posts',
        kind: MetricKind.SINGLE,
        actions: {
            'sum': '/brands/${brand_id}/statistics/sum?key=likes&grouped=true',
            'average': '/brands/${brand_id}/statistics/average?key=likes&grouped=true',
        }
    }
];