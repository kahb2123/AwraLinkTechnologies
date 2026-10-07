export default function Logo({ variant = 'dark' }) {
  return (
    <span className={`logo logo--${variant}`}>
      <img
        className="logo__image"
        src="/aweralink-logo.png"
        alt="AweraLink Technologies PLC"
        width="92"
        height="68"
        loading="eager"
        decoding="async"
      />
    </span>
  );
}
