"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type FontStyle = React.CSSProperties;

type TransitionValue = {
    type?: string;
    duration?: number;
    delay?: number;
    ease?: string | number[];
    staggerChildren?: number;
};

type StaggerFrom = "start" | "center" | "end" | "random";

type SpotlightRevealProps = {
    text?: string;
    font?: FontStyle;
    color?: string;

    blur?: number;
    staggerFrom?: StaggerFrom;

    transition?: TransitionValue;
    
    inViewTrigger?: boolean;
};

const START_SCALE = 1.45;

const mapEase = (ease: TransitionValue["ease"]): string => {
    if (typeof ease !== "string") return "power2.out";

    const easeMap: Record<string, string> = {
        linear: "none",
        easeIn: "power2.in",
        easeOut: "power2.out",
        easeInOut: "power2.inOut",
        circIn: "circ.in",
        circOut: "circ.out",
        circInOut: "circ.inOut",
        backIn: "back.in",
        backOut: "back.out(1.7)",
        backInOut: "back.inOut",
        anticipate: "back.out(1.7)",
    };

    return easeMap[ease] ?? ease;
};

export default function SpotlightReveal({
    text = "FOCUS REVEAL",
    font = {
        fontFamily: "inherit",
        fontSize: "inherit",
        fontWeight: "inherit",
        letterSpacing: "inherit",
        lineHeight: "inherit",
        textAlign: "inherit",
    },
    color = "inherit",

    blur = 20,
    staggerFrom = "start",

    transition = {
        type: "tween",
        duration: 0.4,
        delay: 0,
        ease: "easeOut",
        staggerChildren: 0.06,
    },
    inViewTrigger = true,
}: SpotlightRevealProps) {
    const containerRef = useRef<HTMLHeadingElement>(null);
    const textAlign =
        (font.textAlign as React.CSSProperties["textAlign"]) ?? "left";

    useEffect(() => {
        if (!containerRef.current) return;

        const chars = containerRef.current.querySelectorAll(".char");
        
        // Setup initial state
        gsap.set(chars, {
            opacity: 0,
            scale: START_SCALE,
            filter: `blur(${blur}px)`,
        });
        
        let observer: IntersectionObserver;
        
        const playAnimation = () => {
            gsap.killTweensOf(chars);
            gsap.to(chars, {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: transition.duration ?? 0.4,
                delay: transition.delay ?? 0,
                stagger: {
                    each: transition.staggerChildren ?? 0.06,
                    from: staggerFrom,
                },
                ease: mapEase(transition.ease),
            });
        };
        
        if (inViewTrigger) {
            observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        playAnimation();
                        observer.disconnect();
                    }
                },
                { threshold: 0.1 }
            );
            observer.observe(containerRef.current);
        } else {
            playAnimation();
        }

        return () => {
            if (observer) observer.disconnect();
            gsap.killTweensOf(chars);
        };
    }, [text, blur, staggerFrom, transition, inViewTrigger]);

    return (
        <span
            ref={containerRef}
            aria-label={text}
            style={{
                margin: 0,
                display: "inline-block",
                whiteSpace: "pre-wrap",
                color,
                ...font,
                textAlign,
            }}
        >
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    className="char"
                    aria-hidden="true"
                    style={{
                        display: "inline-block",
                        opacity: 0
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
}
