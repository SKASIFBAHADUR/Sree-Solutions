import React from 'react';
import { ArrowRight } from 'lucide-react';

const PremiumServiceCard = ({
    title = "Digital Transformation",
    description = "Strategic guidance to modernize operations, optimize technology, and deliver measurable business outcomes at scale.",
    icon: Icon = null,
    image = null,
    imageIcon = null,
    colorScheme = "blue", // blue, purple, emerald, gold, graphite
    slug = "",
    ...props
}) => {
    const handleClick = (e) => {
        if (props.onClick) {
            props.onClick(e);
            return;
        }
        if (slug) {
            e.preventDefault();
            window.history.pushState({}, '', `/services/${slug}`);
            window.dispatchEvent(new Event('popstate'));
        }
    };

    // Sophisticated color palettes for different card variants
    const colorSchemes = {
        blue: {
            gradient: 'from-slate-50 via-blue-50/30 to-indigo-50/20',
            accentGradient: 'from-blue-500/10 via-indigo-500/5 to-slate-500/5',
            glowColor: 'bg-blue-400/20',
            borderColor: 'border-slate-200/60',
            hoverBorder: 'hover:border-blue-300/70',
            textAccent: 'text-blue-600',
            iconColor: 'text-blue-600'
        },
        purple: {
            gradient: 'from-slate-50 via-purple-50/30 to-violet-50/20',
            accentGradient: 'from-purple-500/10 via-violet-500/5 to-slate-500/5',
            glowColor: 'bg-purple-400/20',
            borderColor: 'border-slate-200/60',
            hoverBorder: 'hover:border-purple-300/70',
            textAccent: 'text-purple-600',
            iconColor: 'text-purple-600'
        },
        emerald: {
            gradient: 'from-slate-50 via-emerald-50/30 to-teal-50/20',
            accentGradient: 'from-emerald-500/10 via-teal-500/5 to-slate-500/5',
            glowColor: 'bg-emerald-400/20',
            borderColor: 'border-slate-200/60',
            hoverBorder: 'hover:border-emerald-300/70',
            textAccent: 'text-emerald-600',
            iconColor: 'text-emerald-600'
        },
        gold: {
            gradient: 'from-slate-50 via-amber-50/30 to-yellow-50/20',
            accentGradient: 'from-amber-500/10 via-yellow-500/5 to-slate-500/5',
            glowColor: 'bg-amber-400/20',
            borderColor: 'border-slate-200/60',
            hoverBorder: 'hover:border-amber-300/70',
            textAccent: 'text-amber-700',
            iconColor: 'text-amber-600'
        },
        graphite: {
            gradient: 'from-slate-50 via-gray-50/30 to-zinc-50/20',
            accentGradient: 'from-slate-500/10 via-gray-500/5 to-zinc-500/5',
            glowColor: 'bg-slate-400/20',
            borderColor: 'border-slate-200/60',
            hoverBorder: 'hover:border-slate-300/70',
            textAccent: 'text-slate-700',
            iconColor: 'text-slate-600'
        },
        navy: {
            gradient: 'from-slate-50 via-blue-50/30 to-blue-100/20',
            accentGradient: 'from-blue-600/10 via-blue-700/5 to-slate-500/5',
            glowColor: 'bg-blue-600/20',
            borderColor: 'border-blue-200/40',
            hoverBorder: 'hover:border-blue-400/60',
            textAccent: 'text-blue-800',
            iconColor: 'text-blue-700',
            titleGradient: 'linear-gradient(to right, #001F3F, #1E3A8A, #60A5FA)'
        },
        orange: {
            gradient: 'from-slate-50 via-amber-50/30 to-orange-100/20',
            accentGradient: 'from-orange-500/10 via-amber-500/5 to-slate-500/5',
            glowColor: 'bg-orange-400/20',
            borderColor: 'border-orange-200/40',
            hoverBorder: 'hover:border-orange-400/60',
            textAccent: 'text-orange-700',
            iconColor: 'text-orange-600',
            titleGradient: 'linear-gradient(to right, #C2410C, #F97316, #FBBF24)'
        }
    };

    const colors = colorSchemes[colorScheme] || colorSchemes.blue;

    return (
        <a
            href={slug ? `/services/${slug}` : '#'}
            onClick={handleClick}
            className="group block cursor-pointer"
        >
            <div className={`
                relative overflow-hidden
                rounded-2xl
                border ${colors.borderColor} ${colors.hoverBorder}
                bg-gradient-to-br ${colors.gradient}
                p-10
                transition-all duration-500 ease-out
                hover:shadow-2xl hover:shadow-slate-900/5
                hover:-translate-y-1
            `}>
                {/* Abstract color layer - subtle gradient glow */}
                <div className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    bg-gradient-to-br ${colors.accentGradient}
                    transition-opacity duration-500
                `}></div>

                {/* Light color band at top */}
                <div className={`
                    absolute top-0 left-0 right-0 h-1
                    ${colors.glowColor}
                    blur-sm
                `}></div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Image Visual */}
                    {image && (
                        <div className="mb-8 relative group/img flex justify-center w-full">
                            <div className="
                                relative z-10 w-full overflow-hidden rounded-xl
                                bg-white backdrop-blur-sm border border-slate-200/40
                                shadow-sm group-hover:shadow-lg transition-all duration-500
                                flex items-center justify-center
                                min-h-[220px] p-4 place-content-center
                            ">
                                <img
                                    src={image}
                                    alt={title}
                                    loading="eager"
                                    className="
                                        w-full h-48 object-contain block
                                        group-hover:scale-105 transition-transform duration-700 ease-out
                                        mix-blend-multiply
                                    "
                                />
                                {/* Subtle internal depth */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/[0.02] to-transparent pointer-events-none"></div>
                            </div>

                            {/* Proportional Glow */}
                            <div className={`
                                absolute -inset-4 opacity-0 group-hover:opacity-100
                                bg-gradient-to-br ${colors.accentGradient}
                                blur-2xl transition-opacity duration-700 -z-10
                            `}></div>
                        </div>
                    )}

                    {/* Icon or Image Icon */}
                    {(Icon || imageIcon) && !image && (
                        <div className="mb-6Subtle internal depth">
                            <div className={`
                                inline-flex p-1.5 rounded-xl
                                bg-white/80 backdrop-blur-sm
                                border border-slate-200/50
                                group-hover:scale-110
                                transition-transform duration-300
                            `}>
                                {imageIcon ? (
                                    <img
                                        src={imageIcon}
                                        alt={title}
                                        className="w-10 h-10 object-contain p-0.5 rounded-md shadow-sm"
                                    />
                                ) : (
                                    <Icon className={`w-7 h-7 ${colors.iconColor}`} />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Title */}
                    <h3
                        className={`
                            text-2xl font-semibold mb-4
                            tracking-tight leading-tight
                            ${colors.titleGradient ? 'text-transparent bg-clip-text' : 'text-secondary-900 group-hover:text-secondary-950'}
                            transition-all duration-300
                        `}
                        style={colors.titleGradient ? { backgroundImage: colors.titleGradient } : {}}
                    >
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="
                        text-secondary-600 leading-relaxed mb-6
                        font-light text-base
                    ">
                        {description}
                    </p>

                    {/* Call to action */}
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <span className={`${colors.textAccent} group-hover:gap-3 transition-all duration-300`}>
                            Learn more
                        </span>
                        <ArrowRight className={`
                            w-4 h-4 ${colors.textAccent}
                            transform group-hover:translate-x-1
                            transition-transform duration-300
                        `} />
                    </div>
                </div>
            </div>
        </a>
    );
};

export default PremiumServiceCard;
