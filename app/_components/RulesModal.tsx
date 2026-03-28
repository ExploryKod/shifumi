"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useMemo, useRef, type MouseEvent } from "react";
import { createPortal } from "react-dom";

type RulesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const RulesModal = ({ isOpen, onClose }: RulesModalProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const desktopCloseButtonRef = useRef<HTMLButtonElement>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const isMounted = useMemo(() => typeof document !== "undefined", []);

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen || !isMounted) {
      return;
    }

    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const rafId = window.requestAnimationFrame(() => {
      const closeTarget = window.matchMedia("(min-width: 768px)").matches
        ? desktopCloseButtonRef.current
        : mobileCloseButtonRef.current;
      closeTarget?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(rafId);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
      previousActiveElementRef.current?.focus();
    };
  }, [isMounted, isOpen, onClose]);

  if (!isOpen || !isMounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-start justify-center bg-white p-0 md:bg-black/55 md:p-8"
      onClick={handleBackdropClick}
      aria-hidden="true"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="md:mt-[calc(var(--header-height)*0.8)] relative flex min-h-dvh w-full flex-col bg-white px-8 pb-12 pt-24 text-navy-900 md:min-h-0 md:max-w-100 md:rounded-lg md:px-8 md:pb-8 md:pt-8 md:shadow-2xl"
      >
        <div className="mb-8 hidden items-start justify-between md:flex">
          <h2 id={titleId} className="text-3xl font-bold">
            RULES
          </h2>
          <button
            ref={desktopCloseButtonRef}
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md p-1 text-gray-600 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            aria-label="Close rules modal"
          >
            <Image src="/icons/icon-close.svg" alt="" width={20} height={20} />
          </button>
        </div>

        <h2 id={titleId} className="mb-20 text-center text-5xl font-bold md:hidden">
          RULES
        </h2>

        <p id={descriptionId} className="sr-only">
          Diagram showing the rules of rock paper scissors.
        </p>

        <div className="flex flex-1 items-start justify-center md:items-center">
          <Image
            src="/images/image-rules.svg"
            alt="Paper beats rock, rock beats scissors, scissors beats paper."
            width={305}
            height={271}
            className="h-auto w-full max-w-76"
            priority
          />
        </div>

        <div className="mt-auto flex justify-center pt-20 md:hidden">
          <button
            ref={mobileCloseButtonRef}
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-md p-1 text-gray-600 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            aria-label="Close rules modal"
          >
            <Image src="/icons/icon-close.svg" alt="" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
