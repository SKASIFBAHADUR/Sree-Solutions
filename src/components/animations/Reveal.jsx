import React from "react";
import { motion } from "motion/react";

const baseEase = [0.22, 1, 0.36, 1];

const variants = {
    fadeInUp: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: baseEase } }
    },

    fadeInDown: {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: baseEase } }
    },

    slideInLeft: {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: baseEase } }
    },

    slideInRight: {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: baseEase } }
    },

    heroLeft: {
        hidden: { opacity: 0, x: -80 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: baseEase } }
    },

    heroRight: {
        hidden: { opacity: 0, x: 80 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: baseEase } }
    },

    popIn: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: baseEase } }
    },

    scaleUp: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: baseEase } }
    },

    smoothFade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    },

    calmFade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1.2, ease: baseEase } }
    },

    liftUp: {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 1.2, ease: baseEase }
        }
    },

    softBlurIn: {
        hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 1, ease: baseEase }
        }
    },

    /* ------------------- NEW PROFESSIONAL ANIMATIONS ------------------- */

    fadeInScale: {
        hidden: { opacity: 0, scale: 0.85 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.7, ease: baseEase }
        }
    },

    fadeInRotate: {
        hidden: { opacity: 0, scale: 0.9, rotate: -6 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { duration: 0.6, ease: baseEase }
        }
    },

    flipUp: {
        hidden: {
            opacity: 0,
            rotateX: 60,
            y: 40,
            transformPerspective: 800
        },
        visible: {
            opacity: 1,
            rotateX: 0,
            y: 0,
            transition: { duration: 0.7, ease: baseEase }
        }
    },

    floatIn: {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.9,
                ease: baseEase
            }
        }
    },

    zoomOutIn: {
        hidden: { opacity: 0, scale: 1.15 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: baseEase }
        }
    },

    clipReveal: {
        hidden: {
            opacity: 0,
            clipPath: "inset(0 0 100% 0)"
        },
        visible: {
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            transition: { duration: 0.7, ease: baseEase }
        }
    }
};

const Reveal = ({
    children,
    variant = "fadeInUp",
    className,
    delay = 0.15,
    width = "100%",
    force = false
}) => {
    const selected = variants[variant] || variants.fadeInUp;

    const finalVariants = {
        hidden: selected.hidden,
        visible: {
            ...selected.visible,
            transition: {
                ...(selected.visible.transition || {}),
                delay
            }
        }
    };

    return (
        <motion.div
            variants={finalVariants}
            initial="hidden"
            whileInView={!force ? "visible" : undefined}
            animate={force ? "visible" : undefined}
            viewport={{ once: true, amount: 0.45 }}
            className={className}
            style={{ width }}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;