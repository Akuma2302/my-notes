export default function StatusScreen({ title, children }) {
  return <div className="empty" style={{ paddingTop: 80 }}><h2>{title}</h2>{children}</div>;
}
