// Renders one of the line-art illustrations from utils/illustrations.js.
export default function Art({ svg, className = 'art' }) {
  return <div className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}
