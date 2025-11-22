import { useEffect, useState } from 'react';import { useState, useEffect } from 'react';
import './styles.css';
import { Calendar } from './components/ui/calendar';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { OnboardingPopup } from './components/OnboardingPopup';
import yaleLogo from 'figma:asset/216b5a71c0855464d593bad950a7a8966d534568.png';

// Interactive Deans Carousel Component
function DeansCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev' | 'none'>('none');
  const [isAnimating, setIsAnimating] = useState(false);

  const deans = [
    {
      name: "John Ferguson Weir",
      years: "1869–1913",
      image: "https://images.unsplash.com/photo-1748288166888-f1bd5d6ef9ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXN0aW5ndWlzaGVkJTIwcHJvZmVzc29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzODEyOTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: false
    },
    {
      name: "William Sergeant Kendall",
      years: "1913–1922",
      image: "https://images.unsplash.com/photo-1668701064538-79c4c87fbeb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBhY2FkZW1pYyUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzgxMjkyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: false
    },
    {
      name: "Everett Meeks",
      years: "1922–1947",
      image: "https://images.unsplash.com/photo-1543132220-e7fef0b974e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzgxMjkyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: false
    },
    {
      name: "Charles Sawyer",
      years: "1947–1957",
      image: "https://images.unsplash.com/photo-1655337690286-d0f9d740299f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGVkdWNhdG9yfGVufDF8fHx8MTc2MzgxMjkyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: false
    },
    {
      name: "Boyd Smith",
      years: "1957–1958",
      image: "https://images.unsplash.com/photo-1717068341511-204207d72705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjM4MTI5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: false
    },
    {
      name: "Gibson Danes",
      years: "1958–1968",
      image: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Mzc0OTgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: false
    },
    {
      name: "Howard Weaver",
      years: "1968–1974",
      image: "https://images.unsplash.com/photo-1762522927402-f390672558d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBoZWFkc2hvdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjM3OTE0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: false
    },
    {
      name: "William Bailey",
      years: "1974–1975",
      image: "https://images.unsplash.com/photo-1763025957629-4074f535d001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBwb3J0cmFpdCUyMHN1aXR8ZW58MXx8fHwxNzYzODEyOTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: false
    },
    {
      name: "Andrew Forge",
      years: "1975–1983",
      image: "https://images.unsplash.com/photo-1659080907111-7c726e435a28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvbGFyJTIwaGVhZHNob3QlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzODEyOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: false
    },
    {
      name: "David Pease",
      years: "1983–1996",
      image: "https://images.unsplash.com/photo-1584940120505-117038d90b05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBleGVjdXRpdmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjM4MTI5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: false
    },
    {
      name: "Richard Benson",
      years: "1996–2006",
      image: "https://images.unsplash.com/photo-1748288166888-f1bd5d6ef9ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZGVhbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzczMDAzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: false
    },
    {
      name: "Robert Storr",
      years: "2006–2016",
      image: "https://images.unsplash.com/photo-1717068341511-204207d72705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjM4MTI5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: false
    },
    {
      name: "Marta Kuzma",
      years: "2016–2021",
      image: "https://images.unsplash.com/photo-1628657485319-5865d0f2791d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzgxMjkyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: false
    },
    {
      name: "Kymberly Pinder",
      years: "2021–",
      image: "https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGV4ZWN1dGl2ZXxlbnwxfHx8fDE3NjM2OTYwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      current: true
    }
  ];

  useEffect(() => {
    if (direction !== 'none') {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDirection('none');
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [direction, currentIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? deans.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (isAnimating) return;
    setDirection('next');
    setCurrentIndex((prev) => (prev === deans.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  const currentDean = deans[currentIndex];

  return (
    <div className="deans-carousel">
      <button 
        className="carousel-nav carousel-nav-prev" 
        onClick={handlePrev} 
        aria-label="Previous dean"
        disabled={isAnimating}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div className={`carousel-content ${direction !== 'none' ? `animating-${direction}` : ''}`}>
        <div className="dean-portrait-container">
          <ImageWithFallback 
            src={currentDean.image} 
            alt={currentDean.name}
            className="dean-portrait"
          />
        </div>
        <div className="dean-info">
          <div className="dean-years">{currentDean.years}</div>
          <div className="dean-name">{currentDean.name}</div>
          {currentDean.current && <div className="dean-badge">Current Dean</div>}
        </div>
        <div className="carousel-indicators">
          {deans.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to dean ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>

      <button 
        className="carousel-nav carousel-nav-next" 
        onClick={handleNext} 
        aria-label="Next dean"
        disabled={isAnimating}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default function App() {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 1, 15)); // February 15, 2025 - has events
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [financialAidDate, setFinancialAidDate] = useState<Date | undefined>(undefined);
  const [studyPlansTab, setStudyPlansTab] = useState<'graduate' | 'undergraduate' | 'summer'>('graduate');

  // Events data organized by date
  const eventsData: { [key: string]: Array<{
    month: string;
    day: string;
    title: string;
    description: string;
    time: string;
  }> } = {
    '2025-2-15': [
      {
        month: 'FEB',
        day: '15',
        title: 'Artist Lecture Series',
        description: 'Join us for an evening with renowned contemporary artist discussing their latest work.',
        time: '7:00 PM • Holcombe T. Green Hall'
      },
      {
        month: 'FEB',
        day: '15',
        title: 'Printmaking Open Studio',
        description: 'Explore traditional and experimental printmaking techniques in our state-of-the-art facilities.',
        time: '2:00 PM • Printmaking Studio'
      }
    ],
    '2025-2-22': [
      {
        month: 'FEB',
        day: '22',
        title: 'MFA Thesis Exhibition Opening',
        description: 'Celebrate the culmination of our graduating students\' artistic journeys.',
        time: '6:00 PM • Gallery 32'
      }
    ],
    '2025-3-5': [
      {
        month: 'MAR',
        day: '05',
        title: 'Photography Workshop',
        description: 'Hands-on workshop exploring experimental photographic techniques.',
        time: '2:00 PM • Photo Studio'
      },
      {
        month: 'MAR',
        day: '05',
        title: 'Sculpture Critique Session',
        description: 'Graduate students present their work for faculty and peer review.',
        time: '4:30 PM • Sculpture Studio'
      }
    ],
    '2025-3-12': [
      {
        month: 'MAR',
        day: '12',
        title: 'Visiting Artist Talk: Digital Arts',
        description: 'Internationally acclaimed digital artist shares insights on contemporary media practices.',
        time: '5:00 PM • Loria Center'
      }
    ],
    '2025-3-20': [
      {
        month: 'MAR',
        day: '20',
        title: 'Annual Student Art Sale',
        description: 'Browse and purchase original artworks created by our talented students.',
        time: '10:00 AM - 6:00 PM • Main Gallery'
      },
      {
        month: 'MAR',
        day: '20',
        title: 'Painting Techniques Masterclass',
        description: 'Learn advanced oil painting techniques from our distinguished faculty.',
        time: '1:00 PM • Painting Studio'
      }
    ],
    '2025-4-3': [
      {
        month: 'APR',
        day: '03',
        title: 'Ceramics Exhibition Opening',
        description: 'Discover innovative ceramic works pushing the boundaries of the medium.',
        time: '7:00 PM • Green Gallery'
      }
    ],
    '2025-4-10': [
      {
        month: 'APR',
        day: '10',
        title: 'Graphic Design Symposium',
        description: 'A day-long exploration of contemporary graphic design practice and theory.',
        time: '9:00 AM - 5:00 PM • Loria Center'
      }
    ],
    // October events
    '2025-10-2': [
      {
        month: 'OCT',
        day: '02',
        title: 'Fall Semester Opening Reception',
        description: 'Welcome back celebration featuring student and faculty artwork from the summer.',
        time: '5:00 PM • Main Gallery'
      }
    ],
    '2025-10-7': [
      {
        month: 'OCT',
        day: '07',
        title: 'Abstract Painting Workshop',
        description: 'Explore non-representational techniques with visiting artist.',
        time: '3:00 PM • Painting Studio'
      }
    ],
    '2025-10-10': [
      {
        month: 'OCT',
        day: '10',
        title: 'Digital Fabrication Lab Tour',
        description: 'Introduction to 3D printing and laser cutting technologies for art-making.',
        time: '11:00 AM • Fabrication Lab'
      },
      {
        month: 'OCT',
        day: '10',
        title: 'Portfolio Review Sessions',
        description: 'One-on-one consultations with faculty about your artistic development.',
        time: '2:00 PM - 6:00 PM • Faculty Offices'
      }
    ],
    '2025-10-14': [
      {
        month: 'OCT',
        day: '14',
        title: 'Contemporary Art Criticism Seminar',
        description: 'Discussion on critical approaches to contemporary art practice.',
        time: '4:00 PM • Seminar Room'
      }
    ],
    '2025-10-17': [
      {
        month: 'OCT',
        day: '17',
        title: 'Video Art Screening',
        description: 'Curated selection of experimental video works by emerging artists.',
        time: '7:00 PM • Media Center'
      }
    ],
    '2025-10-21': [
      {
        month: 'OCT',
        day: '21',
        title: 'Life Drawing Marathon',
        description: 'Extended figure drawing session with multiple models and varied poses.',
        time: '10:00 AM - 4:00 PM • Drawing Studio'
      }
    ],
    '2025-10-24': [
      {
        month: 'OCT',
        day: '24',
        title: 'Installation Art Workshop',
        description: 'Hands-on exploration of spatial and site-specific practices.',
        time: '1:00 PM • Gallery 32'
      }
    ],
    '2025-10-27': [
      {
        month: 'OCT',
        day: '27',
        title: 'Alumni Artist Talk',
        description: 'Recent graduates share their post-Yale artistic journeys and career insights.',
        time: '6:00 PM • Holcombe T. Green Hall'
      },
      {
        month: 'OCT',
        day: '27',
        title: 'Experimental Photography Darkroom Session',
        description: 'Explore alternative development techniques and photogram making.',
        time: '3:00 PM • Darkroom'
      }
    ],
    '2025-10-29': [
      {
        month: 'OCT',
        day: '29',
        title: 'Book Arts & Binding Workshop',
        description: 'Learn traditional and contemporary bookmaking techniques.',
        time: '12:00 PM • Book Arts Studio'
      }
    ],
    '2025-10-31': [
      {
        month: 'OCT',
        day: '31',
        title: 'Halloween Costume Life Drawing',
        description: 'Special themed figure drawing session - come in costume!',
        time: '5:00 PM • Drawing Studio'
      },
      {
        month: 'OCT',
        day: '31',
        title: 'Dark Arts: Gothic Art History Lecture',
        description: 'Exploring macabre and supernatural themes throughout art history.',
        time: '7:30 PM • Lecture Hall'
      }
    ],
    '2025-10-8': [
      {
        month: 'OCT',
        day: '08',
        title: 'Textile & Fiber Arts Demo',
        description: 'Demonstrations of weaving, dyeing, and contemporary fiber techniques.',
        time: '2:00 PM • Fiber Arts Studio'
      }
    ],
    '2025-10-15': [
      {
        month: 'OCT',
        day: '15',
        title: 'Mid-Semester Critique Day',
        description: 'All graduate students present work-in-progress for group discussion.',
        time: '9:00 AM - 5:00 PM • Various Studios'
      }
    ],
    '2025-10-19': [
      {
        month: 'OCT',
        day: '19',
        title: 'Mixed Media Collage Workshop',
        description: 'Combining traditional and digital techniques in collage practice.',
        time: '1:00 PM • Mixed Media Lab'
      }
    ],
    '2025-10-23': [
      {
        month: 'OCT',
        day: '23',
        title: 'Printmaking: Lithography Intensive',
        description: 'Two-day intensive workshop on stone lithography begins today.',
        time: '10:00 AM • Printmaking Studio'
      }
    ],
    '2025-10-28': [
      {
        month: 'OCT',
        day: '28',
        title: 'Art & Social Practice Symposium',
        description: 'Exploring art\'s role in community engagement and social change.',
        time: '3:00 PM • Loria Center'
      }
    ],
    // November events
    '2025-11-3': [
      {
        month: 'NOV',
        day: '03',
        title: 'Graduate Thesis Proposals',
        description: 'MFA candidates present their thesis project proposals to faculty.',
        time: '1:00 PM • Seminar Room'
      }
    ],
    '2025-11-6': [
      {
        month: 'NOV',
        day: '06',
        title: 'Visiting Artist: Conceptual Art',
        description: 'Renowned conceptual artist discusses their practice and recent projects.',
        time: '6:00 PM • Holcombe T. Green Hall'
      }
    ],
    '2025-11-10': [
      {
        month: 'NOV',
        day: '10',
        title: 'Ceramics: Raku Firing Workshop',
        description: 'Experience the dramatic Japanese firing technique with immediate results.',
        time: '11:00 AM • Ceramics Courtyard'
      },
      {
        month: 'NOV',
        day: '10',
        title: 'Art History Brown Bag Lunch',
        description: 'Informal discussion on current exhibitions at local museums.',
        time: '12:30 PM • Faculty Lounge'
      }
    ],
    '2025-11-13': [
      {
        month: 'NOV',
        day: '13',
        title: 'Photography: Studio Lighting Masterclass',
        description: 'Advanced techniques in portrait and product photography lighting.',
        time: '4:00 PM • Photo Studio'
      }
    ],
    '2025-11-17': [
      {
        month: 'NOV',
        day: '17',
        title: 'Annual Faculty Exhibition Opening',
        description: 'Preview new works by Yale School of Art faculty members.',
        time: '6:00 PM • Main Gallery'
      }
    ],
    '2025-11-20': [
      {
        month: 'NOV',
        day: '20',
        title: 'Sculpture: Metal Casting Demo',
        description: 'Watch and learn bronze and aluminum casting techniques.',
        time: '10:00 AM • Foundry'
      }
    ],
    '2025-11-24': [
      {
        month: 'NOV',
        day: '24',
        title: 'Painting: Color Theory Workshop',
        description: 'Deep dive into color relationships and practical application.',
        time: '2:00 PM • Painting Studio'
      }
    ],
    '2025-11-26': [
      {
        month: 'NOV',
        day: '26',
        title: 'Art & Technology: VR in Art',
        description: 'Exploring virtual reality as an artistic medium and exhibition space.',
        time: '3:00 PM • Digital Arts Lab'
      }
    ],
    '2025-11-28': [
      {
        month: 'NOV',
        day: '28',
        title: 'Thanksgiving Community Potluck',
        description: 'Celebrate with the art school community before the holiday break.',
        time: '5:00 PM • Student Commons'
      }
    ],
    '2025-11-5': [
      {
        month: 'NOV',
        day: '05',
        title: 'Drawing: Perspective & Architectural Space',
        description: 'Technical drawing skills for representing complex spatial environments.',
        time: '1:00 PM • Drawing Studio'
      }
    ],
    '2025-11-12': [
      {
        month: 'NOV',
        day: '12',
        title: 'Artist Residency Open Studios',
        description: 'Visit with current artists-in-residence and see their work spaces.',
        time: '4:00 PM - 7:00 PM • Residency Studios'
      }
    ],
    '2025-11-18': [
      {
        month: 'NOV',
        day: '18',
        title: 'Interdisciplinary Collaboration Forum',
        description: 'Speed networking and project ideation across different media.',
        time: '5:00 PM • Student Lounge'
      }
    ],
    '2025-11-21': [
      {
        month: 'NOV',
        day: '21',
        title: 'Art Funding & Grants Workshop',
        description: 'Learn strategies for securing funding for your artistic practice.',
        time: '3:00 PM • Seminar Room'
      }
    ],
    '2025-11-25': [
      {
        month: 'NOV',
        day: '25',
        title: 'Experimental Sound Art Performance',
        description: 'Evening of live sound art and experimental music by students.',
        time: '7:00 PM • Black Box Theater'
      }
    ],
    '2025-11-27': [
      {
        month: 'NOV',
        day: '27',
        title: 'Printmaking: Screenprinting on Fabric',
        description: 'Learn to create wearable art and textile designs.',
        time: '11:00 AM • Printmaking Studio'
      }
    ],
    '2025-11-14': [
      {
        month: 'NOV',
        day: '14',
        title: 'Museum Careers Panel',
        description: 'Curators and museum professionals discuss career paths in the art world.',
        time: '4:30 PM • Loria Center'
      }
    ],
    // December events
    '2025-12-1': [
      {
        month: 'DEC',
        day: '01',
        title: 'Winter Exhibition Opening',
        description: 'Showcase of undergraduate student work from the fall semester.',
        time: '6:00 PM • Gallery 32'
      }
    ],
    '2025-12-4': [
      {
        month: 'DEC',
        day: '04',
        title: 'Final Critiques Begin',
        description: 'Graduate students present completed work for final review.',
        time: '9:00 AM - 6:00 PM • Various Studios'
      }
    ],
    '2025-12-8': [
      {
        month: 'DEC',
        day: '08',
        title: 'Holiday Art Market',
        description: 'Shop for unique handmade gifts created by art students.',
        time: '10:00 AM - 6:00 PM • Main Gallery'
      },
      {
        month: 'DEC',
        day: '08',
        title: 'Ornament Making Workshop',
        description: 'Create ceramic and mixed-media holiday decorations.',
        time: '2:00 PM • Ceramics Studio'
      }
    ],
    '2025-12-11': [
      {
        month: 'DEC',
        day: '11',
        title: 'Visiting Artist: Installation & Sculpture',
        description: 'International sculptor discusses large-scale public art projects.',
        time: '5:00 PM • Holcombe T. Green Hall'
      }
    ],
    '2025-12-15': [
      {
        month: 'DEC',
        day: '15',
        title: 'End of Semester Celebration',
        description: 'Celebrate the completion of fall semester with performances and refreshments.',
        time: '7:00 PM • Student Commons'
      }
    ],
    '2025-12-18': [
      {
        month: 'DEC',
        day: '18',
        title: 'Senior BFA Exhibition Opening',
        description: 'Final exhibition by graduating undergraduate art majors.',
        time: '6:00 PM • Green Gallery'
      }
    ],
    '2025-12-5': [
      {
        month: 'DEC',
        day: '05',
        title: 'Digital Arts: Motion Graphics',
        description: 'Introduction to animation and motion design software.',
        time: '3:00 PM • Digital Arts Lab'
      }
    ],
    '2025-12-9': [
      {
        month: 'DEC',
        day: '09',
        title: 'Painting: Alla Prima Techniques',
        description: 'Direct painting methods and spontaneous mark-making.',
        time: '1:00 PM • Painting Studio'
      }
    ],
    '2025-12-12': [
      {
        month: 'DEC',
        day: '12',
        title: 'Art & Ecology Symposium',
        description: 'Exploring environmental themes and sustainable practices in art.',
        time: '2:00 PM • Loria Center'
      }
    ],
    '2025-12-16': [
      {
        month: 'DEC',
        day: '16',
        title: 'Winter Gallery Walk',
        description: 'Tour all active exhibitions across campus before winter break.',
        time: '4:00 PM • Meet at Main Gallery'
      }
    ],
    '2025-12-19': [
      {
        month: 'DEC',
        day: '19',
        title: 'Student Film Screening',
        description: 'Premiere of short films and video art created this semester.',
        time: '7:00 PM • Media Center'
      }
    ],
    '2025-12-3': [
      {
        month: 'DEC',
        day: '03',
        title: 'Sculpture: Wood Carving Basics',
        description: 'Learn fundamental techniques for working with wood as a medium.',
        time: '11:00 AM • Sculpture Studio'
      }
    ],
    '2025-12-6': [
      {
        month: 'DEC',
        day: '06',
        title: 'Art Book Fair',
        description: 'Browse and purchase artist books, zines, and limited editions.',
        time: '12:00 PM - 5:00 PM • Student Lounge'
      }
    ],
    '2025-12-10': [
      {
        month: 'DEC',
        day: '10',
        title: 'Professional Practices: Portfolio Website',
        description: 'Build an effective online presence for your artwork.',
        time: '3:00 PM • Computer Lab'
      }
    ],
    '2025-12-13': [
      {
        month: 'DEC',
        day: '13',
        title: 'Photography: Year in Review',
        description: 'Students share their best photographic work from 2025.',
        time: '5:00 PM • Photo Studio'
      }
    ],
    '2025-12-17': [
      {
        month: 'DEC',
        day: '17',
        title: 'Interdisciplinary Performance Night',
        description: 'Collaborative performances combining visual art, sound, and movement.',
        time: '7:30 PM • Black Box Theater'
      }
    ]
  };

  // Extract event dates for calendar highlighting
  const eventDates = Object.keys(eventsData).map(dateStr => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  });

  // Get events for selected date
  const getEventsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    return eventsData[dateKey] || [];
  };

  // Find next date with events after a given date
  const findNextEventDate = (fromDate: Date): Date | null => {
    const sortedEventDates = Object.keys(eventsData)
      .map(dateStr => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
      })
      .sort((a, b) => a.getTime() - b.getTime());

    // Find the next event date after the selected date
    const nextDate = sortedEventDates.find(eventDate => eventDate > fromDate);
    return nextDate || null;
  };

  // Handle date selection with fallback to next event
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      setDate(selectedDate);
      return;
    }

    const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    const hasEvents = eventsData[dateKey] && eventsData[dateKey].length > 0;

    if (hasEvents) {
      // Date has events, select it normally
      setDate(selectedDate);
    } else {
      // No events on this date, find next event date
      const nextEventDate = findNextEventDate(selectedDate);
      if (nextEventDate) {
        setDate(nextEventDate);
      } else {
        // No future events, just select the date anyway
        setDate(selectedDate);
      }
    }
  };

  const displayedEvents = getEventsForDate(date);

  useEffect(() => {
    // ========================================
    // State Management
    // ========================================
    let currentTheme = localStorage.getItem('theme') || 'light';

    // ========================================
    // Theme Toggle
    // ========================================
    function toggleTheme() {
      const html = document.documentElement;
      const sunIcon = document.getElementById('sunIcon');
      const moonIcon = document.getElementById('moonIcon');
      
      if (currentTheme === 'light') {
        currentTheme = 'dark';
        html.classList.add('dark');
      } else {
        currentTheme = 'light';
        html.classList.remove('dark');
      }
      
      // Toggle icons
      if (sunIcon && moonIcon) {
        sunIcon.classList.toggle('hidden');
        moonIcon.classList.toggle('hidden');
      }
      
      // Save preference
      localStorage.setItem('theme', currentTheme);
    }

    // ========================================
    // Menu Toggle
    // ========================================
    function toggleMenu() {
      const menuOverlay = document.getElementById('menuOverlay');
      const menuIcon = document.getElementById('menuIcon');
      const closeIcon = document.getElementById('closeIcon');
      const body = document.body;
      
      if (menuOverlay && menuIcon && closeIcon) {
        menuOverlay.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
        
        // Prevent scrolling when menu is open
        if (!menuOverlay.classList.contains('hidden')) {
          body.style.overflow = 'hidden';
        } else {
          body.style.overflow = '';
        }
      }
    }

    // ========================================
    // Navigation Functions
    // ========================================
    function navigateToHome() {
      const homeView = document.getElementById('homeView');
      const loginView = document.getElementById('loginView');
      const studyPlansView = document.getElementById('studyPlansView');
      const aboutView = document.getElementById('aboutView');
      const financialAidView = document.getElementById('financialAidView');
      
      if (homeView && loginView && studyPlansView && aboutView && financialAidView) {
        homeView.classList.remove('hidden');
        loginView.classList.add('hidden');
        studyPlansView.classList.add('hidden');
        aboutView.classList.add('hidden');
        financialAidView.classList.add('hidden');
      }
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function navigateToLogin() {
      const homeView = document.getElementById('homeView');
      const loginView = document.getElementById('loginView');
      const studyPlansView = document.getElementById('studyPlansView');
      const aboutView = document.getElementById('aboutView');
      const financialAidView = document.getElementById('financialAidView');
      
      if (homeView && loginView && studyPlansView && aboutView && financialAidView) {
        homeView.classList.add('hidden');
        loginView.classList.remove('hidden');
        studyPlansView.classList.add('hidden');
        aboutView.classList.add('hidden');
        financialAidView.classList.add('hidden');
      }
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function navigateToStudyPlans() {
      const homeView = document.getElementById('homeView');
      const loginView = document.getElementById('loginView');
      const studyPlansView = document.getElementById('studyPlansView');
      const aboutView = document.getElementById('aboutView');
      const financialAidView = document.getElementById('financialAidView');
      
      if (homeView && loginView && studyPlansView && aboutView && financialAidView) {
        homeView.classList.add('hidden');
        loginView.classList.add('hidden');
        studyPlansView.classList.remove('hidden');
        aboutView.classList.add('hidden');
        financialAidView.classList.add('hidden');
      }
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function navigateToAbout() {
      const homeView = document.getElementById('homeView');
      const loginView = document.getElementById('loginView');
      const studyPlansView = document.getElementById('studyPlansView');
      const aboutView = document.getElementById('aboutView');
      const financialAidView = document.getElementById('financialAidView');
      
      if (homeView && loginView && studyPlansView && aboutView && financialAidView) {
        homeView.classList.add('hidden');
        loginView.classList.add('hidden');
        studyPlansView.classList.add('hidden');
        aboutView.classList.remove('hidden');
        financialAidView.classList.add('hidden');
      }
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function navigateToFinancialAid() {
      const homeView = document.getElementById('homeView');
      const loginView = document.getElementById('loginView');
      const studyPlansView = document.getElementById('studyPlansView');
      const aboutView = document.getElementById('aboutView');
      const financialAidView = document.getElementById('financialAidView');
      
      if (homeView && loginView && studyPlansView && aboutView && financialAidView) {
        homeView.classList.add('hidden');
        loginView.classList.add('hidden');
        studyPlansView.classList.add('hidden');
        aboutView.classList.add('hidden');
        financialAidView.classList.remove('hidden');
      }
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleLogin(method: string) {
      // Simular login exitoso
      alert(`Login successful with ${method}!\n\nWelcome to Yale School of Art`);
      
      // Navegar de vuelta al home después del login
      setTimeout(() => {
        navigateToHome();
      }, 500);
    }



    // ========================================
    // Animation Observers
    // ========================================
    function initAnimations() {
      // Intersection Observer for fade-in animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = '1';
            target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);
      
      // Observe elements for animation
      const animatedElements = document.querySelectorAll('.event-card, .stat-card');
      animatedElements.forEach((el, index) => {
        const element = el as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
      });
      
      // Observe section headers
      const headers = document.querySelectorAll('.section-header');
      headers.forEach(header => {
        const element = header as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(header);
      });
    }

    // ========================================
    // Initialize on DOM Load
    // ========================================
    // Apply saved theme
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
      const sunIcon = document.getElementById('sunIcon');
      const moonIcon = document.getElementById('moonIcon');
      if (sunIcon && moonIcon) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      }
    }
    
    // Initialize animations
    initAnimations();
    
    // ========================================
    // Program Modal Functions
    // ========================================
    const programData: Record<string, any> = {
      'graphic-design': {
        title: 'Graphic Design (MFA)',
        creditRequirements: '60 credits total are required to graduate. 42 credits in your area of concentration (including Art 949a, Critical Practice), and 18 additional credits, including a minimum of 6 academic credits, which can be selected from throughout the University\'s rich offerings.',
        years: [
          {
            title: 'Preliminary-Year Graphic Design',
            description: 'The preliminary year has a required studio course sequence, and additional electives are not recommended. After successful completion of the preliminary year, students automatically continue into the two-year MFA program.',
            semesters: [
              {
                term: 'Fall',
                courses: [
                  'ART 266 Graphic Design Histories: 3 credits',
                  'ART 710 Preliminary Studio: 6 credits',
                  'ART 712 Prelim Typography: 3 credits',
                  'ART 714 All Design Considered: 3 credits'
                ],
                total: 15
              },
              {
                term: 'Spring',
                courses: [
                  'ART 369: Interactive Design and the Internet: 3 credits',
                  'ART 468: Advanced Graphic Design: Ad Hoc Series and Systems: 3 credits',
                  'ART 711: Preliminary Studio: 6 credits',
                  'ART 715: All Design Considered: 3 credits'
                ],
                total: 15
              }
            ]
          },
          {
            title: 'First-year Graphic Design',
            semesters: [
              {
                term: 'Fall',
                courses: [
                  'ART 720 1st-year Graduate Studio: 6 credits',
                  'ART 949 Critical and Professional Practices: 3 credits',
                  'Graphic Design Elective: 3 credits',
                  'Graphic Design, Studio, or Academic Elective: 3 credits'
                ],
                total: 15
              },
              {
                term: 'Spring',
                courses: [
                  'Art 721: 1st-year Graduate Studio: 6 credits',
                  'ART 723: Writing as Visual Practice: 3 credits',
                  'Graphic Design Elective: 3 credits',
                  'Graphic Design, Studio, or Academic Elective: 3 credits'
                ],
                total: 15
              }
            ]
          },
          {
            title: 'Second Year Graphic Design',
            semesters: [
              {
                term: 'Fall',
                courses: [
                  'Art 730, 2nd-year Graduate Studio: 3 credits',
                  'Art 738, Degree Presentation: 6 credits',
                  'Graphic Design Elective: 3 credits',
                  'Graphic Design, Studio, or Academic Elective: 3 credits'
                ],
                total: 15
              },
              {
                term: 'Spring',
                courses: [
                  'Art 731, 2nd-year Graduate Studio: 3 credits',
                  'Art 739, Degree presentation: 6 credits',
                  'Graphic Design Elective: 3 credits',
                  'Graphic Design, Studio, or Academic Elective: 3 credits'
                ],
                total: 15
              }
            ]
          }
        ]
      },
      'painting-printmaking': {
        title: 'Painting and Printmaking (MFA)',
        creditRequirements: '39 credits in area of concentration, including ART 949, and 21 additional credits, including a minimum of 3 academic credits in courses outside the School of Art. Provided that course and minimum requirements are met, students may elect to enroll in more than 15 credits per semester.',
        years: [
          {
            title: 'First-year minimum credits',
            semesters: [
              {
                term: 'Fall',
                courses: [
                  'ART 542/543: Individual Criticism: 6 credits',
                  'ART 546: Round Trip: 3 credits',
                  'ART 949: Critical and Professional Practices: 3 credits',
                  'Academic or Studio Electives: 3 credits'
                ],
                total: 15
              },
              {
                term: 'Spring',
                courses: [
                  'ART 542/543: Individual Criticism: 6 credits',
                  'ART 510: Prit Crit: 3 credits',
                  'Academic or Studio Electives: 6 credits'
                ],
                total: 15
              }
            ]
          },
          {
            title: 'Second-year minimum credits',
            semesters: [
              {
                term: 'Fall',
                courses: [
                  'ART 544/545: Individual Criticism: 6 credits',
                  'ART 511: Prit Crit: 3 credits',
                  'ART 512/513: Thesis: 1.5 credits',
                  'Academic or Studio Electives: 4.5 credits'
                ],
                total: 15
              },
              {
                term: 'Spring',
                courses: [
                  'ART 544/545: Individual Criticism: 6 credits',
                  'ART 512/513: Thesis: 1.5 credits',
                  'Academic or Studio Electives: 7.5 credits'
                ],
                total: 15
              }
            ]
          }
        ]
      },
      'photography': {
        title: 'Photography (MFA)',
        creditRequirements: '51 credits in area of concentration, including ART 949, and 9 additional credits, including a minimum of 3 academic credits in courses outside the School of Art. Provided that course and minimum requirements are met, students may elect to enroll in more than 15 credits per semester.',
        years: [
          {
            title: 'First year minimum credits',
            semesters: [
              {
                term: 'Fall',
                courses: [
                  'ART 822: Practice and Production: 3 credits',
                  'ART 842/843, Critique Panel: 6 credits',
                  'ART 826/827, This Means Something: 3 credits',
                  'ART 949, Critical and Professional Practices: 3 credits'
                ],
                total: 15
              },
              {
                term: 'Spring',
                courses: [
                  'ART 842/843, Critique Panel: 6 credits',
                  'ART 826/827, This Means Something: 3 credits',
                  'Academic or Studio Electives: 6 credits'
                ],
                total: 15
              }
            ]
          },
          {
            title: 'Second year minimum credits',
            semesters: [
              {
                term: 'Fall',
                courses: [
                  'ART 823, Critical Perspectives: 3 credits',
                  'ART 844/845, Critique Panel: 6 credits',
                  'Academic or Studio Electives: 3 credits'
                ],
                total: 15
              },
              {
                term: 'Spring',
                courses: [
                  'ART 825, What Makes a Book Work?: 3 credits',
                  'ART 831, Picture Show: Thesis in Photography: 3 credits',
                  'ART 844/845, Critique Panel: 6 credits'
                ],
                total: 15
              }
            ]
          }
        ]
      },
      'sculpture': {
        title: 'Sculpture (MFA)',
        creditRequirements: '42 credits in area of concentration, including ART 949a, and 18 additional credits, including a minimum of 6 academic credits in courses outside the School of Art.',
        years: [
          {
            title: 'First year minimum credits',
            semesters: [
              {
                term: 'Fall',
                courses: [
                  'ART 645, Individual Criticism: 6 credits',
                  'ART 630, Studio Seminar: 3 credits',
                  'ART 949a, Critical Practice: 3 credits',
                  'Academic or Studio Electives: 3 credits'
                ],
                total: 15
              },
              {
                term: 'Spring',
                courses: [
                  'ART 645, Individual Criticism: 6 credits',
                  'ART 630, Studio Seminar: 3 credits',
                  'Sculpture Elective: 3 credits',
                  'Academic or Studio Electives: 3 credits'
                ],
                total: 15
              }
            ]
          },
          {
            title: 'Second year minimum credits',
            semesters: [
              {
                term: 'Fall',
                courses: [
                  'ART 645, Individual Criticism: 6 credits',
                  'ART 630, Studio Seminar: 3 credits',
                  'Academic or Studio Electives: 6 credits'
                ],
                total: 15
              },
              {
                term: 'Spring',
                courses: [
                  'ART 645, Individual Criticism: 6 credits',
                  'ART 630, Studio Seminar: 3 credits',
                  'Academic or Studio Electives: 6 credits'
                ],
                total: 15
              }
            ]
          }
        ]
      }
    };

    function openProgramModal(programId: string) {
      const modal = document.getElementById('programModal');
      const modalBody = document.getElementById('programModalBody');
      const program = programData[programId];
      
      if (!modal || !modalBody || !program) return;
      
      // Build modal content
      let content = `
        <h2 class="modal-title">${program.title}</h2>
        <div class="modal-section">
          <h3 class="modal-section-title">Credit Requirements</h3>
          <p class="modal-section-text">${program.creditRequirements}</p>
        </div>
        <div class="modal-section">
          <h3 class="modal-section-title">Typical Plan of Study</h3>
      `;
      
      program.years.forEach((year: any) => {
        content += `
          <div class="modal-year">
            <h4 class="modal-year-title">${year.title}</h4>
            ${year.description ? `<p class="modal-year-description">${year.description}</p>` : ''}
            <div class="modal-semesters">
        `;
        
        year.semesters.forEach((semester: any) => {
          content += `
            <div class="modal-semester">
              <h5 class="modal-semester-title">${semester.term}</h5>
              <ul class="modal-course-list">
          `;
          
          semester.courses.forEach((course: string) => {
            content += `<li class="modal-course-item">${course}</li>`;
          });
          
          content += `
              </ul>
              <p class="modal-semester-total">Total minimum credits for ${semester.term.toLowerCase()} term: ${semester.total}</p>
            </div>
          `;
        });
        
        content += `
            </div>
          </div>
        `;
      });
      
      content += `
        </div>
      `;
      
      modalBody.innerHTML = content;
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeProgramModal() {
      const modal = document.getElementById('programModal');
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }

    // Close menu on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const menuOverlay = document.getElementById('menuOverlay');
        const programModal = document.getElementById('programModal');
        
        if (menuOverlay && !menuOverlay.classList.contains('hidden')) {
          toggleMenu();
        }
        
        if (programModal && !programModal.classList.contains('hidden')) {
          closeProgramModal();
        }
      }
    };
    document.addEventListener('keydown', handleEscape);

    // Make functions available globally
    (window as any).toggleTheme = toggleTheme;
    (window as any).toggleMenu = toggleMenu;
    (window as any).navigateToHome = navigateToHome;
    (window as any).navigateToLogin = navigateToLogin;
    (window as any).navigateToStudyPlans = navigateToStudyPlans;
    (window as any).navigateToAbout = navigateToAbout;
    (window as any).navigateToFinancialAid = navigateToFinancialAid;
    (window as any).openProgramModal = openProgramModal;
    (window as any).handleLogin = handleLogin;
    (window as any).closeProgramModal = closeProgramModal;

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Separate useEffect for header scroll behavior
  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const header = document.getElementById('header');
      if (!header) return;

      const currentScrollY = window.scrollY;
      
      if (currentScrollY === 0) {
        // At top of page - show header without background
        header.style.transform = 'translateY(0)';
        header.classList.remove('scrolled');
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        header.style.transform = 'translateY(-100%)';
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header with background
        header.style.transform = 'translateY(0)';
        header.classList.add('scrolled');
      }
      
      lastScrollY = currentScrollY;
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Run on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Onboarding Popup */}
      <OnboardingPopup />
      
      {/* Header */}
      <header id="header" className="header">
        <div className="header-container">
          <div className="header-content">
            {/* Logo */}
            <div 
              className="header-logo" 
              onClick={() => (window as any).navigateToHome()}
              role="button"
              tabIndex={0}
              aria-label="Return to home page"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  (window as any).navigateToHome();
                }
              }}
            >
              <div className="logo-container" style={{ gap: '0.75rem' }}>
                <img src={yaleLogo} alt="Yale School of Art" className="logo-image" style={{ height: '40px', width: 'auto' }} />
                <div className="logo-text">
                  <div className="logo-title">YALE</div>
                  <div className="logo-subtitle">SCHOOL OF ART</div>
                </div>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="header-actions">
              {/* Login Button - Shows profile icon on mobile, text on desktop */}
              <button className="btn btn-header btn-login" id="loginBtn" onClick={() => (window as any).navigateToLogin()} aria-label="Login">
                <svg className="icon icon-profile-mobile" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="btn-login-text">Login</span>
              </button>

              {/* Theme Toggle */}
              <button className="btn btn-header btn-icon" id="themeToggle" onClick={() => (window as any).toggleTheme()} aria-label="Toggle dark mode">
                <svg id="sunIcon" className="icon theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <svg id="moonIcon" className="icon theme-icon hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </button>

              {/* Menu Button */}
              <button className="btn btn-header" onClick={() => (window as any).toggleMenu()} aria-label="Open menu">
                <svg id="menuIcon" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <svg id="closeIcon" className="icon hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span className="btn-text">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div id="menuOverlay" className="menu-overlay hidden">
        <div className="menu-container">
          {/* Menu Header */}
          <div className="menu-header">
            <div className="logo-container" style={{ gap: '0.75rem' }}>
              <img src={yaleLogo} alt="Yale School of Art" className="menu-logo-image" style={{ height: '48px', width: 'auto' }} />
              <div className="logo-text">
                <div className="logo-title">YALE</div>
                <div className="logo-subtitle">SCHOOL OF ART</div>
              </div>
            </div>
            <button className="btn btn-menu-close" onClick={() => (window as any).toggleMenu()} aria-label="Close menu">
              <span>Close</span>
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Menu Content */}
          <div className="menu-content">
            <div className="menu-nav">
              <button className="menu-item" onClick={() => { (window as any).navigateToHome(); (window as any).toggleMenu(); }}>Home</button>
              <button className="menu-item" onClick={() => { (window as any).navigateToAbout(); (window as any).toggleMenu(); }}>About the school</button>
              <button className="menu-item" onClick={() => { (window as any).navigateToStudyPlans(); (window as any).toggleMenu(); }}>Study Plans</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div id="mainContent">
        {/* Home View */}
        <div id="homeView" className="view">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-background">
              <img src="https://images.unsplash.com/photo-1728530555664-4d6c4d91503b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWxlJTIwdW5pdmVyc2l0eSUyMGJ1aWxkaW5nJTIwY2FtcHVzfGVufDF8fHx8MTc1NzE3NDgwNHww&ixlib=rb-4.1.0&q=80&w=1080" alt="Yale School of Art Campus" className="hero-image" />
              <div className="hero-overlay"></div>
              <div className="hero-gradient"></div>
            </div>
            
            <div className="hero-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <div className="hero-text" style={{ textAlign: 'center', width: '100%', maxWidth: '80rem', margin: '0 auto' }}>
                <h1 className="hero-title" style={{ textAlign: 'center' }}>
                  Welcome to<br />
                  <span className="hero-highlight">Yale School of Art</span>
                </h1>
                <p className="hero-description" style={{ textAlign: 'center', margin: '0 auto' }}>
                  On our campus, world-class faculty and talented students come together to 
                  create a better world through groundbreaking research, cutting-edge 
                  innovations, and transformative scholarly work.
                </p>
                <a 
                  href="https://apply.art.yale.edu/apply/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hero-apply-button"
                  aria-label="Apply to Yale School of Art"
                >
                  Apply to the School
                </a>
              </div>
            </div>
          </section>

          {/* Yale at a Glance Section */}
          <section className="glance-section">
            <div className="section-container">
              <div className="section-header">
                <div className="section-badge">About Us</div>
                <h2 className="section-title-large">Yale School of Art at a glance</h2>
                <p className="section-subtitle">
                  For over 150 years, artists have come to Yale in pursuit of excellence, 
                  innovation, and the advancement of contemporary art practice.
                </p>
              </div>
              
              <div className="glance-grid">
                {/* Left Column */}
                <div className="glance-content">
                  {/* Statistics Grid */}
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-number stat-green">1869</div>
                      <p className="stat-description">The year Yale School of Art was founded</p>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number stat-orange">200+</div>
                      <p className="stat-description">Graduate students in MFA and joint degree programs</p>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number stat-green">15k+</div>
                      <p className="stat-description">Artworks in the Yale University Art Gallery collection</p>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number stat-red">50+</div>
                      <p className="stat-description">Visiting artists and critics each academic year</p>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number stat-green">6</div>
                      <p className="stat-description">Areas of study: Graphic Design, Painting/Printmaking, Photography, Sculpture</p>
                    </div>
                    <div className="stat-card">
                      <div className="stat-number stat-orange">100%</div>
                      <p className="stat-description">Student satisfaction rate with our graduate programs</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="glance-image-wrapper">
                  <div className="glance-image-container">
                    <img src="https://images.unsplash.com/photo-1751666526244-40239a251eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWxlJTIwdW5pdmVyc2l0eSUyMGFydCUyMHN0dWRlbnRzJTIwcGFpbnRpbmclMjBzY3VscHR1cmV8ZW58MXx8fHwxNzU3MTc1MDYxfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Yale School of Art students working in studio" className="glance-image" />
                  </div>
                  <div className="decorative-circle decorative-green"></div>
                  <div className="decorative-circle decorative-orange"></div>
                </div>
              </div>
              
              <div className="glance-cta">
                <button className="btn-cta" onClick={() => (window as any).navigateToAbout()} aria-label="Discover our history">
                  <span>Discover Our History</span>
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Upcoming Events Section */}
          <section className="events-section">
            <div className="section-container">
              <div className="section-header">
                <div className="section-badge">What's Happening</div>
                <h2 className="section-title-large">Upcoming Events</h2>
                <p className="section-subtitle">
                  Join us for engaging lectures, exhibitions, and workshops throughout the year.
                </p>
              </div>
              
              <div className="events-layout">
                {/* Calendar */}
                <div className="events-calendar-wrapper">
                  <div className="events-calendar calendar-with-indicators">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      weekStartsOn={0}
                      className="rounded-md border"
                      modifiers={{
                        hasEvent: eventDates
                      }}
                      modifiersClassNames={{
                        hasEvent: 'day-has-event'
                      }}
                    />
                  </div>
                </div>

                {/* Events List */}
                <div className="events-list-wrapper">
                  <div className="events-list">
                    {displayedEvents.length > 0 ? (
                      displayedEvents.map((event, index) => (
                        <div key={index} className="event-card">
                          <div className="event-date">
                            <div className="event-month">{event.month}</div>
                            <div className="event-day">{event.day}</div>
                          </div>
                          <div className="event-content">
                            <h3 className="event-title">{event.title}</h3>
                            <p className="event-description">{event.description}</p>
                            <p className="event-time">{event.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-events-message">
                        <svg 
                          className="no-events-icon" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                          style={{ width: '48px', height: '48px', margin: '0 auto 1rem', opacity: 0.3 }}
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <p style={{ textAlign: 'center', opacity: 0.6 }}>
                          No events scheduled for this date.
                        </p>
                        <p style={{ textAlign: 'center', opacity: 0.4, fontSize: '0.9rem', marginTop: '0.5rem' }}>
                          Select a highlighted date to view events.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Login View */}
        <div id="loginView" className="view hidden">
          <div className="login-container">
            <div className="login-box">
              <button className="btn-back" onClick={() => (window as any).navigateToHome()} aria-label="Go back to home">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Home
              </button>

              <h1 className="login-title">Student Login</h1>
              <p className="login-subtitle">Access your Yale School of Art account</p>

              <div className="login-options">
                <div className="login-option">
                  <h3 className="option-title">Yale NetID</h3>
                  <p className="option-description">Sign in with your Yale University credentials</p>
                  <button className="btn btn-primary" onClick={() => (window as any).handleLogin('Yale NetID')}>Sign in with Yale NetID</button>
                </div>

                <div className="login-divider">
                  <span>OR</span>
                </div>

                <div className="login-option">
                  <h3 className="option-title">Alternative Account</h3>
                  <p className="option-description">Use your alternative credentials</p>
                  <form className="login-form" onSubmit={(e) => { e.preventDefault(); (window as any).handleLogin('Alternative Account'); }}>
                    <input type="email" placeholder="Email" className="input-field" required />
                    <input type="password" placeholder="Password" className="input-field" required />
                    <button type="submit" className="btn btn-primary">Sign In</button>
                  </form>
                  <a href="#" className="forgot-password" aria-label="Recover forgotten password">Forgot password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About the School View */}
        <div id="aboutView" className="view hidden">
          <div className="about-container">
            {/* Back Button */}
            <div className="study-plans-header">
              <button className="btn-back" onClick={() => (window as any).navigateToHome()} aria-label="Go back to home">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Home
              </button>
            </div>

            {/* Page Header */}
            <div className="about-hero">
              <div className="section-badge">About Us</div>
              <h1 className="about-main-title">About the School</h1>
              <p className="about-main-subtitle">
                Discover the history, mission, and facilities of Yale School of Art
              </p>
            </div>

            {/* Mission Statement Section */}
            <section className="about-section">
              <div className="about-section-header">
                <h2 className="about-section-title">Mission Statement</h2>
              </div>
              <div className="about-content-box">
                <p className="about-text">
                  The mission of the Yale School of Art is to provide students with intellectually informed, hands-on instruction in the practice of an array of visual arts media within the context of a liberal arts university. As a part of the first institution of higher learning to successfully integrate a studio-based education into such a broad pedagogical framework, the Yale School of Art has a long and distinguished history of training artists of the highest caliber. A full-time faculty of working artists in conjunction with a diverse cross-section of accomplished visiting artists collaborate to design a program and foster an environment where the unique talents and perspectives of individual students can emerge and flourish.
                </p>
                <p className="about-text">
                  The School of Art is founded on the belief that art is a fundamental force in national and international culture, and that one of the primary standards by which societies are judged is the quality, creative freedom, critical insight, and formal and technical innovation of the visual art they produce. The Yale School of Art teaches at the graduate and undergraduate levels, and consequently the student body consists of those whose primary or exclusive focus is art as well as those for whom art is an essential part of a varied course of inquiry. The school currently offers degrees and undergraduate majors in the areas of graphic design, painting/printmaking, photography, and sculpture.
                </p>
              </div>
            </section>

            {/* Land Acknowledgement Section */}
            <section className="about-section land-acknowledgement-section">
              <div className="about-section-header">
                <h2 className="about-section-title">Land Acknowledgement</h2>
                <p className="about-section-subtitle">
                  Acknowledgement of the Mohegan, Mashantucket Pequot, Eastern Pequot, Schaghticoke, Golden Hill Paugussett, Niantic, the Quinnipiac, and other Algonquian speaking peoples
                </p>
              </div>

              <div className="about-content-box">
                <p className="about-text">
                  The Yale School of Art and Yale University acknowledge that indigenous peoples and nations, including Mohegan, Mashantucket Pequot, Eastern Pequot, Schaghticoke, Golden Hill Paugussett, Niantic, and the Quinnipiac and other Algonquian speaking peoples, have stewarded through generations the lands and waterways of what is now the state of Connecticut.
                </p>
                <p className="about-text">
                  We honor and respect the enduring relationship that exists between these peoples and nations and this land.
                </p>
                
                {/* Pronunciation Guide */}
                <div className="pronunciation-guide">
                  <h3 className="pronunciation-title">Pronunciation Guide</h3>
                  <div className="pronunciation-grid">
                    <div className="pronunciation-item">
                      <img src="https://images.unsplash.com/photo-1645559921662-0134fad2e9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXRpdmUlMjBhbWVyaWNhbiUyMHRyaWJlfGVufDF8fHx8MTc2MTM0NjI2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Mohegan" className="pronunciation-image" />
                      <div className="pronunciation-content">
                        <span className="pronunciation-number">1</span>
                        <span className="pronunciation-word">Mohegan</span>
                        <span className="pronunciation-phonetic">mow.hee.gn</span>
                        <button 
                          className="pronunciation-audio-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            const utterance = new SpeechSynthesisUtterance('Mohegan');
                            utterance.rate = 0.8;
                            utterance.lang = 'en-US';
                            window.speechSynthesis.speak(utterance);
                          }}
                          title="Listen to pronunciation"
                          aria-label="Play pronunciation audio for Mohegan"
                        >
                          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="pronunciation-item">
                      <img src="https://images.unsplash.com/photo-1661798436192-2fb88b6396ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwcGVvcGxlJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzYxMzQ2MjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Mashantucket Pequot" className="pronunciation-image" />
                      <div className="pronunciation-content">
                        <span className="pronunciation-number">2</span>
                        <span className="pronunciation-word">Mashantucket Pequot</span>
                        <span className="pronunciation-phonetic">mash.an.tuck.et pee.kwot</span>
                        <button 
                          className="pronunciation-audio-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            const utterance = new SpeechSynthesisUtterance('Mashantucket Pequot');
                            utterance.rate = 0.8;
                            utterance.lang = 'en-US';
                            window.speechSynthesis.speak(utterance);
                          }}
                          title="Listen to pronunciation"
                          aria-label="Play pronunciation audio for Mashantucket Pequot"
                        >
                          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="pronunciation-item">
                      <img src="https://images.unsplash.com/photo-1446813768824-b3730a9d5840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXRpdmUlMjBhbWVyaWNhbiUyMGFydHxlbnwxfHx8fDE3NjEzNDYyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Eastern Pequot" className="pronunciation-image" />
                      <div className="pronunciation-content">
                        <span className="pronunciation-number">3</span>
                        <span className="pronunciation-word">Eastern Pequot</span>
                        <span className="pronunciation-phonetic">east.ern. pee.kwot</span>
                        <button 
                          className="pronunciation-audio-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            const utterance = new SpeechSynthesisUtterance('Eastern Pequot');
                            utterance.rate = 0.8;
                            utterance.lang = 'en-US';
                            window.speechSynthesis.speak(utterance);
                          }}
                          title="Listen to pronunciation"
                          aria-label="Play pronunciation audio for Eastern Pequot"
                        >
                          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="pronunciation-item">
                      <img src="https://images.unsplash.com/photo-1719960518736-e59d9098d600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwY3VsdHVyZXxlbnwxfHx8fDE3NjEzNDYyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Schaghticoke" className="pronunciation-image" />
                      <div className="pronunciation-content">
                        <span className="pronunciation-number">4</span>
                        <span className="pronunciation-word">Schaghticoke</span>
                        <span className="pronunciation-phonetic">skat.ih.kohk</span>
                        <button 
                          className="pronunciation-audio-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            const utterance = new SpeechSynthesisUtterance('Schaghticoke');
                            utterance.rate = 0.8;
                            utterance.lang = 'en-US';
                            window.speechSynthesis.speak(utterance);
                          }}
                          title="Listen to pronunciation"
                          aria-label="Play pronunciation audio for Schaghticoke"
                        >
                          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="pronunciation-item">
                      <img src="https://images.unsplash.com/photo-1757009400493-509e7b48c95d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBwYXR0ZXJufGVufDF8fHx8MTc2MTMwMjE5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Golden Hill Paugussett" className="pronunciation-image" />
                      <div className="pronunciation-content">
                        <span className="pronunciation-number">5</span>
                        <span className="pronunciation-word">Golden Hill Paugussett</span>
                        <span className="pronunciation-phonetic">gold.en. hill po.gaw.sett</span>
                        <button 
                          className="pronunciation-audio-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            const utterance = new SpeechSynthesisUtterance('Golden Hill Paugussett');
                            utterance.rate = 0.8;
                            utterance.lang = 'en-US';
                            window.speechSynthesis.speak(utterance);
                          }}
                          title="Listen to pronunciation"
                          aria-label="Play pronunciation audio for Golden Hill Paugussett"
                        >
                          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="pronunciation-item">
                      <img src="https://images.unsplash.com/photo-1530244534845-4a0c319f41e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXRpdmUlMjBhbWVyaWNhbiUyMGhlcml0YWdlfGVufDF8fHx8MTc2MTM0NjI2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Niantic" className="pronunciation-image" />
                      <div className="pronunciation-content">
                        <span className="pronunciation-number">6</span>
                        <span className="pronunciation-word">Niantic</span>
                        <span className="pronunciation-phonetic">ni.han.tic</span>
                        <button 
                          className="pronunciation-audio-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            const utterance = new SpeechSynthesisUtterance('Niantic');
                            utterance.rate = 0.8;
                            utterance.lang = 'en-US';
                            window.speechSynthesis.speak(utterance);
                          }}
                          title="Listen to pronunciation"
                          aria-label="Play pronunciation audio for Niantic"
                        >
                          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="pronunciation-item">
                      <img src="https://images.unsplash.com/photo-1637177304935-382b60b372cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwYXJ0fGVufDF8fHx8MTc2MTM0NjI2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Quinnipiac" className="pronunciation-image" />
                      <div className="pronunciation-content">
                        <span className="pronunciation-number">7</span>
                        <span className="pronunciation-word">Quinnipiac</span>
                        <span className="pronunciation-phonetic">kwihn.ih.pee.ac</span>
                        <button 
                          className="pronunciation-audio-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            const utterance = new SpeechSynthesisUtterance('Quinnipiac');
                            utterance.rate = 0.8;
                            utterance.lang = 'en-US';
                            window.speechSynthesis.speak(utterance);
                          }}
                          title="Listen to pronunciation"
                          aria-label="Play pronunciation audio for Quinnipiac"
                        >
                          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="pronunciation-item">
                      <img src="https://images.unsplash.com/photo-1651257993172-23f391c46d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXRpdmUlMjBhbWVyaWNhbiUyMG11c2V1bXxlbnwxfHx8fDE3NjEzNDYyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Algonquian" className="pronunciation-image" />
                      <div className="pronunciation-content">
                        <span className="pronunciation-number">8</span>
                        <span className="pronunciation-word">Algonquian</span>
                        <span className="pronunciation-phonetic">al-gon-kwihn</span>
                        <button 
                          className="pronunciation-audio-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            const utterance = new SpeechSynthesisUtterance('Algonquian');
                            utterance.rate = 0.8;
                            utterance.lang = 'en-US';
                            window.speechSynthesis.speak(utterance);
                          }}
                          title="Listen to pronunciation"
                          aria-label="Play pronunciation audio for Algonquian"
                        >
                          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Study Areas Section */}
            <section className="about-section">
              <div className="about-section-header">
                <h2 className="about-section-title">Study Areas</h2>
              </div>
              <div className="about-content-box">
                <p className="about-text">
                  The Yale School of Art is a graduate school that confers MFA degrees in Graphic Design, Painting/Printmaking, Photography, and Sculpture.
                </p>
                <p className="about-text">
                  All information on the graduate program study areas can be found through the appropriate link below, but for information on undergraduate course offerings here at the School of Art, please refer both to the Undergraduate page on the School of Art website and to the information provided by Yale College.
                </p>
              </div>
            </section>

            {/* Resources Section */}
            <section className="about-section">
              <div className="about-section-header">
                <h2 className="about-section-title">Resources for Faculty & Students</h2>
              </div>
              <div className="resources-grid">
                <button 
                  className="resource-card"
                  onClick={() => setActivePopup('calendar')}
                  aria-label="Open academic calendars"
                >
                  <div className="resource-icon">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <h3 className="resource-title">Academic Calendars</h3>
                </button>
                <button 
                  className="resource-card"
                  onClick={() => setActivePopup('student-resources')}
                  aria-label="Open student resources"
                >
                  <div className="resource-icon">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="resource-title">Student Resources</h3>
                </button>
                <button 
                  className="resource-card"
                  onClick={() => setActivePopup('courses')}
                  aria-label="Open courses information"
                >
                  <div className="resource-icon">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <h3 className="resource-title">Courses</h3>
                </button>
                <button 
                  className="resource-card"
                  onClick={() => setActivePopup('financial-aid')}
                  aria-label="Open financial aid information"
                >
                  <div className="resource-icon">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <h3 className="resource-title">Financial Aid</h3>
                </button>
                <button 
                  className="resource-card"
                  onClick={() => setActivePopup('housing')}
                  aria-label="Open housing information"
                >
                  <div className="resource-icon">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <h3 className="resource-title">Housing</h3>
                </button>
              </div>
            </section>

            {/* Virtual Visit Section */}
            <section className="about-section visit-section">
              <div className="about-section-header">
                <h2 className="about-section-title">Visit the School of Art</h2>
                <p className="about-section-subtitle">2026 Admission Virtual Information Sessions</p>
              </div>
              <div className="visit-box">
                <div className="visit-header">
                  <div className="visit-badge">Registration Now Open</div>
                  <h3 className="visit-title">Virtual Visit 1: MFA Program Overview</h3>
                </div>
                <p className="visit-description">
                  We're excited to kick off this year's series of virtual admission events with our first session on Thursday, November 20, 2025. This session will focus on preparing a strong application to the Yale School of Art and will include a high-level overview of our MFA programs in Graphic Design, Painting/Printmaking, Photography, and Sculpture, as well as the financial aid process. Time permitting, we'll conclude with a Q&A with our admissions and financial aid team.
                </p>
                <div className="visit-details">
                  <div className="visit-detail-item">
                    <div className="visit-icon">📅</div>
                    <div>
                      <div className="visit-label">Date</div>
                      <div className="visit-value">Thursday, November 20, 2025</div>
                    </div>
                  </div>
                  <div className="visit-detail-item">
                    <div className="visit-icon">🕐</div>
                    <div>
                      <div className="visit-label">Time</div>
                      <div className="visit-value">Zoom Waiting Room opens at 12:45 PM EST</div>
                    </div>
                  </div>
                  <div className="visit-detail-item">
                    <div className="visit-icon">📍</div>
                    <div>
                      <div className="visit-label">Location</div>
                      <div className="visit-value">Zoom (link provided upon registration)</div>
                    </div>
                  </div>
                  <div className="visit-detail-item">
                    <div className="visit-icon">📹</div>
                    <div>
                      <div className="visit-label">Recording</div>
                      <div className="visit-value">This session will be recorded and posted to the Yale School of Art YouTube page</div>
                    </div>
                  </div>
                </div>
                <button 
                  className="btn btn-primary visit-register-btn" 
                  onClick={() => window.open('https://apply.art.yale.edu/register/2026VirtualVisit1', '_blank')}
                  aria-label="Register for virtual visit"
                  style={{ 
                    textAlign: 'center', 
                    maxWidth: '200px', 
                    margin: '0 auto 2rem auto',
                    display: 'block',
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem'
                  }}
                >
                  Register Here
                </button>
                <p className="visit-note" style={{ marginTop: '2rem' }}>
                  <strong>Stay tuned:</strong> Registration for the next two virtual visits—featuring a panel of faculty admissions committee members and a conversation with current students—will open in the coming weeks.
                </p>
              </div>
            </section>

            {/* Facilities Section */}
            <section className="about-section">
              <div className="about-section-header">
                <h2 className="about-section-title">School of Art Facilities</h2>
              </div>
              <div className="facilities-container">
                {/* Green Hall */}
                <div className="facility-card">
                  <h3 className="facility-name">1156 Chapel Street (Green Hall)</h3>
                  <ul className="facility-list">
                    <li>Digital Technology Office, 2nd floor, Room 208</li>
                    <li>Equipment Loan Office, 2nd floor, Room 215</li>
                    <li>Photography Lab (G19) & Darkrooms (G11, G12), Ground floor</li>
                    <li>Communications Office, 2nd floor, Room 208</li>
                    <li>All-School Computer Lab</li>
                    <li>Annex Computer Lab with 3D printers</li>
                  </ul>
                </div>

                {/* 353 Crown Street */}
                <div className="facility-card">
                  <h3 className="facility-name">353 Crown Street</h3>
                  <ul className="facility-list">
                    <li>Printshop, Basement floor, Room C14</li>
                    <li>Ralph Mayer Learning Center (By appointment, contact kris.mandelbaum@yale.edu)</li>
                    <li>Finishing Shop (Basement floor, Room C03)</li>
                    <li>Spray Booth (2nd floor, Room C207)</li>
                  </ul>
                </div>

                {/* 36 Edgewood Avenue */}
                <div className="facility-card">
                  <h3 className="facility-name">36 Edgewood Avenue</h3>
                  <ul className="facility-list">
                    <li>Fabrication Shop, 1st floor, Room 110</li>
                    <li>Laser Lab, Basement floor, Room 20</li>
                    <li>Production Studio, Basement floor, Room 17</li>
                    <li>Computer Lab with 3D printers (Fourth floor)</li>
                    <li>Spray Booth (1st floor, Room 110A)</li>
                  </ul>
                </div>

                {/* Gallery */}
                <div className="facility-card">
                  <h3 className="facility-name">32 Edgewood/Green Hall Gallery</h3>
                  <ul className="facility-list">
                    <li>32 Edgewood Ave/Green Hall Gallery</li>
                  </ul>
                </div>
              </div>

              {/* University Facilities */}
              <div className="about-section-header" style={{ marginTop: '3rem' }}>
                <h3 className="about-subsection-title">University Facilities</h3>
              </div>
              <div className="university-facilities-grid">
                <a href="#" className="university-facility-item" onClick={(e) => e.preventDefault()} aria-label="Yale University Art Gallery at 1111 Chapel Street">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span>Yale University Art Gallery<br/><small>1111 Chapel Street</small></span>
                </a>
                <a href="#" className="university-facility-item" onClick={(e) => e.preventDefault()} aria-label="Yale Center for British Art at 1080 Chapel Street">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <span>Yale Center for British Art<br/><small>1080 Chapel Street</small></span>
                </a>
                <a href="#" className="university-facility-item" onClick={(e) => e.preventDefault()} aria-label="Yale Arts Library at 180 York Street">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <span>Yale Arts Library<br/><small>180 York Street</small></span>
                </a>
                <a href="#" className="university-facility-item" onClick={(e) => e.preventDefault()} aria-label="Beinecke Rare Book and Manuscript Library at 121 Wall Street">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span>Beinecke Rare Book & Manuscript Library<br/><small>121 Wall Street</small></span>
                </a>
                <a href="#" className="university-facility-item" onClick={(e) => e.preventDefault()} aria-label="Center for Collaborative Arts and Media at 149 York Street">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6m5.2-13.8l-4.2 4.2m0 6l-4.2 4.2m13.2-5.2h-6m-6 0H1m13.8 5.2l-4.2-4.2m0-6L6.4 2.6"></path>
                  </svg>
                  <span>Center for Collaborative Arts and Media<br/><small>149 York Street</small></span>
                </a>
                <a href="#" className="university-facility-item" onClick={(e) => e.preventDefault()} aria-label="Yale Center for Engineering Innovation at 15 Prospect Street">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  <span>Yale Center for Engineering Innovation<br/><small>15 Prospect Street</small></span>
                </a>
              </div>

              {/* Facility Rules */}
              <div className="about-section-header" style={{ marginTop: '3rem' }}>
                <h3 className="about-subsection-title">Facility Rules & Policies</h3>
              </div>
              <div className="rules-grid">
                <a href="#" className="rule-item" onClick={(e) => e.preventDefault()} aria-label="View Appropriate Use Policy">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  Appropriate Use Policy
                </a>
                <a href="#" className="rule-item" onClick={(e) => e.preventDefault()} aria-label="View Gallery Rules">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  Gallery Rules
                </a>
                <a href="#" className="rule-item" onClick={(e) => e.preventDefault()} aria-label="View Safety Guidelines for Painting Studios">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Safety Guidelines for Painting Studios
                </a>
                <a href="#" className="rule-item" onClick={(e) => e.preventDefault()} aria-label="View Safety Guidelines for Sculpture and Photography">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Safety Guidelines for Sculpture & Photography
                </a>
                <a href="#" className="rule-item" onClick={(e) => e.preventDefault()} aria-label="View Painting and Sculpture Chemical Waste Questions and Answers">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Painting & Sculpture Chemical Waste Q & A
                </a>
              </div>
            </section>

            {/* History Section */}
            <section className="about-section history-section">
              <div className="about-section-header">
                <h2 className="about-section-title">History of the School</h2>
                <p className="about-section-subtitle">Deans of the Yale School of Art</p>
              </div>
              <DeansCarousel />
            </section>
          </div>
        </div>

        {/* Study Plans View */}
        <div id="studyPlansView" className="view hidden">
          <div className="study-plans-container">
            {/* Back Button */}
            <div className="study-plans-header">
              <button className="btn-back" onClick={() => (window as any).navigateToHome()} aria-label="Go back to home">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Home
              </button>
            </div>

            {/* Hero Section */}
            <section className="study-plans-hero">
              <div className="section-container">
                <div className="section-header">
                  <div className="section-badge">Academic Programs</div>
                  <h1 className="section-title-large">Study Plans</h1>
                  <p className="section-subtitle">
                    Explore our comprehensive range of academic programs, from graduate MFA degrees to undergraduate studies and summer intensives.
                  </p>
                </div>

                {/* Study Plans Navigation Menu */}
                <div className="study-plans-nav">
                  <button 
                    className={`study-plan-tab ${studyPlansTab === 'graduate' ? 'active' : ''}`}
                    onClick={() => setStudyPlansTab('graduate')}
                    aria-label="View graduate study areas"
                  >
                    <h3 className="study-plan-tab-title">Graduate Study Areas</h3>
                  </button>
                  <button 
                    className={`study-plan-tab ${studyPlansTab === 'undergraduate' ? 'active' : ''}`}
                    onClick={() => setStudyPlansTab('undergraduate')}
                    aria-label="View undergraduate studies in art"
                  >
                    <h3 className="study-plan-tab-title">Undergraduate Studies in Art</h3>
                  </button>
                  <button 
                    className={`study-plan-tab ${studyPlansTab === 'summer' ? 'active' : ''}`}
                    onClick={() => setStudyPlansTab('summer')}
                    aria-label="View summer programs"
                  >
                    <h3 className="study-plan-tab-title">Summer Programs</h3>
                  </button>
                </div>
              </div>
            </section>

            {/* Graduate Study Areas Content */}
            {studyPlansTab === 'graduate' && (
              <>
            {/* MFA Programs Section */}
            <section className="mfa-programs-section">
              <div className="section-container">
                <div className="programs-grid">
                  {/* Graphic Design */}
                  <div className="program-card">
                    <div className="program-image-container">
                      <img 
                        src="https://images.unsplash.com/photo-1564518534518-e79657852a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwc3R1ZGVudCUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjEzMzk3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="Graphic Design Studio" 
                        className="program-image" 
                      />
                    </div>
                    <div className="program-icon" style={{ backgroundColor: 'var(--lime-green)' }}>
                      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                    </div>
                    <h2 className="program-title">Graphic Design (MFA)</h2>
                    <div className="program-divider"></div>
                    <h3 className="program-subtitle">Program overview</h3>
                    <p className="program-description">
                      The graphic design program focuses on the development of a cohesive, investigative body of work, 
                      also known as the student's thesis. At Yale, the graphic design thesis is conceived as a loose 
                      framework within which each student's visual method is deployed across many diverse projects during 
                      the two-year course of study.
                    </p>
                    <p className="program-description">
                      While every thesis project is unique, there are several common features: a focus on methodology, 
                      the application of a visual method to studio work, and the organization of the work in a thoughtfully 
                      argued written document and "Thesis Book."
                    </p>
                    <p className="program-description">
                      The individual collection of graphic design work by each student is supported on several levels 
                      simultaneously: studio work led by faculty meeting weekly; small six-person thesis groups meeting 
                      biweekly; individual sessions with writing and editing tutors; and lectures, presentations, and workshops.
                    </p>
                    <button className="btn-program" onClick={() => (window as any).openProgramModal('graphic-design')} aria-label="Learn more about Graphic Design program">
                      <span>Learn More</span>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>

                  {/* Painting and Printmaking */}
                  <div className="program-card">
                    <div className="program-image-container">
                      <img 
                        src="https://images.unsplash.com/photo-1604227070389-b88fd2896af6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMHN0dWRpbyUyMGFydGlzdHxlbnwxfHx8fDE3NjEzMzk3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="Painting and Printmaking Studio" 
                        className="program-image" 
                      />
                    </div>
                    <div className="program-icon" style={{ backgroundColor: 'var(--orange)' }}>
                      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    </div>
                    <h2 className="program-title">Painting and Printmaking (MFA)</h2>
                    <div className="program-divider"></div>
                    <h3 className="program-subtitle">Program overview</h3>
                    <p className="program-description">
                      Instruction in the program is rooted in the investigation of painting as a unique genre with its 
                      own complex syntax and history. Within this setting, the program encourages diversity of practice 
                      and interpretation, innovation, and experimentation.
                    </p>
                    <p className="program-description">
                      Approximately twenty-one students are admitted each year. At the core of instruction are individual 
                      and group critiques with faculty, visiting critics, and visiting artists. In addition, students 
                      participate in a variety of seminars taught by both faculty and critics.
                    </p>
                    <p className="program-description">
                      The study of printmaking is integrated into the painting program, and a student may concentrate in 
                      painting, printmaking, or a combination of the two. Students work in individual 300-square-foot studios 
                      at 353 Crown Street adjacent to Green Hall. Students have access to a printmaking workshop in the Crown 
                      Street building, equipped with two etching presses and a lithography press, a fully equipped silkscreen 
                      facility, as well as digital resources available in the print studio, throughout the School, and at the 
                      Center for Collaborative Arts and Media.
                    </p>
                    <button className="btn-program" onClick={() => (window as any).openProgramModal('painting-printmaking')} aria-label="Learn more about Painting and Printmaking program">
                      <span>Learn More</span>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>

                  {/* Photography */}
                  <div className="program-card">
                    <div className="program-image-container">
                      <img 
                        src="https://images.unsplash.com/photo-1643473165319-91f77f5f2b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGRhcmtyb29tJTIwY2FtZXJhfGVufDF8fHx8MTc2MTMzOTc3OHww&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="Photography Studio" 
                        className="program-image" 
                      />
                    </div>
                    <div className="program-icon" style={{ backgroundColor: 'var(--beige-green)' }}>
                      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                    </div>
                    <h2 className="program-title">Photography (MFA)</h2>
                    <div className="program-divider"></div>
                    <h3 className="program-subtitle">Program overview</h3>
                    <p className="program-description">
                      Photography is a two-year program of study admitting ten students a year. Darkroom, studio, and 
                      computer facilities are provided. Students receive technical instruction in black-and-white and 
                      color photography as well as nonsilver processes and digital image production.
                    </p>
                    <p className="program-description">
                      The program is committed to a broad definition of photography as a lens-based medium open to a 
                      variety of expressive means. Students work both individually and in groups with faculty and visiting 
                      artists.
                    </p>
                    <p className="program-description">
                      In addition, a critique panel composed of faculty and other artists or critics meets weekly, as well 
                      as for a final review each term, to discuss student work.
                    </p>
                    <button className="btn-program" onClick={() => (window as any).openProgramModal('photography')} aria-label="Learn more about Photography program">
                      <span>Learn More</span>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>

                  {/* Sculpture */}
                  <div className="program-card">
                    <div className="program-image-container">
                      <img 
                        src="https://images.unsplash.com/photo-1758522277384-cd1af73f271f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3VscHR1cmUlMjBzdHVkaW8lMjBhcnR8ZW58MXx8fHwxNzYxMzM5Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="Sculpture Studio" 
                        className="program-image" 
                      />
                    </div>
                    <div className="program-icon" style={{ backgroundColor: 'var(--red)' }}>
                      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </div>
                    <h2 className="program-title">Sculpture (MFA)</h2>
                    <div className="program-divider"></div>
                    <h3 className="program-subtitle">Program overview</h3>
                    <p className="program-description">
                      The sculpture program offers students the opportunity to develop their work in a supportive environment 
                      consisting of critical feedback in a broad array of diverse voices. The field of sculpture includes a 
                      varied collection of working methods and outcomes—one set of tools is not privileged over another—creating 
                      a healthy and experimental program that mirrors the issues facing artists outside of the institution.
                    </p>
                    <p className="program-description">
                      Students work independently in individual studio spaces and have access to common areas for the critique 
                      of their work. 36 Edgewood houses the sculpture program and has a woodworking shop, a metal shop, and a 
                      computer lab, while additional resources are offered by the School of Art and the University at large. 
                      No metal-casting or ceramic facilities are available.
                    </p>
                    <p className="program-description">
                      The main focus of this program is to facilitate the development of conversation and constructive critique 
                      among students and faculty. Our aim is to articulate student work vis-à-vis its own trajectory and in 
                      relation to art history and the current moment. This conversation is formally structured to take place 
                      one-on-one between students and faculty, in small groups, and within a larger group involving the whole 
                      sculpture department. Approximately ten students are admitted each year.
                    </p>
                    <button className="btn-program" onClick={() => (window as any).openProgramModal('sculpture')} aria-label="Learn more about Sculpture program">
                      <span>Learn More</span>
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Non-Degree Study Areas Section */}
            <section className="non-degree-section">
              <div className="section-container">
                <div className="section-header">
                  <div className="section-badge">Additional Programs</div>
                  <h2 className="section-title-large">Non-Degree Study Areas</h2>
                  <p className="section-subtitle">
                    In addition to our MFA programs, Yale School of Art offers non-degree study opportunities 
                    for students across the university.
                  </p>
                </div>

                <div className="non-degree-grid">
                  <div className="non-degree-card">
                    <div className="non-degree-number">01</div>
                    <h3 className="non-degree-title">Art Courses for Non-Majors</h3>
                    <p className="non-degree-description">
                      Yale College students from all majors can take studio art courses to explore their creative 
                      interests and develop artistic skills alongside their primary field of study.
                    </p>
                  </div>

                  <div className="non-degree-card">
                    <div className="non-degree-number">02</div>
                    <h3 className="non-degree-title">Summer Programs</h3>
                    <p className="non-degree-description">
                      Intensive summer workshops and courses provide opportunities for concentrated study in various 
                      artistic disciplines, open to qualified applicants from outside Yale.
                    </p>
                  </div>

                  <div className="non-degree-card">
                    <div className="non-degree-number">03</div>
                    <h3 className="non-degree-title">Visiting Artist Programs</h3>
                    <p className="non-degree-description">
                      Our visiting artist program brings renowned practitioners to campus for lectures, workshops, 
                      and collaborative projects with students and faculty.
                    </p>
                  </div>

                  <div className="non-degree-card">
                    <div className="non-degree-number">04</div>
                    <h3 className="non-degree-title">Public Lectures & Exhibitions</h3>
                    <p className="non-degree-description">
                      Open to the public, our lecture series and exhibitions provide educational opportunities and 
                      foster dialogue between the school and the broader community.
                    </p>
                  </div>

                  <div className="non-degree-card">
                    <div className="non-degree-number">05</div>
                    <h3 className="non-degree-title">Cross-Disciplinary Collaborations</h3>
                    <p className="non-degree-description">
                      Students can participate in collaborative projects with other Yale professional schools, including 
                      Architecture, Drama, and Music.
                    </p>
                  </div>

                  <div className="non-degree-card">
                    <div className="non-degree-number">06</div>
                    <h3 className="non-degree-title">Community Outreach</h3>
                    <p className="non-degree-description">
                      Our community programs engage with New Haven through workshops, partnerships, and initiatives 
                      that make art education accessible to all.
                    </p>
                  </div>
                </div>

                <div className="glance-cta" style={{ marginTop: '3rem' }}>
                  <button 
                    className="btn-cta"
                    onClick={() => window.open('https://apply.art.yale.edu/apply/', '_blank')}
                    aria-label="Apply now to Yale School of Art"
                  >
                    <span>Apply Now</span>
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </section>
              </>
            )}

            {/* Undergraduate Studies Content */}
            {studyPlansTab === 'undergraduate' && (
              <>
            <section className="undergraduate-programs-section">
              <div className="section-container">
                <div className="programs-grid">
                  {/* Art Major (BA) */}
                  <div className="program-card">
                    <div className="program-image-container">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdHVkZW50JTIwY2xhc3N8ZW58MXx8fHwxNzYxMzM5Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="Art Major Studio" 
                        className="program-image" 
                      />
                    </div>
                    <div className="program-icon" style={{ backgroundColor: 'var(--lime-green)' }}>
                      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </div>
                    <h2 className="program-title">Art Major (BA)</h2>
                    <div className="program-divider"></div>
                    <h3 className="program-subtitle">Program overview</h3>
                    <p className="program-description">
                      The Art major at Yale College provides students with intensive studio practice in one or more media, combined with critical study of art history and theory. Students develop both technical skills and conceptual frameworks for artistic practice.
                    </p>
                    <p className="program-description">
                      The curriculum includes foundation courses in drawing, design, and color theory, followed by intermediate and advanced work in areas such as painting, sculpture, photography, graphic design, and new media. All majors complete a senior project that demonstrates their artistic development.
                    </p>
                    <p className="program-description">
                      Requirements: 14 course credits including foundation courses, area studies, and electives. Students must complete at least two terms of Art History and a senior project under faculty supervision.
                    </p>
                  </div>

                  {/* Studio Art Minor */}
                  <div className="program-card">
                    <div className="program-image-container">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdHVkaW8lMjBzdHVkZW50fGVufDF8fHx8MTc2MTMzOTc3OHww&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="Studio Art Practice" 
                        className="program-image" 
                      />
                    </div>
                    <div className="program-icon" style={{ backgroundColor: 'var(--orange)' }}>
                      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>
                    </div>
                    <h2 className="program-title">Studio Art Concentration</h2>
                    <div className="program-divider"></div>
                    <h3 className="program-subtitle">Program overview</h3>
                    <p className="program-description">
                      For students majoring in other fields who wish to pursue studio practice, the Studio Art Concentration offers a structured pathway through our course offerings without the full requirements of the major.
                    </p>
                    <p className="program-description">
                      Students take a sequence of courses that provides both breadth and depth in studio practice, beginning with foundation courses and progressing to advanced work in chosen media. This concentration complements majors across the humanities, sciences, and social sciences.
                    </p>
                    <p className="program-description">
                      Requirements: 8 course credits including at least two foundation courses, four intermediate or advanced studio courses, and two courses in art history or theory.
                    </p>
                  </div>

                  {/* Introductory Studio Courses */}
                  <div className="program-card">
                    <div className="program-image-container">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdHVkaW8lMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjEzMzk3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="Introductory Art Course" 
                        className="program-image" 
                      />
                    </div>
                    <div className="program-icon" style={{ backgroundColor: 'var(--beige-green)' }}>
                      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                    <h2 className="program-title">Introductory Studio Courses</h2>
                    <div className="program-divider"></div>
                    <h3 className="program-subtitle">Program overview</h3>
                    <p className="program-description">
                      Open to all Yale College students regardless of major, our introductory studio courses provide an accessible entry point to visual art practice. No prior experience is required.
                    </p>
                    <p className="program-description">
                      These courses cover fundamental skills in drawing, design, digital media, and three-dimensional work. Students learn basic techniques while exploring contemporary art practices and developing their creative voice.
                    </p>
                    <p className="program-description">
                      Popular courses include: Basic Drawing, Design and Visual Thinking, Introduction to Graphic Design, Photography Fundamentals, Introduction to Digital Media, and Sculpture Basics.
                    </p>
                  </div>

                  {/* Art History Integration */}
                  <div className="program-card">
                    <div className="program-image-container">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1580121441575-41bcb5c6b47c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBoaXN0b3J5JTIwY2xhc3N8ZW58MXx8fHwxNzYxMzM5Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="Art History Course" 
                        className="program-image" 
                      />
                    </div>
                    <div className="program-icon" style={{ backgroundColor: 'var(--red)' }}>
                      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                    </div>
                    <h2 className="program-title">Art History & Theory</h2>
                    <div className="program-divider"></div>
                    <h3 className="program-subtitle">Program overview</h3>
                    <p className="program-description">
                      Studio practice at Yale is deeply informed by critical and historical study. Our art history courses range from ancient to contemporary periods, examining art in global contexts.
                    </p>
                    <p className="program-description">
                      Students explore how artists have responded to cultural, political, and social conditions throughout history. Courses emphasize close looking, critical thinking, and the development of visual literacy.
                    </p>
                    <p className="program-description">
                      Topics include: Modern and Contemporary Art, Art and Identity, Global Art Histories, Museum and Curatorial Studies, Critical Theory in Visual Culture, and Special Topics seminars.
                    </p>
                  </div>
                </div>
              </div>
            </section>
              </>
            )}

            {/* Summer Programs Content */}
            {studyPlansTab === 'summer' && (
              <>
            <section className="summer-programs-section">
              <div className="section-container">
                <div className="programs-grid">
                  {/* Summer Art Intensive */}
                  <div className="program-card">
                    <div className="program-image-container">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBhcnQlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjEzMzk3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="Summer Art Intensive" 
                        className="program-image" 
                      />
                    </div>
                    <div className="program-icon" style={{ backgroundColor: 'var(--lime-green)' }}>
                      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <h2 className="program-title">Summer Art Intensive</h2>
                    <div className="program-divider"></div>
                    <h3 className="program-subtitle">Program overview</h3>
                    <p className="program-description">
                      A four-week immersive program for high school students and recent graduates interested in exploring studio art at the collegiate level. Participants work across multiple media in Yale's professional-grade facilities.
                    </p>
                    <p className="program-description">
                      The program combines daily studio practice with critiques, gallery visits, and lectures by faculty and visiting artists. Students develop a portfolio of work while experiencing life on Yale's campus.
                    </p>
                    <p className="program-description">
                      Duration: 4 weeks in July. Includes foundation courses in drawing, painting, sculpture, and digital media. Portfolio review upon completion.
                    </p>
                  </div>

                  {/* Graduate Summer Session */}
                  <div className="program-card">
                    <div className="program-image-container">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1541367777708-7905fe3296c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBncmFkdWF0ZSUyMHN0dWRpb3xlbnwxfHx8fDE3NjEzMzk3Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="Graduate Summer Session" 
                        className="program-image" 
                      />
                    </div>
                    <div className="program-icon" style={{ backgroundColor: 'var(--orange)' }}>
                      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                      </svg>
                    </div>
                    <h2 className="program-title">Graduate Summer Session</h2>
                    <div className="program-divider"></div>
                    <h3 className="program-subtitle">Program overview</h3>
                    <p className="program-description">
                      For current Yale MFA students and visiting graduate students from other institutions, this session offers advanced coursework and intensive studio time during the summer months.
                    </p>
                    <p className="program-description">
                      Visiting students work alongside Yale students under the guidance of Yale faculty. The program includes individual critiques, group seminars, and opportunities to develop new bodies of work in a supportive environment.
                    </p>
                    <p className="program-description">
                      Duration: 6 weeks in June-July. Open to graduate students in good standing at accredited MFA programs. Application required with portfolio review.
                    </p>
                  </div>

                  {/* Photography Workshop Series */}
                  <div className="program-card">
                    <div className="program-image-container">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHdvcmtzaG9wfGVufDF8fHx8MTc2MTMzOTc3OHww&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="Photography Workshop" 
                        className="program-image" 
                      />
                    </div>
                    <div className="program-icon" style={{ backgroundColor: 'var(--beige-green)' }}>
                      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                    </div>
                    <h2 className="program-title">Photography Workshop Series</h2>
                    <div className="program-divider"></div>
                    <h3 className="program-subtitle">Program overview</h3>
                    <p className="program-description">
                      Week-long intensive workshops in specialized photography techniques and processes. Each workshop focuses on a specific approach, from traditional darkroom methods to contemporary digital practices.
                    </p>
                    <p className="program-description">
                      Workshops are taught by Yale faculty and distinguished visiting photographers. Participants gain hands-on experience with professional equipment and techniques while receiving individualized feedback on their work.
                    </p>
                    <p className="program-description">
                      Topics include: Alternative Processes, Portrait Photography, Documentary Practice, Digital Workflow, Large Format Photography, and Photobook Design. Multiple sessions throughout summer.
                    </p>
                  </div>

                  {/* Printmaking Summer Studio */}
                  <div className="program-card">
                    <div className="program-image-container">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1570978541623-fe3fbe775696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludG1ha2luZyUyMHByZXNzJTIwc3R1ZGlvfGVufDF8fHx8MTc2MTg4Njk1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                        alt="Printmaking Studio" 
                        className="program-image" 
                      />
                    </div>
                    <div className="program-icon" style={{ backgroundColor: 'var(--red)' }}>
                      <svg className="icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                        <rect x="6" y="14" width="12" height="8"></rect>
                      </svg>
                    </div>
                    <h2 className="program-title">Printmaking Summer Studio</h2>
                    <div className="program-divider"></div>
                    <h3 className="program-subtitle">Program overview</h3>
                    <p className="program-description">
                      A three-week program dedicated to printmaking techniques including etching, lithography, screen printing, and relief printing. Students learn traditional methods while exploring contemporary applications.
                    </p>
                    <p className="program-description">
                      The program provides access to Yale's fully equipped printmaking facilities with professional-grade presses and equipment. Instruction covers both technical skill development and conceptual approaches to print-based art.
                    </p>
                    <p className="program-description">
                      Duration: 3 weeks in August. Open to students with some prior art experience. Materials fee included. Participants create an edition of prints to take home.
                    </p>
                  </div>
                </div>
              </div>
            </section>
              </>
            )}

            {/* Program Modals */}
            <div id="programModal" className="program-modal hidden">
              <div className="program-modal-overlay" onClick={() => (window as any).closeProgramModal()}></div>
              <div className="program-modal-content">
                <button className="program-modal-close" onClick={() => (window as any).closeProgramModal()} aria-label="Close modal">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div id="programModalBody"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Aid View */}
      <div id="financialAidView" className="view hidden">
        <div className="about-container">
          {/* Back Button */}
          <button className="btn-back" onClick={() => (window as any).navigateToAbout()} aria-label="Go back to about page">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to About
          </button>

          <div className="about-hero">
            <h1 className="about-main-title">Financial Aid</h1>
            <p className="about-main-subtitle">
              Supporting your artistic journey at Yale School of Art
            </p>
          </div>

          <div className="about-section">
            <div className="about-section-header">
              <h2 className="about-section-title">Financial Aid Process</h2>
              <p className="about-section-subtitle">
                The Financial Aid process for the Yale School of Art's graduate MFA program functions cyclically with each academic year.
              </p>
            </div>

            <div className="about-content-box">
              <p className="about-text">
                Students are responsible for submitting different Financial Aid-related information depending on where they are in the Financial Aid process.
              </p>
              <p className="about-text">
                Find the details and timeline pertaining to your Financial Aid application by clicking the link below that applies to you:
              </p>
            </div>

            <div className="financial-aid-steps">
              <div className="financial-aid-step-card">
                <div className="step-number">0</div>
                <h3 className="step-title">Introductory Step: Prospective Students</h3>
                <p className="step-description">
                  Prospective students are those who have not completed an Admissions application, and have not received a formal acceptance from the School of Art.
                </p>
              </div>

              <div className="financial-aid-step-card">
                <div className="step-number">1</div>
                <h3 className="step-title">Step 1: Applicants</h3>
                <p className="step-description">
                  Applicants are those who have completed and submitted an Admissions application for the current year, and have not received a formal acceptance from the School of Art.
                </p>
              </div>

              <div className="financial-aid-step-card">
                <div className="step-number">2</div>
                <h3 className="step-title">Step 2: Accepted / Admitted Students</h3>
                <p className="step-description">
                  Accepted / admitted students are those who have completed and submitted an Admissions application for the current year, have received a formal acceptance from the School of Art, have not formally committed to enrollment, have not matriculated, and have not finalized Financial Aid or payment options.
                </p>
              </div>

              <div className="financial-aid-step-card">
                <div className="step-number">3</div>
                <h3 className="step-title">Step 3: Committed / Matriculated Students</h3>
                <p className="step-description">
                  Committed/matriculated students are those who have received a formal acceptance from the School of Art, have formally committed to enrollment and are matriculated, and are still finalizing Financial Aid and/or payment options.
                </p>
              </div>

              <div className="financial-aid-step-card">
                <div className="step-number">4</div>
                <h3 className="step-title">Step 4: Returning Students</h3>
                <p className="step-description">
                  Returning students are those who have completed some enrollment, have been billed for tuition and have not received a refund of tuition.
                </p>
              </div>
            </div>

            {/* How to Apply Section */}
            <div className="about-content-box" style={{ marginTop: '3rem' }}>
              <h3 className="about-subsection-title">How to Apply for Financial Aid</h3>
              
              <div className="aid-application-requirements">
                <div className="requirement-item">
                  <div className="requirement-label">Domestic Students</div>
                  <p className="about-text">
                    <strong>ALL DOMESTIC STUDENTS</strong> seeking financial aid must complete a 2025-2026 Free Application for Federal Student Aid (FAFSA) available in December AND the 2025-2026 College Board CSS Profile.
                  </p>
                  <p className="about-text">
                    The 2025-2026 FAFSA, online or as a mobile app, is now available for submission. To ensure we receive your completed FAFSA, remember to include Yale's Federal School Code, <strong>001426</strong>.
                  </p>
                </div>

                <div className="requirement-item">
                  <div className="requirement-label">International Students</div>
                  <p className="about-text">
                    <strong>ALL FOREIGN/INTERNATIONAL APPLICANTS</strong> seeking financial aid for their time must complete the College Board CSS Profile: <a href="https://cssprofile.collegeboard.org/" target="_blank" rel="noopener noreferrer" className="inline-link" aria-label="College Board CSS Profile website">https://cssprofile.collegeboard.org/</a>
                  </p>
                </div>

                <div className="requirement-item">
                  <div className="requirement-label">All Applicants</div>
                  <p className="about-text">
                    <strong>ALL APPLICANTS</strong> seeking financial aid (scholarship, loans, work-study) MUST COMPLETE a College Board Profile. Please use the CSS Code <strong>3807</strong> for the Yale School of Art.
                  </p>
                  <p className="about-text">
                    All Domestic and Foreign/International Students seeking scholarship or other need-based aid are required to provide parental information regardless of age, dependency or marital status by submitting 2023 Federal Tax Returns and W-2's, or certified/translated income tax documents from their home country for the 2023 fiscal year. Students must also submit their own tax return information from the 2023 year as well (if applicable).
                  </p>
                  <p className="about-text">
                    Any students with questions should please contact <a href="mailto:artfinancialaid@yale.edu" className="inline-link" aria-label="Email art financial aid">artfinancialaid@yale.edu</a> with questions or concerns.
                  </p>
                </div>
              </div>

              <div className="aid-important-notice">
                <div className="notice-header">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <h4>IMPORTANT: Parental Information MUST be Included</h4>
                </div>
                <p className="about-text">
                  The Yale School of Art requires all Financial Aid applicants submit parental information (must be submitted on CSS Profile) in order to be considered for Financial Aid. Only in extreme cases is this information waived. If you feel you have an extreme case for which parental information should be waived you can wait until receiving a formal interview before completing the Financial Aid applications, at which time the Financial Aid office can talk with you about the specific steps needed to support your case. Upon your acceptance a list of the necessary documentation will then be required to waive parental information.
                </p>
                <p className="about-text">
                  Instances for which parental information is waived include: deceased parents, documented abuse that has resulted in estrangement or court-ordered separation, extreme estrangement (parent(s) are not reachable without going through severe measures), or abandonment which resulted in adoption, foster, or other family care.
                </p>
                <p className="about-text">
                  Unwillingness, age, marital status, and other standards of dependency are not conditions for which the School of Art waives the requirement of parental data.
                </p>
              </div>

              <div className="aid-deadlines">
                <h4 className="deadlines-title">Financial Aid Deadlines</h4>
                <ul className="deadlines-list">
                  <li>
                    <strong>New Incoming Student Applications:</strong> The CSS Profile and the FAFSA (domestic applicants) should be completed by <strong>March 1, 2025</strong>. Admitted students who submit Financial Aid applications after March 1st may be delayed in receiving an award letter if admitted.
                  </li>
                  <li>
                    <strong>Additional Documentation:</strong> Admitted students will need to provide all other financial aid documentation (student and parent income documents) by <strong>April 1st</strong>.
                  </li>
                  <li>
                    <strong>Note:</strong> Students not admitted are not required to submit anything other than the CSS Profile and the FAFSA (domestic applicants) before March 1st.
                  </li>
                </ul>
                <p className="about-text">
                  The deadline for new student applicants to submit the College Board CSS Profile and the FAFSA is March 1. Students may continue to file FAFSA and CSS Profile after March 1 though we cannot guarantee notification of financial award by a specific date for late filers.
                </p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <div className="about-section-header">
              <h2 className="about-section-title">Types of Financial Aid</h2>
              <p className="about-section-subtitle">
                Understanding the different forms of financial support available to MFA students
              </p>
            </div>

            <div className="financial-aid-types">
              {/* Scholarships */}
              <div className="aid-type-card">
                <div className="aid-type-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                </div>
                <h3 className="aid-type-title">Scholarships</h3>
                <div className="aid-type-content">
                  <p className="about-text">
                    When the total amount of the student contribution, parent contribution, and loan and work-study offers does not meet an admitted student's full financial need, scholarship funds are awarded. Scholarships are also known as grant or gift aid and, unlike loans, do not have to be repaid.
                  </p>
                  <p className="about-text">
                    If your financial aid applications are received by the School's deadline and you have calculated need, the School makes every effort to award a scholarship to admitted students with scholarship eligibility. Scholarship availability is based on the number of students with calculated financial need within the School and the amount of funds available.
                  </p>
                  <div className="aid-highlight">
                    <strong>Important:</strong> The maximum scholarship for first-year students does not exceed tuition costs.
                  </div>
                </div>
              </div>

              {/* Loans */}
              <div className="aid-type-card">
                <div className="aid-type-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                  </svg>
                </div>
                <h3 className="aid-type-title">Loans</h3>
                <div className="aid-type-content">
                  <p className="about-text">
                    Admitted students with financial aid eligibility will have a portion of their financial need met with a loan offer.
                  </p>
                  <ul className="aid-list">
                    <li><strong>U.S. citizens and permanent residents</strong> are eligible for a Federal Direct Unsubsidized Loan.</li>
                    <li><strong>Non-U.S. citizens and non-permanent residents</strong> are eligible for the Yale Student Loan.</li>
                    <li><strong>Private Loans</strong> are also available to qualified student borrowers through private lenders, such as banks, online lenders, and credit unions.</li>
                  </ul>
                  <p className="about-text">
                    Creditworthy U.S. citizens may apply for private loans without a co-signer, and international students typically need a creditworthy U.S. Citizen/Permanent Resident co-signer to apply.
                  </p>
                  <a 
                    href="https://www.elmselect.com/v4/school/156/program/5/program-detail" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="aid-external-link"
                  >
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    ELM Select - Private Loan Options
                  </a>
                </div>
              </div>

              {/* Work-Study */}
              <div className="aid-type-card">
                <div className="aid-type-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <h3 className="aid-type-title">Work-Study & Part-Time Employment</h3>
                <div className="aid-type-content">
                  <p className="about-text">
                    Work-study as part of your financial aid award indicates eligibility for a job within Yale. There are a number of jobs within the School of Art (admissions, labs, studio crews, etc.) that paid $14.25 per hour in 2019-20.
                  </p>
                  <p className="about-text">
                    If you are awarded a job within the School, you will be notified by the supervisor. Generally, it will involve four-to-six hours a week during the regular academic year only.
                  </p>
                  <div className="aid-highlight">
                    <strong>Note:</strong> Work-study positions available within the School of Art may be limited and not all MFA students necessarily will be assigned a job within the School.
                  </div>
                  <p className="about-text">
                    It is suggested you examine the <strong>Yale Student Employment Office</strong> (246 Church Street) online student job search. This job search engine lists campus, community service (Federal Work Study) and other categories of employment for which you can apply online.
                  </p>
                </div>
              </div>

              {/* Teaching Assistant */}
              <div className="aid-type-card aid-type-card-special">
                <div className="aid-type-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="aid-badge-special">Returning Students Only</div>
                <h3 className="aid-type-title">Teaching Assistant Positions</h3>
                <div className="aid-type-content">
                  <p className="about-text">
                    School of Art faculty select Teaching Assistants each year from the second-year class. Pay is a flat rate for the term and is determined by the class's number of hours and sections.
                  </p>
                  <p className="about-text">
                    At the time they are assigned, Teaching Assistantships are not determined through financial need; however, the amount a student earns is considered a term-time earning and may reduce a student's total need insofar as the financial award is concerned.
                  </p>
                  <div className="aid-highlight">
                    <strong>Duration:</strong> Teaching Assistants normally receive an appointment for one term.
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Resource Popups */}
      {activePopup === 'calendar' && (
        <div className="resource-popup-overlay" onClick={() => setActivePopup(null)}>
          <div className="resource-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="resource-popup-close" onClick={() => setActivePopup(null)} aria-label="Close calendar popup">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h2 className="resource-popup-title">2025-2026 Academic Calendar</h2>
            
            <div className="academic-calendar">
              <div className="calendar-section">
                <h3 className="calendar-section-title">FALL 2025</h3>
                <div className="calendar-events">
                  <div className="calendar-event">
                    <div className="event-date-range">Aug. 18-22, M.-F.</div>
                    <div className="event-description">Orientation for new students</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Aug. 25, M.</div>
                    <div className="event-description">Advisement for all students; Fall-term registration due</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Aug. 27, W.</div>
                    <div className="event-description">Fall-term classes begin</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Aug. 29, F.</div>
                    <div className="event-description">Friday classes do not meet; Monday classes meet instead</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Sept. 1, M.</div>
                    <div className="event-description">Labor Day; classes do not meet; offices closed</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Sept. 10, W.</div>
                    <div className="event-description">Last day to add a course with permission of the registrar; Full-Time Faculty Meeting (daytime); All-School Meeting and Dean's Welcome Dinner (evening)</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Oct. 15-17 W.-F.</div>
                    <div className="event-description">October Break</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Oct. 20, M.</div>
                    <div className="event-description">Classes resume</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Oct. 24, F.</div>
                    <div className="event-description">Midterm; Last day to withdraw from a fall full-term course without the course appearing on the transcript with permission of registrar</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Nov. 19, W.</div>
                    <div className="event-description">Spring-term advisement for all students</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Nov. 24, M.</div>
                    <div className="event-description">November recess begins</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Dec. 1, M.</div>
                    <div className="event-description">Fall Classes resume</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Dec. 5, F.</div>
                    <div className="event-description">Last day to withdraw from a course with permission of instructor and registrar.; Fall-term classes end; Reading period begins</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Dec. 11, Th.</div>
                    <div className="event-description">Critiques and examinations begin</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Dec. 17, W.</div>
                    <div className="event-description">Critiques and examinations end; Winter recess begins</div>
                  </div>
                </div>
              </div>

              <div className="calendar-section">
                <h3 className="calendar-section-title">SPRING 2026</h3>
                <div className="calendar-events">
                  <div className="calendar-event">
                    <div className="event-date-range">Jan. 7, W.</div>
                    <div className="event-description">Closing date for submission of Fall 2026 application for admission</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Jan. 8, Th.</div>
                    <div className="event-description">Spring-term registration due</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Jan. 12, M.</div>
                    <div className="event-description">Spring-term classes begin</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Jan. 19, M.</div>
                    <div className="event-description">Martin Luther King, Jr. Day; classes do not meet; offices closed</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Jan. 23, F.</div>
                    <div className="event-description">Friday classes do not meet; Monday classes meet instead</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Jan. 23, F.</div>
                    <div className="event-description">Last day to add a course with permission of registrar</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Mar. 6, F.</div>
                    <div className="event-description">Midterm; Last day to withdraw from a spring full-term course without the course appearing on the transcript with permission of registrar; Spring recess begins after last academic obligation</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Mar. 23, M.</div>
                    <div className="event-description">Classes resume</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Apr. 11-12, St.-Sn.</div>
                    <div className="event-description">Open Studios</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Apr. 24, F.</div>
                    <div className="event-description">Last day to withdraw from a course with permission of instructor and registrar; Spring-term classes end; Reading period begins</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">Apr. 30, Th.</div>
                    <div className="event-description">Critiques and examinations begin</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">May 6, W.</div>
                    <div className="event-description">Critiques and examinations end; Summer recess begins</div>
                  </div>
                  <div className="calendar-event">
                    <div className="event-date-range">May 18, M.</div>
                    <div className="event-description">University Commencement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activePopup === 'student-resources' && (
        <div className="resource-popup-overlay" onClick={() => setActivePopup(null)}>
          <div className="resource-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="resource-popup-close" onClick={() => setActivePopup(null)} aria-label="Close student resources popup">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h2 className="resource-popup-title">Student Resources</h2>
            
            <div className="resource-popup-text">
              <p>
                Yale School of Art is committed to fostering a safe, just and equitable environment for learning, experimentation and discovery, and to encouraging healthy self-care habits.
              </p>
              <p>
                Enrolled students with general questions, concerns or ideas to share with regards to student relations and academic affairs should start by contacting Taryn Wolf, Director of Academic Administration and Dean's Designee, and/or the Director of Graduate Study (DGS) or Graduate Coordinator in their area.
              </p>
              <p>
                Students are encouraged to explore the expansive resources offered by the University during their time at the School.
              </p>

              <div className="resource-links-grid">
                <a href="#" className="resource-link-card" aria-label="View academic regulations">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  <span>Academic Regulations</span>
                </a>
                <a href="#" className="resource-link-card" aria-label="View Yale University resources">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Yale University Resources</span>
                </a>
                <a href="#" className="resource-link-card" aria-label="View resources on sexual misconduct">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>Resources on Sexual Misconduct</span>
                </a>
                <a href="#" className="resource-link-card">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span>Policy Statements</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {activePopup === 'courses' && (
        <div className="resource-popup-overlay" onClick={() => setActivePopup(null)}>
          <div className="resource-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="resource-popup-close" onClick={() => setActivePopup(null)} aria-label="Close courses popup">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h2 className="resource-popup-title">Courses</h2>
            
            <div className="resource-popup-text">
              <p>
                Proposals must be presented to the Academic Subcommittee for approval.
              </p>
              <p>
                For current course offerings & preregistration information, please visit:
              </p>

              <div className="course-search-link">
                <a href="https://courses.yale.edu" target="_blank" rel="noopener noreferrer" className="btn-primary" aria-label="Search Yale courses">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  Yale Course Search
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {activePopup === 'financial-aid' && (
        <div className="resource-popup-overlay" onClick={() => setActivePopup(null)}>
          <div className="resource-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="resource-popup-close" onClick={() => setActivePopup(null)} aria-label="Close financial aid popup">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h2 className="resource-popup-title">Financial Aid</h2>
            
            <div className="resource-popup-text">
              <p>
                The Financial Aid process for the Yale School of Art's graduate MFA program functions cyclically with each academic year. Students are responsible for submitting different Financial Aid-related information depending on where they are in the Financial Aid process.
              </p>

              <button 
                className="btn-primary"
                onClick={() => {
                  setActivePopup(null);
                  (window as any).navigateToFinancialAid();
                }}
                aria-label="View full financial aid information"
              >
                Read More
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {activePopup === 'housing' && (
        <div className="resource-popup-overlay" onClick={() => setActivePopup(null)}>
          <div className="resource-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="resource-popup-close" onClick={() => setActivePopup(null)} aria-label="Close housing popup">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h2 className="resource-popup-title">Housing</h2>
            
            <div className="resource-popup-text">
              <h3 className="resource-subsection-title">Off Campus Housing Resources</h3>
              <p>
                Yale is home to 6,500 Graduate and Professional School students, many of whom prefer to live off campus. The University offers limited on-campus housing options for graduate and PhD students, so the Yale Housing Office maintains a portal with Off-Campus Listings in which the property owners are verified.
              </p>
              <p>
                We recommend starting there, or with listings that will be updated on this page from within the School of Art community, or on the closed Facebook Group.
              </p>

              <div className="housing-links-popup">
                <a href="https://www.yale.edu/housing" target="_blank" rel="noopener noreferrer" className="housing-popup-link" aria-label="Yale University Off-Campus Housing Portal">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Yale University Off-Campus Housing Portal
                </a>
                <a href="http://www.yale.edu/gradhousing/" target="_blank" rel="noopener noreferrer" className="housing-popup-link" aria-label="Graduate Housing Application">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Yale On-Campus Graduate Housing
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* About Yale School of Art */}
            <div className="footer-column">
              <h3 className="footer-title">Yale School of Art</h3>
              <p className="footer-description">
                The School of Art at Yale University offers graduate & professional studies 
                continuing the University's tradition of excellence in art education.
              </p>
              <div className="footer-address">
                <p>1156 Chapel Street</p>
                <p>New Haven, CT 06511</p>
              </div>
            </div>

            {/* Contact Information - Part 1 */}
            <div className="footer-column">
              <h4 className="footer-subtitle">Admissions & Students</h4>
              <ul className="footer-links">
                <li>
                  <span className="contact-label">Graduate MFA Admission</span>
                  <a href="mailto:art.admissions@yale.edu" aria-label="Email Graduate MFA Admission">art.admissions@yale.edu</a>
                </li>
                <li>
                  <span className="contact-label">Newly Admitted Students</span>
                  <a href="mailto:taryn.wolf@yale.edu" aria-label="Email Newly Admitted Students contact">taryn.wolf@yale.edu</a>
                </li>
                <li>
                  <span className="contact-label">Financial Aid</span>
                  <a href="mailto:nicole.archer@yale.edu" aria-label="Email Financial Aid contact">nicole.archer@yale.edu</a>
                </li>
                <li>
                  <span className="contact-label">Undergraduate Art Major</span>
                  <a href="mailto:art.dus@yale.edu" aria-label="Email Undergraduate Art Major contact">art.dus@yale.edu</a>
                </li>
                <li>
                  <span className="contact-label">Alumni Transcripts</span>
                  <a href="mailto:emily.cappa@yale.edu" aria-label="Email Alumni Transcripts contact">emily.cappa@yale.edu</a>
                </li>
              </ul>
            </div>

            {/* Contact Information - Part 2 */}
            <div className="footer-column">
              <h4 className="footer-subtitle">Departments & Services</h4>
              <ul className="footer-links">
                <li>
                  <span className="contact-label">Dean's Office</span>
                  <a href="tel:203-432-2606" aria-label="Call Dean's Office">203-432-2606</a>
                </li>
                <li>
                  <span className="contact-label">Registrar</span>
                  <a href="tel:203-432-2600" aria-label="Call Registrar">203-432-2600</a>
                </li>
                <li>
                  <span className="contact-label">Digital Technology</span>
                  <a href="mailto:art.help@yale.edu" aria-label="Email Digital Technology support">art.help@yale.edu</a>
                </li>
                <li>
                  <span className="contact-label">Public Affairs/Media</span>
                  <a href="mailto:sarah.stevens-morling@yale.edu" aria-label="Email Public Affairs and Media contact">sarah.stevens-morling@yale.edu</a>
                </li>
                <li>
                  <span className="contact-label">Donations and Gifts</span>
                  <a href="mailto:nicole.freeman@yale.edu" aria-label="Email Donations and Gifts contact">nicole.freeman@yale.edu</a>
                </li>
                <li>
                  <span className="contact-label">All Other Inquiries</span>
                  <a href="mailto:artschool.info@yale.edu">artschool.info@yale.edu</a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="footer-column">
              <h4 className="footer-subtitle">Connect With Us</h4>
              <div className="social-links">
                <a href="https://instagram.com/yaleschoolofart" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Follow Yale School of Art on Instagram">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://facebook.com/yaleschoolofart" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Follow Yale School of Art on Facebook">
                  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@yaleschoolofart1869" className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Watch Yale School of Art on YouTube">
                  <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                  </svg>
                </a>
              </div>
              <ul className="footer-links" style={{ marginTop: '1.5rem' }}>
                <li>
                  <span className="contact-label">Norfolk Summer School</span>
                  <a href="mailto:norfolkart@yale.edu" aria-label="Email Norfolk Summer School">norfolkart@yale.edu</a>
                </li>
                <li>
                  <a href="https://admissions.yale.edu" target="_blank" rel="noopener noreferrer" aria-label="Visit Yale College Admissions website">Yale College Admissions</a>
                </li>
                <li>
                  <a href="https://commencement.yale.edu" target="_blank" rel="noopener noreferrer" aria-label="Visit Yale Commencement website">Yale Commencement</a>
                </li>
                <li>
                  <a href="https://www.art.yale.edu/alums" target="_blank" rel="noopener noreferrer" aria-label="Submit transcript request form">Transcript Request Form</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <p>© 2025 Yale School of Art. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#" aria-label="View privacy policy">Privacy Policy</a>
              <a href="#" aria-label="View terms of use">Terms of Use</a>
              <a href="#" aria-label="View accessibility information">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}