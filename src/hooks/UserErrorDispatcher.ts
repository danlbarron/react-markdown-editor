import type { Dispatch, SetStateAction } from "react"
import { useEffect, useState } from "react";

/**
 * Hook used to dispatch errors that are catchable via an error boundary.
 * @returns A dispatcher used to throw errors.
 */
export default function useErrorDispatcher(): Dispatch<SetStateAction<Error>> {
    const [error, throwError] = useState<Error>();

    useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    return throwError as Dispatch<SetStateAction<Error>>;
}