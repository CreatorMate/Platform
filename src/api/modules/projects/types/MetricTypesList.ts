export type Metric = {
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
    SINGLE = 'SINGLE',
    ARRAY = 'ARRAY',
    PERCENTAGE_LIST = 'PERCENTAGE_LIST',
    COUNTRIES = 'COUNTRIES'
}

export const metricTypesList: Metric[] = [
    {
        name: 'likes',
        category: MetricCategory.ENGAGEMENT,
        description: 'returns the likes of the creators posts',
        kind: MetricKind.SINGLE,
        actions: {
            'sum': '/brands/${brand_id}/statistics/sum?key=likes',
            'average': '/brands/${brand_id}/statistics/average?key=likes',
        }
    },
    // {
    //     name: 'country data',
    //     category: MetricCategory.ENGAGEMENT,
    //     description: 'active viewership per country',
    //     kind: MetricKind.PERCENTAGE_LIST,
    //     actions: {
    //         'percentage': '/brands/${brand_id}/statistics/sum?key=likes&grouped=true',
    //         'total': '/brands/${brand_id}/statistics/average?key=likes&grouped=true',
    //     }
    // }
];