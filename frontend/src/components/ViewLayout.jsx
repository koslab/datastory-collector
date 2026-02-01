import React from 'react';

const ViewLayout = ({
    title,
    description,
    action,
    children,
    isEmpty = false,
    emptyTitle = "No Items Found",
    emptyDescription = "Get started by creating a new item.",
    EmptyIcon = null,
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
            {isEmpty ? (
                <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                    {EmptyIcon && (
                        <EmptyIcon className="mx-auto text-slate-200 mb-6" size={64} />
                    )}
                    <p className="text-slate-400 font-black text-xl tracking-tight uppercase">{emptyTitle}</p>
                    {emptyDescription && (
                        <p className="text-slate-400 mt-2 font-medium">{emptyDescription}</p>
                    )}
                </div>
            ) : children}
        </div>
    );
};

export default ViewLayout;
