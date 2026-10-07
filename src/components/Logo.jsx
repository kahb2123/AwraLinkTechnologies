export default function Logo({ variant = 'dark', showName = false }) {
  return (
    <span className={`logo logo--${variant}`}>
      <img
        className="logo__image"
        src="/aweralink-logo.png"
        alt={showName ? '' : 'AweraLink Technologies PLC'}
        width="92"
        height="68"
        loading="eager"
        decoding="async"
      />
      {showName && (
        <span className="logo__text">
          <span className="logo__name">AweraLink</span>
          <span className="logo__sub">TECHNOLOGIES PLC</span>
        </span>
      )}
    </span>
  );
}
