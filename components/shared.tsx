export function DeadlineBadge({ deadline }: { deadline: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-[#94A3B8]">
      Due {deadline}
    </span>
  );
}