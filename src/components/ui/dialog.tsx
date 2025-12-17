"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// Since I don't have radix installed, I will create a pure React simulated Dialog
// This avoids installing 5 dependencies.

export function Dialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false)
    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {children}
        </DialogContext.Provider>
    )
}

const DialogContext = React.createContext<{ open: boolean, setOpen: (o: boolean) => void }>({ open: false, setOpen: () => { } })

export function DialogTrigger({ asChild, children }: any) {
    const { setOpen } = React.useContext(DialogContext)
    return (
        <div onClick={() => setOpen(true)} className="cursor-pointer inline-block">
            {children}
        </div>
    )
}

export function DialogContent({ children, className }: any) {
    const { open, setOpen } = React.useContext(DialogContext)
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className={cn("relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full bg-white", className)}>
                {children}
                <button
                    onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>
            </div>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>
        </div>
    )
}

export function DialogHeader({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "flex flex-col space-y-1.5 text-center sm:text-left",
                className
            )}
            {...props}
        />
    )
}

export function DialogTitle({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn(
                "text-lg font-semibold leading-none tracking-tight",
                className
            )}
            {...props}
        />
    )
}
