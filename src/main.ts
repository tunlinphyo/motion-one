import { SCRUB } from './scripts/helpers/const'
import gsap from './scripts/helpers/gsap'
import { applyStyles, elems } from './scripts/helpers/utils'
import './style.css'
import SplitType from "split-type"

window.onload = () => {
    banner()
    technical()
}

function banner() {
    const titleStart = new SplitType(".title-start", { types: 'chars' })

    const timeline = gsap.createTimeline({
        trigger: ".banner",
        start: "top top",
        end: "bottom top",
        scrub: SCRUB,
    })

    timeline.to([ ...titleStart.chars?.reverse() as HTMLElement[] ], {
        x: "100vh",
        rotate: 45,
        stagger: 0.1,
    })
}

function technical() {
    const pages = elems(".page")
    const ease = "power1.inOut"

    const timeline = gsap.createTimeline({
        trigger: ".technical",
        start: "top center",
        end: "bottom top",
        scrub: SCRUB,
    })

    timeline.to(".technical-book", {
        x: 0,
        scale: 1,
        ease,
    })

    Array.from(pages).forEach((page, index) => {
        timeline.to(page, {
            rotateY: -180,
            zIndex: 99,
            ease,
            onComplete: () => {
                applyStyles(page, { zIndex: index })
            }
        }, index ? ">" : "<")
    })

    timeline.to(".technical-book", {
        x: "25%",
        ease,
    }, "<")
}


