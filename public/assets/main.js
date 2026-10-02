
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const items = document.querySelectorAll(".post-card, .article-page article");
  if (!("IntersectionObserver" in window) || !items.length) return;
  items.forEach((el,i) => {
    el.style.animationDelay = `${Math.min(i * 45, 180)}ms`;
  });
})();
