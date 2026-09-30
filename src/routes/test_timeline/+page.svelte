<script lang="ts">
	import type { Component } from "svelte";
	import CodamExperience from "$lib/components/CodamExperience.svelte";

	type Experience = {
		id: string;
		title: string;
		start: string;
		end?: string;
		description?: string;
		content?: Component;
	};

	const experiences: Experience[] = [
		{
			id: "bluecurrent",
			title: "Blue Current",
			start: "2025-09-01",
			description: "As a backend Software Engineer, working primary with an Oracle Database."
		},
		{
			id: "codam",
			title: "Codam Coding College",
			start: "2021-10-01",
			end: "2026-05-12",
			content: CodamExperience
		},
	];

	function formatDate(value: string): string {
		// Preserve the precision of the supplied date.
		if (/^\d{4}$/.test(value)) return value;

		const [year, month, day] = value.split("-").map(Number);

		return new Intl.DateTimeFormat("en-GB", {
			...(day !== undefined ? { day: "numeric" as const } : {}),
			month: "short",
			year: "numeric",
			timeZone: "UTC"
		}).format(new Date(Date.UTC(year, month - 1, day ?? 1)));
	}
</script>

<div class="flex w-full h-full pt-10 pb-10 justify-center">
	<section class="experience flex flex-col min-[1600px]:flex-row w-full px-6 md:px-0 md:w-2/3 h-full justify-center md:justify-between gap-10">
		<h1
		class="text-gray-300 text-[60px] md:text-[100px] leading-[100px] md:leading-[120px]">experience.
		</h1>

		<ol class="timeline">
			{#each experiences as experience, index (experience.id)}
				<li class="timeline-item" class:right={index % 2 === 1}>
					<span class="timeline-dot" aria-hidden="true"></span>

					<article class="experience-content">
						<p class="date">
							<time datetime={experience.start}>
								{formatDate(experience.start)}
							</time>
							<span> — </span>
							{#if experience.end}
								<time datetime={experience.end}>
									{formatDate(experience.end)}
								</time>
							{:else}
								<span>Present</span>
							{/if}
						</p>

						<h2>{experience.title}</h2>
						<div class="experience-body text-gray-400">
							{#if experience.content}
								{@const Content = experience.content}
								<Content />
							{:else if experience.description}
								<p>{experience.description}</p>
							{/if}
						</div>
					</article>
				</li>
			{/each}
		</ol>
	</section>
</div>

<style>
	.experience {
		--timeline-color: #1447e6;
		color: var(--timeline-color);
	}

	h1 {
		margin: 0 0 3rem;
		text-align: left;
	}

	.timeline {
		position: relative;
		max-width: 70rem;
		margin: 0 auto;
		padding: 2rem 0;
		list-style: none;
	}

	.timeline::before {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 50%;
		width: 2px;
		transform: translateX(-50%);
		background: var(--timeline-color);
		opacity: 0.8;
	}

	.timeline-item {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		column-gap: 5rem;
	}

	.timeline-item + .timeline-item {
		margin-top: 5rem;
	}

	.timeline-dot {
		position: absolute;
		top: 0.1rem;
		left: 50%;
		width: 14px;
		height: 14px;
		/* border-color: #101122; */
		border: 2px solid var(--timeline-color);
		border-radius: 50%;
		transform: translateX(-50%);
		background: #101122;
	}

	.experience-content {
		grid-column: 1;
		text-align: right;
	}

	.right .experience-content {
		grid-column: 2;
		text-align: left;
	}

	.date {
		margin: 0 0 0.75rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #4a5565;
		text-align: right;
	}

	.right .date {
		margin: 0 0 0.75rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #4a5565;
		text-align: left;
	}

	h2 {
		margin: 0 0 0.75rem;
		font-size: 1.5rem;
		color: #d1d5dc;
	}

	.experience-content > p:last-child {
		margin: 0;
		line-height: 1.7;
		color: #99a1af;
	}

	@media (max-width: 640px) {
		.timeline::before,
		.timeline-dot {
			left: 0;
		}

		.timeline-item {
			grid-template-columns: minmax(0, 1fr);
			padding-left: 2rem;
		}

		.experience-content,
		.right .experience-content {
			grid-column: 1;
			text-align: left;
		}
	}
</style>