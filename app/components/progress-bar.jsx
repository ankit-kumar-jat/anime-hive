import { useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useSpinDelay } from "spin-delay";
import { cn } from "~/lib/utils";

function ProgressBar() {
  const transition = useNavigation();
  const busy = transition.state !== "idle";
  const delayedPending = useSpinDelay(busy, {
    delay: 600,
    minDuration: 400,
  });
  const ref = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    if (delayedPending) setAnimationComplete(false);

    const animationPromises = ref.current
      .getAnimations()
      .map(({ finished }) => finished);

    Promise.allSettled(animationPromises).then(() => {
      if (!delayedPending) setAnimationComplete(true);
    });
  }, [delayedPending]);

  return (
    <div
      role="progressbar"
      aria-hidden={delayedPending ? undefined : true}
      aria-valuetext={delayedPending ? "Loading" : undefined}
      className={cn(
        "fixed inset-x-0 left-0 top-0 z-50 h-[0.20rem]",
        delayedPending && "animate-pulse"
      )}
    >
      <div
        ref={ref}
        className={cn(
          "h-full w-0 bg-orange shadow-md shadow-orange duration-700 ease-in-out",
          transition.state === "idle" &&
            (animationComplete
              ? "transition-none"
              : "w-full opacity-0 transition-all"),
          delayedPending && transition.state === "submitting" && "w-5/12",
          delayedPending && transition.state === "loading" && "w-5/6"
        )}
      />
    </div>
  );
}

export { ProgressBar };
