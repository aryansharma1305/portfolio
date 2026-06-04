import React, { useRef, useEffect, useState } from 'react';

const ALL_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const R1 = [...ALL_IMAGES.slice(0, 11), ...ALL_IMAGES.slice(0, 11), ...ALL_IMAGES.slice(0, 11)];
const R2 = [...ALL_IMAGES.slice(11), ...ALL_IMAGES.slice(11), ...ALL_IMAGES.slice(11)];

const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      setOffset((window.scrollY - top + window.innerHeight) * 0.25);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tileStyle: React.CSSProperties = {
    width: '380px',
    height: '240px',
    borderRadius: '18px',
    objectFit: 'cover',
    flexShrink: 0,
    display: 'block',
  };

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#0C0C0C',
        paddingTop: 'clamp(5rem, 10vw, 10rem)',
        paddingBottom: '3rem',
        overflow: 'hidden',
      }}
    >
      {/* Row 1 — right */}
      <div style={{ marginBottom: '12px', overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            transform: `translateX(${offset - 300}px)`,
            willChange: 'transform',
          }}
        >
          {R1.map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" style={tileStyle} />
          ))}
        </div>
      </div>

      {/* Row 2 — left */}
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            transform: `translateX(${-(offset - 300)}px)`,
            willChange: 'transform',
          }}
        >
          {R2.map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" style={tileStyle} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
