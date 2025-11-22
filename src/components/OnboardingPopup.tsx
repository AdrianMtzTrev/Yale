import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Info, BookOpen, Calendar, Briefcase } from 'lucide-react';

export function OnboardingPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup every time the page loads or navigates to home
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-[550px] w-[92vw] bg-white dark:bg-gray-800 border-[var(--lime)] border-2 shadow-2xl !pb-8 !px-6">
        <DialogHeader className="text-center">
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="h-14 w-14 rounded-full bg-[var(--lime)] flex items-center justify-center flex-shrink-0">
              <Info className="h-7 w-7 text-black dark:text-white" />
            </div>
            <DialogTitle className="text-gray-900 dark:text-white text-2xl leading-tight">
              Welcome to Yale School of Art!
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            Yale School of Art informational page where you can explore courses, events, and school projects
          </DialogDescription>
        </DialogHeader>
        
        <div className="text-gray-700 dark:text-gray-300 space-y-4 px-4">
          <p className="text-base leading-relaxed text-center">
            This is an informational page where you can explore everything about our art school.
          </p>
          
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4 text-left">
              <div className="h-9 w-9 rounded-full bg-[var(--lime)]/20 dark:bg-[var(--lime)]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpen className="h-4.5 w-4.5 text-[var(--lime)]" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white text-base font-medium mb-1">View Courses</p>
                <p className="text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
                  Explore our study programs and academic plans
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-left">
              <div className="h-9 w-9 rounded-full bg-[var(--lime)]/20 dark:bg-[var(--lime)]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar className="h-4.5 w-4.5 text-[var(--lime)]" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white text-base font-medium mb-1">Events</p>
                <p className="text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
                  Discover workshops, conferences, and exhibitions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-left">
              <div className="h-9 w-9 rounded-full bg-[var(--lime)]/20 dark:bg-[var(--lime)]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Briefcase className="h-4.5 w-4.5 text-[var(--lime)]" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white text-base font-medium mb-1">School Projects</p>
                <p className="text-[14px] leading-relaxed text-gray-600 dark:text-gray-400">
                  Learn about the work of our students and faculty
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
            <p className="text-[14px] leading-relaxed text-gray-500 dark:text-gray-400 italic text-center">
              Navigate the site to discover more about our artistic community.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center pt-6 mb-2">
          <Button 
            onClick={handleClose}
            className="bg-[var(--lime)] hover:bg-[var(--orange)] hover:scale-105 !text-black dark:!text-white hover:!text-[var(--lime)] !px-20 !py-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 !gap-0"
            aria-label="Close welcome message and start exploring"
          >
            <span className="text-xl font-semibold block leading-none">Start Exploring!</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}