import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ScenarioView from "@/components/ScenarioView";
import { getScenario, scenarios } from "@/data/scenarios";

export function generateStaticParams() {
  return scenarios.map((scenario) => ({ slug: scenario.slug }));
}

export async function generateMetadata(props: PageProps<"/scenario/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const scenario = getScenario(slug);
  return {
    title: scenario?.title ?? "Scenario not found",
    description: scenario?.description,
  };
}

export default function ScenarioPage(props: PageProps<"/scenario/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
      <ScenarioContent params={props.params} />
    </Suspense>
  );
}

async function ScenarioContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scenario = getScenario(slug);
  if (!scenario) notFound();

  return <ScenarioView scenario={scenario} />;
}
