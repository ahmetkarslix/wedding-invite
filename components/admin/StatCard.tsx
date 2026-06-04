export function StatCard({
  title,
  guests,
  responses,
  notAttending,
}: {
  title: string;
  guests: number;
  responses: number;
  notAttending: number;
}) {
  return (
    <div className="rounded-sm border border-line bg-paper p-5">
      <h3 className="font-body text-xs uppercase tracking-[0.2em] text-muted">{title}</h3>
      <p className="mt-3 font-body text-3xl font-light text-ink">
        {guests} <span className="text-base text-muted">kişi geliyor</span>
      </p>
      <div className="mt-3 flex gap-4 font-body text-xs text-ink-soft">
        <span>{responses} yanıt</span>
        <span aria-hidden="true">·</span>
        <span>{notAttending} katılmıyor</span>
      </div>
    </div>
  );
}
