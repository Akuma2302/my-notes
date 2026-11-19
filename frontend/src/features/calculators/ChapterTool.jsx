import ReliabilityCalculator from './ReliabilityCalculator.jsx';
import FunctionPointCalculator from './FunctionPointCalculator.jsx';
import RiskTable from './RiskTable.jsx';
import Diagram from '../../components/Diagram.jsx';

export default function ChapterTool({ tool }) {
  if (tool === 'reliability') return <ReliabilityCalculator />;
  if (tool === 'fp') return <FunctionPointCalculator />;
  if (tool === 'risk') return <><RiskTable /><Diagram name="riskMatrix" /></>;
  return null;
}
