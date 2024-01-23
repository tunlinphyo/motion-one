import { animate, inView, scroll, spring, stagger, timeline } from 'motion'
import './style.css'

const elem = <T extends Element>(selector: string) => document.querySelector(selector) as T
const elems = <T extends Element>(selector: string) => document.querySelectorAll(selector) as NodeListOf<T>

document.addEventListener('DOMContentLoaded', () => {
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
    const stickyContainer = elem(".sticky-container")

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

    const cards = ["one", "two", "three", "four"]
    cards.forEach((name) => {
        const trigger = elem(`.trigger--${name}`)
        
        inView(trigger, () => {
            animate(`.card--${name}`, {
                x: [window.innerWidth * 1.5, 0],
                rotate: ["45deg", "0deg"]
            }, {
                duration: 2,
                easing: spring(),
            })
            return () => {  
                animate(`.card--${name}`, {
                    x: [0, window.innerWidth * 1.5],
                    rotate: ["0deg", "45deg"]
                }, {
                    duration: .8,
                    easing: 'ease-in',
                })
            }
        }, { amount: 0, margin: "0px 0px 0px 0px" })
    })

})

