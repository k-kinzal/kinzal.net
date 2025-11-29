export default {
  title: 'Pages',
  parameters: {
    layout: 'fullscreen',
  },
};

const createIframe = (src) => {
  const container = document.createElement('div');
  container.style.cssText = 'width: 100%; height: 100vh;';

  const iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.style.cssText = 'width: 100%; height: 100%; border: none;';

  container.appendChild(iframe);
  return container;
};

export const OriginalList = {
  render: () => createIframe('/original.html'),
};

export const OriginalView = {
  render: () => createIframe('/original.html#img001.jpg'),
};

export const ScrapList = {
  render: () => createIframe('/scrap.html'),
};

export const ScrapView = {
  render: () => createIframe('/scrap.html#img001.jpg'),
};
