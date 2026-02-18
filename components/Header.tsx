"use client";

export function Header({
  onOpenSubmit,
  onJumpToFeatured
}: {
  onOpenSubmit: () => void;
  onJumpToFeatured: () => void;
}) {
  return (
    <div className="topbar">
      <div className="container">
        <div className="headerRow">
          <div className="brand">
            <div className="logo" />
            <div>
              <div className="brandTitle">All Valley Events</div>
              <div className="brandSub">All public events • Every city in the RGV</div>
            </div>
          </div>

          <div className="actions">
            <button className="btn" onClick={onJumpToFeatured}>
              Featured
            </button>
            <button className="btn btnPrimary" onClick={onOpenSubmit}>
              Submit an event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
