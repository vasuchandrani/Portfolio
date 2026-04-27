import { createFileRoute } from "@tanstack/react-router";
import { IDEPortfolio } from "@/components/ide/IDEPortfolio";
export const Route = createFileRoute("/")({
    component: Index,
    head: () => ({
        meta: [
            { title: "Vatsal Chandrani — DSA & Backend Developer" },
            { name: "description", content: "Portfolio of Vatsal Chandrani — DSA enthusiast, backend developer, and Founder of Programming Club at DDU. Explore projects, skills, and experience." },
            { property: "og:title", content: "Vatsal Chandrani — DSA & Backend Developer" },
            { property: "og:description", content: "Interactive IDE-style portfolio showcasing DSA expertise and backend engineering." },
        ],
    }),
});
function Index() {
    return <IDEPortfolio />;
}
