<template>
    <div v-if="!loaded" class="w-full text-center mt-12">analysing sentiment</div>
    <div v-else-if="failed" class="w-full text-center mt-12">analysis failed</div>
    <div v-else class="report" >
        <h2 class="text-xl">Structured Report on Content Reactions Analysis</h2>
        <h4>Sentiment:</h4>
        <table>
            <thead>
            <tr>
                <th>Sentiment</th>
                <th>Count</th>
                <th>Percentage</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in sentimentData" :key="index">
                <td>{{ item.sentiment }}</td>
                <td>{{ item.count }}</td>
                <td>{{ item.percentage }}</td>
            </tr>
            </tbody>
        </table>

        <h4>Emotions:</h4>
        <table>
            <thead>
            <tr>
                <th>Emotion</th>
                <th>Count</th>
                <th>Percentage</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in emotionData" :key="index">
                <td>{{ item.emotion }}</td>
                <td>{{ item.count }}</td>
                <td>{{ item.percentage }}</td>
            </tr>
            </tbody>
        </table>

        <hr />

        <h3>Analysis of Reactions:</h3>

        <div v-for="(question, index) in analysisData" :key="index">
            <h4>{{ question.question }}</h4>
            <p>
                <strong>Answer:</strong>
                {{ question.answer }}
            </p>
            <div v-if="question.quotes && question.quotes.length">
                <p><strong>Quotes:</strong></p>
                <ul>
                    <li v-for="(quote, i) in question.quotes" :key="i">{{ quote }}</li>
                </ul>
            </div>
        </div>

        <hr />

        <h3>Overview of Asked (Generalized) Questions:</h3>

        <table>
            <thead>
            <tr>
                <th>Question</th>
                <th>Number</th>
                <th>Topic</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in overviewData" :key="index">
                <td>{{ item.question }}</td>
                <td>{{ item.number }}</td>
                <td>{{ item.topic }}</td>
            </tr>
            </tbody>
        </table>

        <hr />

        <h3>Sentiment per Topic:</h3>
        <table>
            <thead>
            <tr>
                <th>Topic</th>
                <th>Sentiment</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in sentimentPerTopicData" :key="index">
                <td>{{ item.topic }}</td>
                <td>{{ item.sentiment }}</td>
            </tr>
            </tbody>
        </table>

        <hr />

        <h3>Key Insights and Recommendations:</h3>
        <div class="insights">
            <p><strong>Insights:</strong> {{ insights }}</p>
        </div>
        <div class="recommendations">
            <p><strong>Recommendations:</strong></p>
            <ul>
                <li v-for="(recommendation, index) in recommendations" :key="index">
                    {{ recommendation }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from "vue";
    import {API} from "~/src/utils/API/API";
    import type {APIResponse} from "~/src/api/utils/HonoResponses";

    // Interfaces to define the data structure for better type safety
    interface SentimentItem {
        sentiment: string;
        count: number;
        percentage: string;
    }

    interface EmotionItem {
        emotion: string;
        count: number;
        percentage: string;
    }

    interface AnalysisItem {
        question: string;
        answer: string;
        quotes?: string[];
    }

    interface OverviewItem {
        question: string;
        number: number;
        topic: string;
    }

    interface SentimentPerTopicItem {
        topic: string;
        sentiment: string;
    }

    const sentimentData = ref<SentimentItem[]>([]);
    const emotionData = ref<EmotionItem[]>([]);
    const analysisData = ref<AnalysisItem[]>([]);
    const overviewData = ref<OverviewItem[]>([]);
    const sentimentPerTopicData = ref<SentimentPerTopicItem[]>([]);
    const insights = ref("");
    const recommendations = ref<string[]>([]);
    const route = useRoute();

    const loaded = ref(false);
    const failed = ref(false);

    // Fetching Data from API
    const API_ENDPOINT = "/api/your-report-endpoint"; // Replace with your actual API endpoint

    onMounted(async () => {
        try {
            const postId = route.query.postId;
            const igId = route.query.igId;

            const result: APIResponse<{result: string}> = await API.ask(`/creator_api/content/comments?postId=${postId}&igId=${igId}`)
            loaded.value = true;
            if(!result.success) return;

            const reportData = result.data.result;
            const parsedData = parseReportString(reportData);

            sentimentData.value = parsedData.sentimentData;
            emotionData.value = parsedData.emotionData;
            analysisData.value = parsedData.analysisData;
            overviewData.value = parsedData.overviewData;
            sentimentPerTopicData.value = parsedData.sentimentPerTopicData;
            insights.value = parsedData.insights;
            recommendations.value = parsedData.recommendations;
        } catch (error) {
            console.error("Error fetching report data:", error);
            failed.value = true;
            // Handle error appropriately (e.g., display an error message)
        }
    });

    interface ParsedReportData {
        sentimentData: SentimentItem[];
        emotionData: EmotionItem[];
        analysisData: AnalysisItem[];
        overviewData: OverviewItem[];
        sentimentPerTopicData: SentimentPerTopicItem[];
        insights: string;
        recommendations: string[];
    }

    function parseReportString(reportString: string): ParsedReportData {
        const parsed: ParsedReportData = {
            sentimentData: [],
            emotionData: [],
            analysisData: [],
            overviewData: [],
            sentimentPerTopicData: [],
            insights: "",
            recommendations: [],
        };

        // Sentiment Data
        const sentimentBlock = reportString.substring(
            reportString.indexOf("**Sentiment:**"),
            reportString.indexOf("**Emotions:**"),
        );

        const sentimentLines = sentimentBlock.split("\n").filter((line) =>
            line.includes("-"),
        );
        parsed.sentimentData = sentimentLines.map((line) => {
            const parts = line.split(":");
            const sentiment = parts[0].replace("- ", "").trim();
            const countPart = parts[1].split("(");
            const count = parseInt(countPart[0].trim(), 10);
            const percentage = countPart[1].replace(")", "").trim();

            return { sentiment, count, percentage };
        });

        // Emotion Data
        const emotionBlock = reportString.substring(
            reportString.indexOf("**Emotions:**"),
            reportString.indexOf("### Analysis of Reactions:"),
        );

        const emotionLines = emotionBlock.split("\n").filter((line) =>
            line.includes("-"),
        );

        parsed.emotionData = emotionLines.map((line) => {
            const parts = line.split(":");
            const emotion = parts[0].replace("- ", "").trim();
            const countPart = parts[1].split("(");
            const count = parseInt(countPart[0].trim(), 10);
            const percentage = countPart[1].replace(")", "").trim();

            return { emotion, count, percentage };
        });

        // Analysis of Reactions
        const analysisBlock = reportString.substring(
            reportString.indexOf("### Analysis of Reactions:"),
            reportString.indexOf("### Overview of Asked (Generalized) Questions:"),
        );

        const analysisItems = analysisBlock
            .split("\n\n")
            .filter((item) => item.includes("**Answer:**"));

        parsed.analysisData = analysisItems.map((item) => {
            const questionLine = item.substring(
                0,
                item.indexOf("**Answer:**"),
            ).trim();
            const question = questionLine
                .replace("### Analysis of Reactions:\n\n", "")
                .replace("**", "")
                .replace("**", ""); // Cleanup to remove bold markers

            const answerLine = item.substring(
                item.indexOf("**Answer:**"),
                item.indexOf("**Quotes:**") > -1 ? item.indexOf("**Quotes:**") : undefined,
            );
            const answer = answerLine.replace("**Answer:**", "").trim();

            let quotes: string[] = [];
            if (item.includes("**Quotes:**")) {
                const quotesBlock = item.substring(item.indexOf("**Quotes:**"));
                quotes = quotesBlock
                    .replace("**Quotes:**", "")
                    .split("\n")
                    .filter((q) => q.length > 0)
                    .map((q) => q.replace(/^-\s*/, "").replace(/^"\s*/, "").replace(/"$/, ""))
                    .filter(quote => quote !== null && quote !== undefined && quote !== '');

            }

            return { question, answer, quotes };
        });

        // Overview of Asked (Generalized) Questions
        const overviewBlock = reportString.substring(
            reportString.indexOf("### Overview of Asked (Generalized) Questions:"),
            reportString.indexOf("### Sentiment per Topic:"),
        );

        const overviewLines = overviewBlock.split("\n\n").filter((line) =>
            line.includes("Question:"),
        );

        parsed.overviewData = overviewLines.map((line) => {
            const questionLine = line.substring(
                line.indexOf("**Question:**"),
                line.indexOf("- **Number:**"),
            );
            const question = questionLine
                .replace("**Question:**", "")
                .replace(/\d+\.\s*/, "")
                .trim();

            const numberLine = line.substring(
                line.indexOf("- **Number:**"),
                line.indexOf("- **Topic:**"),
            );
            const number = parseInt(numberLine.replace("- **Number:**", "").trim(), 10);

            const topic = line.substring(line.indexOf("- **Topic:**")).replace("- **Topic:**", "").trim();

            return { question, number, topic };
        });

        // Sentiment per Topic
        const sentimentPerTopicBlock = reportString.substring(
            reportString.indexOf("### Sentiment per Topic:"),
            reportString.indexOf("### Key Insights and Recommendations:"),
        );

        const sentimentPerTopicLines = sentimentPerTopicBlock.split("\n\n").filter((line) =>
            line.includes("**Topic:**"),
        );

        parsed.sentimentPerTopicData = sentimentPerTopicLines.map((line) => {
            const topicLine = line.substring(
                line.indexOf("**Topic:**"),
                line.indexOf("- **Sentiment:**"),
            );
            const topic = topicLine.replace("**Topic:**", "").trim();

            const sentiment = line.substring(line.indexOf("- **Sentiment:**")).replace("- **Sentiment:**", "").trim();

            return { topic, sentiment };
        });

        // Key Insights and Recommendations
        const insightsRecommendationsBlock = reportString.substring(
            reportString.indexOf("### Key Insights and Recommendations:"),
        );
        const insightsLine = insightsRecommendationsBlock.substring(
            insightsRecommendationsBlock.indexOf("**Insights:**"),
            insightsRecommendationsBlock.indexOf("**Recommendations:**"),
        );
        parsed.insights = insightsLine.replace("**Insights:**", "").trim();

        const recommendationsBlock = insightsRecommendationsBlock.substring(
            insightsRecommendationsBlock.indexOf("**Recommendations:**"),
        );
        parsed.recommendations = recommendationsBlock
            .replace("**Recommendations:**", "")
            .split("\n")
            .filter((line) => line.length > 0)
            .map(line => line.replace(/^-\s*/, "").trim());

        return parsed;
    }
</script>

<style scoped>
.report {
    font-family: sans-serif;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
}

h2,
h3,
h4 {
    margin-bottom: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

hr {
    border: 0;
    border-top: 1px solid #ddd;
    margin: 20px 0;
}

ul {
    list-style-type: disc;
    padding-left: 20px;
}

.insights {
    margin-bottom: 10px;
}
</style>
