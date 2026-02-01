import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RATING_LABELS = {
    1: "Minimal - Informational only",
    2: "Low - Convenient but optional",
    3: "Medium - Improves efficiency",
    4: "High - Key performance driver",
    5: "Critical - Essential for operations"
};

const StarRating = ({
    value,
    onChange,
    label = "Operational Dependency",
    description = "How critical is this to your daily work?",
    readOnly = false,
    showLabels = true,
    size = 24
}) => {
    const [hoverValue, setHoverValue] = useState(0);

    const displayValue = hoverValue || value;

    return (
        <div className="space-y-4">
            {(label || description) && (
                <div className="space-y-1">
                    {label && <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</label>}
                    {description && <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed">{description}</p>}
                </div>
            )}

            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                            key={rating}
                            type="button"
                            onClick={() => !readOnly && onChange(rating)}
                            onMouseEnter={() => !readOnly && setHoverValue(rating)}
                            onMouseLeave={() => !readOnly && setHoverValue(0)}
                            disabled={readOnly}
                            className={`transition-all rounded-xl focus:outline-none ${readOnly ? 'cursor-default' : 'hover:scale-110'}`}
                        >
                            <Star
                                size={size}
                                className={`transition-colors ${displayValue >= rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'fill-slate-100 text-slate-200'
                                    }`}
                            />
                        </button>
                    ))}
                </div>
                {showLabels && !readOnly && (
                    <div className="text-sm font-bold text-slate-600 h-5 transition-opacity duration-200">
                        {RATING_LABELS[displayValue] || ""}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StarRating;
