'use client';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { snacks } from '@/data/products';

const ScrollRow = ({ items, direction = 'right' }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = direction === 'left' ? container.scrollWidth - container.clientWidth : 0;
    let animationFrameId;

    const autoScroll = () => {
      if (direction === 'right') {
        scrollPosition += 2;
        if (scrollPosition >= container.scrollWidth - container.clientWidth) {
          scrollPosition = 0;
        }
      } else {
        scrollPosition -= 2;
        if (scrollPosition <= 0) {
          scrollPosition = container.scrollWidth - container.clientWidth;
        }
      }
      
      container.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scroll
    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction]);

  // Duplicate items to create enough content for infinite scroll
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="snacks-scroll-container" ref={scrollContainerRef}>
      {duplicatedItems.map((snack, idx) => {
        return (
          <div key={`${snack.id}-${idx}`} className="snack-card-mini">
            <div className="snack-image-wrapper-mini">
              <img
                src={snack.image}
                alt={snack.name}
                className="snack-image-mini"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export function SnacksSection() {
  // Filter snacks that are in stock
  const inStockSnacks = snacks.filter(snack => snack.multiple > 0);

  return (
    <section className="snacks-section">
      <div className="snacks-header">
        <div>
          <p className="snacks-eyebrow">In Stock Now</p>
          <h2 className="section-title snacks-title">Discover Our Collection</h2>
          <p className="snacks-subtitle">Explore our carefully curated selection of international snacks and hidden gems in stock this month. From common favorites to rare finds, there's something for everyone.</p>
        </div>
      </div>

      <div className="snacks-carousel">
        <ScrollRow items={inStockSnacks} direction="right" />
      </div>

      <div className="snacks-footer">
        <Link href="/gacha" className="explore-button">
          Explore More
        </Link>
      </div>
    </section>
  );
}
