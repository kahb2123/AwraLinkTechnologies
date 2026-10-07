export default function Logo({ variant = 'dark' }) {
  return (
    <span className={`logo logo--${variant}`}>
      <span className="logo__mark" aria-hidden="true">
        <img
          src="/logo-mark.svg"
          alt=""
          width="44"
          height="44"
          loading="eager"
          decoding="async"
        />
      </span>
      <span className="logo__text">
        <span className="logo__name">
          Awera<strong>Link</strong>
        </span>
        <span className="logo__sub">TECHNOLOGIES PLC</span>
      </span>
    </span>
  );
}
