import React from 'react';

const ViewLayout = ({
    title,
    description,
    action,
    children,
    maxWidthClass = ""
}) => {
    return (
        <div className={`${maxWidthClass} mx-auto animate-in fade-in duration-500 space-y-8`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b pb-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-slate-500 mt-1 font-medium italic">
                            {description}
                        </p>
                    )}
                </div>
                {action && (
                    <div className="w-full md:w-auto">
                        {action}
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default ViewLayout;
