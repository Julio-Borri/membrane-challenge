// Module dependencies
import { useContext } from 'react';
import { AppContext } from '../../state/reducers';

// UI Components
import { Button, Typography, Card, Statistic, Space } from 'antd';

const { Text, Title } = Typography;

interface SurveyPreviewProps {
  handleSubmitSurvey: () => Promise<void>;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({ handleSubmitSurvey }) => {
  const { state, dispatch } = useContext(AppContext);

  const { answers } = state;

  return (
    <div>
      <Space className="preview-container">
        <Title level={3}>Survey Overview</Title>
        <Button onClick={handleSubmitSurvey}>
          Submit Survey
        </Button>
      </Space>

      {Object.keys(answers).map((title) => (
        <Card size="small" key={title}>
          <Statistic title={title} value={`Option: ${answers[title]}`} />
        </Card>
      ))}
    </div>
  );
};

export default SurveyPreview;
