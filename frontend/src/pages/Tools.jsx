import TopBar from '../components/TopBar.jsx';
import ChapterTool from '../features/calculators/ChapterTool.jsx';

export default function Tools() {
  return (
    <>
      <TopBar title="Calculators" sub="From Ch 5, Ch 7 and Ch 10" />
      <h2>Ch 5 reliability</h2><ChapterTool tool="reliability" />
      <h2>Ch 7 function points</h2><ChapterTool tool="fp" />
      <h2>Ch 10 risk</h2><ChapterTool tool="risk" />
    </>
  );
}
