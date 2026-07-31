export const scrollToTarget = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (element) {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(element);
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
