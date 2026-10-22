export default function StatusMessage({
  type = "info",
  title,
  children,
  actionLabel,
  onAction,
}) {
  const isError = type === "error";

  return (
    <section
      className={`status-message status-${type}`}
      role={isError ? "alert" : undefined}
    >
      <h2>
        {isError ? title : <output>{title}</output>}
      </h2>

      {children && <div>{children}</div>}

      {onAction && (
        <button
          type="button"
          className="button button-secondary"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </section>
  );
}