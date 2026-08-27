import React, { useEffect, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import './CinematicHero.css';

const INTRO_STORAGE_KEY = 'chips-and-bytes:welcome-seen';
const FRAME_DURATION_MS = 5000;

const heroFrames = [
  {
    src: 'https://images.unsplash.com/photo-1739168283356-d1b9bd1c0954?auto=format&fit=crop&fm=webp&q=84&w=2400',
    position: 'center 52%',
    label: 'Microprocessor',
    kind: 'photo',
  },
  {
    src: '/assets/architecture/pipeline-study.svg',
    position: 'center',
    label: 'Pipeline',
    kind: 'diagram',
  },
  {
    src: 'https://images.unsplash.com/photo-1631376604944-ddb97deb9839?auto=format&fit=crop&fm=webp&q=84&w=2400',
    position: 'center 50%',
    label: 'FPGA development board',
    kind: 'photo',
  },
  {
    src: '/assets/architecture/cache-tlb-study.svg',
    position: 'center',
    label: 'Caches + TLBs',
    kind: 'diagram',
  },
  {
    src: '/assets/architecture/qemu-study.svg',
    position: 'center',
    label: 'QEMU emulation',
    kind: 'diagram',
  },
  {
    src: '/assets/architecture/memory-study.svg',
    position: 'center',
    label: 'Memory hierarchy',
    kind: 'diagram',
  },
];

const shouldShowWelcome = () => {
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) !== 'true';
  } catch {
    return true;
  }
};

const CinematicHero = ({ onJoin }) => {
  const [showWelcome, setShowWelcome] = useState(shouldShowWelcome);

  useEffect(() => {
    if (!showWelcome) return undefined;

    document.body.classList.add('welcome-is-playing');
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
      } catch {
        // The welcome remains functional when browser storage is unavailable.
      }
      document.body.classList.remove('welcome-is-playing');
      setShowWelcome(false);
    }, reducedMotion ? 900 : 2900);

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove('welcome-is-playing');
    };
  }, [showWelcome]);

  return (
    <>
      {showWelcome && (
        <div className="welcome-sequence" role="status" aria-label="Welcome to Chips and Bytes">
          <div className="welcome-sequence__rule" aria-hidden="true" />
          <p>Welcome to</p>
          <h1>Chips <span>&amp;</span> Bytes</h1>
          <div className="welcome-sequence__index" aria-hidden="true">
            <span>SSSIHL</span>
            <span>Computer Architecture Club</span>
          </div>
        </div>
      )}

      <section className="cinematic-hero" aria-labelledby="hero-title">
        <div className="cinematic-reel" aria-hidden="true">
          {heroFrames.map((frame, index) => (
            <figure
              className={`cinematic-frame cinematic-frame--${frame.kind}`}
              key={frame.src}
              style={{ '--frame-delay': `${index * (FRAME_DURATION_MS / 1000)}s` }}
            >
              <img
                src={frame.src}
                alt=""
                style={{ objectPosition: frame.position }}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            </figure>
          ))}
        </div>

        <div className="cinematic-hero__shade" aria-hidden="true" />
        <div className="cinematic-hero__copy">
          <p className="cinematic-hero__eyebrow">Chips &amp; Bytes · Computer Architecture Club</p>
          <h1 id="hero-title">
            Explore the world of <em>Computer Architecture</em>
          </h1>
          <button className="cinematic-hero__action" onClick={onJoin}>
            <span>Join Our Community</span>
            <ArrowDownRight size={19} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </div>

      </section>
    </>
  );
};

export default CinematicHero;
