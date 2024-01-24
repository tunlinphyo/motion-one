import { animate, inView, scroll, spring, stagger, timeline } from 'motion'
import './style.css'

const elem = <T extends Element>(selector: string) => document.querySelector(selector) as T
const elems = <T extends Element>(selector: string) => document.querySelectorAll(selector) as NodeListOf<T>

document.addEventListener('DOMContentLoaded', () => {
    const counts = ["one", "two", "three", "four"]

    let velocity = 0

    scroll(({ y }) => {
        velocity = y.velocity
        console.log(velocity)
    })

    // HEADER
    const headerTrigger = elem(".header-trigger")

    scroll(
        timeline(
            [
                [".header", { height: ["100vh", "var(--header-height)"] }, { easing: 'linear' }],
                [".name", { fontSize: ["clamp(3rem, 12vw, 10rem)", "1.2rem"] }, { easing: 'linear', at: 0 }],
                [".hello", { opacity: [1, 0] }, { at: 0 }],
                [".intro", { opacity: [1, 0] }, { at: 0 }]
            ]
        ),
        {
            target: headerTrigger,
            offset: ["start start", "end 60px"]
        }
    )

    // TECHNICAL
    const stickyContainer = elem(".technical-sticky")
    const endTrigger = elem(".trigger--four")
    const cardsTrigger = elem(".cards-trigger")

    scroll(
        animate(".technical .section-title", {
            scale: [1, 2],
            opacity: [1, 0]
        }, {
            easing: "linear",
            delay: 0,
        }),
        {
            target: elem(".technical .section-title"),
            offset: ["start center", "start start"]
        }
    )

    scroll(
        animate(".bg-circle", {
            width: ["var(--sm-size)", "100%"],
            height: ["var(--sm-size)", "100%"],
            borderRadius: ["var(--sm-size)", "0"],
        }),
        {
            target: stickyContainer,
            offset: ["start center", "start 60px"]
        }
    )

    scroll(
        animate(stickyContainer, {
            scale: [1, .8]
        }, { easing: "linear", duration: 0 }),
        {
            target: endTrigger,
            offset: ["end end", "end start"]
        }
    )

    scroll(
        animate(".scroll-indicator", {
            rotate: [0, 2880],
        }, {
            easing: "linear",
            delay: 0,
        }),
        {
            target: cardsTrigger,
            offset: ["start end", "end start"]
        }
    )

    counts.forEach((name, index) => {
        const trigger = elem(`.card-trigger.trigger--${name}`)
        const card = elem(`.card--${name}`)
        const title = card.querySelector("h2") as Element
        const desc = card.querySelector("p") as Element
        const skills = card.querySelectorAll(".skill") as NodeListOf<Element>

        const multipler = (index % 2) ? -1.6 : 1.6
        const rotate = (index % 2) ? -45 : 45
        const distance = Math.max(window.innerHeight, window.innerWidth)

        inView(trigger, () => {
            animate([ card, title, desc, ...skills ], {
                x: [distance * multipler, 0],
                y: [40, 0],
                rotate: [rotate, 0],
            }, {
                easing: spring({ mass: 1, stiffness: 50 }),
                delay: stagger(0.01)
            })
            return () => {
                animate([ card ], {
                    x: [0, distance * multipler],
                    y: [0, 40],
                    rotate: [0, rotate]
                }, {
                    duration: .8,
                    easing: 'ease-out',
                })
            }
        }, { amount: 0 })
    })

    // PROJECTS
    // const firstTrigger = elem('.project-trigger.trigger--one')
    // const projectsTrigger = elem(".projects-trigger")
    const projectMedia = elem(".project-media")
    // const mediaObject = elem(".media-object")

    scroll(
        animate(".projects .section-title", {
            scale: [1, 2],
            opacity: [1, 0]
        }, {
            easing: "linear",
            delay: 0,
        }),
        {
            target: elem(".projects .section-title"),
            offset: ["start center", "start start"]
        }
    )

    // scroll(
    //     animate(mediaObject, {
    //         rotate: [0, 1440],
    //         scale: [1, 1.2, 1, 1.2, 1, 1.2, 1, 1.2, 1],
    //     }, {
    //         easing: "linear",
    //         delay: 0,
    //     }),
    //     {
    //         target: projectsTrigger,
    //         offset: ["start start", "end start"],
    //     }
    // )

    inView(".projects-trigger", () => {
        animate(projectMedia, {
            // x: [window.innerWidth * -1.6, 0],
            // rotate: [-45, 0],
            scale: [0, 1],
            opacity: [0, 1]
        }, {
            easing: spring({ mass: 2, stiffness: 25 }),
            delay: stagger(0.04)
        })

        return () => {
            animate(".project-media", {
                // x: [0, window.innerWidth * -1.6],
                // rotate: [0, -45]
                scale: [1, 4],
                opacity: [1, 0]
            }, {
                duration: 1,
                easing: 'ease-out',
            })
        }
    }, { amount: 0 })

    counts.forEach((name) => {
        const trigger = elem(`.project-trigger.trigger--${name}`)
        const media = elem(`.project-image.image--${name}`)

        inView(trigger, () => {
            animate(media, { opacity: [0, 1], scale: [0, 1] }, { easing: spring({ mass: 1.4 }) })

            return () => {
                animate(media, { opacity: [1, 0], scale: [1, 0] })
            }
        }, { amount: .5 })
    })
})

