export const detectMobile = () => {
  const toMatch = [/Mobile/i, /Android/i, /webOS/i, /iPhone/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  const isMobile = toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });

  const isSamsungBrowser = navigator.userAgent.match(/SamsungBrowser/i);

  return (isMobile && screen.width < 768) || isSamsungBrowser;
};
