import React, { useState, useEffect } from 'react';

// Map of local image paths to beautiful curated Unsplash images for graceful fallback
const FALLBACK_MAP: Record<string, string> = {
  '/images/lat1(1).jpg': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', // Wilderness
  '/images/lat1(2).jpg': 'https://images.unsplash.com/photo-1504052434139-a433db24f50f?auto=format&fit=crop&w=800&q=80', // Holy Bible
  '/images/lat1(3).jpg': 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80', // Worship/Fire
  '/images/lat1(4).jpg': 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80', // Compassion/Outreach
  '/images/lat1(5).jpg': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80', // Stage/Conference
  '/images/lat1(6).jpg': 'https://images.unsplash.com/photo-1472653425572-cfcac42a046d?auto=format&fit=crop&w=800&q=80', // Outdoor crusade/crowd
  '/images/lat1(7).jpg': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80', // Study group/class
  '/images/lat1(8).jpg': 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80', // Sunday worship
  '/images/lat1(9).jpg': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', // Book
  '/images/lat1(10).jpg': 'https://images.unsplash.com/photo-1484755560693-a4074577af3a?auto=format&fit=crop&w=800&q=80', // Audio/Mic
  '/images/lat1(11).jpg': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', // Polo shirt
  '/images/lat1(12).jpg': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80', // Study/Class notes
  '/images/lat1(13).jpg': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Path/Mountain
  '/images/lat1(14).jpg': 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80', // Outreach/Volunteers
  '/images/lat1(15).jpg': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', // Training
  '/images/lat1(16).jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', // Pastor profile
  '/images/lat1(17).jpg': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', // Pastor wife profile
  '/images/lat1(18).jpg': 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=800&q=80', // Pastor speaking on stage
  '/images/lat1(19).jpg': 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=1920&q=80', // Home Worship BG
  '/images/lat1(20).jpg': 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80', // Home leader
  '/images/lat1(21).jpg': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', // Global Revival pillar
  '/images/lat1(22).jpg': 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=800&q=80', // Spiritual Excellence pillar
  '/images/lat1(23).jpg': 'https://images.unsplash.com/photo-1469571486079-7a9501066a78?auto=format&fit=crop&w=800&q=80', // Community Development pillar
  '/images/lat1(24).jpg': 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80', // Compassion pillar
  '/images/lat1(25).jpg': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80', // Sermon Centre banner
  '/images/lat1(26).jpg': 'https://images.unsplash.com/photo-1484755560693-a4074577af3a?auto=format&fit=crop&w=400&q=80', // Sermon Centre mic
  '/images/lat1(27).jpg': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80', // Store banner
  '/images/lat1(28).jpg': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', // Store delivery
  '/images/lat1(29).jpg': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80', // Store customer support
  '/images/lat1(30).jpg': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80', // Events banner
  '/images/lat1(31).jpg': 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80', // Events calendar thumbnail
  '/images/lat1(32).jpg': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80', // Classroom study
};

// Generic placeholder generator for indices 33 to 39 if any are ever used
const getFallbackUrl = (src: string | undefined): string => {
  if (!src) return 'https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&w=800&q=80';
  
  if (FALLBACK_MAP[src]) {
    return FALLBACK_MAP[src];
  }
  
  // Extract number from lat1(X).jpg if possible
  const match = src.match(/lat1\((\d+)\)/);
  if (match) {
    const num = parseInt(match[1]);
    // Map high numbers gracefully
    const unsplashIds = [
      'https://images.unsplash.com/photo-1504052434139-a433db24f50f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'
    ];
    return unsplashIds[num % unsplashIds.length];
  }
  
  return 'https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&w=800&q=80';
};

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  onError,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(src);
    setHasFailed(false);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasFailed) {
      setHasFailed(true);
      const fallback = fallbackSrc || getFallbackUrl(src);
      setImgSrc(fallback);
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || "Ministry Image"}
      onError={handleError}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};

export default ImageWithFallback;
