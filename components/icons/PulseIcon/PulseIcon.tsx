"use client";

import React from "react";

interface PulseIconProps {
    color?: string;
    icon: React.ReactNode;
}

/**
 * PulseIcon component renders a pulsating icon with multiple concentric circles.
 *
 * @param {PulseIconProps} props - The properties for the PulseIcon component.
 * @param {string} [props.color="red"] - The color of the pulsating circles. Can be a named color or a hex color code.
 * @param {React.ReactNode} props.icon - The icon to be displayed at the center of the pulsating circles.
 *
 * @returns {JSX.Element} The rendered PulseIcon component.
 *
 * @example
 * <PulseIcon color="#ff0000" icon={<SomeIcon />} />
 *
 * @remarks
 * - If the color is a named color, it will apply different shades for the circles.
 * - If the color is a hex color code, it will use the same color with varying opacity.
 */
const PulseIcon: React.FC<PulseIconProps> = ({ color = "red", icon }) => {
    const isHexColor = (color: string) => /^#([0-9A-F]{3}){1,2}$/i.test(color);

    return (
        <div className="relative flex items-center justify-center mb-5">
            {/* Cercle extérieur */}
            <span
                className={`absolute inline-flex h-20 w-20 rounded-full ${
                    isHexColor(color)
                        ? ""
                        : `bg-${color}-50 dark:bg-${color}-900`
                } ${isHexColor(color) ? "opacity-25" : ""}`}
                style={
                    isHexColor(color) ? { backgroundColor: `${color}25` } : {}
                }
            ></span>
            {/* 2e cercle */}
            <span
                className={`absolute inline-flex h-16 w-16 rounded-full ${
                    isHexColor(color)
                        ? ""
                        : `bg-${color}-100 dark:bg-${color}-900`
                } ${isHexColor(color) ? "opacity-75" : ""}`}
                style={
                    isHexColor(color) ? { backgroundColor: `${color}75` } : {}
                }
            ></span>
            {/* 3e cercle */}
            <span
                className={`absolute inline-flex h-12 w-12 rounded-full ${
                    isHexColor(color)
                        ? ""
                        : `bg-${color}-400 dark:bg-${color}-400`
                } ${isHexColor(color) ? "opacity-75" : ""}`}
                style={
                    isHexColor(color) ? { backgroundColor: `${color}75` } : {}
                }
            ></span>
            {/* Cercle intérieur */}
            <span
                className={`relative inline-flex rounded-full h-8 w-8 ${
                    isHexColor(color)
                        ? ""
                        : `bg-${color}-500 dark:bg-${color}-600`
                } flex items-center justify-center`}
                style={isHexColor(color) ? { backgroundColor: color } : {}}
            >
                {icon}
            </span>
        </div>
    );
};

export default PulseIcon;
