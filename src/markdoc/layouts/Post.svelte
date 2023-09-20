<script context="module" lang="ts">
	export type PostsData = {
		title: string;
		description: string;
		date: Date;
		cover: string;
		timeToRead: number;
		author: string;
		category: string;
		href: string;
	};
</script>

<script lang="ts">
	import { FooterNav, MainFooter, Newsletter } from '$lib/components';
	import { Main } from '$lib/layouts';
	import { getContext } from 'svelte';
	import type { AuthorData } from './Author.svelte';
	import type { CategoryData } from './Category.svelte';

	export let title: string;
	export let description: string;
	export let author: string;
	export let date: string;
	export let timeToRead: string;
	export let cover: string;
	export let category: string;

	const authors = getContext<AuthorData[]>('authors');
	const authorData = authors.find((a) => a.name.includes(author));
	const categoriesList = getContext<CategoryData[]>('categories');
	const categories = getValidCategories();
	const posts = getContext<PostsData[]>('posts');

	function getValidCategories() {
		if (!category) return undefined;
		const cats = category.split(',');
		return categoriesList.filter((c) =>
			cats.some((cat) => cat.toLocaleLowerCase() === c.name.toLocaleLowerCase())
		);
	}
</script>

<Main>
	<div class="aw-big-padding-section">
		<div class="aw-big-padding-section">
			<div class="aw-big-padding-section-level-1">
				<div class="aw-big-padding-section-level-2">
					<div class="aw-container" style="--container-size:42.5rem">
						<article class="aw-main-article">
							<header class="aw-main-article-header">
								<a class="aw-link aw-u-color-text-secondary" href="/blog">
									<span class="aw-icon-chevron-left" aria-hidden="true" />
									<span>Back to blog</span>
								</a>
								<ul class="aw-metadata aw-caption-400">
									<li>
										<time datetime={date}>{new Date(date).toLocaleDateString()}</time>
									</li>
									{#if timeToRead}
										<li>{timeToRead} min</li>
									{/if}
								</ul>
								<h1 class="aw-title aw-u-color-text-primary">{title}</h1>
								{#if description}
									<p class="aw-description u-margin-block-start-8">
										{description}
									</p>
								{/if}
								{#if authorData}
									<div class="aw-author u-margin-block-start-16">
										<a href={authorData.href} class="u-flex u-cross-center u-gap-8">
											{#if authorData.avatar}
												<img
													class="aw-author-image"
													src={authorData.avatar}
													width="44"
													height="44"
													alt=""
												/>
											{/if}
											<div class="u-flex-vertical">
												<h4 class="aw-sub-body-400 aw-u-color-text-primary">{authorData.name}</h4>
												<p class="aw-caption-400">{authorData.role}</p>
											</div>
										</a>
										<ul class="u-flex u-gap-8 u-margin-inline-start-auto u-cross-child-center">
											{#if authorData.twitter}
												<li>
													<a
														href={authorData.twitter}
														class="aw-icon-button"
														aria-label="Author twitter"
														target="_blank"
														rel="noopener noreferrer"
													>
														<span class="aw-icon-x" aria-hidden="true" />
													</a>
												</li>
											{/if}
											{#if authorData.linkedin}
												<li>
													<a
														href={authorData.linkedin}
														class="aw-icon-button"
														aria-label="Author LinkedIn"
														target="_blank"
														rel="noopener noreferrer"
													>
														<span class="aw-icon-linkedin" aria-hidden="true" />
													</a>
												</li>
											{/if}
											{#if authorData.github}
												<li>
													<a
														href={authorData.github}
														class="aw-icon-button"
														aria-label="Author GitHub"
														target="_blank"
														rel="noopener noreferrer"
													>
														<span class="aw-icon-github" aria-hidden="true" />
													</a>
												</li>
											{/if}
										</ul>
									</div>
								{/if}
							</header>
							{#if cover}
								<div class="aw-media-container">
									<img class="u-block" src={cover} alt="console dashboard" />
								</div>
							{/if}

							<div class="aw-article-content u-margin-block-start-32">
								<slot />
							</div>
						</article>
						{#if categories?.length}
							<div class="u-flex u-gap-16">
								{#each categories as cat}
									<a href={cat.href} class="aw-tag">{cat.name}</a>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="aw-big-padding-section-level-1 aw-u-sep-block-start">
		<div class="aw-big-padding-section-level-2">
			<div class="aw-container">
				<h3 class="aw-label aw-u-color-text-primary">Read next</h3>
				<section class="u-margin-block-start-32">
					<ul class="aw-grid-articles">
						{#each posts.filter((p) => p.title !== title).slice(0, 3) as post}
							{@const author = authors.find((a) => a.name.includes(post.author))}
							<li>
								<a class="aw-grid-articles-item" href="/blog">
									<div class="aw-grid-articles-item-image">
										<img src={post.cover} class="aw-image-ratio-4/3" alt={post.title} />
									</div>
									<div class="aw-grid-articles-item-content">
										<h4 class="aw-label aw-u-color-text-primary">
											{post.title}
										</h4>
										<div class="aw-author">
											<div class="u-flex u-cross-center u-gap-8">
												<img
													class="aw-author-image"
													src={author?.avatar}
													width="24"
													height="24"
													alt={author?.name}
												/>
												<div class="aw-author-info">
													<h4 class="aw-sub-body-400 aw-u-color-text-primary">{author?.name}</h4>
													<ul class="aw-metadata aw-caption-400 aw-is-not-mobile">
														<li>{post.date.toLocaleDateString()}</li>
														<li>{post.timeToRead} min</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</a>
							</li>
						{/each}
					</ul>
				</section>
			</div>
		</div>
	</div>

	<div
		class="aw-big-padding-section-level-2 is-margin-replace-padding u-position-relative u-overflow-hidden"
	>
		<div class="aw-container">
			<Newsletter />
			<FooterNav />
			<MainFooter />
		</div>
	</div>
</Main>