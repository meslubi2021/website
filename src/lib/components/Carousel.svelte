<script lang="ts">
    let carousel: HTMLElement;

    export let isBig = false;
    export let gap = 32;
    let scroll = 0;

    function calculateScrollAmount(prev = false) {
        const direction = prev ? -1 : 1;
        const carouselSize = carousel?.clientWidth;
        const childSize = (carousel.childNodes[0] as HTMLUListElement)?.clientWidth + gap;

        scroll = scroll || carouselSize;

        const numberOfItems = Math.floor(carouselSize / childSize);
        const overflow = scroll % childSize;
        const amount = numberOfItems * childSize - overflow * direction;
        scroll += amount * direction;
        return amount * direction;
    }

    function next() {
        carousel.scrollBy({
            left: calculateScrollAmount(),
            behavior: 'smooth'
        });
    }
    function prev() {
        carousel.scrollBy({
            left: calculateScrollAmount(true),
            behavior: 'smooth'
        });
    }

    let isEnd = false;
    let isStart = true;

    function handleScroll() {
        isStart = carousel.scrollLeft <= 0;
        isEnd = Math.ceil(carousel.scrollLeft + carousel.offsetWidth) >= carousel.scrollWidth;
    }
</script>

<div>
    <div class="u-flex u-flex-wrap u-cross-center u-margin-block-start-8">
        <slot name="header" />
        <div class="u-flex u-gap-12 u-cross-end u-margin-inline-start-auto">
            <button
                class="aw-icon-button"
                aria-label="Move carousel backward"
                disabled={isStart}
                on:click={() => prev()}
            >
                <span class="aw-icon-arrow-left" aria-hidden="true" />
            </button>
            <button
                class="aw-icon-button"
                aria-label="Move carousel forward"
                disabled={isEnd}
                on:click={() => next()}
            >
                <span class="aw-icon-arrow-right" aria-hidden="true" />
            </button>
        </div>
    </div>

    <div class="carousel-wrapper" data-state={isStart ? 'start' : isEnd ? 'end' : 'middle'}>
        <ul
            class="aw-grid-articles aw-u-gap-32 u-margin-block-start-32 carousel"
            class:is-big={isBig}
            bind:this={carousel}
            on:scroll={handleScroll}
        >
            <slot />
        </ul>
    </div>
</div>

<style lang="scss">
    .carousel-wrapper {
        position: relative;

        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 0;
            width: 60px;
            height: 100%;
            transition: ease 250ms;
            z-index: 100;
        }

        &::before {
            left: 0;
            background: linear-gradient(
                to right,
                hsl(var(--aw-color-background-docs)),
                transparent
            );
        }

        &[data-state='start']::before {
            opacity: 0;
        }

        &::after {
            right: 0;
            background: linear-gradient(to left, hsl(var(--aw-color-background-docs)), transparent);
        }

        &[data-state='end']::after {
            opacity: 0;
        }
    }

    .carousel {
        grid-auto-flow: column;
        overflow-x: scroll;
        scroll-snap-type: x proximity;

        scrollbar-width: none;
    }

    .carousel :global(li) {
        scroll-margin: 48px;
    }
</style>
